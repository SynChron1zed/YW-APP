/**
 * Created by Why on 16/6/6.
 */
App.run(['$ionicPlatform','$state','$window','$cordovaPush','$rootScope','$location','$ionicHistory','$ionicPopup','storage','Tools','$ionicNativeTransitions','$timeout','native','fromStateServ','$cordovaGeolocation',function($ionicPlatform,$state,$window,$cordovaPush,$rootScope,$location,$ionicHistory,$ionicPopup,storage,Tools,
$ionicNativeTransitions,$timeout,native,fromStateServ,$cordovaGeolocation) {
window.networonline  =  true;



              //$cordovaProgress.showBar(true, 50000);
              //退出登录
              window.outlogin  = function(Callback){
                Tools.getData({
                    "interface_number": "000003",
                    "post_content": {}
                },function (r) {
                  if(r){
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
                        native.task('退出成功');
                      }
                  }
                })
            };
      

      // storage.setObject('location',{
      //     lat:28.188874,
      //     long:112.991093
      //   });
        

  $ionicPlatform.ready(function() {

   setTimeout(function () {
     if(navigator){
       navigator.splashscreen.hide();
       }    
    }, 1000);
    
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

      if(ionic.Platform.platform()  == 'ios'){
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      }else{
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      
      cordova.plugins.Keyboard.disableScroll(true);      
      ionic.Platform.isFullScreen = true;
      //Return event listener
      //uuid
      if (window.StatusBar) {
          window.StatusBar.styleDefault();
    }

      //回退之前  退出键盘
      window.screen.lockOrientation('portrait');

      var  locldevice  =    storage.getObject('device');
        window.plugins.sim.getSimInfo(  function (result) {
        locldevice.phoneNumber  =result.phoneNumber;
        }, function(){});
        locldevice.uuid  = device.uuid;
        storage.setObject('device',locldevice)

    //获取极光推送注册id
    window.plugins.jPushPlugin.getRegistrationID( function(data) {
      try {

        var  locjPush  =    storage.getObject('jPush');
        locjPush.RegistrationID =  data;

        storage.setObject('jPush',locjPush);
        if(storage.getObject('UserInfo').user_id){
              Tools.getData({
           "interface_number": "000004",
              "post_content": {
                "pushId":data,
                "uuid":device.uuid
              }
        },function (r){
          if(r){
          }
         })
        }

      


      } catch(exception) {
        console.log(exception,'发生了错误');
      }
    });








 var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
   var lat  = position.coords.latitude;
      var long = position.coords.longitude;
        storage.setObject('location',{
          lat:lat,
          long:long
        });

    }, function(err) {
      // error
    });







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
     }else {
       // This is the last page: Show confirmation popup
       showConfirm();
     }
     return false;
   }, 100);







    $window.platform = window.platform = ionic.Platform.platform();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


    //极光推送  初始初始化
    var  jpushstat  =   window.plugins.jPushPlugin.init();
    console.log(jpushstat)

  
    //调试模式
    window.plugins.jPushPlugin.setDebugMode(true);


    //极光推送事件处理
    //极光数据处理  兼容ios  安卓平台  剥离数据
    var bestripped  =  function(data){

    var result = {};
      if(device.platform == "Android") {
        result.title = data.alert;
        result.value = data.extras['cn.jpush.android.EXTRA'];
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

      //点击通知的处理 click  jpush  event  Handle
      window.document.addEventListener("jpush.openNotification", function(){
      var alertContent  =  bestripped(window.plugins.jPushPlugin.openNotification);
      //推送的附带对象 数据 直接访问
      console.log(alertContent,'收到的数据');
      }, true);

      document.addEventListener("jpush.receiveNotification", function(e){
      var alertContent  =  bestripped(window.plugins.jPushPlugin.receiveNotification);

      var nownotilist = storage.getObject('Notice');
      if(!nownotilist.userlist){
        nownotilist.userlist = {};
      }

      if(!nownotilist.userlist[storage.getObject('UserInfo').user_id]){
          nownotilist.userlist[storage.getObject('UserInfo').user_id]  = {};
      }

      console.log(nownotilist.userlist[storage.getObject('UserInfo').user_id]);
      switch (alertContent.value.msg_type){
           case  '1':
                  //类型1 的注入
                 if(!nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics){nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics  = [];}
                  nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics.unshift(alertContent)
           break;
           case  '2':
            if(!nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage){
              nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage  = [];
            }
                  nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage.unshift(alertContent)
          break;
           default:
           return false;
      }
      storage.setObject('Notice',nownotilist);

      $timeout(function () {
       $rootScope.newnotice  = new  Date()+Math.random()*1000;
      });

      



      
    

    }, false);

    if(window.platform  !== 'ios'){
      window.updateAPP(true);
    }

    //listen for Online event
    $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
         window.networonline  =  true;
    })
    // listen for Offline event
    $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
      window.networonline  =  false;
    })





  });
 

  window.updateAPP  =  function(r){
    if(ionic.Platform.platform()  == 'ios'){
      return false;
    }
    
  
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {

      
    }

    if(window.cordova){
      window.cordova.getAppVersion.getVersionNumber(function (version) {

        if(!r){
          Tools.showlogin();
        }


        Tools.getData({
          "interface_number": "050204",
          "post_content": {
            ver_id:version
          }
        },function(r){
          if(r){
            if(r.resp_data.data.new){
               native.confirm('检查到有新的版本更新','升级易物宜得？',['更新'],function(c){
                  if(c  == 1){
                    updataAp(r.resp_data.data.downloadUrl);
                  }
              })
            }else{

                  if(!r){
                      native.task('当前是最新版本!');
                    }



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













  var    PermissionConfig = {

    //销售订单
    HomSales:{
      login:true,
      admin:true,
      company:true,
      auth:true,
      Integritygold:true
    },
    HomPurchase:{
      login:true,
      admin:false,
      company:false,
      auth:false,
      Integritygold:false
    },
    HomShopadmin:{
      login:true,
      admin:true,
      company:true,
      auth:true,
      Integritygold:true
    },
    listofgoods:{
      login:true,
      admin:true,
      company:true,
      auth:true,
      Integritygold:true
    },
    goodsclasslist:{
      login:true,
      admin:true,
      company:true,
      auth:true,
      Integritygold:true
    },
    SettingsUpdate : {
      login:true,
      admin:false,
      company:false,
      auth:false,
      Integritygold:false
    },
    companyInstall:{
      login:true,
      admin:false,
      company:true,
      auth:false,
      Integritygold:false
    },
    Addresslist:{
      login:true,
      admin:false,
      company:false,
      auth:false,
      Integritygold:false
    },



  }


  window.Permission  =  function (a,b,c) {
    if(a   == 'r.HomSales' ){
        return  handeposins(a,PermissionConfig.HomSales)
    }
    if(a   ==  'r.HomPurchase'){
      return  handeposins(a,PermissionConfig.HomPurchase)
    }
    if(a   ==  'r.HomShopadmin'){
      return  handeposins(a,PermissionConfig.HomShopadmin)
    }
    if(a   ==  'r.listofgoods'){
      return  handeposins(a,PermissionConfig.listofgoods)
    }
    if(a   ==  'r.goodsclasslist'){
      return  handeposins(a,PermissionConfig.goodsclasslist)
    }
    if(a   ==  'r.tab.SettingsUpdate'){
      return  handeposins(a,PermissionConfig.SettingsUpdate)
    }
     if(a   ==  'r.companyInstall'){
      return  handeposins(a,PermissionConfig.companyInstall)
    }
    if(a   ==  'r.Addresslist'){
      return  handeposins(a,PermissionConfig.Addresslist)
    }

    




    






  };




  var  handeposins   =  function (ruter,targ) {
        var  nowjurisdiction  = storage.getObject('UserInfo');

        if(targ.login){
            if(!nowjurisdiction.user_id){
                   native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
                        if(c  == 1){
                            nopossionchangrout(ruter,'r.login')
                        }
                  })
                  return  true;
            }
        }

          if(targ.company){
            if(!nowjurisdiction.company_id){
                  native.task('请先加入公司');
                  return  true;
              }
          }

          if(targ.admin){
            if(!nowjurisdiction.is_admin  == '1'){
                  native.task('该操作需要管理员身份');
                  return  true;
            }
        }

          if(targ.auth){
            //nowjurisdiction.auth_status  == '3'
            if(nowjurisdiction.auth_status  == '0' ){
                     native.confirm('该操作需要实名认证','提示',['认证','取消'],function(c){
                        if(c  == 1){
                            nopossionchangrout(ruter,'r.selectAuth')
                        }
                  })
                  return  true;
            }
             if(nowjurisdiction.auth_status  == '3' ){
                     native.confirm('认证审核不通过请重新认证','提示',['认证','取消'],function(c){
                        if(c  == 1){
                            nopossionchangrout(ruter,'r.selectAuth')
                        }
                  })
                return  true;
            }
            if(nowjurisdiction.auth_status  == '1' ){
                native.task('请耐心等待认证审核!');
                return  true;
            }
        }

        if(targ.Integritygold){

            if(nowjurisdiction.need_paid){
                      native.confirm('请先交纳诚信金','提示',['确认','取消'],function(c){
                        if(c  == 1){
                            nopossionchangrout(ruter,'r.selectPaydues')
                        }
                  })
                  return  true;
            }
        }
















  };








function  nopossionchangrout  (nowrout,change,parim){

      if(nowrout  ==  'r.tab.SettingsUpdate'){
        fromStateServ.stateChange(change,parim?parim:{});
        return  false;
      }

      if(nowrout.indexOf('tab')   !=  -1){
                                      $state.go(change,parim?parim:{});
                              }else{
                        fromStateServ.stateChange(change,parim?parim:{});
                }
      }

}]);



