var request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  return request('http://api.open-notify.org/iss-now.json')
  .then(response => {
    // Parse as JSON
    let position = JSON.parse(response)
    // Return object with lat and lng
    return {
      lat: position.iss_position.latitude,
      lng: position.iss_position.longitude,
    }
  })
}
getIssPosition()
.then(promise => console.log(promise))


function getAddressPosition(address) {
  let URL = 'https://maps.googleapis.com/maps/api/geocode/json?'
  let API_KEY = 'AIzaSyDMcb59Q8RhTqGuBhRGyY_hBjaUe4S4Rxs'

  return request(`${URL}address=${address}&key=${API_KEY}`)
  .then(response => {
    let address = JSON.parse(response)
    return address.results[0].geometry.location
  })
}
getAddressPosition('122 bevdale rd toronto')
.then(promise => console.log(promise))


function getCurrentTemperatureAtPosition(position) {
  // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
  let URL = 'https://api.darksky.net/forecast'
  let API_KEY = '48b6b6b75151fc7513664e14a802c6d1'
  return request(`${URL}/${API_KEY}/${position.lat},${position.lng}?units=ca`)
  .then(response => {
    let data = JSON.parse(response)
    return data.currently.temperature
  })
}
getAddressPosition('11 florenc st barrie')
.then(getCurrentTemperatureAtPosition)
.then(promise => console.log(promise))


function getCurrentTemperature(address) {
  return getAddressPosition(address)
    .then(getCurrentTemperatureAtPosition)
}
getCurrentTemperature('3 place ville marie montrel')
.then(promise => console.log(promise))


function getDistanceFromIss(address) {

}