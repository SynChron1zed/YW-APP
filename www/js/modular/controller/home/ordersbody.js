/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('ordersbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams) {


  
  $scope.ID = $stateParams.basicID;

  Tools.getData({
    "interface_number": "020703",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "orderId": $scope.ID,
    }
  },function(r){
    if(r){
      $scope.shopbody = (r.resp_data);
      $scope.shopname = $scope.shopbody.order.data[0].buyer_nick
      $scope.id = $scope.shopbody.order.data[0].order_basic_id
      $scope.pay = $scope.shopbody.order.data[0].total_fee
      $scope.time = $scope.shopbody.order.data[0].order_created
      $scope.name = $scope.shopbody.address.receiver_name
      $scope.mobile= $scope.shopbody.address.receiver_mobile
      $scope.street= $scope.shopbody.address.receiver_province+$scope.shopbody.address.receiver_city+$scope.shopbody.address.receiver_region+$scope.shopbody.address.receiver_street
      $scope.total = $scope.shopbody.order.data[0].total_fee
      $scope.totalNum = $scope.shopbody.order.data[0].total_num
      $scope.shopchirld = $scope.shopbody.order.data[0].orderDetail
      console.log( $scope.shopchirld)
      console.log($scope.shopbody)
console.log($scope.shopbody.order.data[0].buyer_nick)


    }
  });

}]);
