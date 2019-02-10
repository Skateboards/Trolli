import React from "react";
import * as mapServices from "../Services/mapServices";
import MapWithADirectionsRenderer from "./MapRender";

class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: { lat: 0, lng: 0 },
      destination: "",
      renderMap: false
    };
  }
  //
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(response => {
      const origin = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      };
      this.setState({
        origin: origin
      });
    });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  encodeAddress = () => {
    let mapImageURL = encodeURIComponent(
      this.state.destination.replace(/[&\\#,+()$~%.'":*?<>{}]/g, "")
    );
    mapServices.geoLocation(
      mapImageURL,
      this.geoLocationSuccess,
      this.geoLocationFail
    );
  };

  geoLocationSuccess = response => {
    let dest = JSON.parse(response.data.item);
    console.log(dest);
    let latlong = dest.results[0].geometry.location;
    this.setState(
      {
        destination: latlong
      },
      () =>
        mapServices.getRoute(
          this.state.origin,
          latlong,
          this.getRouteSuccess,
          this.getRouteFail
        )
    );
  };

  getRouteSuccess = response => {
    let route = JSON.parse(response.data.item);
    console.log(route);
    const routeIds = [];
    debugger;
    for (let i = 0; i < route.routes[0].legs[0].steps.length; i++) {
      const step = route.routes[0].legs[0].steps[i];
      if ("travel_mode" in step && step.travel_mode === "TRANSIT") {
        if (step.transit_details.line.short_name !== undefined) {
          let routeId = step.transit_details.line.short_name;
          routeIds.push(parseInt(routeId));
        }
      }
    }
    console.log(routeIds);
    let payload = { Date: new Date(), routeId: routeIds };
    mapServices.listOfDings(payload, this.dingSuccess, this.dingError);
    this.setState({
      renderMap: true
    });
  };

  dingSuccess = res => {
    console.log(res);
  };

  dingError = err => {
    console.log(err);
  };

  getRouteFail = error => {
    console.log(error);
  };

  geoLocationFail = error => {
    console.log(error);
  };

  render() {
    return (
      <div className="container text-center p-3 mt-3">
        <form>
          <div>
            <input
              type="text"
              value={this.state.destination}
              onChange={event => this.handleChange(event)}
              name="destination"
              className="form-control"
            />
          </div>

          <div
            className="text-center p-3 mt-3"
            style={{
              backgroundColor: "rgb(23, 162, 184)",
              color: "white",
              margin: "0 20px 20px 20px",
              borderRadius: "50px"
            }}
            onClick={e => this.encodeAddress(e)}
          >
            <i className="fas fa-map-marked-alt mr-2" />
            <strong>Get My Route</strong>
          </div>
        </form>
        {this.state.renderMap && <MapWithADirectionsRenderer {...this.state} />}
      </div>
    );
  }
}
export default RouteMap;
