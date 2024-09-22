import { hasSignature } from './signature.js';
import { selectedStation } from './stations.js';

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

  console.log('Réservation enregistrée:', reservationData);

  // close the modal
  closeModal();
};

// Gestion de la soumission du formulaire
form.addEventListener('submit', handleSubmit);
