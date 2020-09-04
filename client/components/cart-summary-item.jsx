import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div className="container mt-3" style={{ border: '1px solid grey' }}>
        <div className="d-flex flex-nowrap justify-content-around m-3">
          <img src={this.props.image} alt="product" />
          <div className="mt-5">
            <h3>{this.props.name}</h3>
            <div>{this.props.price}</div>
            <p>{this.props.shortDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
