import { hasSignature, clearCanvas } from './signature.js';
import { selectedStation, extractStationName } from './stations.js';

const modal = document.getElementById('modal');
const modalBackground = document.getElementById('modal-background');
const closeModalBtn = document.getElementById('close');
const openModalBtn = document.getElementById('openModal');
const form = document.getElementById('reservation-form');
const nameInput = document.getElementById('name');
const firstnameInput = document.getElementById('firstname');

/**
 * Function to hide the modal
 */
const closeModal = () => {
  modal.style.display = 'none';
  clearCanvas();
};

/**
 * Function to display the modal
 */
const openModal = () => {
  modal.style.display = 'block';
  // Check if a reservation has already been made
  previousReservationVerificationInModal();
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

/**
 * Function to check if a reservation has already been made and display a confirmation message in the modal.
 * @returns  The confirmation message in the modal.
 */
const previousReservationVerificationInModal = () => {
  const previousReservationParagraph = document.getElementById(
    'info-previous-reservation'
  );
  // Check if a reservation has already been made
  if (localStorage.getItem('reservation')) {
    previousReservationParagraph.style.display = 'block';
  } else {
    previousReservationParagraph.style.display = 'none';
    nameInput.value = '';
    firstnameInput.value = '';
  }

  const yesButton = document.getElementById('yes');
  const noButton = document.getElementById('no');

  yesButton.addEventListener('click', () => {
    const previousReservationData = JSON.parse(
      localStorage.getItem('reservation')
    );
    nameInput.value = previousReservationData.name;
    firstnameInput.value = previousReservationData.firstname;
    previousReservationParagraph.style.display = 'none';
  });

  noButton.addEventListener('click', () => {
    previousReservationParagraph.style.display = 'none';
    nameInput.value = '';
    firstnameInput.value = '';

    // Clear the previous reservation data from local storage
    localStorage.removeItem('reservation');
  });
};

/**
 * Function to format the time in minutes and seconds.
 * @param {*} seconds  The time in seconds.
 * @returns  The formatted time in MM:SS format.
 * @example formatTime(65) => '01:05'
 */
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
    openModalBtn.disabled = true; // Disable the reservation button while the timer is running
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    display.textContent = `Temps restant : ${formatTime(timer)}`;
    const reservationData = JSON.parse(localStorage.getItem('reservation'));
    if (!reservationData) {
      clearInterval(interval);
      display.textContent = '';
      return;
    }
    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = 'Temps restant : 00:00'; // Display 00:00 when the timer ends
      openModalBtn.disabled = false; // Enable the reservation button when the timer ends
    }
  }, 1000); // Update every second
};

/**
 *  Function to handle the form submission.
 *  It validates the form fields and displays an alert message if the form is not valid.
 *  If the form is valid, it stores the reservation information in local storage and displays a confirmation message.
 * @param {*} e  The event object.
 */
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
    station: selectedStation,
    timestamp: new Date().getTime(),
  };

  // Clear the canvas and reset the signature status
  clearCanvas();

  openModalBtn.disabled = true;
  openModalBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;

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

// Check if a reservation has already been made
addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('reservation')) {
    const reservationData = JSON.parse(localStorage.getItem('reservation'));
    // Vérifier si la reservation date de plus de 15 minutes
    const now = new Date().getTime();
    const timeElapsed = now - reservationData.timestamp;
    const fifteenMinutes = 60 * 15 * 1000;

    if (timeElapsed < fifteenMinutes) {
      // Display the reservation confirmation message
      const reservationValidated = document.querySelector(
        '.reservation-validated'
      );
      const reservationValidatedInfo = document.querySelector(
        '.reservation-validated-info'
      );

      reservationValidated.style.display = 'flex';
      const stationName = extractStationName(reservationData.station.name);
      reservationValidatedInfo.textContent = `Vélo réservé à la station ${stationName} par ${reservationData.firstname} ${reservationData.name}`;

      // Get the element to display the timer message
      const timerMessage = document.getElementById('timer');

      // Initialize and start the timer
      const remainingTime = Math.floor((fifteenMinutes - timeElapsed) / 1000);
      startTimer(remainingTime, timerMessage);
    }
  }
});
