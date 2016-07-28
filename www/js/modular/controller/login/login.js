/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout','loginregisterstate',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout,loginregisterstate){

  //处理登录
  $scope.loginboj  = {};

  $scope.loginhan  = function (){
      if(!$scope.loginboj.userName){
         $ionicPopup.alert({
           title:'请输入用户名!',
           okText:'确认'
         });
        return false;
      }
      if(!$scope.loginboj.Pwd){
        $ionicPopup.alert({
          title:'请输入密码!',
          okText:'确认'
        });
        return false;
      }
      $scope.ing  = true;
      var devinfo  =   storage.getObject('device');
      Tools.getData({
        "interface_number": "000001",
        "client_type": window.platform,
        "post_content": {
          "phone":$scope.loginboj.userName,
          "push_registration_id" : storage.getObject('jPush').RegistrationID,
          "password":window.md5($scope.loginboj.Pwd),
          "uuid":devinfo.uuid
        }
      },function(r){
        if(r){
          debugger;

                 if(window.cordova){
                  window.cordova.plugins.Keyboard.close();
                }


              window.Token  = r.resp_data.token;
              r.resp_data.user_info.token  = window.Token;
              storage.setObject('UserInfo',r.resp_data.user_info);
              $timeout(function(){
                    $scope.backtoprevView('r.login');
                    $timeout(function(){
                      $ionicPopup.alert({
                        title:'登录成功!',
                        okText:'确认'
                      })
                    },400);


              },400)

        }else{
          $scope.ing  = false;
        }




      },function(){
        $timeout(function(){
          $scope.ing  = false;
        },600)

      })
  };


  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){

      $scope.loginboj = {};
      $scope.ing  = false;
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };

  $scope.register  =  function (){
      if(!$scope.ing){
            loginregisterstate.Refresh   =  true;
            $state.go('r.register');
      }
  }

  $scope.renzhen=function () {

    $state.go('r.canpany');
  }

  $scope.password=function () {

    $state.go('r.passwordold');
  }



}])
