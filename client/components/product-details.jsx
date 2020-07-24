import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(res => res.json())
      .then(product => this.setState({
        product: product
      }));
  }

  render() {
    if (this.state.product === null) {
      return null;
    }
  }
}
