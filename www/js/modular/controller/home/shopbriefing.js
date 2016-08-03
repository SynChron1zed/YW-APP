/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','Tools','$stateParams','$rootScope',function($scope,native,$state,Tools,$stateParams,$rootScope){

  $scope.shop  ={};
  $scope.shop.dec  = $stateParams.nowdec;

  $scope.querybriefing   =  function () {
    if(!$scope.shop.dec){
      native.task('请填写店铺简介')
      return false;
    }
    Tools.getData({
      "interface_number": "010104",
      "post_content": {
        "description": $scope.shop.dec,
      }
    },function (r) {
          if(r){

                $rootScope.$ionicGoBack();
                native.task('修改店铺简介成功');

          }

    })


  }



}]);
