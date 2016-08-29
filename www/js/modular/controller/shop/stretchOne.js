/**
 * Created by Administrator on 2016/8/26.
 */
Ctr.controller('stretchOneCtr',['$scope','$interval','$timeout','$ionicPlatform','$cordovaNativeAudio','$cordovaDeviceMotion','fromStateServ','$sce','Tools','storage','$stateParams','$ionicHistory',function($scope,$interval,$timeout,$ionicPlatform,$cordovaNativeAudio,$cordovaDeviceMotion,fromStateServ,$sce,Tools,storage,$stateParams,$ionicHistory) {
//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.id  = $stateParams.id;
$scope.data = true;
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

  if($scope.id){
    Tools.getData({
      "interface_number": "020208",
      "post_content": {
        "token":"",
        "token_phone": "",
        "activity_id":$scope.id
      }

    },function(r){

      if(r){
        $scope.Url = r.resp_data.link;
        $scope.id = r.resp_data.id;

        if(!$scope.Url){
          //native.task('该活动暂未开放，敬请期待');

          return false


        }else{

          init();


        }

      }else{
        return false

      }

    });
  }else{



    Tools.getData({
      "interface_number": "020207",
      "post_content": {
        "token":"",
        "token_phone": "",

      }

    },function(r){

      if(r){
          $scope.Url = r.resp_data.link;
         $scope.id = r.resp_data.id;

          if(!$scope.Url){
            //native.task('该活动暂未开放，敬请期待');

            return false


          }else{

            init();


          }

      }else{
        return false

      }

    });


  }





function  init() {


    $scope.token = storage.getObject('UserInfo').token;
    $scope.token_phone =  storage.getObject('UserInfo').phone;

      $scope.Url1= "yiwu.com/index.php?r=web/prize/index"
    //$scope.MyUrl="yiwu.com/index.php?r=web/prize/index&token=123&token_phone=%27%27"

    $scope.MyUrl=$scope.Url+'&token='+$scope.token+'&token_phone='+$scope.token_phone+'&activity_id='+$scope.id
    //$scope.trustSrc = $sce.trustAsResourceUrl($scope.Url)

    $scope.trustSrc = $sce.trustAsResourceUrl($scope.MyUrl)


    console.log( $scope.MyUrl )
    console.log( $scope.trustSrc )


}








}]);
