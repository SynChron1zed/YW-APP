/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {

  var bascId = $stateParams.basicID;
  var shopId = $stateParams.shopID;
  var cartId = [];

  console.log(bascId)
  console.log(shopId)

  $scope.addressList=[]
  //获取收货地址
  Tools.getData({
    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.addressList= (r.resp_data.data)
      for(var i = 0;i<$scope.addressList.length;i++){
        if($scope.addressList[i].is_default=="1"){
          $scope.addressListone = $scope.addressList[i]
        }
      }

    }
  });


  //加入购物车
  Tools.getData({
    "interface_number": "020401",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": "",
      "shop_id": shopId,
      "sku_id": "1",
      "goods_basic_id": bascId ,
      "number": "1"
    }
  },function(r){
    if(r){

      cartId= (r.resp_data.cart_id)


    }
  });

  //确认订单
  $scope.orderquery = function () {

    Tools.getData({
      "interface_number": "020601",
      "client_type": window.platform,
      "post_content": {
        "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
        "token_phone": "",
        "cartIds": cartId,
        "addr_id": $scope.addressListone.addr_id ,
        "remark": ""
      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'确认成功!',
          okText:'确认'
        })


      }
    });
  }



}]);
