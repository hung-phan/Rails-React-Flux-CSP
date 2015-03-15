'use strict';

import csp from 'js-csp';
import Constants from './../constants/app-constants';
import StoreDetails from './../constants/store-details';

let sourceChan        = csp.chan(),
    extractActionType = payload => payload.store,
    publication       = csp.operations.pub(sourceChan, extractActionType);

let AppActions = {
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

export default {
  AppActions,
  publication
};
