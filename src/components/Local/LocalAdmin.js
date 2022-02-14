import React, { useState } from 'react';

import { activateLocal, deactivateLocal } from '../../api/locals';

import '../../styles/LocalAdmin.scss';

export function LocalAdmin(props) {
  const [isActive, setIsActive] = useState(props.isEnabled);

  function handleActivateLocal(localId) {
    activateLocal(localId)
      .then(() => {
        setIsActive(true);
    })
      .catch(err => {
        console.log(err.message);
      });
  }

  function handleDeactivateLocal(localId) {
    deactivateLocal(localId)
      .then(() => {
          setIsActive(false);
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  return (
    <div className="LocalAdmin">
      <h3 className="LocalAdmin__title">{props.name}</h3>
      <p>{props.address}</p>
      {isActive ? (
        <div className="LocalAdmin__Active">
          <span>Local activado</span>
          <button
            className="Dark__button"
            onClick={() => {
              handleDeactivateLocal(props.id);
            }}
          >
            Desactivar local
          </button>
        </div>
      ) : (
        <div className="LocalAdmin__notActive">
          <span>Local desactivado</span>
          <button
            className="Dark__button"
            onClick={() => {
              handleActivateLocal(props.id);
            }}
          >
            Activar local
          </button>
        </div>
      )}
    </div>
  );
}
