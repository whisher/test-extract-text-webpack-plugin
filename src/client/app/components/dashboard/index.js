import angular from 'angular';


import DashboardComponent from './dashboard.component';
import DashboardRouters from './dashboard.router';

const dashboardModule = angular.module('components.dashboard', [])

.config(DashboardRouters)

.component('appDashboard', DashboardComponent)

.name;

export default dashboardModule;
