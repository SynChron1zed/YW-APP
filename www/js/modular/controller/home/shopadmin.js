/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  $scope.shopadmindata=[];
  Tools.getData({
    "interface_number": "010101",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)


    }
  });


  $scope.shopName = function (Classitem) {

    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };


}]);
