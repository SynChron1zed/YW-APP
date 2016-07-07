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
