import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card product">
        <img src="/images/shake-weight.jpg" className= "card-img-top"/>
        <div className="card-body">
          <h5 className="card-title">Shake Weight</h5>
          <h6 className="card-subtitle mb-2 text-muted">$29.99</h6>
          <p className="card-text">Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.</p>
        </div>
      </div>
    );
  }
}
