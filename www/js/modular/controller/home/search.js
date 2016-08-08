/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','$state','$rootScope',function($scope,$state,$rootScope) {
  
  $scope.back  =  function (){
      $rootScope.$ionicGoBack();
  }

}]);
