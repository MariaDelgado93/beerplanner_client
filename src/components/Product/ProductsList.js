import React from 'react';

export function ProductsList(props) {
  return (
    <div className="ProductList">
      <img src="/beer.png" alt="" className="Beer__image" />
      <h3 className="ProductList__title">{props.beer}</h3>
      <h3>{props.volume}</h3>
      <h3>{props.price}</h3>
    </div>
  );
}
