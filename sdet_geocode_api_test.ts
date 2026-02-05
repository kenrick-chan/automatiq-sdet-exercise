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

type responseObj = {
  city: string;
  lat: string;
  lng: string;
};

export default function () {
  // Code to interact with the Google Geocode API
  let res = http.get(`${options.url}?address=${options.location}&key=${options.apiKey}`);
  
  // K6 check to determine that the request responded with a 200 result status
  check(res, { "status is 200": (res) => res.status === 200 });
  
  // Stringify -> Parse to access object data
  const resJsonString = JSON.stringify(res.json());
  const resJsonObj = JSON.parse(resJsonString);
  
  // Store data from JSON object to an object
  const objData: responseObj= {
    city: resJsonObj.results[0].address_components[0].long_name,
    lat: resJsonObj.results[0].geometry.location.lat,
    lng: resJsonObj.results[0].geometry.location.lng
  };

  // Print City, Lat, and Lng
  for (let key in objData) {
    console.log( `${key}: ${objData[key]}`)
  };
}