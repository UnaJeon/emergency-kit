import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  render() {
    let total = 0;
    if (this.props.state.cart.length === 0) {
      return 'There are no items in the cart';
    } else {
      const cart = this.state.cart;
      const cartPrice = cart.map(item => cart.price);
      for (let i = 0; i < cartPrice.length; i++) {
        total += cartPrice[i];
        return total;
      }
    }

    const listOfCartItems = this.props.state.cart.map(item =>
      <CartSummaryItem
        setView={this.props.setView}
        key={item.cartItemId}
        image={item.image}
        name={item.name}
        price={item.price}
        shortDescription={item.shortDescription}
      />);
    return (

      <div>
        <h3>My Cart</h3>
        <div>{listOfCartItems}</div>
        <p>Item Total{`$${total}`}</p>
      </div>
    );
  }

}
