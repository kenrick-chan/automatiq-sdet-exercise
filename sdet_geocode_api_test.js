import http from 'k6/http';
import { check } from 'k6';

const options = {
  scenarios: {
    requested_scenario: {
      executor: 'per-vu-iterations',
      vus:1,
      iterations:1
    }
  },
  apiKey: __ENV.GOOGLE_API_KEY,
  location: __ENV.LOCATION
}

export default function () {
  console.log(`https://maps.googleapis.com/maps/api/geocode/json?key=${options.apiKey}&address=${options.location}`)
  let res = http.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${options.apiKey}&address=${options.location}`);
  check(res, { "status is 200": (res) => res.status === 200 });
  let data = res.json();
  
  const objData = {
    city: data.results[0].address_components[0].long_name,
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng
  }
  
  for (let key in objData) {
    console.log( `${key}: ${objData[key]}`)
  }
}