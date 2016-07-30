/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('companyInstallCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','storage',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,storage){


  $scope.expression = true;
  $scope.newexpression =true;
$scope.companyID = storage.getObject('UserInfo').company_id;
  $scope.companyName = storage.getObject('UserInfo').company_name;
  $scope.adminer = storage.getObject('UserInfo').is_admin;

  if($scope.adminer != "1"){
    $scope.newexpression = false
  }

  Tools.getData({
    "interface_number": "000405",
    "post_content": {
      "token":"",
      "token_phone": "",

    }

  },function(r){

    if(r.msg== "success"){
     $scope.auth =r.resp_data.is_auth;
      if($scope.auth=="0"){
        $scope.autName="未认证"
        $scope.expression = false;
      }else if($scope.auth=="1"){
        $scope.autName="审核中"
      }else if($scope.auth=="2"){
        $scope.autName="审核通过";

      }else if($scope.auth=="3"){
        $scope.autName="审核失败"
      }


      $scope.invite =r.resp_data.is_invite

    }else{

      return false

    }


  });

$scope.Unauthorized=function () {
  alert('前往认证页面')
}

$scope.goManagement = function () {
  $state.go('r.tab.management')
}

}]);
