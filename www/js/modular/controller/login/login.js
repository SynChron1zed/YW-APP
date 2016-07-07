/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools){



  //处理登录

  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;
  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);

  $scope.$on('$stateChangeSuccess',function(){
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  })

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  }

  $scope.register  =  function (){
      $state.go('r.register');
  }

}])
