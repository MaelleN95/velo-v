import { hasSignature } from './signature.js';
import { selectedStation, extractStationName } from './stations.js';

const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');
const closeModalBtn = document.getElementById('close');
const openModalBtn = document.getElementById('openModal');
const form = document.getElementById('reservation-form');
const nameInput = document.getElementById('name');
const firstnameInput = document.getElementById('firstname');

// Function to hide the modal
const closeModal = () => {
  modal.style.display = 'none';
};

// Function to show the modal
const openModal = () => {
  modal.style.display = 'block';
};

// Handle opening the modal when the button is clicked
openModalBtn.addEventListener('click', () => {
  if (!selectedStation) {
    alert('Veuillez sélectionner une station.');
    openModalBtn.disabled = true;
    return;
  }
  openModal();
});

// Handle closing the modal when the close button is clicked
closeModalBtn.addEventListener('click', () => {
  closeModal();
});

modalBackground.addEventListener('click', () => {
  closeModal();
});

// Function to format time in minutes and seconds
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`; // Format as MM:SS
};

/**
 * Function to start the timer for the reservation.
 * @param {*} duration  The duration of the timer in seconds.
 * @param {*} display   The element to display the timer.
 */
const startTimer = (duration, display) => {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    display.textContent = `Temps restant : ${formatTime(timer)}`;
    openModalBtn.disabled = true; // Disable the reservation button while the timer is running
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = 'Temps restant : 00:00'; // Display 00:00 when the timer ends
      openModalBtn.disabled = false; // Enable the reservation button when the timer ends
    }
  }, 1000); // Update every second
};

// Function to handle form submission and reservation
const handleSubmit = (e) => {
  e.preventDefault();

  // Retrieve text field values
  const name = nameInput.value.trim();
  const firstname = firstnameInput.value.trim();

  // Validate the input fields
  const regex = new RegExp('^[a-zA-ZÀ-ÿ- ]+$');
  if (!regex.test(name) || !regex.test(firstname)) {
    alert('Veuillez saisir un nom et un prénom valides.');
    return;
  }

  if (!name || !firstname) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Check if a signature has been provided
  if (!hasSignature) {
    alert('Veuillez signer dans le canvas.');
    return;
  }

  // Store reservation information
  const reservationData = {
    name,
    firstname,
  };

  // Store the reservation data in local storage
  localStorage.setItem('reservation', JSON.stringify(reservationData));

  // Handle reservation timer display

  // Show the reservation confirmation message
  const reservationValidated = document.querySelector('.reservation-validated');
  const reservationValidatedInfo = document.querySelector(
    '.reservation-validated-info'
  );
  reservationValidated.style.display = 'flex';
  const stationName = extractStationName(selectedStation.name);
  reservationValidatedInfo.textContent = `Vélo réservé à la station ${stationName} par ${reservationData.firstname} ${reservationData.name}`;

  // Get the element to display the timer message
  const timerMessage = document.getElementById('timer');

  // Initialize and start the timer (15 minutes)
  const fifteenMinutes = 60 * 15;
  startTimer(fifteenMinutes, timerMessage);

  // Close the modal
  closeModal();
};

// Handle form submission
form.addEventListener('submit', handleSubmit);
