'use strict'

// expose jQuery for jquery_ujs and React for react_ujs
require('expose?jQuery!expose?$!jquery');
require('expose?React!react/addons');

import $ from 'jquery';
import React from 'react/addons';
import Router from 'react-router';

import MainComponent from './components/main-component';
import AppActions from './actions/app-actions';

window.AppActions = AppActions;

$(document).ready(function() {
  // define routing
  let routes = (
    <Router.Route name='main_page' path='/' handler={MainComponent}></Router.Route>
  );

  Router.run(routes, Router.HashLocation, function(Handler) {
    React.render(React.createFactory(Handler)(), document.getElementById('route'));
  });
});
