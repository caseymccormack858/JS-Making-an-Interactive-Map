const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},
  
	buildMap() {
	  this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
	  });
  
	  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
	  }).addTo(this.map);
  
	  const marker = L.marker(this.coordinates)
		.addTo(this.map)
		.bindPopup('<p><b>You are here</b><br></p>')
		.openPopup();
	},
  
	addMarkers() {
	  for (let i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
		  this.businesses[i].lat,
		  this.businesses[i].long,
		])
		.bindPopup(`<p>${this.businesses[i].name}</p>`)
		.addTo(this.map);
	  }
	},
  };
  
  async function getCoords() {
	const pos = await new Promise((resolve, reject) => {
	  navigator.geolocation.getCurrentPosition(resolve, reject);
	});
	return [pos.coords.latitude, pos.coords.longitude];
  }
  
  async function getFoursquare(business) {
	const apiKey = 'YOUR_FOURSQUARE_API_KEY'; // Replace 'YOUR_FOURSQUARE_API_KEY' with your actual Foursquare API key
	const limit = 5;
	const lat = myMap.coordinates[0];
	const lon = myMap.coordinates[1];
	const endpoint = 'https://api.foursquare.com/v2/venues/search';
	const options = {
	  method: 'GET',
	  headers: {
		'Accept': 'application/json',
		'Authorization': `Bearer ${apiKey}`,
	  },
	};
  
	const response = await fetch(`${endpoint}?&query=${business}&limit=${limit}&ll=${lat},${lon}`, options);
	const data = await response.json();
	const businesses = data.response.venues;
	return businesses;
  }
  
  function processBusinesses(data) {
	const businesses = data.map((element) => {
	  return {
		name: element.name,
		lat: element.location.lat,
		long: element.location.lng,
	  };
	});
	return businesses;
  }
  
  window.onload = async () => {
	const coords = await getCoords();
	myMap.coordinates = coords;
	myMap.buildMap();
  };
  
  document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault();
	const businessType = document.getElementById('business').value;
	const data = await getFoursquare(businessType);
	myMap.businesses = processBusinesses(data);
	myMap.addMarkers();
  });
  
