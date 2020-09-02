import React from 'react';

export default function ProductListItem(props) {
  const getPrice = props.price;
  const pricetoString = getPrice.toString();
  const priceArray = pricetoString.split('');
  priceArray.splice(priceArray.length - 2, 0, '.');
  const price = '$' + priceArray.join('');
  const product = props.product;
  return (
    <div className="card m-3" style={{ width: '18rem', cursor: 'pointer' }} >
      <img src={props.image} className="card-img-top" onClick={() => props.setView('details', { productId: props.productId })}/>
      <div className="card-body d-flex flex-column" >
        <h5 className="card-title" onClick={() => props.setView('details', { productId: props.productId })}>{props.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted" onClick={() => props.setView('details', { productId: props.productId })}>{price}</h6>
        <p className="card-text" onClick={() => props.setView('details', { productId: props.productId })}>{props.shortDescription}</p>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-danger col-10 p-2" onClick={() => props.addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </div>

  );
}
