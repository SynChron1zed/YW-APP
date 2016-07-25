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

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){

      $scope.identity.inverse  = r;
      
      

    });
  }
  
  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };
  
  //基本表单信息
  $scope.from   = {};
  
  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive || !$scope.identity.inverse){
      $ionicPopup.alert({
        title:'请上传审核照片',
        okText:'确认'
      });
      return false;
    }
    if( !$scope.from.License  || !$scope.from.mechanism  ||  !$scope.from.legal ){
      $ionicPopup.alert({
        title:'请填写完整基本信息',
        okText:'确认'
      });
      return false;
    }

    Tools.showlogin();
       //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){

    Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"0",
          legal:$scope.from.legal,
          "license": $scope.from.License,
          "certificate_no": $scope.from.mechanism,
          "license_img":f[0].hash,
          "certificate_img":f[1].hash
        }
      },function(r){
        if(r){
          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页        
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
