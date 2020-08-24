import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkoutForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };
    this.setState({
      view: newView
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart: cart }));
  }

  addToCart(product) {
    fetch('api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: this.state.cart.concat(data) }))
      .catch(err => console.error(err.message));
  }

  placeOrder({ name, creditCard, shippingAddress }) {
    fetch('api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, creditCard, shippingAddress })
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: [], view: { name: 'catalog', params: {} } }))
      .catch(err => console.error(err.message));

  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
    this.getCartItems();
  }

  render() {
    let page = null;
    if (this.state.view.name === 'catalog') {
      page = <ProductList setView={this.setView} />;
    } else if (this.state.view.name === 'details') {
      page = <ProductDetails params={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />;
    } else if (this.state.view.name === 'cart') {
      page = <CartSummary cart = {this.state.cart} setView = {this.setView}/>;
    } else if (this.state.view.name === 'checkout') {
      page = <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart}/>;
    }
    return (
      <div>
        <Header setView={this.setView} cartItemCount={this.state.cart.length} />
        {page}
      </div>
    );
  }
}
