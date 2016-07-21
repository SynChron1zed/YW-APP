/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  var Name = [];
  $scope.querybriefing = function () {
    Tools.getData({
      "interface_number": "010104",
      "client_type": window.platform,
      "post_content": {
        "token" : "{35CAD486-424C-E3B9-CD41-4BC41A1CC156}",
        "token_phone": "",
        "name": Name
      }
    },function(r){
      if(r){
        $scope.shopadmindata = (r.resp_data)


      }
    });
  }

  //收货人
  $scope.newshopBname = function (shopBname) {
    Name = shopBname;
  };


}]);
