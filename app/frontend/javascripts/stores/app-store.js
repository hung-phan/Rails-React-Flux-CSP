'use strict';

import _ from 'lodash';
import csp from 'js-csp';
import Constants from './../constants/app-constants';
import StoreDetails from './../constants/store-details';
import { publication } from './../dispatcher/dispatcher';

// store data
const APP_STORE_CHANGE_EVENT = 'APP_STORE_CHANGE_EVENT';
const _catalogs = [
        { id: 1, name: 'Widget #1', cost: 1 },
        { id: 2, name: 'Widget #2', cost: 2 },
        { id: 3, name: 'Widget #3', cost: 3 }
      ];

let _cartItems = [];

// store handler
let _handlers = {
  addItem(item) {
    if (item.inCart) {
      _cartItems.push(
        _.merge(item, { qty: 1, inCart: 1 })
      );
    } else {
      let index;

      if ((index = _.findIndex(_cartItems, cartItem => cartItem.id === item.id)) !== -1) {
        _increaseItem(index);
      }
    }
  },

  removeItem(index) {
    _cartItems[index].inCart = false;
    _cartItems.splice(index, 1);
  },

  increaseItem(index) {
    _cartItems[index].qty++;
  },

  decreaseItem(index) {
    if (_cartItems[index].qty > 1) {
      _cartItems[index].qty--;
    } else {
      _removeItem(inde);
    }
  }
};

// pubsub channel
let inChan      = csp.chan(),
    outChan     = csp.chan(),
    appStorePub = csp.operations.pub(outChan, payload => payload.event);

csp.operations.pub.sub(publication, StoreDetails.AppStore, inChan);
csp.go(function*() {
  let payload;

  while ((payload = yield inChan)!== csp.CLOSED) {
    switch (payload.actionType) {
      case Constants.ADD_ITEM:
        _handlers.addItem(payload.item);
        break;
      case Constants.REMOVE_ITEM:
        _handlers.removeItem(payload.index);
        break;
      case Constants.INCREASE_ITEM:
        _handlers.increaseItem(payload.index);
        break;
      case Constants.DECREASE_ITEM:
        _handlers.decreaseItem(payload.index);
        break;
    }
    csp.putAsync(outChan, { event: APP_STORE_CHANGE_EVENT });
  }
});


let Mixin = {
  getInitialState() {
    return {
      appStoreOutChan: csp.chan(),
      cartItems: _cartItems
    };
  },
  componentWillMount() {
    csp.operations.pub.sub(appStorePub, APP_STORE_CHANGE_EVENT, this.state.appStoreOutChan);
    csp.go(function*() {
      while (yield appStoreOutChan !== csp.CLOSED) {
        this.appStoreOnChange();
      }
    }.bind(this));
  },
  componentWillUnmount() {
    this.state.appStoreOutChan.close();
  },
  appStoreOnChange() {
    this.setState({ cartItems: _cartItems });
  }
};

export default {
  APP_STORE_CHANGE_EVENT,
  getCartItems() { return _cartItems; },
  getCatalogs() { return _catalogs; },
  inChan,
  outChan,
  appStorePub,
  Mixin
};
