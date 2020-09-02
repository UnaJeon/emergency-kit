import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
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
          <div className="form-row">
            <div className="col">
              <label>First Name</label>
              <input name ="lastName" type="text" className="form-control" onChange={this.handleChange}/>
            </div>
            <div className="col">
              <label>Last Name</label>
              <input name="firstName" type="text" className="form-control" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="shippingAddress" className="form-control" onChange={this.handleChange} />
          </div>
          <div className="form-row">
            <div className="col">
              <label>City</label>
              <input type="text" name="city" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="col">
              <label>State</label>
              <select name="state" className="form-control" onChange={this.handleChange}>
                <option value=''>Select a state</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="IllinoisIndiana">IllinoisIndiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="MontanaNebraska">MontanaNebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="PennsylvaniaRhode Island">PennsylvaniaRhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
            </div>
            <div className="col">
              <label>Zip Code</label>
              <input type="c" name="zipCode" className="form-control" onChange={this.handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Credit Card</label>
            <input type="text" name="creditCard" className="form-control" onChange={this.handleChange}/>
          </div>
          <div className="m-3 d-flex justify-content-between" style={{ color: 'grey' }}><div><i className="fa fa-angle-left" aria-hidden="true"></i><span onClick={() => this.props.setView('catalog', {})} className="goback ml-2">Continue Shopping</span></div><button type="submit" className="btn btn-danger ">Place Order</button></div>
        </form>
      </div>
    );
  }

}
