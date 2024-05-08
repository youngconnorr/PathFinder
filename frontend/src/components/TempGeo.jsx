import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";

export default function Page() {
  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Geocoding city={"Ten Foot Henry"} />
    </APIProvider>
  );
}

function Geocoding(city) {
  const geocodingApiLoaded = useMapsLibrary("geocoding");
  const [geocodingService, setGeocodingService] = useState();
  const [geocodingResult, setGeocodingResult] = useState();
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(city.city);
    if (!geocodingApiLoaded) return;
    setGeocodingService(new window.google.maps.Geocoder());
  }, [geocodingApiLoaded]);

  useEffect(() => {
    if (!geocodingService || !address) return;
    geocodingService.geocode({ address }, (results, status) => {
      if (results && status === "OK") {
        setGeocodingResult(results[0]);
      }
    });
  }, [geocodingService, address]);

  if (!geocodingService) return <div>loading...</div>;
  if (geocodingResult === undefined) return <div>Geocoding...</div>;

  return (
    <div>
      <h1>{geocodingResult.formatted_address}</h1>
      <p>Latitude{geocodingResult.geometry.location.lat()}</p>
      <p>Longitude{geocodingResult.geometry.location.lng()}</p>
    </div>
    //pass this info to props of google maps component!
  );
}
