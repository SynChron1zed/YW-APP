/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
var Name=[]
$scope.queryname = function () {
  Tools.getData({
    "interface_number": "010103",
    "client_type": window.platform,
    "post_content": {
      "token" : "{E465AF0A-845A-BC21-C538-F868137E9D43}",
      "token_phone": "",
      "name": "Name"
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)


    }
  });
}

//收货人
  $scope.newshopname = function (shopname) {
    Name = shopname;
  };


}]);
