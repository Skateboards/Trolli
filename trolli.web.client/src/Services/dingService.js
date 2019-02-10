import axios from "axios";
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
const create = payload => {
  const config = {
    data: payload,
    method: "POST",
    url: "http://localhost:3024/api/trolli",
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { getRoutes, create };
