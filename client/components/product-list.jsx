import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products =>
        this.setState({
          products: products
        }))
      .catch(err =>
        console.error(err.message));
  }

  render() {
    const listOfProducts = this.state.products.map(product =>
      <ProductListItem
        setView={this.props.setView}
        key={product.productId}
        productId={product.productId}
        image={product.image}
        name={product.name}
        price={product.price}
        shortDescription={product.shortDescription}
        product={product}
        addToCart={this.props.addToCart}/>);
    return (
      <div className= "d-flex flex-wrap justify-content-center mt-4">{listOfProducts}</div>
    );
  }
}
