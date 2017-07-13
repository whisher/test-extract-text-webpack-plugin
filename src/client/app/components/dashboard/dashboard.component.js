import template from './dashboard.html';
import controller from './dashboard.controller';
import './dashboard.less';

const dashboardComponent = {
  bindings: {
    item: '<'
  },
  template,
  controller
};

export default dashboardComponent;
