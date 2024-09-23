export let map = L.map('map', {
  center: [45.74846, 4.84671],
  zoom: 13,
});

// Add a tile layer
L.tileLayer(
  'https://tile.jawg.io/c0381cc7-565c-4d1c-bb02-216c20aa620b/{z}/{x}/{y}{r}.png?access-token=14SfOLkixQb5LWadOPTJTdo4bon42nl0BOzVLdBLlj9yjaRU6SWUUkkyhVGZpW8Z',
  {
    attribution:
      '<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
    minZoom: 0,
    maxZoom: 22,
    accessToken: '<your accessToken>',
  }
).addTo(map);

/**
 *  Function to create a custom icon for the bike markers.
 * @param {*} bikeCount  The number of bikes available at the station.
 * @returns  The custom icon for the bike markers.
 */
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
  maxClusterRadius: 70,
  disableClusteringAtZoom: 15,
  iconCreateFunction: function (cluster) {
    let count = cluster.getChildCount();
    return L.divIcon({
      html: `<span>${count}</span>`,
      className: 'custom-cluster',
      iconSize: L.point(40, 40),
    });
  },
});
