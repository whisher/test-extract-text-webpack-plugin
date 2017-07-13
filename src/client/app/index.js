import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import ngAnimate from 'angular-animate';
import ngTouch from 'angular-touch';
import ngMessage from 'angular-messages';
import ngSanitize from 'angular-sanitize';

import 'angular-loading-bar/src/loading-bar.css';
import angularLodingBar from 'angular-loading-bar';

import uiBootstrapAccordion from 'angular-ui-bootstrap/src/accordion';

import Common from './common';
import Components from './components';
import RootComponent from './root.component';
import Config from './root.config';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['root'], {strictDi: false});
});

const rootModule = angular.module('root', [
  uiRouter,
  ngAnimate,
  ngTouch,
  ngMessage,
  ngSanitize,
  angularLodingBar,
  uiBootstrapAccordion,
  Common,
  Components
])

.config(Config)

.component('root', RootComponent)

.name;

export default rootModule;
