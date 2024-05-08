import { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

const MapsTool = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));

  if (!isLoaded) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <button type="button" onClick={() => map.panTo(center)}>
        Center Map
      </button>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "80vw",
          height: "80vh",
        }} //add float: 'right'
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default MapsTool;
