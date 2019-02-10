import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import * as mapServices from "../Services/mapServices";

class RouteMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: ""
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(response => {
      const location = {
        lat: response.coords.latitude,
        lng: response.coords.longitude
      };
      this.setState({
        origin: location
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
    console.log(response);
  };

  geoLocationFail = error => {
    console.log(error);
  };

  onGetRouteSuccess = response => {
    console.log(response);
  };

  onGetRouteFail = error => {
    console.log(error);
  };

  render() {
    return (
      <form>
        <div>
          <label>Destination:</label>
          <input
            type="text"
            value={this.state.destination}
            onChange={event => this.handleChange(event)}
            name="destination"
            className="form-control"
          />
        </div>
        <p>
          <button
            className={"btn btn-success btn-block"}
            type="button"
            onClick={e => this.encodeAddress(e)}
          >
            Get my Route
          </button>
        </p>
      </form>
    );
  }
}
export default RouteMap;
