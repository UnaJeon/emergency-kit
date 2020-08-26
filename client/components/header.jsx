import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="p-3 mb-2 bg-danger text-white d-flex justify-content-between">
        <p><i className="fas fa-first-aid mr-1 ml-5"></i>Emergency Kit</p>
        <p className="mr-5">{this.props.cartItemCount}<span className="ml-2">Items</span><i className="fa fa-shopping-cart ml-2" aria-hidden="true" style={{ cursor: 'pointer' }} onClick={() => this.props.setView('cart', {})}></i></p>
      </header>
    );

  }
}
