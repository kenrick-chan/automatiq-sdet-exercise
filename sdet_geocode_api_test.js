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
  url: 'https://maps.googleapis.com/maps/api/geocode/json',
  apiKey: __ENV.GOOGLE_API_KEY,
  location: __ENV.LOCATION
}

export default function () {
  console.log(`${options.url}?address=${options.location}&key=${options.apiKey}`)
  let res = http.get(`${options.url}?address=${options.location}&key=${options.apiKey}`);
  check(res, { "status is 200": (res) => res.status === 200 });
  console.log(res.body);
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