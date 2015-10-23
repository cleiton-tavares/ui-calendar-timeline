var UITimeline = angular.module('UITimeline', ['ui.calendar']);
  angular.module("UITimeline")
      .controller('ApplicationController', ["$scope", "plugins", function ($scope, plugins) {


          $scope.uiConfig = plugins.calendar.new();
          $scope.uiConfig.calendar.eventAfterAllRender  = plugins.calendar.config({who: 'eventAfterAllRender'});
          $scope.eventSources = [];
}]);
