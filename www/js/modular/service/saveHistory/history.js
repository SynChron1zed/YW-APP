Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout','$ionicNativeTransitions',function($state,$ionicViewSwitcher,$ionicHistory,$timeout,$ionicNativeTransitions){
    var box  = {
        data: {},
        savestate:false,
        backView:function(tartg){
            $ionicViewSwitcher.nextDirection('back');
            $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
              "type": "slide",
              "direction": "up", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration": 350, // in milliseconds (ms), default 400
            });

            //$state.go(box.getState(tartg).fromState,box.getState(tartg).fromParams);
            $timeout(function(){
                // var inc  = false;
                // var overflow  = [];
                // angular.forEach($ionicHistory.viewHistory().views,function(v,k){
                //   if(inc){  overflow.push(k); }
                //   if(v.stateName  == tartg){ inc=true;  }} )
                // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});
                console.log($ionicHistory.viewHistory())
            },500)
          window.backtoinroot  = undefined;

        },
        setState: function(module, fromState, fromParams,title,viewid) {
            this.data[module] = {
                "fromState": fromState,
                "fromParams": fromParams,
                title:title,
                viewId:viewid
            };
        },
        getState: function(module) {
            return this.data[module];
        },
        stateChange: function(stateName,parms,animation){

            box.savestate = true;
            //$ionicViewSwitcher.nextDirection(animation?animation:'forward');
            // $ionicNativeTransitions.stateGo(stateName,parms,{
            //     "type": "drawer",
            //     "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
            //     "duration": 1000 // in milliseconds (ms), default 400
            // });

          $ionicNativeTransitions.stateGo(stateName,parms, {
            "type": "slide",
            "direction": "down", // 'left|right|up|down', default 'left' (which is like 'next')
            "duration": 350, // in milliseconds (ms), default 400
          });



        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },
        saveHisty:function ($histy,stateNa){
            var hostiy  = $histy.currentView();

            //注册安卓返回监听
            window.androdzerofun  =  box.backView;
            window.androdzerofun_parms  = stateNa;

            //内部固化一个返回路径  (当第三方视图完全退出时 销毁)
            window.backtoinroot      =   box.backView;
            window.backtoinroot_parms  =  stateNa;







            // var inc  = false;
            // var overflow  = [];
            // angular.forEach($ionicHistory.viewHistory().views,function(v,k){if(inc){overflow.push(k);}if(v.stateName  == stateNa){inc=true;}})
            // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});

            $timeout(function(){
                $ionicHistory.clearHistory();
            },500)

            if(this.savestate){
                this.savestate  = false;
                box.data = {};
                this.setState(stateNa,hostiy.stateName,hostiy.stateParams,hostiy.title,hostiy.viewId);
                console.log(box.data)
            }

        }

    };

    return box;
}])
