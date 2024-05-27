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

// Function to create markers on the map according to the user's choice
const createMarkers = (stations, userChoice) => {
    markers.clearLayers();

    stations.forEach((station) => {
        // Create a marker for each station and add it to the map
        let marker = L.marker([station.position.lat, station.position.lng], {
            icon: createBikeIcon(station[userChoice]),
        });

        // Add the marker to the cluster group
        markers.addLayer(marker);
    });
    // Add the marker cluster group to the map
    map.addLayer(markers);
};
