/**
 * Created by Why on 16/6/6.
 */
App.run(['$ionicPlatform','$state','$window','$cordovaPush','$rootScope','$location','$ionicHistory','$ionicPopup','storage','Tools','$ionicNativeTransitions','$timeout','native',function($ionicPlatform,$state,$window,$cordovaPush,$rootScope,$location,$ionicHistory,$ionicPopup,storage,Tools,
$ionicNativeTransitions,$timeout,native) {
  
  //$cordovaProgress.showBar(true, 50000);
  //退出登录
              window.outlogin  = function(Callback){

              window.Token   = undefined;
              window.token_phone   = undefined;
              storage.setObject('UserInfo',{
                    real_name:'还没有登录!',
                    avatar:window.defaultUserheader,
                    integral:'0.00',
                    sex:'./img/icon_man@3x.png',
                })
                if(Callback){
                    Callback();
                }

            };


  $ionicPlatform.ready(function() {
    //$state.go('r.selectAuth');
    $state.go('r.tab.Home');


    //初始化    用户信息
    if(!storage.getObject('UserInfo').user_id){
      //没有登录写入   默认基本  信息
      storage.setObject('UserInfo',{
          real_name:'还没有登录',
          avatar:window.defaultUserheader,
          integral:'0.00',
          sex:'./img/icon_man@3x.png',
      })
    }





    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
      ionic.Platform.isFullScreen = true;



      //Return event listener
      //uuid
      setTimeout(function () {
          navigator.splashscreen.hide();
           }, 1000);
      //回退之前  退出键盘
      window.screen.lockOrientation('portrait');

      var  locldevice  =    storage.getObject('device');
        window.plugins.sim.getSimInfo(  function (result) {
        locldevice.phoneNumber  =result.phoneNumber;
        }, function(){});
        locldevice.uuid  = device.uuid;
        storage.setObject('device',locldevice)

    }else{
        //这里是浏览器写的是固定的值
        //uuid
        var     locldevice  =    storage.getObject('device');
                locldevice.phoneNumber  ='13517437500';
                locldevice.uuid  =   'dsadsa-dsad-12321sad-das' ;
                storage.setObject('device',locldevice);
        var     locjPush  =    storage.getObject('jPush');
                locjPush.RegistrationID =  'janiokq-text-jpush';
                storage.setObject('jPush',locjPush);
    }

    if (window.StatusBar) {StatusBar.styleDefault();}

      window.noNavtionsback =  function (rooter,parmgs){
        $ionicNativeTransitions.stateGo(rooter,parmgs,{
          "type": "slide",
          "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
          "duration": 300, // in milliseconds (ms), default 400
        });

        $timeout(function(){
          $ionicHistory.clearHistory();
        },300)
      };




    //初始读取toke =  phone  初始化登录状态
    var userinfo  = storage.getObject('UserInfo');
    window.Token  =  userinfo.token?userinfo.token:undefined;
    window.Token_phone  =  userinfo.phone?userinfo.phone:undefined;



    function showConfirm() {
        native.confirm('你确定要退出应用吗?','退出应用?',['退出','取消'],function(c){
            if(c  == 1){
              ionic.Platform.exitApp();
            }
          })
    }



    //安卓返回键的处理
    $ionicPlatform.registerBackButtonAction(function (e) {
      e.preventDefault();


      //返回一个没有使用  原始过度的页面
      if(window.noNavtionsbackRootuer){
        window.noNavtionsback(window.noNavtionsbackRootuer);
        return false;
      }

    //执行一个零时的 处理函数
        if(window.androdzerofun){
            window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
          return false;
        }

     // Is there a page to go back to?
     if (JSON.stringify($location.path()) == '/r/tab/Home' ) {
       showConfirm();
     } else if ($ionicHistory.backView()) {
       $rootScope.$ionicGoBack();

     } else {
       // This is the last page: Show confirmation popup
       showConfirm();
     }
     return false;
   }, 100);







    $window.platform = window.platform = ionic.Platform.platform();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


    //极光推送  初始初始化
    window.plugins.jPushPlugin.init();
    //调试模式
    //window.plugins.jPushPlugin.setDebugMode(true);

    //获取极光推送注册id
    window.plugins.jPushPlugin.getRegistrationID( function(data) {
      try {
        var  locjPush  =    storage.getObject('jPush');
        locjPush.RegistrationID =  data;
        storage.setObject('jPush',locjPush);
      } catch(exception) {
        console.log(exception,'发生了错误');
      }
    });

    //极光推送事件处理
    //极光数据处理  兼容ios  安卓平台  剥离数据
    var bestripped  =  function(data){
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

    if(window.platform  !== 'ios'){
      window.updateAPP();
    }
  });

  window.updateAPP  =  function(){
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
    }
    if(window.cordova){
      window.cordova.getAppVersion.getVersionNumber(function (version) {
        Tools.showlogin();
        Tools.getData({
          "interface_number": "050204",
          "post_content": {
            ver_id:version
          }
        },function(r){
          if(r){
            if(r.resp_data.data.new){
               native.confirm('检查到有新的版本更新','升级易物宜得？',['更新','取消'],function(c){
                  if(c  == 1){
                    updataAp(r.resp_data.data.downloadUrl);
                  }
              })
            }else{
              native.task('当前是最新版本!');
            }
          }
        })
      });
    }else{
      alert('当前环境无法更新APP!');
    }
  };
  function  updataAp   (downloadUrl){
                cordova.plugin.pDialog.init({
                  theme: 'HOLO_DARK',
                  title: '更新app',
                  message : '正在从服务获取最新数据!',
                  progressStyle: 'HORIZONTAL'
                })
            var  filpath  =  cordova.file. externalCacheDirectory+'updata.apk';
            var fileTransfer = new FileTransfer();
            fileTransfer.onprogress = function(progressEvent) {
                      if (progressEvent.lengthComputable) {
                      var loding   =  progressEvent.loaded/progressEvent.total;
                          cordova.plugin.pDialog.setProgress(  parseInt((loding*100).toFixed(0)) );
                          if(loding  == 1){
                              cordova.plugin.pDialog.dismiss();
                                cordova.plugins.fileOpener2.open(
                                      filpath,
                                      'application/vnd.android.package-archive',
                                      {
                                          error : function(){
                                              native.task('APP安装失败');
                                          },
                                          success : function(){
                                          }
                                      }
                                  );
                                  native.task('APP更新完毕,正在安装');
                          }
                      } else {
                        native.task('网络连接中断....')
                      }
          };
          fileTransfer.download(
                          downloadUrl,
                          filpath,
                          function(entry) {
                              console.log("download complete: " + entry.toURL());
                          },
                          function(error) {
                              console.log("download error source " + error.source);
                              console.log("download error target " + error.target);
                              console.log("upload error code" + error.code);
                          },
                          false,
                          {}
                      )
  }






}]);
