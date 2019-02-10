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
        destination: latlong,
        renderMap: true
      },
      console.log(this.state)
    );
  };

  geoLocationFail = error => {
    console.log(error);
  };

  render() {
    return (
      <div>
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
        {this.state.renderMap && <MapWithADirectionsRenderer {...this.state} />}
      </div>
    );
  }
}
export default RouteMap;
