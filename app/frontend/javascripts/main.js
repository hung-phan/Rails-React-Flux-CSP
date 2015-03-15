'use strict'

// expose jQuery for jquery_ujs and React for react_ujs
require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

const $      = require('jquery');
const React  = require('react/addons');
const Router = require('react-router');

// component
