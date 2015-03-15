'use strict'

// expose jQuery for jquery_ujs and React for react_ujs
require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import {sourceChan, AppActions} from './actions/app-actions';

console.log(AppActions);

const $      = require('jquery');
const React  = require('react/addons');
const Router = require('react-router');

// component
