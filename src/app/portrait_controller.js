import { MODULE_NAME } from './app';

const PORTRAITS = {
  NO_PORTRAIT: 0,
  ALEPHA_PORTRAIT: 1,
  BU_PORTRAIT: 2,
  ZETT_PORTRAIT: 3
}

/*
* This controller will show or hide character portraits
* using an ng-show element on the main app page.
* Game logic will set the showPortrait property to one of
* the given const values as characters speak.
*/

angular.module(MODULE_NAME)
.controller('portraitController', [
  '$scope',
  ($scope) => {
    $scope.showPortrait = PORTRAITS.NO_PORTRAIT;
  }])