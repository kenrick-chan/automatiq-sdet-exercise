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
  let res = http.get(`${options.url}?address=${options.location}&key=${options.apiKey}`);
  check(res, { "status is 200": (res) => res.status === 200 });
  const resJsonString = JSON.stringify(res.json());
  const resJsonObj = JSON.parse(resJsonString);
  
  const objData: responseObj= {
    city: resJsonObj.results[0].address_components[0].long_name,
    lat: resJsonObj.results[0].geometry.location.lat,
    lng: resJsonObj.results[0].geometry.location.lng
  };

  for (let key in objData) {
    console.log( `${key}: ${objData[key]}`)
  };
}