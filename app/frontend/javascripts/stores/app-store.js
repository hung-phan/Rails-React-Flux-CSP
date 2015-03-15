'use strict';

import _ from 'lodash';
import csp from 'js-csp';
import Constants from './../constants/app-constants';
import StoreDetails from './../constants/store-details';
import { publication } from './../dispatcher/dispatcher';

// store data
const _catalog = [
        { id: 1, name: 'Widget #1', cost: 1 },
        { id: 2, name: 'Widget #2', cost: 2 },
        { id: 3, name: 'Widget #3', cost: 3 }
      ];

let _cartItem = [];

// store handler
let _addItem = item => {
      if (item.inCart) {
        _cartItem.push(
          _.merge(item, { qty: 1, inCart: 1 })
        );
      } else {
        let index;

        if ((index = _.findIndex(_cartItem, cartItem => cartItem.id === item.id)) !== -1) {
          _increaseItem(index);
        }
      }
    };

let _removeItem = index => {
      _cartItem[index].inCart = false;
      _cartItem.splice(index, 1);
    };

let _increaseItem = index => _cartItem[index].qty++;

let _decreaseItem = index => {
      if (_cartItem[index].qty > 1) {
        _cartItem[index].qty--;
      } else {
        _removeItem(inde);
      }
    };

// pubsub channel
let storeChan = csp.chan();
csp.operations.pub.sub(publication, StoreDetails.AppStore, storeChan);
csp.go(function*() {
  let payload;

  while ((payload = yield storeChan)!== csp.CLOSED) {
    switch (payload.actionType) {
      case Constants.ADD_ITEM:
        _addItem(payload.item);
        break;
      case Constants.REMOVE_ITEM:
        _removeItem(payload.index);
        break;
      case Constants.INCREASE_ITEM:
        _increaseItem(payload.index);
        break;
      case Constants.DECREASE_ITEM:
        _decreaseItem(payload.index);
        break;
    }
  }
});

let Mixin = {
  getInitialState() {
    return { appStoreChan: csp.chan(), cartItem: _cartItem };
  },
  componentWillMount() {
    let appStoreChan     = this.state.appStoreChan,
        appStoreOnChange = this.appStoreOnChange;

    csp.go(function*() {
      while (yield appStoreChan !== csp.CLOSED) {
        appStoreOnChange();
      }
    });
  },
  componentWillUnmount() {
    this.state.appStoreChan.close();
  },
  appStoreOnChange() {
    this.setState({ cartItem: _cartItem });
  }
};

export default {
  storeChan
};
