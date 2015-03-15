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
let _handlers = {
  addItem(item) {
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
  },

  removeItem(index) {
    _cartItem[index].inCart = false;
    _cartItem.splice(index, 1);
  },

  increaseItem(index) {
    _cartItem[index].qty++;
  },

  decreaseItem(index) {
    if (_cartItem[index].qty > 1) {
      _cartItem[index].qty--;
    } else {
      _removeItem(inde);
    }
  }
};

// pubsub channel
const APP_STORE_CHANGE_EVENT = 'APP_STORE_CHANGE_EVENT';

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
      appStoreChan: csp.chan(),
      cartItem: _cartItem
    };
  },
  componentWillMount() {
    let appStoreChan     = this.state.appStoreChan,
        appStoreOnChange = this.appStoreOnChange;

    //csp.operations.pub.sub(appStorePub, StoreDetails.AppStore, inChan);
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
  inChan
};
