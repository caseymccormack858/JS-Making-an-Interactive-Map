// Pseudocode for Traveler Experience Improvement App

// 1. Define the myMap object to hold map-related properties and methods
//    - coordinates: array to store the user's current location
//    - businesses: array to store fetched business data
//    - map: reference to the Leaflet map object
//    - markers: object to hold business markers

// 2. Build the Leaflet map on window load
//    - Call getCoords() to obtain the user's current location (latitude and longitude)
//    - Build the map centered at the user's location using buildMap()

// 3. When the user selects a business type and clicks the "Submit" button:
//    - Get the selected business type from the dropdown menu

// 4. Fetch business data using the Foursquare API
//    - Call getFoursquare(businessType) with the selected business type as an argument
//    - The getFoursquare() function will use the user's current location coordinates
//      and the Foursquare API key to fetch data for the selected business type
//    - Process the fetched data to extract business names, latitudes, and longitudes

// 5. Add business markers to the map
//    - Call addMarkers() with the processed business data as an argument
//    - The addMarkers() function will loop through the businesses array
//      and add markers for each business on the Leaflet map
//    - Each marker will display a popup with the business name

// 6. Event handlers:
//    - On window load:
//        - Call getCoords() to obtain the user's current location
//        - Build the map centered at the user's location using buildMap()
//    - On "Submit" button click:
//        - Get the selected business type from the dropdown menu
//        - Fetch business data using the Foursquare API and process it
//        - Add business markers to the map

// API and Function Order:
// 1. Foursquare API: Get business data based on the user's location and selected business type
// 2. processBusinesses(data): Extract business details from the Foursquare API response
// 3. getCoords(): Obtain the user's current location using the Geolocation API
// 4. buildMap(): Build the Leaflet map centered at the user's location
// 5. addMarkers(): Add business markers to the map

// How to Obtain User's Location:
// - Use the Geolocation API to get the user's latitude and longitude
// - Call navigator.geolocation.getCurrentPosition(resolve, reject) and return the coordinates

// How to Add User's Location to the Map:
// - Use Leaflet to create a marker with the user's coordinates
// - Add a popup to the marker indicating "You are here"
// - Add the marker to the map

// How to Get the Selected Business Type from the User:
// - Get the selected value from the dropdown menu using document.getElementById('business').value

// How to Add Business Information to the Map:
// - Loop through the processed business data
// - For each business, create a marker with the business's latitude and longitude
// - Add a popup to the marker displaying the business name
// - Add the marker to the map

