/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions','selectaouthfunl','storage','fromStateServ',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions,selectaouthfunl,storage,fromStateServ){



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){


    if(storage.getObject('UserInfo').need_paid  =='false'){
      $state.jiaofei  = false;
    }else{
      $state.jiaofei  = true;
    }


    if(fromStateServ.getState('r.selectPaydues')){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.selectPaydues').title;
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






}]);
