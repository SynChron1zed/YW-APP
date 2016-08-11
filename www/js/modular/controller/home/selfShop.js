/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selfShopCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {




  $scope.goodID = $stateParams.goodsId;
  $scope.companyID = $stateParams.company_id


  Tools.getData({
    "interface_number": "020804",
    "post_content": {
      "token":"",
      "token_phone": "",
      goods_id: $scope.goodID,
      "company_id": $scope.companyID


    }

  },function(r){

    if(r.msg== "success"){
      $scope.selfList =r.resp_data

    }else{

      return false

    }


  });


}]);

