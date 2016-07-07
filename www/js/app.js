/**
 * Created by Why on 16/6/6.
 */
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var App = angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services','ionicLazyLoad']);
//hidden  tabs  directive
App.directive('hideTabs',function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = true;
                    console.log($rootScope.hideTabs)


                });
            });
            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});
//drag  left right box   directive
App.directive('draggable', function($document, $timeout) {
    return {
        restrict :  'A',
        link:function(scope, element, attr) {
            var now = 0 ;
            ionic.onGesture('dragstart',function(e){

                element[0].style.transitionDuration='0ms';

                var position   = element[0].style.transform.replace('translateX(','').replace('px)','');
                if(position !==  ''){
                    now  = parseInt(position);
                }else{
                    now  =0;
                }
            },element[0])
            ionic.onGesture('drag',function(e){
                element[0].style.transform='translateX('+(parseInt(e.gesture.deltaX)+now)+'px)';
            },element[0])

            ionic.onGesture('dragend',function(e){
                element[0].style.transitionDuration='200ms';
                var  allleft  = element[0].offsetWidth - window.innerWidth;
                var  endoption  =element[0].style.transform.replace('translateX(','').replace('px)','');
                if(endoption > 0){
                    element[0].style.transform = 'translateX(0px)';
                }
                else  if( Math.abs(endoption) >= allleft){
                    if(element[0].offsetWidth< window.innerWidth ){
                        element[0].style.transform = 'translateX(0px)';
                    } else{
                        element[0].style.transform = 'translateX('+(-allleft)+'px)';
                    }
                }
            },element[0])
        }
    }
})

App.directive('jfocus',function($rootScope,$parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            setTimeout(function(){
                element[0].focus()

                if(ionic.Platform.isAndroid()){
                    window.cordova.plugins.Keyboard.show();
                }
                
            },800)

        }


    };
});
/**
 * Created by Why on 16/6/6.
 */
