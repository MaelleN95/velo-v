const API_KEY = '81505713ce0752cbd057fae3543f60cac9389ab8';

import { createBikeIcon, map, markers } from './map.js';

fetch(
  `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=${API_KEY}`
)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }
    return response.json();
  })
  .then((datas) => {
    verifyUserChoice(datas);
    // Store the data in the session storage
    sessionStorage.setItem('stationsData', JSON.stringify(datas));
  })
  .catch((error) => {
    console.error("Une erreur s'est produite:", error.message);
  });

// Buttons to switch between available bikes and available stands
const bikeButton = document.getElementById('bike-button');
const standButton = document.getElementById('stand-button');

// Event listeners for the buttons
bikeButton.addEventListener('click', () => {
  const storedStations = JSON.parse(sessionStorage.getItem('stationsData'));
  bikeButton.classList.add('active');
  standButton.classList.remove('active');
  verifyUserChoice(storedStations);
});

standButton.addEventListener('click', () => {
  const storedStations = JSON.parse(sessionStorage.getItem('stationsData'));
  bikeButton.classList.remove('active');
  standButton.classList.add('active');
  verifyUserChoice(storedStations);
});

// Function to verify the user's choice
const verifyUserChoice = (stations) => {
  if (bikeButton.classList.contains('active')) {
    createMarkers(stations, 'available_bikes');
  } else if (standButton.classList.contains('active')) {
    createMarkers(stations, 'available_bike_stands');
  }
};

export let selectedStation = null;
const openModalBtn = document.getElementById('openModal');

// Function to create markers on the map according to the user's choice
const createMarkers = (stations, userChoice) => {
  markers.clearLayers();

  stations.forEach((station) => {
    // Create a marker for each station and add it to the map
    let marker = L.marker([station.position.lat, station.position.lng], {
      icon: createBikeIcon(station[userChoice]),
    });
    // Add click event listener to the marker
    marker.on('click', () => {
      selectedStation = station; // Store the selected station
      updateStationInfo(selectedStation);
      openModalBtn.disabled = false;
    });

    // Add the marker to the cluster group
    markers.addLayer(marker);
  });
  // Add the marker cluster group to the map
  map.addLayer(markers);
};

const extractStationName = (stationName) => {
  return stationName.replace(/^[0-9]{4,5} - /, '');
};

/**
 * Update the station information.
 * @param {Object} station  The selected station.
 */
const updateStationInfo = (station) => {
  const nameStation = document.getElementById('name-station');
  const addressStation = document.getElementById('address-station');
  const stands = document.getElementById('stands');
  const bikes = document.getElementById('bikes');
  const creditCard = document.querySelector('.fa-credit-card');

  if (selectedStation) {
    const stationName = extractStationName(selectedStation.name);
    nameStation.textContent = `Nom : ${stationName}`;

    if (station.address === '') {
      addressStation.style.display = 'none';
    } else {
      addressStation.style.display = 'block';
      addressStation.textContent = `Adresse : ${station.address}`;
    }

    stands.textContent = station.available_bike_stands;
    bikes.textContent = station.available_bikes;

    if (station.banking) {
      creditCard.style.color = 'green';
      creditCard.title = 'Paiement par carte bancaire disponible';
    } else {
      creditCard.style.color = 'var(--red)';
      creditCard.title = 'Paiement par carte bancaire indisponible';
    }
  } else {
    nameStation.textContent = 'Choisissez une station sur la carte';
    addressStation.textContent = '';
    stands.textContent = '';
    bikes.textContent = '';
    creditCard.style.color = 'var(--black)';
  }
};
