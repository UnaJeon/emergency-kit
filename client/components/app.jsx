import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    const newView = {
      name: name,
      params: params
    };
    this.setState({
      view: newView
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    if (this.state.view.name === 'catalog') {
      return (
        <div>
          <Header />
          <ProductList setView={this.setView} />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <ProductDetails params={this.state.view.params} setView={this.setView}/>
        </div>
      );
    }
  }
}
