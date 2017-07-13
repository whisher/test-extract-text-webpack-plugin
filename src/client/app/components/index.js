import angular from 'angular';

import dashboard from './dashboard';

const componentsModule = angular.module('components', [
  dashboard
])

.name;

export default componentsModule;
