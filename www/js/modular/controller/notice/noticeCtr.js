/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage){


  $scope.adminer = storage.getObject('UserInfo').is_admin;

  $scope.expression = true;
  if($scope.adminer == "1"){
    $scope.expression = true
  }else {
    $scope.expression= false
  }

  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    Initial ();
 
  });


  $scope.application = function () {
    $state.go('r.tab.information')
  }


  function  Initial  () {

    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }


      } else {
        return false

      }

    });
  }



}])

  .controller('noticeDetailCtr', ['$scope',function($scope) {

  }]);
