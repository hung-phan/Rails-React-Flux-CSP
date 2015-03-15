'use strict';

import { chan, operations } from 'js-csp';

const sourceChan  = chan(),
      publication = operations.pub(sourceChan, payload => payload.store);

export default {
  sourceChan,
  publication
};
