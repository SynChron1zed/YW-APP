/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('ordersbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout,$ionicHistory) {



  $scope.ID = $stateParams.basicID;
 // $scope.seordeData = $stateParams.seorde;
  $scope.bodyOne = false;
  $scope.bodyOne1 = false;
  $scope.bodyOne2 = false;
  $scope.bodyOne3 = false;
  $scope.bodyOne4 = false;

  $scope.status= false;
  $scope.statusOne= false;
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
     //$scope.newpoststuds=$scope.shopbody.order.data[0].orderDetail[0].post_status
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

      $scope.poststuds= false;
      $scope.shouhuoStuds = false;
      $scope.newpoststuds=0;
      $scope.count = 0;
      $scope.count1 = 0
      $scope.count2 = 0
      $scope.count5 = 0
      $scope.fukuan = false;
      $scope.fahuo = false;
      angular.forEach($scope.shopbody.order.data[0].orderDetail,function(c){

        if(c.post_status!=5) {
          $scope.poststuds = true
        }

        if(c.post_status==3){
          $scope.count +=1;
        }

        if(c.post_status==1){
          $scope.count1 +=1;
        }

        if(c.post_status==2){
          $scope.count2 +=1;
        }

        if(c.post_status==5){
          $scope.count5 +=1;
        }

        if(c.post_status==1){

          $scope.fukuan = true
        }

        if(c.post_status==2 ){

          $scope.fahuo = true
        }


      });

      if($scope.count==$scope.shopbody.order.data[0].orderDetail.length){
           $scope.bodyOne2 = true;
      }else if($scope.count>0) {

          if(0<$scope.count5 && $scope.count5<$scope.shopbody.order.data[0].orderDetail.length && $scope.fahuo != true){
            $scope.bodyOne2 = true;
          }else{
            $scope.bodyOne3 = true;
          }

      }else if($scope.count==0){
        if($scope.count1==$scope.shopbody.order.data[0].orderDetail.length){
          $scope.bodyOne = true;
        }else {
          if($scope.count2==$scope.shopbody.order.data[0].orderDetail.length){
            $scope.bodyOne1 = true;
          }else if($scope.count5==$scope.shopbody.order.data[0].orderDetail.length) {
            $scope.bodyOne4 = true;
          }else {
            if($scope.fukuan){
              $scope.bodyOne = true;
            }else{
              $scope.bodyOne1 = true;
            }

          }
        }
      }




      if($scope.poststuds){
        $scope.status = true
      }else{
        $scope.statusOne = true
      }




     /* if($scope.newpoststuds==1){
        $scope.bodyOne = true;
      }else if($scope.newpoststuds==2){
        $scope.bodyOne1 = true;
      }else if($scope.newpoststuds==3){
        $scope.bodyOne2 = true;
      }else if($scope.newpoststuds==4){
        $scope.bodyOne3 = true;
      }else if($scope.newpoststuds==5){
        $scope.bodyOne4 = true;
      }*/


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
