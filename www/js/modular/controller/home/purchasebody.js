/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('purbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout,$ionicHistory) {

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


    if(fromStateServ.getState('r.HomPurordersbody')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.HomPurordersbody').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });



  console.log($scope.ID)



  function init() {
    Tools.showlogin();
    Tools.getData({
      "interface_number": "020705",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "orderId": $scope.ID,
      }
    },function(r){
      if(r){
        $scope.shopbody = (r.resp_data);
        if($scope.shopbody.post_status!=5){
          $scope.status = true
        }else{
          $scope.statusOne = true
        }


        if($scope.shopbody.post_status==1){
          $scope.bodyOne = true;
        }else if($scope.shopbody.post_status==2){
          $scope.bodyOne1 = true;
        }else if($scope.shopbody.post_status==3){
          $scope.bodyOne2 = true;
        }else if($scope.shopbody.post_status==4){
          $scope.bodyOne3 = true;
        }else if($scope.shopbody.post_status==5){
          $scope.bodyOne4 = true;
        }



        console.log($scope.shopbody)

        $scope.pay = $scope.shopbody.total_fee
        $scope.postage =  $scope.shopbody.post_fee
        $scope.newTotal = parseInt($scope.pay)+parseInt($scope.postage)

      }else{
        $timeout(function(){
          if($scope.showtitle){
            $scope.backtoprevView('r.HomPurordersbody');
          }else{
            $ionicHistory.goBack();
          }

        },420)
      }
    });
  }

$scope.goShop=function () {
  $state.go('r.Shophome',{id:$scope.shopbody.shop_id})
}

  $scope.goSeorder=function () {
    $state.go('r.HomPurchase')
  }

  $scope.callPhone = function (r) {

    window.plugins.CallNumber.callNumber(function(){}, function(){},r, true);


  }

}]);
