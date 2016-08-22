/**
 * Created by Administrator on 2016/8/5.
 */
/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('aboutWeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,fromStateServ){


  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.SettingWe').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };




}]);

