export default function routing($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      component: 'appDashboard',
    });
}
