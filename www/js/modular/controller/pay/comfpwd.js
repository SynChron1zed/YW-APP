Ctr.controller('comforderpayPwdCtr',['$scope','Tools','fromStateServ','native','$timeout','$state','storage',function($scope,Tools,fromStateServ,native,$timeout,$state,storage){

    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      $scope.showme  =  true;
      var  c   =   document.querySelector('#setmapidfff');
      c.className = "action-sheet-backdrop";
      $timeout(function(){
        c.className  ="action-sheet-backdrop cutom-sheet"

      },500);
      $scope.shopcartnumber = 0;
      angular.forEach($scope.shopcart,function(key){
        $scope.shopcartnumber  =  ($scope.shopcartnumber+key.number);
      })
    };
    

  $scope.setmendianmsg  = function(){
      $scope.setallcationstate  = true;
  }

  $scope.stopporp  = function(e){e.stopPropagation();}
  $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.comforderpayPwd')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;   
                $scope.parenttitle     =   fromStateServ.getState('r.comforderpayPwd').title;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.comforderpayPwd';
                window.androdzerofun_clback  = function(){};
            }else{
                $scope.showtitle  = false;
            }
  })



$scope.$watch('palu.money',function(newValue,oldValue, scope){
            
            if(newValue   == undefined){
                $scope.palu.money  = undefined;    
            }else if(isNaN(Math.abs(newValue))){
              $scope.palu.money  = undefined;
            }else{
                    $scope.palu.money   =Math.abs($scope.palu.money);
            }
    })
$scope.quzheng     =  function(){
        $scope.palu.money  = Math.abs($scope.palu.money);
}


  $scope.palu = {};
  $scope.pay   =  function(r){








      var pwd  = undefined;
      if(r){
          if($scope.palu.pwd  &&  $scope.palu.reppwd ){
                if($scope.palu.pwd   !== $scope.palu.reppwd){
                        native.task('密码不一致,请确认密码');
                }else{
                        pwd  =  window.md5($scope.palu.reppwd);
                }
          }else{
              native.task('请填写密码');
          }
      }
    if(!$scope.palu.money){
        native.task('请输入金额');
    }else{
        
        if(parseFloat(storage.getObject('UserInfo').integral) < $scope.palu.money){
                    //积分不足
                    native.task('积分不足');
                    native.confirm('积分不足,当前积分:￥'+storage.getObject('UserInfo').integral,'提示',['充值','取消'],function(c){
                            if(c  == 1){
                                $state.go('r.Inputamount',{type:2})
                    }})

                return  false;
        }


        Tools.showlogin();
        Tools.getData({
              "interface_number": "050205",
                "post_content": {
                    "tradeIntegral": parseFloat($scope.palu.money).toFixed(2),  //交易的积分
                    "tradePass":pwd
                }
        },function(r){
            if(r){
                if(r.resp_data.isNeedPass == 1){
                    $scope.setmendianmsg()
                }else{
                    Tools.getData({
                        "interface_number": "020707",
                        "post_content": {
                            tradeIntegral:parseFloat($scope.palu.money).toFixed(2)
                        }
                    },function(s){
                            if(s){

                                $state.go('r.ercodepayPage',{ecode:s.resp_data.key,monye:parseFloat($scope.palu.money).toFixed(2)});

                            }
                    })


                }



            }
        })
    }
  }
}])

Ctr.controller('ercodepayPageCtr',['$scope','$state','$timeout','$ionicHistory','fromStateServ','$stateParams','$ionicNativeTransitions','Tools',function($scope,$state,$timeout,$ionicHistory,fromStateServ,$stateParams,$ionicNativeTransitions,Tools){
        window.androdzerofun = function(r,x){
            $scope.GoBackHome()
        };
        window.androdzerofun_parms = 'r.tab.Home';
        window.androdzerofun_clback = function () {};

        $scope.GoBackHome  = function(){
            $ionicNativeTransitions.stateGo('r.tab.Settings',{}, {
            "type": "slide",
             "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":400, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });
            $timeout(function(){
                $ionicHistory.clearHistory();
            },200)        
    }

$scope.refl =  function(){
    Tools.getData({
    "interface_number": "020707",
    "post_content": {
                    tradeIntegral:$stateParams.monye,
                    key:$stateParams.ecode
        }
    },function(r){
        if(r){
            $scope.data.keyimg   = 'http://pan.baidu.com/share/qrcode?w=400&h=400&url='+r.resp_data.key
            $scope.$broadcast('scroll.refreshComplete');
        }
    })
}

var inter  =  undefined;
$scope.$on('$ionicView.beforeEnter',function(){
    inter  = setInterval(function(){
        $timeout(function(){
            $scope.refl()
        })
    },62000)

    $scope.data  = {};
    $scope.data.money   = $stateParams.monye;
    $scope.data.key   = $stateParams.ecode; 
    $scope.data.keyimg   = 'http://pan.baidu.com/share/qrcode?w=400&h=400&url='+$scope.data.key;
})

    $scope.$on('$ionicView.beforeLeave', function() {
            clearInterval(inter)
        });


}])
