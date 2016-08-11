/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selfShopCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {




  $scope.goodID = $stateParams.goodsId;


  Tools.getData({
    "interface_number": "020804",
    "post_content": {
      "token":"",
      "token_phone": "",
      goods_id: $scope.goodID

    }

  },function(r){

    if(r.msg== "success"){
      $scope.selfList =r.resp_data

    }else{

      return false

    }


  });


}]);

