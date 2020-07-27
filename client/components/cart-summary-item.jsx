import React from 'react';

export default function CartSummaryItem(props) {
  return (
    <div className="container mt-5">
      <div className="row justify-content-md-center m-2">
        <div className="row d-flex justify-content-center pt-2 mt-3">
          <img src={props.image} alt="product" />
          <div className="ml-4">
            <h3>{props.name}</h3>
            <div>{props.price}</div>
            <p>{props.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
