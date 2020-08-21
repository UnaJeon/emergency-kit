import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      address: ''
    };
  }

  render() {
    // const orderTotal=
    return (

      <div>
        <h1 className="m-3 p-3" >My Cart</h1>
        <p>Order Total:</p>
        <form className="p-2">
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Credit Card</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Shipping Addres</label>
            <textarea type="textarea" className="form-control" />
          </div>
        </form>
        <div className="m-3" style={{ color: 'grey' }}><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Continue Shopping</span></div>
      </div>
    );

  }
}
