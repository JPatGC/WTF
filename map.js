

/* 1.  Data */
const parks = [
  { name: "Paley Park",               coords: [40.76149, -73.97414], page: "Paley Park.html" },
  { name: "Greenacre Park",           coords: [40.75623, -73.96911], page: "Greenacre Park.html" },
  { name: "McGraw-Hill Pocket Park",  coords: [40.75849, -73.98464], page: "McGraw-Hill Pocket Park.html" },
  { name: "Tudor City Greens",        coords: [40.74886, -73.97138], page: "Tudor City Greens" },
  { name: "50th Street Commons",      coords: [40.76204, -73.98772], page: "50th Street Commons" },
  { name: "550 Madison Park",         coords: [40.76188, -73.97253], page: "550 Madison Park" },
  { name: "Septuagesimo Uno",         coords: [40.77910, -73.98122], page: "Septuagesimo Uno" },
  { name: "Amster Yard",              coords: [40.75420, -73.97035], page: "Amster Yard" },
  { name: "Berlin Wall Remnant Park", coords: [40.76031, -73.97304], page: "Berlin Wall Remnant Park" },
  { name: "Labyrinth of Contemplation", coords: [40.70398, -74.01710], page: "Labyrinth of Contemplation" }
];

/* 2.  Helpers */
function addTiles(map) {
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);
}

/* 3a.  Map with ALL markers (map.html) */
function initAllParks() {
  const map = L.map('park-map').setView([40.758, -73.978], 13);
  addTiles(map);

  parks.forEach((p, idx) => {
    L.marker(p.coords)
     .addTo(map)
     .bindPopup(`<strong>${p.name}</strong><br><a href="${p.page}">Park page →</a>`);
  });
}

/* 3b.  Single‑park map (park‑detail pages) */
function initSinglePark(currentParkName) {
  const park = parks.find(p => p.name === currentParkName);
  if (!park) return;                    // safety check

  const map = L.map('park-map').setView(park.coords, 16);
  addTiles(map);
  L.marker(park.coords).addTo(map).bindPopup(`<strong>${park.name}</strong>`).openPopup();
}

/* 4.  Decide which map to draw after the page loads */
document.addEventListener('DOMContentLoaded', () => {
  if (document.body.classList.contains('map-page')) {
    initAllParks();
  } else if (window.currentParkName) {   // set in each detail page
    initSinglePark(window.currentParkName);
  }
});
