'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

class RemoveFromCart extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    AppActions.removeItem(this.props.index);
  }

  render() {
    return (
      <button onClick={this.handleClick}>x</button>
    );
  }

};

export default RemoveFromCart;
