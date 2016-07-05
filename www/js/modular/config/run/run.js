/**
 * Created by Why on 16/6/6.
 */
App.run(['$ionicPlatform','$state','$window','$cordovaPush','$rootScope','$location','$ionicHistory','$ionicPopup',function($ionicPlatform,$state,$window,$cordovaPush,$rootScope,$location,$ionicHistory,$ionicPopup) {


  $ionicPlatform.ready(function() {
    $state.go('r.tab.Home');
    $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
      //console.log($ionicHistory.viewHistory())
    });

    
    function showConfirm() {
      var confirmPopup = $ionicPopup.confirm({
        title: '<strong>退出应用?</strong>',
        template: '你确定要退出应用吗?',
        okText: '退出',
        cancelText: '取消'
      });
      confirmPopup.then(function (res) {
        if (res) {
          ionic.Platform.exitApp();
        }
        else {
          // Don't close
        }
      });
    }

    //安卓返回键的处理
    $ionicPlatform.registerBackButtonAction(function (e) {
     e.preventDefault();

        //执行一个零时的 处理函数
        if(window.androdzerofun){
            window.androdzerofun(window.androdzerofun_parms);

          return false;
        }

     // Is there a page to go back to?
     if (JSON.stringify($location.path()) == '/r/tab/Home' ) {
       showConfirm();
     } else if ($ionicHistory.backView()) {
      $ionicHistory.goBack();
     } else {
       // This is the last page: Show confirmation popup
       showConfirm();
     }
     return false;
   }, 101);




    $window.platform  = ionic.Platform.platform();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      ionic.Platform.isFullScreen = true
      //Return event listener
      $ionicPlatform.registerBackButtonAction(function(r){
      })
    }
    if (window.StatusBar) {StatusBar.styleDefault();}



    // //极光推送  初始初始化
    // window.plugins.jPushPlugin.init();
    // //调试模式
    // window.plugins.jPushPlugin.setDebugMode(true);
    // //极光推送事件处理
    // //极光数据处理  兼容ios  安卓平台  剥离数据
    // var bestripped  =  function(data){
    //   var result = {};
    //   if(device.platform == "Android") {
    //     result.title = data.alert;
    //     result.value = data.extras["cn.jpush.android.EXTRA"];
    //   }else{
    //     var iosVlue  ={};
    //     angular.forEach(data,function(value,key){
    //       if(key  !=='aps' || key  !=='_j_msgid'){
    //         iosVlue[key] = value;
    //       }
    //     })
    //     result.title = data.aps.alert;
    //     result.value = iosVlue;
    //   }
    //   return  result;
    // };
    // //点击通知的处理
    // var onOpenNotification  = function(){
    //   var alertContent  =  bestripped(window.plugins.jPushPlugin.openNotification);
    //   //推送的附带对象 数据 直接访问
    //   //window.plugins.jPushPlugin.openNotification
    // };
    // window.document.addEventListener("jpush.openNotification", onOpenNotification, false);
    // //收到推送 事件  触发
    // window.document.addEventListener("jpush.receiveNotification", function(){
    //   var alertContent  =  bestripped(window.plugins.jPushPlugin.openNotification);
    // }, false);









  });

}]);
