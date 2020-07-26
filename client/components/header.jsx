import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="p-3 mb-2 bg-dark text-white d-flex justify-content-between">
        <p><i className = "fas fa-dollar-sign mr-1 ml-5"></i>Wicked Sales</p>
        <p className="mr-5">{this.props.cartItemCount}<span className ="ml-2">Items</span><i className="fa fa-shopping-cart ml-2" aria-hidden="true"></i></p>
      </header>
    );

  }
}
