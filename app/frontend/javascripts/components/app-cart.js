'use strict';

import _ from 'lodash';
import React from 'react';

import { Mixin } from './../stores/app-store';
import RemoveFromCart from './remove-from-cart';
import IncreaseItem from './increase-item';
import DecreaseItem from './decrease-item';

class AppCart extends React.Component {
  mixins: [Mixin],
  render() {
    let total = 0,
        item  = _.map(this.state.cartItems, (cartItem, index) => {
          let subtotal = cartItem.cost * cartItem.qty;

          total += subtotal;
          return (
            <tr key={cartItem.id}>
              <td>
                <RemoveFromCart index={index} />
              </td>
              <td>{cartItem.name}</td>
              <td>{cartItem.qty}</td>
              <td>
                <DecreaseItem index={index} />
                <IncreaseItem index={index} />
              </td>
              <td>{subtotal}</td>
            </tr>
          );
        });

    return (
     <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
        <tfoot>
          <tr>
            <td rowSpan="5">Total: {total}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default AppCart;
