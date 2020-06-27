import React from "react";

class MappyMap extends React.Component {
  render() {
    const { compose, withProps, lifecycle } = require("recompose");

    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      DirectionsRenderer
    } = require("react-google-maps");

    const MapWithADirectionsRenderer = compose(
      withProps({
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA2SqfKVOZHGnepyNleZCOow87eXk04HVs&v=3.exp&libraries=geometry,drawing,places&maptype=roadmap",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          const DirectionsService = new window.google.maps.DirectionsService();

          DirectionsService.route(
            {
              origin: this.props.waypoints[0]
                ? this.props.waypoints[0].location
                : "Downtown Miami",
              destination: this.props.waypoints[0]
                ? this.props.waypoints[this.props.waypoints.length - 1].location
                : "Miami Airport",
              waypoints: this.props.waypoints[0] ? this.props.waypoints : null,
              travelMode: window.google.maps.TravelMode.DRIVING
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            }
          );
        }
      })
    )(props => (
      <GoogleMap
        defaultZoom={7}
        defaultCenter={new window.google.maps.LatLng(25.761681, -80.191788)}
      >
        {props.directions && (
          <DirectionsRenderer directions={props.directions} />
        )}
      </GoogleMap>
    ));

    return <MapWithADirectionsRenderer waypoints={this.props.renderSkips} />;
  }
}

export default MappyMap;
