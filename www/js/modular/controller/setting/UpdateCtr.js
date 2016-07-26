/**
 * Created by Administrator on 2016/7/7.
 */
Ctr.controller('SettingsUpdateCtr',['$scope','storage',function($scope,storage){
  
  $scope.$on('$ionicView.beforeEnter',function(){
          $scope.header  =    window.qiniuimgHost+storage.getObject('UserInfo').avatar+'?imageView2/1/w/130/h/130';
                 
          $scope.$apply();   
  })



}]);
