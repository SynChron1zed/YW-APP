/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','Tools','$ionicPopup','$timeout','native','$ionicNativeTransitions','storage','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,Tools,$ionicPopup,$timeout,native,$ionicNativeTransitions,storage,$state){


  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;


    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };



  //基本表单信息
  $scope.from   = {};

  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive){

      native.task('请上传审核照片')
      return false;
    }
    if( !$scope.from.License   ||  !$scope.from.legal  ){
      native.task('请填写完整基本信息');
      return false;
    }
    if($scope.from.License.length<18){
      native.task('请填写正确的社会信用代码');
      return false;
    }

    Tools.showlogin();
       //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,

    ],function(f){

    Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"0",
          legal:$scope.from.legal,
          "license": $scope.from.License,
          "credit_code":f[0].key,
        }
      },function(r){
        if(r){
          var setin   =  storage.getObject('UserInfo');
          setin.auth_status   ='1';
          storage.setObject('UserInfo',setin);

          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页
            selectaouthfunl.state=false;
            $ionicViewSwitcher.nextDirection('back');
            $ionicNativeTransitions.stateGo('r.tab.Settings',{}, {
              "type": "slide",
              "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration": 400, // in milliseconds (ms), default 400
            });
            $timeout(function(){
              $ionicHistory.clearHistory();
            },100)


          }
        }


      });

    },'auth_'+(storage.getObject('UserInfo').company_id)+'_')





  }









}]);
