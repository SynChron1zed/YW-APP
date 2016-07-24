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

      $scope.ClassifDetailsList = (r.resp_data.data);
       console.log($scope.ClassifDetailsList)
      $scope.shopid= $scope.ClassifDetailsList.goodsShop.shop_id

    }
  });



  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/gouwuchemodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.gouwuchemodal = modal;
  });

  $scope.Number=1;
  $scope.addshop = function () {
    $scope.Number+=1
  }
  $scope.delshop = function () {

    if($scope.Number<=1){
      $scope.Number=1
    }else{
      $scope.Number-=1
    }

  }


  //结算
  $scope.ClassifConfirm=function (r,basic,shop) {

    $scope.modal.hide();
    fromStateServ.stateChange(r,{basicID:basic,shopID:shop,Num:$scope.Number});
   /* $state.go('r.tab.confirmOrder',{basicID:basic,shopID:shop,Num:$scope.Number});*/

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
        "token": "",
        "token_phone": "",
        "shop_id": $scope.shopid,
        "sku_id": "1",
        "goods_basic_id": Classitem,
        "number": $scope.Number

      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'添加成功!',
          okText:'确认'
        })

        $scope.gouwuchemodal.hide();
        $scope.Number=1
      }
    });
  };


  $scope.back  =  function (){
    window.noNavtionsback(window.noNavtionsbackRootuer);
  }


}]);
