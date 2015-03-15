'use strict';

import csp from 'js-csp';
import Constants from './../constants/app-constants';

let sourceChan        = csp.chan(),
    extractActionType = payload => payload.actionType,
    publication       = csp.operations.pub(sourceChan, extractActionType);

let AppActions = {
  addItem(item) {
    csp.putAsync(sourceChan, { actionType: Constants.ADD_ITEM, item: item });
  },
  removeItem(index) {
    csp.putAsync(sourceChan, { actionType: Constants.REMOVE_ITEM, index: index });
  },
  increaseItem(index) {
    csp.putAsync(sourceChan, { actionType: Constants.INCREASE_ITEM, index: index });
  },
  decreaseItem(index) {
    csp.putAsync(sourceChan, { actionType: Constants.DECREASE_ITEM, index: index });
  }
};

export default {
  AppActions,
  publication
};
