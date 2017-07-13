export default function config($compileProvider, $logProvider, $httpProvider, $locationProvider) {
  'ngInject';
  const DEBUG = true;
  $compileProvider.debugInfoEnabled(DEBUG);// prod false
  $logProvider.debugEnabled(DEBUG);
  $httpProvider.useApplyAsync(true);
  $locationProvider.hashPrefix('!');
}
