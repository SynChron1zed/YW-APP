/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('ordersbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout,$ionicHistory) {



  $scope.ID = $stateParams.basicID;
 // $scope.seordeData = $stateParams.seorde;

  $scope.$on('$ionicView.beforeEnter',function(event, data){


    if(fromStateServ.getState('r.Homordersbody')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.Homordersbody').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });

function init() {

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
      $scope.shopname = $scope.shopbody.order.data[0].shop_name
      $scope.id = $scope.shopbody.order.data[0].order_basic_id
      $scope.pay = $scope.shopbody.order.data[0].total_fee
      $scope.postage =  $scope.shopbody.order.data[0].post_fee
      $scope.newTotal = parseInt($scope.pay)+parseInt($scope.postage)
      $scope.message = $scope.shopbody.order.data[0].buyer_message
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


    }else{
      $timeout(function(){

        if($scope.showtitle){
          $scope.backtoprevView('r.Homordersbody');
        }else{
          $ionicHistory.goBack();
        }


      },420)
    }
  });

}


  $scope.goShop=function () {
    $state.go('r.Shophome',{id:$scope.shopbody.order.data[0].shop_id})
  }
  $scope.goSeorder=function () {
    $state.go('r.HomSales')
  }


  $scope.callPhone = function (r) {

    window.plugins.CallNumber.callNumber(function(){}, function(){},r, true);


  }

}]);
