/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {

  var Name = [];
  var oldName = $stateParams.Classitem
  $scope.shop = {};
  $scope.shop.Name = oldName;
  $scope.ziflength = 40
  $scope.$watch('shop.Name',function(newvalue,olavalue,scope){
    $scope.ziflength =  (40)-(newvalue.length);
    if($scope.ziflength < 0 ){
      $scope.shop.Name  = olavalue;
      $ionicPopup.alert({
        title:'已达最大输入长度!',
        okText:'确认'
      });
    }
  });

  $scope.backlistrotop  = function(){
    $state.go('r.tab.HomShopadmin');
  };

  $scope.querybriefing = function () {

    if($scope.shop.Name  == "" ||  $scope.shop.Name == undefined){
      $ionicPopup.alert({
        title:'请填写店铺描述!',
        okText:'确认'
      });
      return false;
    }else{
      Tools.showlogin();
    Tools.getData({
      "interface_number": "010104",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "description": $scope.shop.Name
      }
    },function(r){
      if(r!='error'){
        $ionicPopup.alert({
          title:'修改成功',
          okText:'确认'
        }).then(function(){
          $stateParams.Classitem = $scope.shop.Name;



        });
        $timeout(function(){
          Tools.hidelogin();
        },300)
      }
    });

    }
  }

  //收货人

  $scope.newshopBname = function (value) {

  };





}]);
