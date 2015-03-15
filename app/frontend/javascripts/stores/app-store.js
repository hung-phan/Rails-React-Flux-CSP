'use strict';

import _ from 'lodash';
import csp from 'js-csp';
import Constants from './../constants/app-constants';
import StoreDetails from './../constants/store-details';
import { publication } from './../actions/app-actions';

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


let appStoreChan = csp.chan();
csp.operations.pub.sub(publication, StoreDetails.AppStore, appStoreChan);
csp.go(function*() {
  let payload;

  while ((payload = yield appStoreChan)!== csp.CLOSED) {
    console.log(payload);
  }
});

export default {
  appStoreChan
};
