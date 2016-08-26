/**
 * Created by Administrator on 2016/8/25.
 */
Ctr.controller('shopNumberCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){


  $scope.shop  = {};
  $scope.shop.name  = $stateParams.Number;
  $scope.clear  = function () {
    $scope.shop.name   = undefined;
  }
  $scope.queryname  = function () {
    if(!$scope.shop.name){
      native.task('请填写联系方式')
    return false;
  }

    if(!Tools.reg.USPhone($scope.shop.name)){
      native.task('请填写正确的联系方式')
      return false;
    }
    Tools.showlogin();
    Tools.getData({
      "interface_number": "010109",
      "post_content": {
        "phone":$scope.shop.name,
      }
    },function (r) {
      if(r){
        $rootScope.$ionicGoBack();
        native.task('修改联系方式成功')
      }

    })


  }



}]);
