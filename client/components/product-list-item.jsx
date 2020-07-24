import React from 'react';

export default function ProductListItem(props) {
  const getPrice = props.price;
  const pricetoString = getPrice.toString();
  const priceArray = pricetoString.split('');
  priceArray.splice(priceArray.length - 2, 0, '.');
  const price = '$' + priceArray.join('');

  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <img src={props.image} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
        <p className="card-text">{props.shortDescription}</p>
      </div>
    </div>

  );
}
