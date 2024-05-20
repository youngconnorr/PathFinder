// import { useState, useEffect } from "react";
// import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
// // import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
// const center = { lat: 48.8584, lng: 2.2945 };

// const MapsTool = (props) => {
//   /* eslint-disable react/prop-types */
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//   });

//   //   useEffect(() => {
//   //     navigator.geolocation.getCurrentPosition
//   //   }, [])
//   const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
//   // const [places, setPlaces] = useState([]);

//   // useEffect(() => {
//   //   addPlaces();
//   // }, []);

//   // function addPlaces() {
//   //   const newPlace = {
//   //     id: places.length,
//   //     lat: props.prop.geometry.location.lat(),
//   //     lng: props.prop.geometry.location.lng(),
//   //   };
//   //   setPlaces([...places, newPlace]);
//   // }

//   if (!isLoaded) {
//     return <p>loading...</p>;
//   }

//   return (
//     <div>
//       <button type="button" onClick={() => map.panTo(center)}>
//         Center Map
//       </button>
//       <GoogleMap
//         center={center}
//         zoom={15}
//         mapContainerStyle={{
//           width: "50vw",
//           height: "100vh",
//           float: "right",
//         }}
//         options={{
//           streetViewControl: false,
//           mapTypeControl: false,
//           fullscreenControl: false,
//         }}
//         onLoad={(map) => setMap(map)}
//       >
//         {props.prop.map((place) => (
//           <Marker
//             key={place.id}
//             position={{ lat: place.lat, lng: place.lng }}
//           />
//         ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default MapsTool;
