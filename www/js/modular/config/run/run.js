/**
 * Created by Why on 16/6/6.
 */
App.run(['$ionicPlatform','$state','$window','$cordovaPush','$rootScope','$location','$ionicHistory','$ionicPopup','storage',function($ionicPlatform,$state,$window,$cordovaPush,$rootScope,$location,$ionicHistory,$ionicPopup,storage) {


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



    $window.platform = window.platform = ionic.Platform.platform();
    console.log(window.platform);




    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      ionic.Platform.isFullScreen = true;
      //Return event listener
      $ionicPlatform.registerBackButtonAction(function(r){
      });

        //uuid
        var  locldevice  =    storage.getObject('device');
        window.plugins.sim.getSimInfo(  function (result) {
        locldevice.uuid.phoneNumber  =result.phoneNumber;
        }, function(){});
        locldevice.uuid  = device.uuid;
        storage.setObject('device',locldevice);
      
    }else{
        //这里是浏览器写的是固定的值
        //uuid
        var     locldevice  =    storage.getObject('device');
                locldevice.uuid.phoneNumber  ='13517437500';
                locldevice.uuid  =   'dsadsa-dsad-12321sad-das' ;
                storage.setObject('device',locldevice);
        var     locjPush  =    storage.getObject('jPush');
                locjPush.RegistrationID =  'janiokq-text-jpush';
                storage.setObject('jPush',locldevice);
    }

    if (window.StatusBar) {StatusBar.styleDefault();}







    //极光推送  初始初始化
    window.plugins.jPushPlugin.init();
    //调试模式
    //window.plugins.jPushPlugin.setDebugMode(true);

    //获取极光推送注册id
    window.plugins.jPushPlugin.getRegistrationID( function(data) {
      try {
        var  locjPush  =    storage.getObject('jPush');
        locjPush.RegistrationID =  data;
        storage.setObject('jPush',locldevice);
      } catch(exception) {
        console.log(exception,'发生了错误');
      }
    });


    //极光推送事件处理
    //极光数据处理  兼容ios  安卓平台  剥离数据
    var bestripped  =  function(data){

      console.log(JSON.stringify(data));

      var result = {};
      if(device.platform == "Android") {
        result.title = data.alert;
        result.value = data.extras["cn.jpusdroid.EXTRA"];
      }else{
        var iosVlue  ={};
        angular.forEach(data,function(value,key){
          if(key  !=='aps' || key  !=='_j_msgid'){
            iosVlue[key] = value;
          }
        })
        result.title = data.aps.alert;
        result.value = iosVlue;
      }
      return  result;
    };





    //点击通知的处理
    var onOpenNotification  = function(){
      var alertContent  =  bestripped(window.plugins.jPushPlugin.openNotification);
      //推送的附带对象 数据 直接访问
      //window.plugins.jPushPlugin.openNotification
      alert(' 点击事件');
    };



    window.document.addEventListener("jpush.openNotification", onOpenNotification, true);

    //收到推送 事件  触发
    window.document.addEventListener("jpush.receiveNotification", function(){

      var alertContent  =  bestripped(window.plugins.jPushPlugin.openNotification);
      alert('收到时间');

    }, true);








  });

}]);
