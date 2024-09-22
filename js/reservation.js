import { hasSignature } from './signature.js';
import { selectedStation, extractStationName } from './stations.js';

const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close');
const openModalBtn = document.getElementById('openModal');
const canvas = document.getElementById('signature');
const form = document.getElementById('reservation-form');
const nameInput = document.getElementById('name');
const firstnameInput = document.getElementById('firstname');

const closeModal = () => {
  modal.style.display = 'none';
};

const openModal = () => {
  modal.style.display = 'block';
  console.log(selectedStation);
};

// Gestion de l'ouverture de la modale
openModalBtn.addEventListener('click', () => {
  if (!selectedStation) {
    alert('Veuillez sélectionner une station.');
    openModalBtn.disabled = true;
    return;
  }
  openModal();
});

// Gestion de la fermeture de la modale
closeModalBtn.addEventListener('click', () => {
  closeModal();
});

// Fonction pour formater le temps en minutes et secondes
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
}

// Fonction pour démarrer le compte à rebours
function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  const interval = setInterval(() => {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    display.textContent = `Temps restant : ${formatTime(timer)}`;

    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = 'Temps restant : 00:00';
    }
  }, 1000);
}

// Fonction pour valider la réservation
const handleSubmit = (e) => {
  e.preventDefault();

  // Récupération des champs texte
  const name = nameInput.value.trim();
  const firstname = firstnameInput.value.trim();

  // Vérification des champs
  const regex = new RegExp('^[a-zA-ZÀ-ÿ-]+$');
  if (!regex.test(name) || !regex.test(firstname)) {
    alert('Veuillez saisir un nom et un prénom valides.');
    return;
  }

  if (!name || !firstname) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  // Vérification de la signature
  if (!hasSignature) {
    alert('Veuillez signer dans le canvas.');
    return;
  }

  // Stocker les informations dans une variable
  const reservationData = {
    name,
    firstname,
    signature: canvas.toDataURL(),
  };

  // Gestion du timer de réservation

  // Afficher la balise <p> avec la phrase
  const reservationValidated = document.querySelector('.reservation-validated');
  const reservationValidatedInfo = document.querySelector(
    '.reservation-validated-info'
  );
  reservationValidated.style.display = 'flex';
  const stationName = extractStationName(selectedStation.name);
  reservationValidatedInfo.textContent = `Vélo réservé à la station ${stationName} par ${reservationData.firstname} ${reservationData.name}`;
  // Obtenir la balise <p> pour afficher la phrase avec le timer
  const timerMessage = document.getElementById('timer');

  // Initialiser et démarrer le timer (15 minutes)
  const fifteenMinutes = 60 * 15;
  startTimer(fifteenMinutes, timerMessage);

  // close the modal
  closeModal();
};

// Gestion de la soumission du formulaire
form.addEventListener('submit', handleSubmit);
