import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF, StandaloneSearchBox } from '../../../node_modules/@react-google-maps/api';
import {  Button, Collapse, List, ListItem } from '../../../node_modules/@material-ui/core';
// import { GoogleMap, LoadScript, MarkerF, InfoWindowF, StandaloneSearchBox } from '@react-google-maps/api';
//import {  Button, Collapse, List, ListItem } from '@material-ui/core';
import dot from './dot.png';
import NavBar from "../Nav/Nav.jsx";
import styled from 'styled-components';
import { FaPhoneAlt } from "react-icons/fa";

const containerStyle = {
  width: '90vw',
  height: '50vh',
  margin: '0'
};

const ContainerMap = styled.div`
  margin: auto 0;
  padding: 0;
  overflow-y: visible;
  overflow: visible;
  overflow-x: hidden;
`;

const TxtMap = styled.div`
  width: 80vw;
  height: auto;
  padding-top: 1vh;
  margin-bottom: 2vh;
`;

const Txt1 = styled.div`
  font-size: 1.56rem;
  margin-left: 6vw;
  margin-top: 4vh;
  text-align: left;
  font-weight: bold;
  padding-bottom: 1vh;
`;

const Txt2 = styled.div`
  font-size: 0.8rem;
  margin-left: 6vw;
  text-align: left;
  padding-bottom: 60px;
`;

const Txt3Map = styled.div`
  margin-bottom: 1vh;
  font-size: 1.25rem;
  color: #BFBABA;
  margin-left: 6vw;
  text-align: left;
`;

const GMap = styled.div`
  width: 90vw;
  height: 50vh;
  margin: 0 auto;
  display: flex;
`;

const UlMap = styled.ul`
  display: contents;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-bottom: 2vh;
`;

const LiMap = styled.li`
  list-style-type: none;
  padding-top: 1vh;
  padding-bottom: 1vh;
  width: 90vw;
  height: auto;
  margin: 0 auto;
  justify-content: center;
  border-bottom: 0.5px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const LiWrap = styled.div`
  width: 60vw;
`;

const PlaceName = styled.div`
  font-size: 1.2rem;
  margin: 1vh 0;
`;

const PlaceRating = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5vh;
`;

const PlaceAddress = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.5vh;
  width: 60vw;
`;

const PlacePhone = styled.button`
  float: right;
  border: none;
  background-color: white;
`;

const AMap = styled.a`
  color: #ED8C37;
`;


const libraries = ["places"];

const MyComponent = () => {
  const [initialLocation, setInitialLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openHours, setOpenHours] = useState({});

  const toggleOpeningHours = (placeId) => {
    setOpenHours(prevState => ({
      ...prevState,
      [placeId]: !prevState[placeId]
    }));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setInitialLocation({ lat: latitude, lng: longitude });
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }, []);

  const onLoad = ref => setSearchBox(ref);
  const onPlacesChanged = () => {
  const location = searchBox.getPlaces()[0].geometry.location;
  setUserLocation(location.toJSON());

  const service = new window.google.maps.places.PlacesService(map);
  service.textSearch(
    {
      location: location,
      radius: 5000,
      query: searchTerm
    },
    (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const promises = results.map((result, i) => {
          return new Promise((resolve, reject) => {
            const { place_id } = result;
            service.getDetails({ placeId: place_id }, (place, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                results[i] = {
                  ...results[i],
                  phone: place.formatted_phone_number,
                  opening_hours: place.opening_hours ? place.opening_hours.weekday_text : [],
                };
                resolve(results[i]);
              } else {
                reject(status);
              }
            });
          });
        });

        Promise.all(promises)
          .then((places) => {
            setPlaces(places);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  );
}






  return (
    <ContainerMap>
      <NavBar />
      <TxtMap>
        <Txt1>Space to tap into my emotions</Txt1>
        {/* <Txt2>도움을 청해봐요</Txt2> */}
        {/* 문구 수정 */}
        <Txt3Map># Find Expert
</Txt3Map>
      </TxtMap>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GMap>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation ? userLocation : { lat: 37.566535, lng: 126.9779692 }}
            zoom={15}
            onLoad={ref => setMap(ref)}
            >
            {initialLocation && (
                <MarkerF
                position={initialLocation}
                icon={{ 
                    url: dot,
                    scaledSize: new window.google.maps.Size(37, 37)
                }}
                />
            )}
            {places.slice(0, 5).map((place, i) => (
                <MarkerF
                key={i}
                position={place.geometry.location}
                onClick={() => {
                    setSelectedPlace(place);
                }}
                />
            ))}
          {selectedPlace && (
            <InfoWindowF
              position={{ lat: selectedPlace.geometry.location.lat(), lng: selectedPlace.geometry.location.lng() }}
              onCloseClick={() => {
                setSelectedPlace(null);
              }}
            >
              <div>
                <h2>{selectedPlace.name}</h2>
                <p>{selectedPlace.formatted_address}</p>
              </div>
            </InfoWindowF>
          )}
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Suggested keyword: psychiatry, counseling"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `280px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-140px"
              }}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </StandaloneSearchBox>
        </GoogleMap>
        </GMap>
        <UlMap>
          {places.slice(0, 5).map((place, i) => (
            <LiMap key={i}>
              <LiWrap>
                <PlaceName>{place.name}</PlaceName>
                <PlaceRating>Rating: {place.rating}/5</PlaceRating>
                <PlaceAddress>{place.formatted_address}</PlaceAddress>
                <Button style={{ color: '#ED8C37' }} variant="text" onClick={() => toggleOpeningHours(place.place_id)}>
                Opening hours: {openHours[place.place_id] ? 'Hide' : 'Show'}
          </Button>
          <Collapse in={openHours[place.place_id]}>
            <List>
              {place.opening_hours.length > 0 ? place.opening_hours.map((hour, index) => (
                <ListItem key={index}>
                  {hour}
                </ListItem>
              )) : (
                <ListItem>
                  No information
                </ListItem>
              )}
            </List>
          </Collapse>
              </LiWrap>
              {place.phone && (
                <PlacePhone>
                  <AMap href={`tel:${place.phone}`}>
                  <FaPhoneAlt size={30} color='#ED8C37'/>
                  <br />
                  <br />
                  
call
                  </AMap>
                </PlacePhone>
      )}
            </LiMap>
          ))}
        </UlMap>

      </LoadScript>
    </ContainerMap>
  );
};

export default React.memo(MyComponent);