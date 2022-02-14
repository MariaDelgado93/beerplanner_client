import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import { selectUserPosition, selectLocals } from '../features/mapSlice';

import { LocalMap } from './Local/LocalMap';

import '../styles/Map.scss';

export function MapComponent() {
  const userPosition = useSelector(selectUserPosition);
  const locals = useSelector(selectLocals);

  const [modalContent, setModalContent] = useState(null);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: '998',
    },
    content: {
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: '0px',
      border: 'none',
      padding: '0px',
      background: 'transparent',
      borderRadius: '0',
    },
  };
  // @TODO: comprobar si las coordenadas del marker y el usuario coinciden para cambiar la imagen del icon
  // useEffect(() => {
  //   function checkCoords(userPosition, marker) {
  //     // if (
  //     //   userPosition.lat &&
  //     //   marker.findOne((mark) => mark.lat === userPosition.lat) &&
  //     //   userPosition.lng &&
  //     //   marker.findOne((mark) => mark.lng === userPosition.lng)
  //     // ) {
  //     //   console.log('great');
  //     // }
  //   }
  // }, []);

  function openModal(lat, lng, name, address, id, localType) {
    setModalContent({
      lat,
      lng,
      name,
      address,
      id,
      localType,
    });
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log('After open modal');
  }

  function closeModal() {
    setModalContent(null);
  }

  const markers = locals.map((local) => {
    const coords = local.location.coordinates;
    return {
      lat: coords[0],
      lng: coords[1],
      name: local.name,
      address: local.address,
      id: local._id,
      localType: local.localType,
    };
  });

  return (
    <div>
      {' '}
      {userPosition.lng && userPosition.lat ? (
        <GoogleMap defaultZoom={15} defaultCenter={userPosition}>
          {' '}
          {[userPosition, ...(markers || [])].map(
            ({ name, lat, lng, address, id, localType }) => (
              <Marker
                key={JSON.stringify({ lat: lat, lng: lng })}
                position={{ lat: lat, lng: lng }}
                onClick={() =>
                  openModal(lat, lng, name, address, id, localType)
                }                
                icon={{ url: require('../assets/marker.png') }}
              />
            )
          )}{' '}
        </GoogleMap>
      ) : null}{' '}
      <Modal
        isOpen={Boolean(modalContent)}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Local Modal"
      >
        {modalContent ? (
          <LocalMap
            id={modalContent.id}
            name={modalContent.name}
            address={modalContent.address}
            localType={modalContent.localType}
          />
        ) : null}{' '}
      </Modal>{' '}
    </div>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

// Este es el que usamos en otros componentes. Pasará los props que recibe hacia abajo
export const Map = (props) => {
  return (
    <WrappedMap
      {...props}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBP0_sxcPFrhfUrTv1xMZAlzJauNFV0O08&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};
