import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  getTotal() {
    const cart = this.props.cart;
    if (cart.length > 0) {
      const sum = this.props.cart.reduce((sum, record) => sum + record.price, 0);
      const convertPrice = sum.toString();
      const splitPrice = convertPrice.split('');
      splitPrice.splice(convertPrice.length - 2, 0, '.').join('');
      return splitPrice.join('');
    }
  }

  render() {
    return (

      <div className="m-3 p-3">
        <h1 >My Cart</h1>
        <p className="mt-4">Order Total: ${this.getTotal()}</p>
        <form className="p-2" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input name ="name" type="text" className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Credit Card</label>
            <input type="text" name="creditCard" className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Shipping Addres</label>
            <textarea type="textarea" name="shippingAddress" className="form-control" onChange={this.handleChange} />
          </div>
          <div className="m-3 d-flex justify-content-between" style={{ color: 'grey' }}><div><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Continue Shopping</span></div><button type="submit" className="btn btn-primary ">Place Order</button></div>
        </form>
      </div>
    );
  }

}
