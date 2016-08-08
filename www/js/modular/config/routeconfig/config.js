/**
 * Created by Why on 16/6/6.
 * testtt11111111222222222222222222222222
 */
App.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$httpProvider','$ionicNativeTransitionsProvider','$sceDelegateProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider,$ionicNativeTransitionsProvider,$sceDelegateProvider){








  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://m.kuaidi100.com/**',
      'https://m.kuaidi100.com/**',
    ]);

    
  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 300, // in milliseconds (ms), default 400,
    slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
    iosdelay: 50, // ms to wait for the iOS webview to update before animation kicks in, default -1
    androiddelay: 50, // same as above but for Android, default -1
    winphonedelay: -1, // same as above but for Windows Phone, default -1,
    fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
    fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
    triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
    backInOppositeDirection: false // Takes over default back transition and state back transition to use the opposite direction transition to go back
  }).setDefaultTransition({
    type: 'slide',
    direction: 'left'
  }).setDefaultBackTransition({
    type: 'slide',
    direction: 'right'
  });

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
  $ionicConfigProvider.platform.android.views.maxCache(3);
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
      nativeTransitions: null,
      templateUrl: "templates/root/root.html",
    })

    .state('r.tab', {
      url: '/tab',
      nativeTransitions: null,
      abstract: true,
      views: {
        'rootview': {
          templateUrl: 'templates/Navigation_tab/tabs.html',
          controller: 'tabCtr'
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


    //认证公司ID
    .state('r.canpany',{
      url: '/canpany',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      views: {
        'rootview': {
          templateUrl: 'templates/login/canpanyID.html',
          controller: 'canpanyCtr'
        }
      }
    })

     //申请信息
    .state('r.application',{
      url: '/application/:companyID',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      views: {
        'rootview': {
          templateUrl: 'templates/login/application.html',
          controller: 'applicationCtr'
        }
      }
    })

    //申请信息
    .state('r.passwordold',{
      url: '/passwordold',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      views: {
        'rootview': {
          templateUrl: 'templates/login/password.html',
          controller: 'passwordoldCtr'
        }
      }
    })


    //输入密码
    .state('r.registercfpwd',{
      url: '/registercfpwd?phone:',
      views: {
        'rootview': {
          params:{phone:null},
          templateUrl: 'templates/login/registercfpwd.html',
          controller: 'registercfpwdCtr'
        }
      }
    })

      //选择认证
      .state('r.selectAuth',{
            onEnter: function(fromStateServ,$ionicHistory) {
              fromStateServ.saveHisty($ionicHistory,'r.selectAuth')
            },
          onExit:function(fromStateServ){
            fromStateServ.removebackregistevent();
          },
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
        url: '/entAuthentication',
        views: {
          'rootview': {
            templateUrl: 'templates/login/entAuthentication.html',
            controller: 'entAuthenticationctr'
          }
        }
      })
      .state('r.selectPaydues',{
        url: '/selectPaydues',
        views: {
          'rootview': {
            templateUrl: 'templates/login/selectPaydues.html',
            controller: 'selectPayduesctr'
          }
        }
      })
    //分类
    .state('r.tab.Classif', {
      url: '/Classif',
      nativeTransitions: null,
      views: {
        'Classif': {
          templateUrl: 'templates/Classif/Classif.html',
          controller: 'Classif'
        }
      }
    })

    // home  主页
    .state('r.tab.Home',{
      url: '/Home',
      nativeTransitions: null,
      views: {
        'Home': {
          templateUrl: 'templates/Home/home.html',
          controller: 'homeCtr'
        }
      }
    })
    .state('r.tab.HomeSearch',{
      onEnter: function() {
        window.noNavtionsbackRootuer   = 'r.tab.Home';
      },
      onExit:function(){
        window.noNavtionsbackRootuer   =   undefined;
      },
      url: '/HomeSearch',
      views: {
        'Home': {
          templateUrl: 'templates/Home/search.html',
          controller: 'homesearchCtr'
        }
      }
    })






    // home  最新动态
    .state('r.homeNews', {
      url: '/homeNews',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.homeNews')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/newNews.html',
          controller: 'NewnewsCtr'
        }
      }
    })


    // home  最新动态详情
 /*   .state('r.tab.homeNewsContent',{
      url: '/homeNewsContent',
      nativeTransitions: null,
      views: {
        'Home': {
          templateUrl: 'templates/Home/newsContent.html',
          controller: 'newsContentCtr'
        }
      }
    })*/


    .state('r.homeNewsContent', {
      url: '/homeNewsContent/:postID',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.homeNewsContent')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/newsContent.html',
          controller: 'newsContentCtr'
        }
      }
    })



    //慈善专区
    .state('r.HomeCharitable', {
      url: '/HomeCharitable',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomeCharitable')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,inside:null},
          templateUrl: 'templates/Home/charitable.html',
          controller: 'chariCtr'
        }
      }
    })



    //体验专区

    .state('r.HomTaste', {
      url: '/HomTaste',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomTaste')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,inside:null},
          templateUrl: 'templates/Home/taste.html',
          controller: 'tasteCtr'
        }
      }
    })

    //交易流程
  /* .state('r.tab.flow',{
      url: '/flow',
      views: {
        'Home': {
          templateUrl: 'templates/Home/flow.html',
          controller: 'flowCtr'
        }
      }
    })*/


    .state('r.flow', {
      url: '/flow',
      cache: false,
      views: {
        'rootview': {
          templateUrl: 'templates/Home/flow.html',
          controller: 'flowCtr'
        }
      }
    })


    //销售订单
    .state('r.HomSales',{
      url: '/HomSales',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomSales')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/salesorders.html',
          controller: 'salesCtr'
        }
      }
    })


    .state('r.tab.delivery',{
      url: '/delivery/:odId/:Num',
      views: {
        'Home': {
          templateUrl: 'templates/Home/delivery.html',
          controller: 'deliveryCtr'
        }
      }
    })


    //店铺管理
    .state('r.HomShopadmin',{
      url: '/HomShopadmin',
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.HomShopadmin')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/shopadmin.html',
          controller: 'shopadminCtr'
        }
      }
    })


    //店铺name
    .state('r.HomShopadminname',{
      url: '/HomShopadminname?nowname:',
      views: {
        'rootview': {
          params:{nowname:null},
          templateUrl: 'templates/Home/shopname.html',
          controller: 'shopnameCtr'
        }
      }
    })


    //店铺简介
    .state('r.HomShopadminbrief',{
      url: '/HomShopadminbrief?nowdec:',
      views: {
        'rootview': {
          params:{nowdec:null},
          templateUrl: 'templates/Home/shopbriefing.html',
          controller: 'shopbriefingCtr'
        }
      }
    })

  /*  //采购订单
    .state('r.tab.HomPurchase',{
      url: '/HomPurchase',
      views: {
        'Home': {
          templateUrl: 'templates/Home/purchaseorder.html',
          controller: 'purchaseorderCtr'
        }
      }
    })*/

    //采购订单
    .state('r.HomPurchase', {
      url: '/HomPurchase',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomPurchase')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/purchaseorder.html',
          controller: 'purchaseorderCtr'
        }
      }
    })



    //销售订单详情
