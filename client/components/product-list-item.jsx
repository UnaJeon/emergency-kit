import React from 'react';

export default function ProductListItem(props) {
  const getPrice = props.price;
  const pricetoString = getPrice.toString();
  const priceArray = pricetoString.split('');
  priceArray.splice(priceArray.length - 2, 0, '.');
  const price = '$' + priceArray.join('');
  const product = props.productId;
  return (
    <div className="card m-3" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => props.setView('details', { productId: props.productId })}>
      <img src={props.image} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{price}</h6>
        <p className="card-text">{props.shortDescription}</p>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-danger col-12" onClick={() => props.addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>

  );
}
