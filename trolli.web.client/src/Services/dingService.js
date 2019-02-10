import * as global from "./serviceHelpers";
import axios from "axios";
import qs from "qs";

const getPageNearby = qStr => {
  const config = {
    method: "GET",
    url: "/api/dings/nearby?" + qs.stringify(qStr),
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const getMine = () => {
  const config = {
    method: "GET",
    url: "/api/mydings",
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

const create = payload => {
  const config = {
    method: "POST",
    url: "/api/dings",
    data: payload,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config)
    .then(global.onGlobalSuccess)
    .catch(global.onGlobalError);
};

export { getPageNearby, getMine, create };
