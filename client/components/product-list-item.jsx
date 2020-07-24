import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card product">
      <img src={props.image} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.price}</h6>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>
  );
}
