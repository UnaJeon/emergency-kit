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
      cart: [],
      show: true
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

  showModal() {
    this.setState({ show: true });
  }

  renderModal() {
    return (
      <div className="modal" tabIndex="-1" role="dialog">
        <div className = "modal-dialog" role="document">
          <div className ="modal-content">
            <div className="modal-header">
              <h5 className ="modal-title">Be Ready for the Emergency</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"></button>
              <span aria-hidden="true">&times;</span>
            </div>
            <div className="modal-body">
              <p>Please note that this website is a content management application created for the purpose of demonstration. Check the box below
                to acknowledge that the merchandise shown here is not available for purchase, that you will not provide genuine financial or personal information,
                and that you are aware no purchase will truly be processed.</p>
              <input type="checkbot">I acknowledge that this is strictly a demo application</input>
            </div>
            <div className="modal-footer">
              <button type="button" className ="btn btn-danger">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.show) {
      return null;
    } else {
      let page = null;
      if (this.state.view.name === 'catalog') {
        page = <ProductList setView={this.setView} />;
      } else if (this.state.view.name === 'details') {
        page = <ProductDetails params={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />;
      } else if (this.state.view.name === 'cart') {
        page = <CartSummary cart={this.state.cart} setView={this.setView} />;
      } else if (this.state.view.name === 'checkout') {
        page = <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart} />;
      }
      return (
        <div>
          <Header setView={this.setView} cartItemCount={this.state.cart.length} />
          {page}
        </div>
      );
    }

  }
}
