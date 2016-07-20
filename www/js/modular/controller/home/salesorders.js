/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  $scope.all = true;
  $scope.dfk = false;
  $scope.dfh = false;
  $scope.listtype  =  undefined;
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfh = false;
    $ionicScrollDelegate.scrollTop();
    senpoiont.post_content.searchParam.buyer_name  = '';
    senpoiont.post_content.searchParam.order_type  = '';
    getdata('',$scope.nextpage =1);
  }
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfh = false;
    $ionicScrollDelegate.scrollTop();
    senpoiont.post_content.searchParam.buyer_name  = '';
    senpoiont.post_content.searchParam.order_type  = '';
    getdata('0',$scope.nextpage =1,'Pending_payment');
  };
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfh = true;
    $ionicScrollDelegate.scrollTop();
    senpoiont.post_content.searchParam.buyer_name  = '';
    senpoiont.post_content.searchParam.order_type  = '';
    getdata('0',$scope.nextpage =1,'To_be_shipped');
  };
}]);
