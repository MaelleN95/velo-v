API_KEY = '81505713ce0752cbd057fae3543f60cac9389ab8';

fetch(
    `https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=${API_KEY}`
)
    .then((response) => response.json())
    .then((data) => {
        data.forEach((station) => {
            // Create a marker for each station and add it to the map
            let marker = L.marker(
                [station.position.lat, station.position.lng],
                { icon: stationIcon }
            ).addTo(map);
        });
    })
    .catch((error) => {
        console.error("Une erreur s'est produite:", error.message);
    });
