/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions','selectaouthfunl','storage','fromStateServ','$ionicModal',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions,selectaouthfunl,storage,fromStateServ,$ionicModal){





   //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    

      if(storage.getObject('UserInfo').need_paid  =='false'){
        $state.jiaofei  = false;
      }else{
        $state.jiaofei  = true;
      }


    if(fromStateServ.getState('r.selectAuth')){
        $scope.showtitle  = true;
        $scope.backtoprevView  =   fromStateServ.backView;
        $scope.parenttitle     =   fromStateServ.getState('r.selectAuth').title;
        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.selectAuth';
                window.androdzerofun_clback  = function(){};


    }else{
        $scope.showtitle  = false;
    }




      //注册安卓返回的处理
      window.androdzerofun  =  function(ba,com){

           if(selectaouthfunl.state){
            selectaouthfunl.state  = false;
            $rootScope.$ionicGoBack();
          }else{

                 $ionicViewSwitcher.nextDirection('back');
                $ionicNativeTransitions.stateGo(ba,{},{
                  "type": "slide",
                  "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                  "duration": 400, // in milliseconds (ms), default 400
                });


              $timeout(function(){
                  com();
                  window.androdzerofun  =   undefined;
                  window.androdzerofun_parms  =   undefined;
                  window.androdzerofun_clback  =   undefined;
              },200)

          }

      };


        window.androdzerofun_parms  =    'r.tab.Home';
        window.androdzerofun_clback  =    function(){
        $ionicHistory.clearHistory();

      };





      $scope.GoBackHome =  function(){
          if(selectaouthfunl.state){
            selectaouthfunl.state  = false;
            $rootScope.$ionicGoBack();
          }else{
            window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
          }

      }










  })








  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $scope.Modal.show();

    //$state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }

  $ionicModal.fromTemplateUrl('templates/selectModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Modal = modal;
  });



  $scope.goSelect = function () {
    $scope.Modal.hide();
  }

  $scope.newSelect = function () {
    $scope.Modal.hide();
    $state.go('r.entAuthentication',{selectData:'new'});
  }
  $scope.oldSelect = function () {
    $scope.Modal.hide();
    $state.go('r.entAuthentication',{selectData:'old'});
  }

}]);
