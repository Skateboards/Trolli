import axios from "axios";
const key = "AIzaSyC54wON_jHY4WTYo__qxvRwOdd-aYoV1_s";
const routeAPI = "https://maps.googleapis.com/maps/api/directions/json?";
const geoLocationAPI =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";

const getRoutes = (originLatLong, destinationLatLong) => {
  const config = {
    method: "GET",
    url: "http://api.metro.net/agencies/lametro/",
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { getRoutes };
