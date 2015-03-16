'use strict';

import _ from 'lodash';
import React from 'react/addons';
import { getCatalogs } from './../stores/app-store';
import AddToCart from './add-to-cart';

class AppCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { catalogs: getCatalogs() };
  }

  render() {
    let catalogs = _.map(this.state.catalogs, catalogItem => {
      return (
        <tr key={catalogItem.id}>
          <td>{catalogItem.name}</td>
          <td>$ {catalogItem.cost}</td>
          <td><AddToCart item={catalogItem} /></td>
        </tr>
      );
    });

    return (
     <table className="table table-stripped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Cost</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {catalogs}
        </tbody>
      </table>
    );
  }
};

export default AppCatalog;