App.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider){

  
  // $ionicNativeTransitionsProvider.setDefaultOptions({
  //   duration: 500, // in milliseconds (ms), default 400,
  //   slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
  //   iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
  //   androiddelay: -1, // same as above but for Android, default -1
  //   winphonedelay: -1, // same as above but for Windows Phone, default -1,
  //   fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
  //   fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
  //   triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
  //   backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
  // });
  //
  // $ionicNativeTransitionsProvider.setDefaultTransition({
  //   type: 'slide',
  //   direction: 'left'
  // });
  //
  // $ionicNativeTransitionsProvider.setDefaultBackTransition({
  //   type: 'slide',
  //   direction: 'right'
  // });
  //
  // $ionicNativeTransitionsProvider.enable(true);
  // // $ionicNativeTransitions.enable(false);
  // // $ionicNativeTransitions.enable(true);
  // // $ionicNativeTransitions.enable(false, true);
  // // $ionicNativeTransitions.enable(true, false);
  //

  
  


  //post  auto    transfromition  to  json
  ! function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    var param = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      for(name in obj) {
        value = obj[name];
        if(value instanceof Array) {
          for(i=0; i<value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object) {
          for(subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }

      return query.length ? query.substr(0, query.length - 1) : query;
    };
    $httpProvider.defaults.transformRequest = [function(data) {
      //return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
      var text=angular.toJson(data);
      return angular.isObject(data) && String(data) !== '[object File]' ? ('post_string='+text) : data;
    }];
  }($httpProvider);
  //android toolbar position reset
  $ionicConfigProvider.platform.android.views.maxCache(5);
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  //this is  setting  back  icon
  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');


  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
  //底部导航栏


    .state('r',{
      url: "/r",
      abstract: true,
      templateUrl: "templates/root/root.html",
    })

    .state('r.tab', {
      url: '/tab',
      abstract: true,
      views: {
        'rootview': {
          templateUrl: 'templates/Navigation_tab/tabs.html',
        }
      }
    })
    //公告模块挂载

    //登录
     .state('r.login', {
      url: '/login',
       // nativeTransitions: {
       //   "type": "flip",
       //   "direction": "up"
       // },
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.login')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
       views: {
        'rootview': {
          templateUrl: 'templates/login/login.html',
          controller: 'loginCtr'
        }
       }
    })
    //注册
    .state('r.register',{
      url: '/register',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
       views: {
        'rootview': {
          templateUrl: 'templates/login/register.html',
          controller: 'registerCtr'
        }
       }
    })
    //输入密码
    .state('r.registercfpwd',{
      nativeTransitions: {
        "type": "flip",
        "direction": "up"
      },
      url: '/registercfpwd',
      views: {
        'rootview': {
          templateUrl: 'templates/login/registercfpwd.html',
          controller: 'registercfpwdCtr'
        }
      }
    })
    //选择认证
      .state('r.selectAuth',{
        // nativeTransitions: {
        //   "type": "flip",
        //   "direction": "up"
        // },
        url: '/selectAuth',
        views: {
          'rootview': {
            templateUrl: 'templates/login/selectAuth.html',
            controller: 'selectAuthctr'
          }
        }
      })

    //个人认证
    .state('r.grAuthentication',{
        // nativeTransitions: {
        //   "type": "flip",
        //   "direction": "up"
        // },
        url: '/grAuthentication',
        views: {
          'rootview': {
            templateUrl: 'templates/login/grAuthentication.html',
            controller: 'grAuthenticationctr'
          }
        }
      })
    //企业认证
      .state('r.entAuthentication',{
        // nativeTransitions: {
        //   "type": "flip",
        //   "direction": "up"
        // },
        url: '/entAuthentication',
        views: {
          'rootview': {
            templateUrl: 'templates/login/entAuthentication.html',
            controller: 'entAuthenticationctr'
          }
        }
      })



    //分类
    .state('r.tab.Classif', {
      url: '/Classif',
      views: {
        'Classif': {
          templateUrl: 'templates/Classif/Classif.html',
          controller: 'Classif'
        }
      }
    })



    // home  主页
    .state('r.tab.Home',{
      nativeTransitions: {
        "type": "flip",
        "direction": "up"
      },
      url: '/Home',
      views: {
        'Home': {
          templateUrl: 'templates/Home/home.html',
          controller: 'homeCtr'
        }
      }
    })

    .state('r.tab.HomeSearch',{
      nativeTransitions: {
        "type": "flip",
        "direction": "up"
      },
      url: '/HomeSearch',
      views: {
        'Home': {
          templateUrl: 'templates/Home/search.html',
          controller: 'homesearchCtr'
        }
      }
    })






    // Shopping Cart 购物车
    .state('r.tab.Shopping_Cart',{
      url: '/ShoppingCart',
      views: {
        'Shopping-Cart': {
          templateUrl: 'templates/ShoppingCart/car.html',
          controller: 'shoppingCartCtr'
        }
      }
    })

    .state('r.tab.Shopping_Cart.msg',{
      url: '/msg',
      views: {
        'Shopping-Cart': {
          templateUrl: 'templates/ShoppingCart/msg.html',
          controller: 'shoppingcartmsg'
        }
      }
    })

    // Notice   通知
    .state('r.tab.Notice',{
      url: '/Notice',
      views: {
        'notice': {
          templateUrl: 'templates/Notice/NoticeList.html',
          controller: 'noticeCtr'
        }
      }
    })


    // Notice Detail  通知详情
    .state('r.tab.NoticeDetail', {
      url: '/NoticeDetail/:chatId',
      views: {
        'notice': {
          templateUrl: 'templates/Notice/NoticeDetail.html',
          controller: 'noticeDetailCtr'
        }
      }
    })






    //setting  个人设置
    .state('r.tab.Settings', {
      url: '/Settings',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/Settings.html',
          controller: 'settingsCtr'
        }
      }
    })



    //setting  个人设置 客户反馈
    .state('r.tab.SettingsUser', {
      url: '/Settings/user',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUser.html',
          controller: 'SettingsUserCtr'
        }
      }
    })

    //setting  个人设置 充值
    .state('r.tab.SettingsRecharge', {
      url: '/Settings/recharge',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsRecharge.html',
          controller: 'SettingsRechargeCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改
    .state('r.tab.SettingsUpdate', {
      url: '/Settings/update',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUpdate.html',
          controller: 'SettingsUpdateCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改 用户名修改
    .state('r.tab.SettingsUpdateUsername', {
      url: '/Settings/update/username',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUpdateUsername.html',
          controller: 'SettingsUpdateUsernameCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改 sex
    .state('r.tab.SettingsSexUsername', {
      url: '/Settings/update/sex',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUpdateSex.html',
          controller: 'SettingsUpdateSexCtr'
        }
      }
    })
    //setting  个人设置 个人资料修改 QQ
    .state('r.tab.SettingsQQ', {
      url: '/Settings/update/qq',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUpdateQQ.html',
          controller: 'SettingsUpdateQQCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改 password
    .state('r.tab.SettingsPassword', {
      url: '/Settings/update/password',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsUpdatePassword.html',
          controller: 'SettingsUpdatePasswordCtr'
        }
      }
    })

    //setting  个人设置 分享好友
    .state('r.tab.Settingsfriends', {
      url: '/Settings/friends',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsFriends.html',
          controller: 'SettingsFriendsCtr'
        }
      }
    })

    //setting  个人设置 管理收货地址
    .state('r.tab.Settingsaddress', {
      url: '/Settings/address',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsAddress.html',
          controller: 'SettingsAddressCtr'
        }
      }
    })
    //setting  个人设置 管理收货地址 addadresss
    .state('r.tab.Settingsaddaddress', {
      url: '/Settings/address/add',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsAddAddress.html',
          controller: 'SettingsAddAddressCtr'
        }
      }
    });




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/Home');

}]);

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
