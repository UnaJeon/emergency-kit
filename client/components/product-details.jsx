import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    const productId = this.props.params.productId;
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(product => this.setState({
        product: product
      }));
  }

  render() {
    if (this.state.product) {
      const price = convertNumber(this.state.product.price);
      const product = this.state.product;
      return (
        <div className="container mt-5">
          <div className="ml-3 pt-3" style={{ color: 'grey' }}><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Back to catalog</span></div>
          <div className="row justify-content-md-center m-2">
            <div className="row d-flex justify-content-center pt-2 mt-3">
              <img src={product.image} alt="product" />
              <div className="ml-4">
                <h3>{product.name}</h3>
                <div>{`$${price}`}</div>
                <p>{product.shortDescription}</p>
                <button type="button" className="btn btn-danger" onClick ={() => this.props.addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="row p-5 ">
            <p>{product.longDescription}</p>
          </div>
        </div>
      );
    } else {
      return (
        this.setState.product = null
      );

    }
    function convertNumber(number) {
      const convertPrice = number.toString();
      const splitPrice = convertPrice.split('');
      splitPrice.splice(convertPrice.length - 2, 0, '.').join('');
      return splitPrice.join('');
    }
  }
}
