Ctr.controller('InputamountCtr',['$scope','fromStateServ','Tools','native','$stateParams','$state',function($scope,fromStateServ,Tools,native,$stateParams,$state){

$scope.palu  = {}
$scope.palu.money  =  undefined;
$scope.$watch('palu.money',function(newValue,oldValue, scope){
      if(newValue   == undefined){
                $scope.palu.money  = undefined;    
            }else   if(isNaN(Math.abs(newValue))){
              $scope.palu.money  = undefined;
            }else{
                $scope.palu.money   =Math.abs($scope.palu.money);
            }
})

$scope.quzheng     =  function(){
        $scope.palu.money  = Math.abs($scope.palu.money);
}

$scope.$on('$ionicView.beforeEnter',function(){
            if($stateParams.monye){
                $scope.palu.money  = parseFloat($stateParams.monye); 
                $scope.noint=  true;
            }else{
                $scope.palu.money  = undefined;
            }    
            if(fromStateServ.getState('r.Inputamount')){
                $scope.bakcsatae  = true;
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Inputamount').title;
                window.androdzerofun  =    fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Inputamount';
                window.androdzerofun_clback  = function(){};
            }else{
                $scope.showtitle  = false;
            }

            
  })

$scope.pay  =  function(){
    if($scope.palu.money){
        //$stateParams.type
        //parseFloat($scope.palu.money).toFixed(2);
        if($scope.bakcsatae){

            $state.go('r.Selectpaymentmethod',{type:$stateParams.type,monye:parseFloat($scope.palu.money).toFixed(2),toSt:'xxx'})

        }else{

            $state.go('r.Selectpaymentmethod',{type:$stateParams.type,monye:parseFloat($scope.palu.money).toFixed(2)})

        }
        
        //$state.go('r.Selectpaymentmethod')

    }else{
        native.task('请输入金额')
    }
}

}])
.controller('SelectpaymentmethodCtr',['$scope','Tools','native','$stateParams','storage','$ionicHistory','$timeout','$ionicViewSwitcher','$ionicNativeTransitions',function($scope,Tools,native,$stateParams,storage,$ionicHistory,$timeout,$ionicViewSwitcher,$ionicNativeTransitions){
    $scope.plaufun  = [
        {
         name:'支付宝',
         icon:'',
         select:true,
         id:1
        }
    ];
    $scope.palin  = {};


    $scope.palin.money  =$stateParams.monye;
    $scope.palin.type  =$stateParams.type;

$scope.swchpaylfun = function(item){
    if(!item.select){
        angular.forEach($scope.plaufun,function(xx){
                xx.select  =  false;
        })         
        item.select = true;       
    }

}





$scope.pay  = function(){
            
            var buyid  = undefined;
            var info  = storage.getObject('UserInfo')

            if($scope.palin.type  == '1' ||  $scope.palin.type  == '3'){
                    //公司年费
                    if(info.company_id){
                        buyid  = info.company_id
                    }else{
                        native.task('当前账号没有加入公司')
                        return false;
                    }
            }
            if($scope.palin.type  == '2'){
                    //个人冲积分
                     if(info.user_id){
                        buyid  = info.user_id
                    }else{
                        native.task('获取不到用户id')
                        return false;
                    }
            }
            var payfunl =  undefined;
              angular.forEach($scope.plaufun,function(xx){
                        if(xx.select){
                                payfunl   =  xx.id
                        } 
                })   
                switch (payfunl){
                    case 1:
                         //支付宝
                          Tools.pay.alipaly({
                            type:$scope.palin.type,
                            buyer_id:buyid,
                            money:$scope.palin.money
                          },function(r){

                                if($scope.palin.type   =='1'){
                                       var  nedpas   =   storage.getObject('UserInfo');
                                       nedpas.need_paid  = false;
                                       storage.setObject('UserInfo',nedpas);
                                }
                                //alert('鹅鹅鹅鹅鹅鹅饿')
                                if($stateParams.toSt){
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
                                    },100)
                                }else{
                                    $ionicViewSwitcher.nextDirection('back');
                                    $ionicHistory.goBack(-2);
                                    $timeout(function(){
                                        if($ionicHistory.currentView().url.indexOf('tab')  != -1){
                                                    $ionicHistory.clearHistory();
                                        }
                                    },100)
                                }

                                var  user  =   storage.getObject('UserInfo');
                                user.integral   = parseFloat(user.integral)+parseFloat($scope.palin.money);
                                storage.setObject('UserInfo',user);


                            native.task('支付成功',5000);






                          },function(r){
                            //native.task('');

                          });

                    break;
                    default:
                        native.task('请选择支付方式')
                    break;
                }


    }



}])