/*    .state('r.tab.Homordersbody',{
      url: '/HomOrdersBody/:basicID',
      views: {
        'Home': {
          templateUrl: 'templates/Home/ordersbody.html',
          controller: 'ordersbodyCtr'
        }
      }
    })*/
    .state('r.Homordersbody', {
      url: '/HomOrdersBody/:basicID',
      cache: false,
      views: {
        'rootview': {
          params:{'basicID':null},
          templateUrl: 'templates/Home/ordersbody.html',
          controller: 'ordersbodyCtr'
        }
      }
    })


    //采购订单详情
/*    .state('r.tab.HomPurordersbody',{
      url: '/HomPurOrdersBody/:basicID',
      views: {
        'Home': {
          templateUrl: 'templates/Home/purchasebody.html',
          controller: 'purbodyCtr'
        }
      }
    })*/
    .state('r.HomPurordersbody', {
      url: '/HomPurOrdersBody/:basicID',
      cache: false,
      views: {
        'rootview': {
          params:{'basicID':null},
          templateUrl: 'templates/Home/purchasebody.html',
          controller: 'purbodyCtr'
        }
      }
    })


    // Shopping Cart 购物车
    .state('r.tab.Shopping_Cart',{
      nativeTransitions: null,
      url: '/ShoppingCart?state:',
      views: {
        'Shopping-Cart': {
          params:{'state':null},
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
      nativeTransitions: null,
      url: '/Notice',
      views: {
        'notice': {
          templateUrl: 'templates/Notice/NoticeList.html',
          controller: 'noticeCtr'
        }
      }
    })

    // Notice   员工审核消息
    .state('r.tab.information',{
      nativeTransitions: null,
      url: '/information',
      views: {
        'notice': {
          templateUrl: 'templates/Notice/applicationinformation.html',
          controller: 'informationCtr'
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
      nativeTransitions: null,
      url: '/Settings',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/Settings.html',
          controller: 'settingsCtr'
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
    //setting  个人设置 客户反馈
    .state('r.tab.SettingsUser', {
      url: '/Settings/user',
      cache:false,
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

    //setting  个人设置 企业设置
    .state('r.companyInstall',{
      url: '/companyInstall',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.companyInstall')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/companyInstall.html',
          controller: 'companyInstallCtr'
        }
      }
    })

    //setting  个人设置
    .state('r.management',{
      url: '/management/:integral',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.management')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/management.html',
          controller: 'managementCtr'
        }
      }
    })
/*    //setting  个人设置
    .state('r.tab.management', {
      url: '/Settings/management/:integral',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/management.html',
          controller: 'managementCtr'
        }

      }
    })*/

/*    .state('r.tab.companyInstall', {
      url: '/Settings/companyInstall',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/companyInstall.html',
          controller: 'companyInstallCtr'
        }
      }
    })*/


   /* //setting  个人设置 管理收货地址
    .state('r.tab.Settingsaddress', {
      url: '/Settings/address',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsAddress.html',
          controller: 'SettingsAddressCtr'
        }
      }
    })*/

    .state('r.settingAddress', {
      url: '/settingAddress',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.settingAddress')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/SettingsAddress.html',
          controller: 'SettingsAddressCtr'
        }
      }
    })



    //setting  个人设置 管理收货地址 addadresss
  /*  .state('r.tab.Settingsaddaddress', {
      url: '/Settings/address/add',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsAddAddress.html',
          controller: 'SettingsAddAddressCtr'
        }

      }
    })*/

    .state('r.addAddress', {
      url: '/addAddress/:dataAdd',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.addAddress')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/SettingsAddAddress.html',
          controller: 'SettingsAddAddressCtr'
        }
      }
    })



    //setting  个人设置 管理收货地址 selectaddadresss
    .state('r.tab.SettingsSelectaddaddress', {
      url: '/Settings/address/add/select',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/SettingsSelectAddAddress.html',
          controller: 'SettingsSelectCtr'
        }
      }
    })




    //setting  个人设置 更新管理收货地址
  .state('r.tab.SettingsUpdateAdress', {
    url: '/r.tab.SettingsUpdateAdress/:item',
    views: {
      'setting': {
        templateUrl: 'templates/Setting/UpdateAddress.html',
        controller: 'UpdateaddressCtr'
      }

    }
  })





  //setting  个人设置 邀请好友
    .state('r.tab.SettingOne', {
      url: '/Settings/SettingOne',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/Settinginvite.html',
          controller: 'SettinginviteCtr'
        }

      }
    })

    //setting  个人设置 邀请好友
    .state('r.tab.SettingWe', {
      url: '/Settings/SettingWe',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/aboutWe.html',
          controller: 'aboutWeCtr'
        }

      }
    })

  //setting  分类商品详情
