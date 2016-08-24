/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$state','Tools','$stateParams','$ionicPopup','storage','$ionicHistory','native',function($scope,$state,Tools,$stateParams,$ionicPopup,storage,$ionicHistory,native){



  $scope.password  = {};
  //选择认证方式

  console.log($stateParams.phone)
  
  $scope.next =  function (){

  if(!$scope.password.Original || !$scope.password.Repeat)  {

    native.task('请确认密码!');
    return false;
  }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      native.task('密码不一致!');
      return false;
    };

    Tools.getData({
      "interface_number": "000103",
         "post_content": {
             "phone":$stateParams.phone,
             "password":window.md5($scope.password.Original),
             "repassword":window.md5($scope.password.Repeat),
              uuid:storage.getObject('device').uuid,
             "push_registration_id" : storage.getObject('jPush').RegistrationID?storage.getObject('jPush').RegistrationID:'',
         }
    },function(r){
      if(r){
        window.Token  = r.resp_data.token;
        r.resp_data.user_info.token  = window.Token;
        storage.setObject('UserInfo',r.resp_data.user_info);
        $state.go('r.selectAuth');
        $scope.password  = {};
        native.task('注册成功！')


      }
    })
    return  false;
  }





}]);
