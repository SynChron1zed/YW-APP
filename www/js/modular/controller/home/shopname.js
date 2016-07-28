/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {

  var Name=[]
  var oldName = $stateParams.Classitem
  $scope.ShopName = oldName;
  $scope.showclear  =false;
  $scope.shop = {};
  $scope.shop.name = oldName
  if($scope.shop.name !== '' ||   $scope.shop.name !==   undefined){
    $scope.showclear  =true;
  }

  $scope.backlistrotop  = function(){
    $state.go('r.tab.HomShopadmin');
  };

//收货人
  $scope.newshopname = function (value) {
    if(value ==''  ||  value ==  undefined){
      $scope.showclear = false;
    }else{
      $scope.showclear = true;
    }
  };

  //del
  $scope.clear = function(){
    $scope.shop = {};
    $scope.showclear = false;
  };

  //保存
  $scope.queryname = function () {
    if($scope.shop.name  == "" ||  $scope.shop.name == undefined) {
      $ionicPopup.alert({
        title: '请填写店铺名称!',
        okText: '确认'
      });
    }else{

      Tools.showlogin();
    Tools.getData({
      "interface_number": "010103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "name": $scope.shop.name
      }
    },function(r){
      if(r!='error'){
        $ionicPopup.alert({
          title:'修改成功',
          okText:'确认'
        }).then(function(){


          $stateParams.Classitem = $scope.shop.name;



        });
        $timeout(function(){
          Tools.hidelogin();
        },300)
      }
    });
  }
  }

}]);
