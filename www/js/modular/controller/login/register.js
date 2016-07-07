/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){

  
  $scope.registbasinfo  = {};
  







  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  //输入密码
  $scope.next =  function (){
    $state.go('r.registercfpwd')
  }

}]);
