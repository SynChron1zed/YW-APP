Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout','$ionicNativeTransitions',function($state,$ionicViewSwitcher,$ionicHistory,$timeout,$ionicNativeTransitions){
    var box  = {
        data: {},
        savestate:false,
        backView:function(tartg,clback){
            $ionicViewSwitcher.nextDirection('back');
                $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                            "type": "slide",
                            "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                            "duration": 400, // in milliseconds (ms), default 400
                            });
                    $timeout(function () {
                    if(clback){
                        clback()
                    }
              window.backtoinroot  = undefined;
              window.androdzerofun  =  undefined;
              window.androdzerofun_parms  = undefined;
              window.androdzerofun_clback  = undefined;
              window.backtoinroot_parms  =  undefined;
              $ionicHistory.clearHistory();
            }, 100);

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
          $ionicViewSwitcher.nextDirection('forward');
          $ionicNativeTransitions.stateGo(stateName,parms, {
            "type": "slide",
            "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
            "duration": 400, // in milliseconds (ms), default 400
          });
          
        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },        
        saveHisty:function ($histy,stateNa){

            if(this.savestate){
                    var hostiy  = $histy.currentView();
                   //注册安卓返回监听
                    window.androdzerofun  =  box.backView;
                    window.androdzerofun_parms  = stateNa;
                    window.androdzerofun_clback  = window.anbackAndcals;
                    //内部固化一个返回路径  (当第三方视图完全退出时 销毁)
                    window.backtoinroot      =   box.backView;
                    window.backtoinroot_parms  =  stateNa;

                this.savestate  = false;
                box.data = {};
                this.setState(stateNa,hostiy.stateName,hostiy.stateParams,hostiy.title,hostiy.viewId);
            }





        }

    };

    return box;
}])
