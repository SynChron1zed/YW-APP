/**
 * Created by Administrator on 2016/8/25.
 */
Ctr.controller('ClassAdviceCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){
  $scope.shop={}
  $scope.shop.id  = $stateParams.id;


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

  


}]);
