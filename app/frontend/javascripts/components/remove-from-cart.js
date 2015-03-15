'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

let RemoveFromCart = React.createClass({
  removeFromCart(e) {
    AppActions.removeItem(this.props.index);
  },

  render() {
    return (
      <button onClick={this.handleClick}>-</button>
    );
  }

});

export default RemoveFromCart;
