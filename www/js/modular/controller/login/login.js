/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout','loginregisterstate','native','$rootScope',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout,loginregisterstate,native,$rootScope){

      $scope.Userinfo =  {};
      var   user = storage.getObject('UserInfo');
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+'sys_male.jpg?imageView2/2/w/300/h/300';
  //处理登录
  $scope.loginboj  = {};

  $scope.loginhan  = function (){
      if(!$scope.loginboj.userName){
        native.task('请输入用户名');
        return false;
      }
      if(!$scope.loginboj.Pwd){

        native.task('请输入密码');
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
          

                 if(window.cordova){
                  window.cordova.plugins.Keyboard.close();
                }


              window.Token  = r.resp_data.token;
              r.resp_data.user_info.token  = window.Token;
              storage.setObject('UserInfo',r.resp_data.user_info);
              $timeout(function(){


                if(fromStateServ.getState('r.login')){
     $scope.backtoprevView('r.login');
                    $timeout(function(){
                      native.task('登录成功');
                    },400);

                }else{
                    $rootScope.$ionicGoBack();
                      $timeout(function(){
                      native.task('登录成功');
                    },400);

                  
                }

               


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

  $scope.$on('$ionicView.beforeEnter',function(){

            if(fromStateServ.getState('r.login')){
                $scope.showtitle  = true;
                $scope.parenttitle     =   fromStateServ.getState('r.login').title;
                $scope.ing  = false;
            }else{

                $scope.showtitle  = false;

            }

            $scope.loginboj = {};
    });    


  $scope.$on('$stateChangeSuccess',function(){

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
