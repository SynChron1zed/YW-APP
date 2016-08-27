/**
 * Created by Administrator on 2016/8/26.
 */
Ctr.controller('stretchOneCtr',['$scope','$interval','$timeout','$ionicPlatform','$cordovaNativeAudio','$cordovaDeviceMotion','fromStateServ','$sce',function($scope,$interval,$timeout,$ionicPlatform,$cordovaNativeAudio,$cordovaDeviceMotion,fromStateServ,$sce) {
//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法


  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.stretchOne')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.stretchOne').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.stretchOne';
      window.androdzerofun_clback = function () {
      };



    }
  });



  
  $scope.MyUrl="yiwu.com/index.php?r=web/prize/index&token=123&token_phone=%27%27"


  $scope.trustSrc = $sce.trustAsResourceUrl("http://" + $scope.MyUrl)



}]);
