// Manhattan Pocket Parks - Interactive Map
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with the map element
  const mapContainer = document.getElementById('park-map');
  if (!mapContainer) return;

  // Initialize the map centered on Manhattan
  const map = L.map('park-map').setView([40.7580, -73.9855], 13);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

  // Park locations data
  const parkLocations = [
    {
      name: "Paley Park",
      location: [40.7604, -73.9747],
      address: "53rd Street between Madison & Fifth",
      pageLink: "paley-park.html"
    },
    {
      name: "Greenacre Park",
      location: [40.7567, -73.9703],
      address: "East 51st Street between 2nd & 3rd",
      pageLink: "greenacre-park.html"
    },
    {
      name: "McGraw-Hill Pocket Park",
      location: [40.7595, -73.9819],
      address: "West 48th Street & 6th Avenue",
      pageLink: "mcgraw-hill-park.html"
    },
    {
      name: "Tudor City Greens",
      location: [40.7494, -73.9724],
      address: "East 42nd Street & 1st Avenue",
      pageLink: "tudor-city-greens.html"
    },
    {
      name: "50th Street Commons",
      location: [40.7612, -73.9866],
      address: "West 50th Street near 8th Avenue",
      pageLink: "50th-street-commons.html"
    },
    {
      name: "550 Madison Park",
      location: [40.7616, -73.9738],
      address: "East 55th Street & Madison Avenue",
      pageLink: "madison-park.html"
    },
    {
      name: "Septuagesimo Uno",
      location: [40.7797, -73.9819],
      address: "West 71st Street between Broadway & West End",
      pageLink: "septuagesimo-uno.html"
    },
    {
      name: "Amster Yard",
      location: [40.7537, -73.9709],
      address: "East 49th Street between 2nd & 3rd",
      pageLink: "amster-yard.html"
    },
    {
      name: "Berlin Wall Remnant Park",
      location: [40.7577, -73.9775],
      address: "520 Madison Avenue",
      pageLink: "berlin-wall-park.html"
    },
    {
      name: "Labyrinth of Contemplation",
      location: [40.7122, -74.0158],
      address: "Battery Park City",
      pageLink: "labyrinth-park.html"
    }
  ];

  // custom icon for park markers
  const parkIcon = L.icon({
    iconUrl: 'images/park-marker.png', // You'll need to create this icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // markers for each park
  parkLocations.forEach((park, index) => {
    const marker = L.marker(park.location, {
      icon: parkIcon,
      title: park.name
    }).addTo(map);

    // popup content with link to park page
    const popupContent = `
      <div class="map-popup">
        <h3>${park.name}</h3>
        <p>${park.address}</p>
        <a href="${park.pageLink}" class="popup-link">View Details</a>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    
    // If we're on a single park page and this is that park, open its popup
    if (window.currentParkName && window.currentParkName === park.name) {
      marker.openPopup();
    }
  });

  // Add park highlighting when hovering over list items
  const parkListItems = document.querySelectorAll('.list-item');
  if (parkListItems.length > 0) {
    parkListItems.forEach((item, index) => {
      item.addEventListener('mouseenter', function() {
        if (index < parkLocations.length) {
          map.setView(parkLocations[index].location, 15, { 
            animate: true, 
            duration: 1 
          });
        }
      });
    });
  }
});