/**
 * Created by Administrator on 2016/8/25.
 */
Ctr.controller('ClassAdviceCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat','$state',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat,$state){

  $scope.shop={}
  $scope.shop.id  = $stateParams.id
  $scope.company_ID  = $stateParams.companyID

  Tools.getData({
    "interface_number": "020206",
    "post_content": {
      "shop_id":$scope.shop.id,
    }
  },function (r) {
    if(r){
        $scope.item= r.resp_data

    }

  })
  $scope.callPhone = function (r) {

    window.plugins.CallNumber.callNumber(function(){}, function(){},r, true);


  }

  $scope.newcallPhone = function (r) {

    window.plugins.CallNumber.callNumber(function(){}, function(){},r, true);


  }

  $scope.goMshop=function () {
    $state.go('r.selfShop',{goodsId:"",company_id:$scope.company_ID})
  }


}]);