/*  .state('r.tab.ClassifDetails', {
    url: '/r.tab.ClassifDetails/:Classitem',
    views: {
      'Classif': {
        templateUrl: 'templates/Classif/ProductDetails.html',
        controller: 'ClassifDetailsCtr'
      }

    }
  })*/

    .state('r.ClassifDetails', {
      url: '/ClassifDetails/:Classitem',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.ClassifDetails')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Classif/ProductDetails.html',
          controller: 'ClassifDetailsCtr'
        }
      }
    })



  //setting  分类商品详情确认订单
  /*  .state('r.tab.confirmOrder', {
      url: '/r.tab.confirmOrder/:basicID/:shopID/:Num',
      views: {
        'Classif': {
          templateUrl: 'templates/Classif/confitmorder.html',
          controller: 'ConfirmOrderCtr'
        }
      }
    })*/

    //setting  分类商品详情确认订单
    .state('r.confirmOrder', {
      url: '/confirmOrder/:basicID/:shopID/:Num',
      // nativeTransitions: {
      //   "type": "flip",
      //   "direction": "up"
      // },
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.confirmOrder')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Classif/confitmorder.html',
          controller: 'ConfirmOrderCtr'
        }
      }
    })




    //商品管理模块
    .state('r.listofgoods', {
      url: '/listofgoods',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.listofgoods')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/goods/list.html',
          controller: 'listofgoodsCtr'
        }
      }
    })
    //  添加编辑商品模块
    .state('r.goodsEdit', {
      url: '/goodsEdit?state:&id:',
      cache: false,
      views: {
        'rootview': {
          params:{'state':null,id:null},
          templateUrl: 'templates/goods/Edit.html',
          controller: 'goodsEditCtr'
        }
      }
    })

    //商品分类
    .state('r.goodsclasslist', {
      url: '/goodsclasslist',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.goodsclasslist')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/goods/Classlist.html',
          controller: 'goodsclasslist'
        }
      }
    })
    // 商品分类详情
    .state('r.goodsclassDetail', {
      url: '/goodsclassDetail?title:&id:',
      views: {
        params:{'title':null,id:null},
        'rootview': {
          templateUrl: 'templates/goods/clasEdith.html',
          controller: 'goodsclassDetail'
        }
      }
    })

    //店铺 home列表
      .state('r.Shophome', {
      url: '/Shophome?id:&ref:',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Shophome')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,ref:null},
          templateUrl: 'templates/shop/home.html',
          controller: 'shophomeCtr'
        }
      }
    })


    //收货地址
    .state('r.Addresslist', {
      url: '/Addresslist',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Addresslist')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/addr/SettingsAddress.html',
          controller: 'AddresslistCtr'
        }
      }
    })

  //收货地址添加编辑
    .state('r.AddressEdith', {
      url: '/AddressEdith?id:',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.AddressEdith')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null},
          templateUrl: 'templates/Setting/addr/AddressEdithCtr.html',
          controller: 'AddressEdithCtr'
        }
      }
    })

  //商品详情
    .state('r.Productdetails', {
      url: '/Productdetails?id:&inside:',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Productdetails')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,inside:null},
          templateUrl: 'templates/goods/Productdetails.html',
          controller: 'ProductdetailsCtr'
        }
      }
    })
    //确认订单
    .state('r.ConfirmorderZf', {
          url: '/ConfirmorderZf',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.ConfirmorderZf')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
          views: {
            'rootview': {
              templateUrl: 'templates/goods/comf.html',
              controller: 'ConfirmorderZfctr'
            }
          }
        })

    //查看物流
    .state('r.Logistics',{
      url: '/Logistics?id:',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.Logistics')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        params:{id:null},
        'rootview': {
          templateUrl: 'templates/Home/logistics.html',
          controller: 'LogisticsCtr'
        }
      }
    })
















  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/r/tab/Home');

}]);

