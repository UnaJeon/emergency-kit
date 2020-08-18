import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div className="container mt-5" style={{ border: '1px solid grey' }}>
        <div className="row justify-content-md-center m-2">
          <div className="row d-flex justify-content-center pt-2 mt-3">
            <img src={this.props.image} alt="product" />
            <div className="ml-4">
              <h3>{this.props.name}</h3>
              <div>{this.props.price}</div>
              <p>{this.props.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
