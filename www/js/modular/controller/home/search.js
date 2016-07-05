/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','$state','$ionicHistory','$timeout',function($scope,$state,$ionicHistory,$timeout) {

  $scope.back =  function(){

      $ionicHistory.goBack();
      }



}]);
