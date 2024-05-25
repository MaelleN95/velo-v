let map = L.map('map', {
    center: [45.74846, 4.84671],
    zoom: 13,
});

// Add a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 12,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var stationIcon = L.icon({
    iconUrl: '/assets/logo/station-marker.png',
    iconAnchor: [12.5, 32],
});

L.marker([45.74846, 4.84671], { icon: stationIcon }).addTo(map);
