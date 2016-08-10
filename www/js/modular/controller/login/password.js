/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('passwordoldCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout){

  $scope.registbasinfo  = {};
  $scope.password ={};

  //获取验证码
  var sctolthi  = true;
  $scope.GetverCode =  function (){
    if(sctolthi){

      sctolthi  = false;
      if(!$scope.registbasinfo.phone){
        $ionicPopup.alert({
          title:'请填写手机号码!',
          okText:'确认'
        });
        sctolthi  = true;
        return false;
      };

      if(!Tools.reg.Tphone($scope.registbasinfo.phone)){

        native.task('请输入正确的手机号码！');
        return false
      }

      Tools.getData({
        "interface_number": "050304",
        "post_content": {
          "phone":$scope.registbasinfo.phone
        }
      },function(r){
        if(r){
          native.task('发送成功');
          $scope.vercodeing  = true;
          $scope.nextvercode =  60;
          var   time  = setInterval(function(){
            $scope.nextvercode--;
            if($scope.nextvercode <= 0){
              sctolthi  = true;
              $scope.vercodeing  =  false;
              clearInterval(time);
            }
            $scope.$apply();
          },1000)

        }else{
          sctolthi  = true;
        }

      },function(){
        sctolthi  = true;
      });
    }



  };



  //下一步
  $scope.next =  function (){

    if(!$scope.registbasinfo.phone){
      $ionicPopup.alert({
        title:'请输入手机号码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
      $ionicPopup.alert({
        title:'请输入正确的手机号码!',
        okText:'确认'
      });
      return  false;
    }
    if(!$scope.registbasinfo.Vercode){
      $ionicPopup.alert({
        title:'请输入验证码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.negative($scope.registbasinfo.Vercode)) {
      $ionicPopup.alert({
        title:'请输入正确的验证码!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.password.Original || !$scope.password.Repeat)  {
      $ionicPopup.alert({
        title:'请填写密码!',
        okText:'确认'
      });
      return false;
    }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      $ionicPopup.alert({
        title:'密码不一致!',
        okText:'确认'
      });
      return false;
    };





  //交互
  Tools.getData({

    "interface_number": "050305",
    "post_content": {
      "token": "",
      "token_phone": "",
      "phone": $scope.registbasinfo.phone,
      "new_password":window.md5($scope.password.Original) ,
      "confirm_password":window.md5($scope.password.Repeat) ,
      "verify_code":$scope.registbasinfo.Vercode
    }
  },function(r){

    if(r.msg== "success"){

      $rootScope.$ionicGoBack();
      native.task('修改成功！')

    }
  });




    return  false;



  }




}]);
