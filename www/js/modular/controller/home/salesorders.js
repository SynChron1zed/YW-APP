/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {


  $scope.SalesList = [];
  Tools.getData({
    "interface_number": "020701",
    "client_type": window.platform,
    "post_content": {
      "token" : "{611FF161-F539-A956-5B4F-2FFB04F7AAC8}",
      "token_phone": "",
      "status": "",
      "page_num": 1,
      "page_per":10
    }
  },function(r){
    if(r){
      if(r.resp_data.data.data.length==10){
        $scope.expression=true
      }else{
        $scope.expression=false
      }
      $scope.SalesList = (r.resp_data.data.data)

    }
  });



  $scope.all = true;
  $scope.dfk = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfh = false;

  };
  //待付款
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfh = false;

  };
  //待收货
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfh = true;

  };
}]);


