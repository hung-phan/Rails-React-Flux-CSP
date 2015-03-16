'use strict';

import React from 'react';
import AppActions from './../actions/app-actions';

class IncreaseItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    AppActions.increaseItem(this.props.index);
  }

  render() {
    return (
      <button onClick={this.handleClick}>+</button>
    );
  }
};

export default IncreaseItem;
