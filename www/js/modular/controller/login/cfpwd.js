/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$state','Tools','$stateParams','$ionicPopup',function($scope,$state,Tools,$stateParams,$ionicPopup){


  $scope.password  = {};
  //选择认证方式

  console.log($stateParams.phone)
  $scope.next =  function (){

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

    Tools.getData({
      "interface_number": "000103",
         "post_content": {
             "phone":$stateParams.phone,
             "password":window.md5($scope.password.Original),
             "repassword":window.md5($scope.password.Repeat)
         }
    },function(r){
      if(r){
          console.log(r);

      }
    })




    return  false;
    $state.go('r.selectAuth');
  }





}]);
