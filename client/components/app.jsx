import React from 'react';
import Header from './header';
import ProductList from './product-list';

export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row header">
          <Header />
        </div>
        <div className ="row">
          <div className="col">
            <ProductList />
          </div>

        </div>
      </div>

    );

  }
}
