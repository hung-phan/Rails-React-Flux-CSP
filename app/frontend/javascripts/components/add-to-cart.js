'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

class AddToCart extends React.Component {
  handleClick(e) {
    AppActions.addItem(this.props.item);
  },
  render() {
    return <button onClick={this.handleClick}>Add To Cart</button>;
  }
};

export default AddToCart;
