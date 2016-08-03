/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','Tools','$stateParams','$rootScope',function($scope,native,Tools,$stateParams,$rootScope) {


      $scope.shop  = {};
      $scope.shop.name  = $stateParams.nowname;
      $scope.clear  = function () {
          $scope.shop.name   = undefined;
      } 
      $scope.queryname  = function () {
      if(!$scope.shop.name){
        native.task('请填写店铺名称')
        return false;
      }
      Tools.showlogin();
      Tools.getData({
        "interface_number": "010103",
        "post_content": {
        "name":$scope.shop.name,
        } 
      },function (r) {
        if(r){
          $rootScope.$ionicGoBack();
          native.task('修改店铺名称成功')
        }
        
      }) 
        

      }




}]);
