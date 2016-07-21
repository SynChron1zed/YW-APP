/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ClassifDetailsCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {
  var Classitem = $stateParams.Classitem;

  Tools.getData({
    "interface_number": "020205",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "goods_basic_id": Classitem

    }
  },function(r){
    if(r){
      $scope.ClassifDetailsList = (r.resp_data.data.data);


    }
  });



  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.ClassifConfirm=function () {
    $scope.modal.hide();
    $state.go('r.tab.confirmOrder');

  };
  $scope.isCone=true;
   $scope.Detailsone=function () {
       $scope.isCone=true;
     $scope.isCtwo=false;
     $scope.isCtree=false;
 };
  $scope.Detailstwo=function () {
    $scope.isCone=false;
    $scope.isCtwo=true;
    $scope.isCtree=false;
  };
  $scope.Detailstree=function () {

    $scope.isCone=false;
    $scope.isCtwo=false;
    $scope.isCtree=true;
  };


  //加入购物车
  $scope.addcart=function () {
    Tools.getData({
      "interface_number": "020401",
      "client_type": window.platform,
      "post_content": {
        "token": "{611FF161-F539-A956-5B4F-2FFB04F7AAC8}",
        "token_phone": "",
        "shop_id": "9",
        "sku_id": "1",
        "goods_basic_id": Classitem,
        "number": "1"

      }
    },function(r){
      if(r){
        $scope.ClassifDetailsList = (r.resp_data.data.data);


      }
    });
  }

}]);
