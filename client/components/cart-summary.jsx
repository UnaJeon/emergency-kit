import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let itemTotal = 0;
    let cartList = null;
    if (this.props.cart.length > 0) {
      const cart = this.props.cart;
      cartList = cart.map(item => {
        itemTotal += item.price;
        return (
          <CartSummaryItem
            setView={this.props.setView}
            key={item.cartItemId}
            image={item.image}
            name={item.name}
            price={`$${convertNumber(item.price)}`}
            shortDescription={item.shortDescription}
          />);
      });
    } else if (this.props.cart.length === 0) {
      cartList = <p>Your cart is empty</p>;
    }
    return (
      <div className="d-flex flex-column m-auto" style={{ backgroundColor: 'white' }}>
        <h1 className = "mt-5 ml-5" >My Cart</h1>
        <div>{cartList}</div>
        <h5 className="mt-3 ml-5">Item Total{`$${convertNumber(itemTotal)}`}</h5>
      </div>
    );
    function convertNumber(number) {
      const convertPrice = number.toString();
      const splitPrice = convertPrice.split('');
      splitPrice.splice(convertPrice.length - 2, 0, '.').join('');
      return splitPrice.join('');
    }
  }
}
