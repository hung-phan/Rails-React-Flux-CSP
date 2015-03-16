'use strict'

import React from 'react/addons';
import AppCatalog from './app-catalog';
import AppCart from './app-cart';

class MainComponent extends React.Component {
  render() {
    return (
     <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <AppCatalog />
          </div>
          <div className="col-xs-12">
            <AppCart />
          </div>
        </div>
      </div>
    );
  }
}

export default MainComponent;
