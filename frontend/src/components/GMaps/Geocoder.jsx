// import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
// import { useState, useEffect } from "react";
// // import MapsTool from "./MapsTool";

// /* eslint-disable react/prop-types */

// export default function Geocoder(locations) {
//   const locationList = locations.location;
//   const [geocodedLocations, setGeocodedLocations] = useState();
//   const parsedList = JSON.stringify(locationList);
//   const addToGeocodedLocations = (newItem) => {
//     if (!geocodedLocations.includes(newItem)) {
//       setGeocodedLocations((prevList) => [...prevList, newItem]);
//     }
//   };

//   return (
//     <div>
//       I am ran so much!
//       {parsedList}
//       {/* <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//         {locationList.map((category, index) =>
//           category.map((categoryPart, innerIndex) => (
//             <Geocoding
//               key={`${index}-${innerIndex}`}
//               thing={categoryPart.thing}
//               city={categoryPart.city}
//               addGeoItem={addToGeocodedLocations}
//             />
//           ))
//         )}
//       </APIProvider> */}
//       {console.log("List of geolocations:" + JSON.stringify(geocodedLocations))}
//     </div>
//   );
// }

// // const Geocoding = (prop) => {
// //   const fullAddress = prop.thing + ", " + prop.city;
// //   const geocodingApiLoaded = useMapsLibrary("geocoding");
// //   const [geocodingService, setGeocodingService] = useState();
// //   const [address, setAddress] = useState("");

// //   useEffect(() => {
// //     if (!geocodingApiLoaded) return;
// //     setGeocodingService(new window.google.maps.Geocoder());
// //     setAddress(fullAddress);
// //   }, [geocodingApiLoaded, fullAddress]);

// //   useEffect(() => {
// //     if (!geocodingService) return;
// //     geocodingService.geocode({ address }, (results, status) => {
// //       if (results && status === "OK") {
// //         const lat = results[0].geometry.location.lat();
// //         const lng = results[0].geometry.location.lng();
// //         prop.addGeoItem({ lat, lng });
// //       }
// //     });
// //   }, [geocodingService, address, addGeoItem]);

// //   if (!geocodingService) return <div>loading...</div>;

// //   return null;
// // };
