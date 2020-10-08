import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="p-2 bg-danger text-white d-flex justify-content-between">
        <p onClick={() => this.props.setView('catalog', {})} style={{ cursor: 'pointer' }}><i className="fas fa-first-aid mt-3 mr-1 ml-5"></i>Emergency Kit</p>
        <p className="mr-5 mt-3" onClick={() => this.props.setView('cart', {})} style={{ cursor: 'pointer' }}>{this.props.cartItemCount}<span className="ml-2 " >Items</span><i className="fa fa-shopping-cart ml-2" aria-hidden="true"></i></p>
      </header>
    );

  }
}
