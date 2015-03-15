'use strict'

// expose jQuery for jquery_ujs and React for react_ujs
require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import csp from 'js-csp';
import $ from 'jquery';
import React from 'react/addons';
import Router from 'react-router';

import { AppActions } from './actions/app-actions';
import { storeChan } from './stores/app-store';

// component
