/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$ionicHistory','$scope','$rootScope',function($ionicHistory,$scope,$rootScope){
  
  $scope.$on('$stateChangeSuccess',function(){
  });
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  }


}]);
