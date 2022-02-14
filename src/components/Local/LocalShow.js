import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit as faEditSolid } from '@fortawesome/free-solid-svg-icons';

import { LocalOwner } from './LocalOwner';
import { ProductsList } from '../Product/ProductsList';

import { getLocalProducts } from '../../api/products';

import '../../styles/LocalShow.scss';

export function LocalShow(props) {
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [isProduct, setIsProduct] = useState({
    beer: '',
    volume: '',
    price: '',
    local: '',
  });

  useEffect(() => {
    getLocalProducts().then((products) => {
      console.log('products', products);
      //setIsProduct(products);
    });
  }, []);

  function closeEditLocal(e) {
    setIsEditingLocal(false);
  }
  function openEditLocal(e) {
    setIsEditingLocal(true);
  }
  function IsEditingLocal() {
    setIsEditingLocal(false);
  }

  function handleShowProducts(e) {
    setIsProduct(true);
  }
  return (
    <div className="LocalOwner">
      {isEditingLocal ? (
        <LocalOwner
          key={props.id}
          id={props.id}
          name={props.name}
          address={props.address}
          localType={props.localType}
          onCancel={closeEditLocal}
          handleIsEditing={IsEditingLocal}
        />
      ) : (
        <div className="Profile__owner-local OwnerLocal">
          <div className="Local__type">
            <img src={`/local_icon_${props.localType}.png`} alt="" />{' '}
          </div>
          <h3 className="OwnerLocal__title">{props.name}</h3>
          <h4 className="OwnerLocal__title">{props.address}</h4>
          {props.longitude && props.latitude ? (
            <h4 className="OwnerLocal__title">
              {props.longitude},{props.latitude}{' '}
            </h4>
          ) : null}
          {props.isEnabled ? (
            <>
              <span style={{ color: 'green' }}>El local está activado</span>
              <p className="Owner__modified-local Fa__button">
                <FontAwesomeIcon icon={faEditSolid} onClick={openEditLocal} />
              </p>
            </>
          ) : (
            <>
              <span style={{ color: 'red' }}>El local no está activado</span>
              <p className="Owner__modified-local Fa__button">
                <FontAwesomeIcon icon={faEditSolid} onClick={openEditLocal} />
              </p>
            </>
          )}
          {/* <div className="ProductLocal">
            {isProduct ? (
              <>
                <button onClick={handleShowProducts}>Mostrar productos</button>
                <ProductsList
                  key={isProduct.id}
                  beer={isProduct.beer}
                  volume={isProduct.volume}
                  price={isProduct.price}
                />
              </>
            ) : (
              <h3>No tienes productos creados</h3>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
