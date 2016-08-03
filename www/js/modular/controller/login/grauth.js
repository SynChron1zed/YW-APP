/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('grAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','native','$ionicActionSheet','Tools','$ionicPopup','storage','$state','$ionicNativeTransitions','$timeout',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,native,$ionicActionSheet,Tools,$ionicPopup,storage,$state,$ionicNativeTransitions,$timeout){


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };

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

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  };

  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };

  $scope.form = {};

  //提交审核
  $scope.Submitaudit  =  function (){




    if(!$scope.identity.Positive || !$scope.identity.inverse){

      native.task('请上传审核照片')
      return false;
    }
    if(!$scope.form.id ||  !$scope.form.name ){
      native.task('请填写完审核信息')
      return false;
    }

    Tools.showlogin();
    //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){
      //发送请求
      Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"1",
          "card_no":$scope.form.id+"",
          name:$scope.form.name,
          "card_front_img":f[0].key,
          "card_back_img":f[1].key
        }
      },function(r){
        if(r){

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
    },'auth_'+(storage.getObject('UserInfo').company_id)+'_');


  }
  console.log(  JSON.stringify(storage.getObject('UserInfo')))

}]);
