'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

let IncreaseItem = React.createClass({
  handleClick(e) {
    AppActions.increaseItem(this.props.index);
  },

  render() {
    return (
      <button onClick={this.handleClick}>+</button>
    );
  }
});

export default IncreaseItem;
