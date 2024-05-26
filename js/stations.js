const API_KEY = '81505713ce0752cbd057fae3543f60cac9389ab8';

import { createBikeIcon, map, markers } from './map.js';

fetch(
    `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=${API_KEY}`
)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((station) => {
            // Create a marker for each station and add it to the map
            let marker = L.marker(
                [station.position.lat, station.position.lng],
                { icon: createBikeIcon(station.available_bikes) }
            );

            // Add the marker to the cluster group
            markers.addLayer(marker);

            // Add the marker cluster group to the map
            map.addLayer(markers);
        });
    })
    .catch((error) => {
        console.error("Une erreur s'est produite:", error.message);
    });
