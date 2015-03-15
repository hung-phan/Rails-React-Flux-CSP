'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

let DecreaseItem = React.createClass({
  handleClick(e) {
    AppActions.decreaseItem(this.props.index);
  },

  render() {
    return (
      <button onClick={this.handleClick}>-</button>
    );
  }
});

export default DecreaseItem;
