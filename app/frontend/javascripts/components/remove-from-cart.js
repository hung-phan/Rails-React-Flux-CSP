'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

class RemoveFromCart from React.Component {
  removeFromCart(e) {
    AppActions.removeItem(this.props.index);
  },

  render() {
    return (
      <button onClick={this.handleClick}>-</button>
    );
  }

}

export default RemoveFromCart;
