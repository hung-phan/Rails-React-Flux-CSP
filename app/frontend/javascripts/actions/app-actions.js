'use strict';

import csp from 'js-csp';
import { sourceChan } from './../dispatcher/dispatcher';
import Constants from './../constants/app-constants';
import StoreDetails from './../constants/store-details';

export default {
  addItem(item) {
    csp.putAsync(sourceChan, { store: StoreDetails.AppStore, actionType: Constants.ADD_ITEM, item: item });
  },
  removeItem(index) {
    csp.putAsync(sourceChan, { store: StoreDetails.AppStore, actionType: Constants.REMOVE_ITEM, index: index });
  },
  increaseItem(index) {
    csp.putAsync(sourceChan, { store: StoreDetails.AppStore, actionType: Constants.INCREASE_ITEM, index: index });
  },
  decreaseItem(index) {
    csp.putAsync(sourceChan, { store: StoreDetails.AppStore, actionType: Constants.DECREASE_ITEM, index: index });
  }
};
