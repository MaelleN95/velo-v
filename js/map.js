export let map = L.map('map', {
    center: [45.74846, 4.84671],
    zoom: 13,
});

// Add a tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 11,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Icon for stations with available bikes
export const createBikeIcon = (bikeCount) => {
    let bikeIcon = L.divIcon({
        className: 'bike-icon',
        html: `<div>${bikeCount}</div>`,
        iconSize: [25, 32],
        iconAnchor: [12.5, 32],
    });
    return bikeIcon;
};

export let markers = L.markerClusterGroup({
    showCoverageOnHover: false,
});
