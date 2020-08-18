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

      return (

        cartList =

        <div className="CartBackground" style={{ backgroundColor: 'white' }}>
          <div className= "ml-2 mt-3" style={{ backgroundColor: 'white', color: 'grey' }}><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Back to catalog</span></div>
          <h1 className="mt-5 ml-3 pl-2" >My Cart</h1>
          <p className="ml-5">Your cart is empty</p>
          <h5 className="mt-3 ml-5">Item Total{'$0.00'}</h5>
        </div>
      );

    }
    return (

      <div>
        <div className="m-3" style={{ color: 'grey' }}><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Back to catalog</span></div>
        <h1 className = "m-3 p-3" >My Cart</h1>
        <div className="d-flex flex-column m-auto">{cartList}</div>
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
