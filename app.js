// map object
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// add business markers
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkRKamN6OWlUQXl1azdQYkxidzV3dCJ9.eyJpc3MiOiJodHRwczovL2F1dGguc3R1ZGlvLmZvdXJzcXVhcmUuY29tLyIsInN1YiI6ImF1dGgwfDY0YmYwZjcwMzg4Zjk0ZjVhZWJiNGNmZCIsImF1ZCI6WyJodHRwczovL2ZvdXJzcXVhcmUuY29tL2FwaS8iLCJodHRwczovL3VuZm9sZGVkLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2OTAyNDM1MTUsImV4cCI6MTY5MDMyOTkxNSwiYXpwIjoidjk3MGRwYmNxbVJ0cjN5OVh3bEFCM2R5Y3Bzdk5SWkYiLCJzY29wZSI6Im9wZW5pZCBlbWFpbCBvZmZsaW5lX2FjY2VzcyJ9.bTojmerdZPxUjvOOiInRo4oMiphUCRBNxN_bLNdLRLwvnfC-2v6koij6csbXaWij6xtznVmSFls-Q2SdcWJ4QcdxRqfCqrJNoH3DebMksl8CkIMsFM7yw7tZcpKtjhDabUfS5CmAejkpjXDBCfVyKPwcIVO2Pb81JhHhVCX9J6P3Ps_9FstKsZURHjTCTs40DmC0C6WxKDKo1SdV7Vbq_r4UsvMq-R5tQVoPkskU2cr0zZTMxvyoSECp705H7mj8h_LaLsh-MtO381e4C4Vg9beBP12ELDN_qvCQRrgBYg9-DjqtQ9JcslDKp8b0y17Ms8Mqvhtzk1UncIZ9fEvnDw'
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}
// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}


// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})
