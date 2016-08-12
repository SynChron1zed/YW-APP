/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selfShopCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal','seeshopPint',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal,seeshopPint) {




  $scope.goodID = $stateParams.goodsId;
  $scope.companyID = $stateParams.company_id


  Tools.getData({
    "interface_number": "020804",
    "post_content": {
      "token":"",
      "token_phone": "",
      "goods_id": $scope.goodID,
      "company_id": $scope.companyID


    }

  },function(r){

    if(r.msg== "success"){
      $scope.selfList =r.resp_data

    }else{

      return false

    }


  });


  $scope.newMap = function () {

    seeshopPint.datalist  = [
      {
        name:'我是自提点',
        lat:28.188874,
        lng:112.991093,
        link:13517437502,
        business:'早上7点到晚上12点',
        opsition:'xxx小学校，距离xxx多少米'
      },
      {
        name:'我是自提点',
        lat:28.188464,
        lng:112.991093,
        link:13517437502,
        business:'早上7点到晚上12点',
        opsition:'xxx小学校，距离xxx多少米'
      }
    ];
   $state.go('r.SeeshopPint',{name:'测试的店铺'});

  }


}]);

