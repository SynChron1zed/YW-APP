/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){


  window.androdzerofun  =window.backtoinroot;
  window.androdzerofun_parms  = window.backtoinroot_parms;
  
  $scope.$ionicGoBack  =  function(){
       window.backtoinroot(window.backtoinroot_parms);
  };


  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }


}]);
