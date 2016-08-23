Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout','$ionicNativeTransitions',function($state,$ionicViewSwitcher,$ionicHistory,$timeout,$ionicNativeTransitions){
    var box  = {
        data: {},
        savestate:false,
        backView:function(tartg,clback){

          if(window.lockingJump) return  false;
          window.lockingJump  =  true;
          $ionicViewSwitcher.nextDirection('back');
          if(window.cordova  && window.cordova.plugins.Keyboard.isVisible ){
           window.cordova.plugins.Keyboard.close();
                    $timeout(function(){
                                $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                                "type": "slide",
                                "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                                "duration":550, // in milliseconds (ms), default 400
                                slowdownfactor: 1,
                                iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
                                androiddelay: 20, // same as above but for Android, default -1
                                fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                                fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                                triggerTransitionEvent: '$ionicView.beforeEnter', // internal ionic-native-transitions option
                          });
                        },300)
                           $timeout(function(){
                                    window.lockingJump =  false;
                            },860)
                  }else{
                      
                    $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                            "type": "slide",
                            "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                            "duration":550, // in milliseconds (ms), default 400
                            slowdownfactor: 1,
                            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
                            androiddelay: 20, // same as above but for Android, default -1
                            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                            triggerTransitionEvent: '$ionicView.beforeEnter', // internal ionic-native-transitions option
                    });
                         $timeout(function(){
                                    window.lockingJump =  false;
                        },560)
                  }
        $timeout(function () {
            $ionicHistory.clearHistory();
                if(clback){
                        clback()
                }
              window.backtoinroot  = undefined;
              window.androdzerofun  =  undefined;
              window.androdzerofun_parms  = undefined;
              window.androdzerofun_clback  = undefined;
              window.backtoinroot_parms  =  undefined;
            }, 100);
        },
        setState: function(module, fromState, fromParams,title,viewid,backV) {
            this.data[module] = {
                "fromState": fromState,
                "fromParams": fromParams,
                 title:title,
                 viewId:viewid,
            };
        },
        getState: function(module) {
            return this.data[module];
        },
        stateChange: function(stateName,parms,animation){

            if(window.Permission(stateName,parms,animation)){
                            return  false;
            }

            if(window.lockingJump) return  false;
            window.lockingJump =  true;
            box.savestate = true;

            $ionicViewSwitcher.nextDirection('forward');
            $ionicNativeTransitions.stateGo(stateName,parms, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.beforeEnter', // internal ionic-native-transitions option
            });

            $timeout(function(){
                    window.lockingJump =  false;
            },560)

        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },

        saveHisty:function ($histy,stateNa){
            //|| box.getState(stateNa)

            if(this.savestate  ){
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
