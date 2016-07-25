/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native){

  
   //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    if(loginregisterstate.Refresh){
        $scope.registbasinfo  = {};
        loginregisterstate.Refresh  = false;
    }  
  });


  $scope.registbasinfo  = {};
  $scope.nextvercode =  60;
  $scope.vercodeing  = false;
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
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
          Tools.getData({
            "interface_number": "000101",
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


  }

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
    if(!$scope.registbasinfo.CorporateName){
      $ionicPopup.alert({
        title:'请输入公司名称!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.registbasinfo.userName){
      $ionicPopup.alert({
        title:'请输入姓名!',
        okText:'确认'
      });
      return  false;
    }
    //交互
    Tools.getData({
      "interface_number": "000102",
      "post_content": {
          "phone":$scope.registbasinfo.phone,
          "register_code":$scope.registbasinfo.Vercode,
          "company_name":$scope.registbasinfo.CorporateName,
          "real_name":$scope.registbasinfo.userName,
          "invite_code":$scope.registbasinfo.InvitationCode?$scope.registbasinfo.InvitationCode:''
      }
    },function(r){
    if(r){
        if(window.cordova){
            window.cordova.plugins.Keyboard.close();
        }


        $state.go('r.registercfpwd',{phone:r.resp_data.phone})
    }
    });
    return  false;



  }

}]);
