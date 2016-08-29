/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions','selectaouthfunl','storage','fromStateServ','Tools',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions,selectaouthfunl,storage,fromStateServ,Tools){

               window.androdzerofun  = function(){
                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });
                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
               };
                window.androdzerofun_parms  = '';
                window.androdzerofun_clback  = function(){};
                $scope.backtoprevView  =  function(){
                     $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });
                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)                            
                }
      $scope.renzhi  =function(){
        Tools.showlogin();
        Tools.getData({
        "interface_number":"000005",
        "post_content":{}      
        },function(r){
          if(r){
            $state.go('r.Inputamount',{type:1,monye:r.resp_data.money})
          }
        })
        

      }


  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

          ///判断是否认证
          if(storage.getObject('UserInfo').need_paid){
            $scope.norepsit  = false;
          }else{
            $scope.norepsit  = true;
          }
          if(fromStateServ.getState('r.selectPaydues')){
            $scope.showtitle  = true;
            $scope.parenttitle     =   fromStateServ.getState('r.selectPaydues').title;   
          }else{
            $scope.showtitle  = false;
          }


  })


}]);
