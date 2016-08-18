/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$scope','$state','Tools','$ionicViewSwitcher','$ionicNativeTransitions','$timeout','$ionicHistory','fromStateServ','$stateParams',function($scope,$state,Tools,$ionicViewSwitcher,$ionicNativeTransitions,$timeout,$ionicHistory,fromStateServ,$stateParams){



   //对安卓返回键的  特殊处理  tabs
 /* $scope.$on('$ionicView.beforeEnter',function(){
      //注册安卓返回的处理
      window.androdzerofun  =  function(ba,com){
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
      };
      window.androdzerofun_parms  =    'r.tab.Home';
      window.androdzerofun_clback  =    function(){
        $ionicHistory.clearHistory();
      };

      $scope.GoBackHome =  function(){
          window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
      }
  })
*/



  $scope.$on('$ionicView.beforeEnter',function(event, data){


    if(fromStateServ.getState('r.selectPaydues')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.selectPaydues').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }

  });



}]);
