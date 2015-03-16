'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

class DecreaseItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    AppActions.decreaseItem(this.props.index);
  }

  render() {
    return (
      <button onClick={this.handleClick}>-</button>
    );
  }
};

export default DecreaseItem;
