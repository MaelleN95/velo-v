const API_KEY = '81505713ce0752cbd057fae3543f60cac9389ab8';

import { createBikeIcon, map, markers } from './map.js';

// Fetch station data from the JCDecaux API
fetch(
  `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=${API_KEY}`
)
  .then((response) => {
    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Network error');
    }
    return response.json(); // Parse JSON from the response
  })
  .then((datas) => {
    verifyUserChoice(datas); // Process the data based on the user's choice
    // Store the fetched station data in session storage
    sessionStorage.setItem('stationsData', JSON.stringify(datas));
  })
  .catch((error) => {
    console.error('An error occurred:', error.message); // Log any errors to the console
  });

// Buttons to toggle between available bikes and available stands
const bikeButton = document.getElementById('bike-button');
const standButton = document.getElementById('stand-button');

// Add event listener for the bike button
bikeButton.addEventListener('click', () => {
  const storedStations = JSON.parse(sessionStorage.getItem('stationsData'));
  bikeButton.classList.add('active'); // Highlight bike button
  standButton.classList.remove('active'); // Remove highlight from stand button
  verifyUserChoice(storedStations); // Update markers based on bike availability
});

// Add event listener for the stand button
standButton.addEventListener('click', () => {
  const storedStations = JSON.parse(sessionStorage.getItem('stationsData'));
  bikeButton.classList.remove('active'); // Remove highlight from bike button
  standButton.classList.add('active'); // Highlight stand button
  verifyUserChoice(storedStations); // Update markers based on stand availability
});

/**
 *  Function to verify the user's choice and display the corresponding markers on the map.
 * @param {Object} stations  The station data fetched from the JCDecaux API.
 * @returns  The markers on the map based on the user's choice.
 */
const verifyUserChoice = (stations) => {
  if (bikeButton.classList.contains('active')) {
    createMarkers(stations, 'available_bikes'); // Show available bikes
  } else if (standButton.classList.contains('active')) {
    createMarkers(stations, 'available_bike_stands'); // Show available stands
  }
};

export let selectedStation = null; // Variable to hold the currently selected station
const openModalBtn = document.getElementById('openModal'); // Button to open the modal

/**
 * Function to create markers for each station on the map based on the user's choice.
 * @param {Object} stations  The station data fetched from the JCDecaux API.
 * @param {*} userChoice  The user's choice of available bikes or stands.
 * @returns  The markers for each station on the map.
 */
const createMarkers = (stations, userChoice) => {
  markers.clearLayers(); // Clear existing markers

  stations.forEach((station) => {
    // Create a marker for each station and set its icon
    let marker = L.marker([station.position.lat, station.position.lng], {
      icon: createBikeIcon(station[userChoice]),
    });
    // Add click event listener to the marker
    marker.on('click', () => {
      selectedStation = station; // Store the selected station

      // Check for previous reservation
      previousReservation(selectedStation);
      updateStationInfo(selectedStation); // Update the displayed station information
    });

    // Add the marker to the cluster group
    markers.addLayer(marker);
  });
  // Add the marker cluster group to the map
  map.addLayer(markers);
};

/**
 *  Function to extract the station name from the station ID prefix.
 * @param {string} stationName   The name of the station.
 * @returns   The station name without the station ID prefix.
 */
export const extractStationName = (stationName) => {
  // Remove the station ID prefix from the station name
  return stationName.replace(/^[0-9]{4,5} - /, '');
};

/**
 * Update the displayed information for the selected station.
 * @param {Object} station  The selected station object.
 */
const updateStationInfo = (station) => {
  const nameStation = document.getElementById('name-station');
  const addressStation = document.getElementById('address-station');
  const stands = document.getElementById('stands');
  const bikes = document.getElementById('bikes');
  const creditCard = document.querySelector('.fa-credit-card');

  if (selectedStation) {
    // Show station information if a station is selected
    const map = document.querySelector('.map-space');
    const stationInfo = document.querySelector('.station-reservation');

    stationInfo.style.display = 'flex';
    map.style.width = '69%';
    stationInfo.style.width = '30%';

    // Extract and display the station name
    const stationName = extractStationName(selectedStation.name);
    nameStation.textContent = `Nom : ${stationName}`;

    // Show or hide the address based on its availability
    if (station.address === '') {
      addressStation.style.display = 'none';
    } else {
      addressStation.style.display = 'block';
      addressStation.textContent = `Adresse : ${station.address}`;
    }

    // Display the number of available stands and bikes
    stands.textContent = station.available_bike_stands;
    bikes.textContent = station.available_bikes;

    // Update credit card icon based on payment availability
    if (station.banking) {
      creditCard.style.color = 'green';
      creditCard.title = 'Carte bancaire acceptée';
    } else {
      creditCard.style.color = 'var(--red)';
      creditCard.title = 'Carte bancaire non acceptée';
    }
  } else {
    // Reset station information display if no station is selected
    nameStation.textContent = 'Choisissez une station sur la carte';
    addressStation.textContent = '';
    stands.textContent = '';
    bikes.textContent = '';
    creditCard.style.color = 'var(--black)';
  }
};

/**
 * Function to check for a previous reservation and update the modal button accordingly.
 * @param {Object} selectedStation  The selected station object.
 */
const previousReservation = (selectedStation) => {
  if (localStorage.getItem('reservation')) {
    const reservationData = JSON.parse(localStorage.getItem('reservation'));
    const now = new Date().getTime();
    const timeElapsed = now - reservationData.timestamp;
    const fifteenMinutes = 60 * 15 * 1000;
    if (timeElapsed < fifteenMinutes) {
      openModalBtn.disabled = true;
      openModalBtn.textContent = 'Réservation déjà en cours';
    } else {
      openModalBtn.disabled = false;
      openModalBtn.textContent = 'Réserver';
      // Enable or disable the modal button based on bike availability
      if (selectedStation.available_bikes > 0) {
        openModalBtn.disabled = false;
      } else {
        openModalBtn.disabled = true;
      }
    }
  } else {
    openModalBtn.disabled = false;
    openModalBtn.textContent = 'Réserver';
    // Enable or disable the modal button based on bike availability
    if (selectedStation.available_bikes > 0) {
      openModalBtn.disabled = false;
    } else {
      openModalBtn.disabled = true;
    }
  }
};
