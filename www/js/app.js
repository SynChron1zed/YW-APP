/**
 * Created by Why on 16/6/6.
 */
// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var App = angular.module('starter', ['ionic','ngCordova','starter.controllers', 'starter.services','ionicLazyLoad','ionic-native-transitions']);

var  Ctr = angular.module('starter.controllers', []);

var  Server = angular.module('starter.services', []);

//hidden  tabs  directive
App.directive('hideTabs',function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = true;
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

                element[0].style.webkitTransitionDuration='0ms';

                var position   = element[0].style.webkitTransform.replace('translateX(','').replace('px)','');
                if(position !==  ''){
                    now  = parseInt(position);
                }else{
                    now  =0;
                }
            },element[0])
            ionic.onGesture('drag',function(e){
                element[0].style.webkitTransform='translateX('+(parseInt(e.gesture.deltaX)+now)+'px)';
            },element[0])

            ionic.onGesture('dragend',function(e){
                element[0].style.webkitTransitionDuration='200ms';
                var  allleft  = element[0].offsetWidth - window.innerWidth;
                var  endoption  =element[0].style.webkitTransform.replace('translateX(','').replace('px)','');
                if(endoption > 0){
                    element[0].style.webkitTransform = 'translateX(0px)';
                }
                else  if( Math.abs(endoption) >= allleft){
                    if(element[0].offsetWidth< window.innerWidth ){
                        element[0].style.webkitTransform = 'translateX(0px)';
                    } else{
                        element[0].style.webkitTransform = 'translateX('+(-allleft)+'px)';
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
 * testtt11111111222222222222222222222222
 */
App.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$httpProvider','$ionicNativeTransitionsProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider,$ionicNativeTransitionsProvider){


  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 300, // in milliseconds (ms), default 400,
    slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default 4
    iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
    androiddelay: -1, // same as above but for Android, default -1
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
    .state('r.tab.HomeCharitable',{
      url: '/HomeCharitable',
      views: {
        'Home': {
          templateUrl: 'templates/Home/charitable.html',
          controller: 'chariCtr'
        }
      }
    })

    //体验专区
    .state('r.tab.HomTaste',{
      url: '/HomeTaste',
      views: {
        'Home': {
          templateUrl: 'templates/Home/taste.html',
          controller: 'tasteCtr'
        }
      }
    })

    //销售订单
    .state('r.tab.HomSales',{
      url: '/HomeSales',
      views: {
        'Home': {
          templateUrl: 'templates/Home/salesorders.html',
          controller: 'salesCtr'
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
    .state('r.tab.HomShopadminname',{
      url: '/HomShopadminname/:Classitem',
      views: {
        'Home': {
          templateUrl: 'templates/Home/shopname.html',
          controller: 'shopnameCtr'
        }
      }
    })
    //店铺简介
    .state('r.tab.HomShopadminbrief',{
      url: '/HomShopadminbrief/:Classitem',
      views: {
        'Home': {
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
    .state('r.tab.Homordersbody',{
      url: '/HomOrdersBody/:basicID',
      views: {
        'Home': {
          templateUrl: 'templates/Home/ordersbody.html',
          controller: 'ordersbodyCtr'
        }
      }
    })



    //采购订单详情
    .state('r.tab.HomPurordersbody',{
      url: '/HomPurOrdersBody/:basicID',
      views: {
        'Home': {
          templateUrl: 'templates/Home/purchasebody.html',
          controller: 'purbodyCtr'
        }
      }
    })



    // Shopping Cart 购物车
    .state('r.tab.Shopping_Cart',{
      nativeTransitions: null,
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

    //setting  个人设置 分享好友
    .state('r.tab.companyInstall', {
      url: '/Settings/companyInstall',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/companyInstall.html',
          controller: 'companyInstallCtr'
        }
      }
    })


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

    //setting  个人设置
    .state('r.tab.management', {
      url: '/Settings/management/:integral',
      views: {
        'setting': {
          templateUrl: 'templates/Setting/management.html',
          controller: 'managementCtr'
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
      url: '/Shophome?id:',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Shophome')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null},
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

  //收货地址添加编辑
    .state('r.Productdetails', {
      url: '/Productdetails?id:',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Productdetails')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null},
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
        












  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/r/tab/Home');

}]);


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

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {



 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });






  var cateId = 1;
  $scope.imageshow=true;
  $scope.imagehide =false;
  $scope.newexpression=false

  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];
    Tools.getData({
      "interface_number": "020101",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.Citysddd = (r.resp_data)
        $scope.selectedItem = $scope.Citysddd[0];

      }
    });


  //广告位

  Tools.getData({
    "interface_number": "050401",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "type": "2", //分类
    }
  },function(r){
    if(r){

      angular.forEach(r.resp_data,function(c){
        c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/1/w/200/h/200';

      });
      $scope.Citysd = (r.resp_data[0])


    }
  });

  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020104",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "cateId": cateId,
      }

    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){

        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

        });

        if(type){
          $scope.ShoppingList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.ShoppingList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };






 /* Tools.getData({
    "interface_number": "020104",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "cateId":1,
      "page_num": 1,
      "page_per":10
    }
  },function(r){

    if(r){
      if(r.resp_data.data.length==10){
        $scope.expression=true

      }else{
        $scope.expression=false

      }

      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
        c.ctr  = false;
      });

      $scope.ShoppingList = (r.resp_data.data)

    }
  });*/


  //点击分类
  $scope.shoppingsList=function (item) {
    $scope.expression = true;
    pageNum = 0
    $scope.ShoppingList=[];
    $scope.selectedItem = item;
     cateId= item.cate_id;
    $ionicScrollDelegate.scrollTop();

/*    Tools.getData({
      "interface_number": "020104",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "cateId":cateId,
        "page_num": 1,
        "page_per":10
      }
    },function(r){
debugger;
      if(r){

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });

        $scope.ShoppingList = (r.resp_data.data)

      }
    });*/
  };



  $scope.proDetail = function (r,Classitem) {

    fromStateServ.stateChange(r,{Classitem: Classitem});
  };


/*  //翻页加载
   $scope.loadOlderStories=function (type) {

         pageNum +=1;
        if(cateId==""){
         cateId=1
     }




       Tools.getData({
         "interface_number": "020104",
         "client_type": window.platform,
         "post_content": {
           "token": "",
           "token_phone": "",
           "cateId":cateId,
           "page_num": pageNum,
           "page_per": 10
         }
       }, function (r) {
         if (r) {

           angular.forEach(r.resp_data.data,function(c){
             c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
             c.ctr  = false;
           });

           if (r.resp_data.data.length == 0) {
             $scope.expression = false
             $scope.newexpression=true
             $scope.ShoppingList=$scope.ShoppingList

           } else {
             $scope.newexpression=false
              if(pageNum==1){
                r.resp_data.data=[];
              }
             for(var i=0;i<r.resp_data.data.length;i++){
               $scope.ShoppingList.push(r.resp_data.data[i])
             }
           }
           $timeout(function () {
             $scope.$broadcast('scroll.infiniteScrollComplete');
           }, 600);

         }


       });



   };*/




  //阴影层
  $scope.action = function() {
    $ionicBackdrop.retain();
    $timeout(function() {    //默认让它1秒后消失
      $ionicBackdrop.release();
    }, 1000);
  };



  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+166)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+166)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)



}]);


/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ClassifDetailsCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal','$ionicBackdrop','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal,$ionicBackdrop,$timeout) {
  var Classitem = $stateParams.Classitem;






  Tools.getData({
    "interface_number": "020205",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "goods_basic_id": Classitem

    }
  },function(r){
    if(r){


      r.resp_data.data.img_url  =  window.qiniuimgHost+r.resp_data.data.img_url+'?imageView2/1/w/200/h/200';
      r.resp_data.data.ctr  = false;


      $scope.ClassifDetailsList = (r.resp_data.data);
       console.log($scope.ClassifDetailsList)
      $scope.shopid= $scope.ClassifDetailsList.goodsShop.shop_id

    }
  });


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope,
    backdropClickToClose:false
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/gouwuchemodal.html', {
    scope: $scope,
    backdropClickToClose:false
  }).then(function(modal) {
    $scope.gouwuchemodal = modal;
  });

  $scope.Number=1;
  $scope.addshop = function () {
    $scope.Number+=1
  }
  $scope.delshop = function () {

    if($scope.Number<=1){
      $scope.Number=1
    }else{
      $scope.Number-=1
    }

  }


  //结算
  $scope.ClassifConfirm=function (basic,shop) {


    $scope.modal.hide();
   /* fromStateServ.stateChange(r,{basicID:basic,shopID:shop,Num:$scope.Number});*/
    $state.go('r.confirmOrder',{basicID:basic,shopID:shop,Num:$scope.Number});

  };




 //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.ClassifDetails').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };





  $scope.isCone=true;
   $scope.Detailsone=function () {
       $scope.isCone=true;
     $scope.isCtwo=false;
     $scope.isCtree=false;
 };
  $scope.Detailstwo=function () {
    $scope.isCone=false;
    $scope.isCtwo=true;
    $scope.isCtree=false;
  };
  $scope.Detailstree=function () {

    $scope.isCone=false;
    $scope.isCtwo=false;
    $scope.isCtree=true;
  };




  //加入购物车
  $scope.addcart=function () {

    Tools.getData({
      "interface_number": "020401",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "shop_id": $scope.shopid,
        "sku_id": "1",
        "goods_basic_id": Classitem,
        "number": $scope.Number

      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'添加成功!',
          okText:'确认'
        })

        $scope.gouwuchemodal.hide();
        $ionicBackdrop.release();
        $scope.Number=1
      }
    });
  };




  $scope.back  =  function (){
    window.noNavtionsback(window.noNavtionsbackRootuer);
  }



  $scope.gouwuche = function () {


    $ionicBackdrop.retain();

    $scope.gouwuchemodal.show();

  };
  $scope.dingdan = function () {


    $ionicBackdrop.retain();

    $scope.modal.show();

  };




  $scope.deletegouwuche=function () {
    $ionicBackdrop.release();
    $scope.gouwuchemodal.hide();

  }
  $scope.deletedingdan=function () {
    $ionicBackdrop.release();
    $scope.modal.hide()

  }

  //阴影层
  $scope.action = function() {
    $ionicBackdrop.retain();
    $timeout(function() {    //默认让它1秒后消失
      $ionicBackdrop.release();
    }, 1000);
  };


}]);

/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal,$ionicBackdrop) {

  var bascId = $stateParams.basicID;
  var shopId = $stateParams.shopID;
  var Num = $stateParams.Num;


  $scope.gobackdata =true

  $scope.dataexpersse = true
  $scope.dataexperss = false
  $scope.gouwuchedata = false

  $scope.shopNum=Num
  var cartId = [];
  console.log(bascId)
  console.log(shopId)


  $scope.addressList=[];

  $ionicModal.fromTemplateUrl('templates/addressmodal.html', {
    scope: $scope,
  backdropClickToClose:false
  }).then(function(modal) {
    $scope.addressmodal = modal;
    $scope.addressmodal.show();
  });


  if(bascId==""){
    $ionicBackdrop.retain();
    $scope.dataexpersse = false
    $scope.dataexperss = true
    cartId = shopId;
    $scope.TotalNum =Num;
    $scope.gouwuchedata =true;
    //结算购物车
    Tools.getData({
      "interface_number": "020601",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "cartIds": cartId

      }
    },function(r){
      if(r){


        angular.forEach(r.resp_data.goodsInfo,function(c){
          c.shop_img =  window.qiniuimgHost+c.shop_img+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });

        $scope.ClassifDetailsList = (r.resp_data.goodsInfo);
        console.log($scope.ClassifDetailsList)




      /*  var total = $scope.ClassifDetailsList.total_in_price * $scope.shopNum
        $scope.TotalNum = total
        console.log(total)*/
      }
    });

  }else{

    $scope.dataexpersse = true
    $scope.dataexperss = false

    //商品详情
    Tools.getData({
      "interface_number": "020205",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "goods_basic_id":bascId

      }
    },function(r){
      if(r){



        r.resp_data.data.img_url  =  window.qiniuimgHost+r.resp_data.data.img_url+'?imageView2/1/w/200/h/200';
        r.resp_data.data.ctr  = false;

        $scope.ClassifDetailsList = (r.resp_data.data);
        console.log($scope.ClassifDetailsList)
        var total = $scope.ClassifDetailsList.total_in_price * $scope.shopNum
        $scope.TotalNum = total
        console.log(total)
      }
    });


    //加入购物车
    Tools.getData({
      "interface_number": "020401",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "shop_id": shopId,
        "sku_id": "1",
        "goods_basic_id": bascId ,
        "number": "1"
      }
    },function(r){
      if(r){

        cartId= (r.resp_data.cart_id)

      }
    });




  }











  //获取收货地址
  Tools.getData({
    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.addressList= (r.resp_data.data)
      for(var i = 0;i<$scope.addressList.length;i++){
        if($scope.addressList[i].is_default=="1"){
          $scope.addressListone = $scope.addressList[i]
        }
      }

    }
  });

  $scope.gainAdress = function (gain) {

   $scope.adressid = gain;
    console.log($scope.adressid)
    for(var i = 0;i<$scope.addressList.length;i++){
      if($scope.addressList[i].addr_id==$scope.adressid){
        $scope.addressListone = $scope.addressList[i]
      }
    }

  }



  $scope.data = {
    clientSide: "1"
  };








  //确认订单
  $scope.orderquery = function () {

    Tools.getData({
      "interface_number": "020607",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "addr_id": $scope.addressListone.addr_id ,
        "remark": "",
        "cartIds": cartId
      }
    },function(r){
     
      if(r= 'success'){
        $ionicPopup.alert({
          title:"确认成功",
          okText:'确认'

      });
        $state.go('r.HomPurchase',{datacaigou:1});
      }

    });
  }
  $ionicModal.fromTemplateUrl('templates/AddresModal.html', {
    scope: $scope,
    backdropClickToClose:false
  }).then(function(modal) {
    $scope.AddAdressemodal = modal;
  });

$scope.deletedizhi=function () {

  $ionicBackdrop.release();
  $scope.addressmodal.hide();
}
/*  $scope.AddAdress=function () {
    $scope.addressmodal.hide();
    $scope.AddAdressemodal.show()
  }*/

  $scope.addArddss=function (r) {

   /* fromStateServ.stateChange(r);
    $scope.addressmodal.hide();*/
    $state.go('r.addAddress',{dataAdd:1});
    $scope.addressmodal.hide();;
    $ionicBackdrop.release();

  }
 $scope.addressmodaldelete =function () {

   $ionicBackdrop.retain();
   $scope.addressmodal.show()
 }


/*//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){
    debugger;

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.confirmOrder').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };*/





}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('tabCtr',[function(){

}])

Ctr.controller('goodsclasslist',['$scope','fromStateServ','$timeout','Tools','native','$ionicModal','$state',function($scope,fromStateServ,$timeout,Tools,native,$ionicModal,$state){









 $scope.godetial  = function (r){

   $state.go('r.goodsclassDetail',{title:r.cate_name,id:r.cate_id})
 }
  $scope.newc =  {};
  $scope.newc.classname = undefined;

  $scope.Add = function (){
       $scope.newc.classname = undefined;
       $scope.goodsClasadd.show();
  };

  $scope.addnew =  function (){
     if($scope.newc.classname){
       Tools.getData({
         "interface_number": "030204",
         "post_content": {
         "cate_name": $scope.newc.classname,
         "goodsIds": [],
        }
       },function(r){
         if(r){

           
           if(!r.resp_data.num){
             r.resp_data.num  = 0;
           }
           $scope.data.unshift(r.resp_data);
           $timeout(function () {
             $scope.goodsClasadd.hide();
           },100);
           native.task('添加成功');
           //$scope.goodsClasadd.hiden
         }
       })


     }else{
        native.task('请输入分类名称');
     }
  }


  $scope.$on('$destroy', function() {
    $scope.goodsClasadd.remove();
  });

  $ionicModal.fromTemplateUrl('goodsClasadd.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.goodsClasadd = modal;
  });




$scope.backtoprevView  = fromStateServ.backView;
$scope.parenttitle     =   fromStateServ.getState('r.goodsclasslist').title;
  $scope.$on('$ionicView.beforeEnter',function(){
    $timeout(function () {
      Tools.getData({"interface_number": "030201","post_content": {}},function(r){
        if(r){
          $scope.data  = r.resp_data;
          
        }
      })
    }, 200);
  });



  //删除
  $scope.del  = function(s,ins){
        

        
      Tools.getData({
        "interface_number": "030203",
        "post_content": {
          "cateId":s.cate_id,
          }
      },function(r){
        if(r){
            Tools.rmArrin($scope.data,ins);
            native.task('删除成功');
        }
      })
  }
}])


/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsclassDetail',['$scope','$timeout','native','Tools','$ionicModal','$stateParams','$ionicScrollDelegate','$state','goodsState','$ionicPopup',function($scope,$timeout,native,Tools,$ionicModal,$stateParams,$ionicScrollDelegate,$state,goodsState,$ionicPopup){







    


    //商品上架  
    $scope.goodsup = function (b,index){
         
        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
        $scope.salestotin.up  =  parseInt($scope.salestotin.up)+1;
            $scope.salestotin.down   = parseInt($scope.salestotin.down)-1;
            native.task('上架成功');
        })
    }
    //商品下架 
    $scope.goodsdown = function (b,index){

        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
            $scope.salestotin.up  = parseInt($scope.salestotin.up)-1;
            $scope.salestotin.down   =  parseInt($scope.salestotin.down)+1;
            native.task('下架成功');
        })
    }
    function goodsuprodow(par,calback){
          Tools.showlogin();
          Tools.getData({
            "interface_number": "030107",
            "post_content": {
            "goodsId": par,
            "status":$scope.liststate?0:1 
            }
          },function(r){
              if(r){
                    calback(r);
              }
          })
    };
    
    //删除商品
    $scope.delgoods =  function (targe,index){
      
   native.confirm('你确定删除该商品?','删除商品?',['确定','取消'],function(c){
            if(c  == 1){

          Tools.showlogin();
          Tools.getData({
             "interface_number": "030108",
             "post_content": {
              "goodsId":targe.goods_basic_id 
            }
          },function(r){
              if(r){
                if(!$scope.liststate){
                  $scope.salestotin.down =  parseInt($scope.salestotin.down) -1; 
                }else{
                  $scope.salestotin.up =  parseInt($scope.salestotin.up) -1;
                }
                Tools.rmArrin($scope.datalist,index);
                native.task('删除成功');
              }
            }
          );


             }
          })
    }









    $scope.chengselect =  function(i){
        i.select  = !i.select;
    }
    //编辑goods分类      Edit product categories
    $scope.edithgoodsclassopen  = function (xx){

      $scope.nowgoodid  = xx.goods_basic_id;
      $scope.edithgoodsclass.show();
      $timeout(function(){
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030109",
            "post_content": {
              "goods_id": xx.goods_basic_id,
          }
        },function(r){
              if(r){  
                
                $scope.goodsClasda  = r.resp_data.shop_cate;
              }
        })
      },400)
    };

    //edit goods class data 
    $scope.goodsClasda  = [];
    $scope.newgoodsclass = {};
    $scope.newgoodsclass.name =undefined;

    $scope.addgoodsClass = function(){
        if(!$scope.newgoodsclass.name){
          native.task('请填写分类名称');
          return false;
        };
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030204",
          "post_content": {        
          "cate_name":$scope.newgoodsclass.name,
          "goodsIds":[]
        }
        },function(r){
              if(r){
                $scope.goodsClasda.unshift(r.resp_data);  
                native.task('添加成功');
              }
        })
        $scope.newgoodsclass.name =undefined;
    }





    $scope.savegoodsClass  = function(){
        Tools.showlogin();
        var sendoption  =[];
        angular.forEach($scope.goodsClasda,function(c){
            if(c.select){
                sendoption.push(c.cate_id)
            }
            
        })

        Tools.getData({
           "interface_number": "030205",
          "post_content": {
          "goods_id": $scope.nowgoodid,
          "cateIds":sendoption,
          }
        },function(r){
              $timeout(function(){
               $scope.goodsClasda = [];
               $scope.newgoodsclass.name =undefined; 
              },300)
              if(r){
                $scope.edithgoodsclass.hide();
                native.task('保存成功');
              }
        })   
    }






    



  $scope.swatchselctthis =  function (xx){
  xx.select  = !xx.select;
  }

  $scope.doSomething  = function (r){
      $scope.selectgoodslit  = [];
      $scope.selectgoods.show();
      $scope.selectgoodslitloadmoer  =  false;
      $ionicScrollDelegate.$getByHandle('selectgoods').scrollTop();
      $timeout(function () {
          $scope.selectgoodsloadmoer();
      },500);

  }


  $scope.saveSelectgoods  = function (){
    Tools.showlogin();
    var sendlist = [];
    angular.forEach($scope.selectgoodslit,function (c){
          sendlist.push({
            "id": c.goods_basic_id,
            "select": c.select
          })
    })

    Tools.getData({
      "interface_number": "030206",
      "post_content": {
        'cateId':$stateParams.id,
        "goodsIds": sendlist,

     }
    },function (r){
      if(r){
        $scope.selectitemin;
        var iemin  = 0;
          angular.forEach($scope.selectgoodslit,function(c){
                if(c.select){
                    iemin ++;
                }
          })

          if(iemin !=  $scope.selectitemin){
            $scope.customcucdownlisloadMore(true)
          }

          $scope.selectitemin  = 0;
          native.task('保存成功');

      }
    })


    $timeout(function () {
      $scope.selectgoodslit  = [];
      $scope.selectgoodslitpag  =1;
      $scope.selectgoodslitloadmoer  =  false;

      $scope.selectgoods.hide();
    }, 300);


  }





  //选择商品的select 搜搜没有做
  
  //选择列表的数据
  $scope.selectgoodslit  =[];
  $scope.selectgoodslitpag  =1;
  $scope.selectgoodslitloadmoer  =  false;
  $scope.selectitemin  = 0;



  $scope.selectgoodsloadmoer = function (){
      Tools.getData({
        "interface_number": "030106",
        "post_content": {
          "shop_cate_id": $stateParams.id,
          page_num:$scope.selectgoodslitpag

        }
      },function (r){
        $scope.$broadcast('scroll.infiniteScrollComplete');
           if(r){
                if(r.resp_data.nextPage  == 0){
                  $scope.selectgoodslitloadmoer  =  false;
                  $scope.selectgoodslitpag   =1;
                }else{
                  $scope.selectgoodslitloadmoer  =  true;
                  $scope.selectgoodslitpag   =r.resp_data.nextPage;
                }
                angular.forEach(r.resp_data.data,function(c){
                  if(c.select){ $scope.selectitemin ++; }
                  c.img_url   =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200',
                  $scope.selectgoodslit.push(c);
                })
           }else{
             $scope.selectgoodslitloadmoer  =  true;
           }



      })

  }











  $scope.xiugaimima  = function(){
      $scope.goodsfenle.show();
  }


  //编辑
  $scope.edith  = function (r){

    goodsState.goods_basic_id  = r.goods_basic_id;
    goodsState.goods_title  = r.goods_title;
    goodsState.img_url  = r.img_url;
    goodsState.activity_price  = r.activity_price;
    goodsState.total_in_number  = r.total_in_number;




    $state.go('r.goodsEdit',{state:'edit',id:r.goods_basic_id});
  };
  $scope.classinfo  = {};
  $scope.classinfo.title =   $stateParams.title;
  $scope.title  = $stateParams.title;
    //构建搜索功能
    $scope.searchobj  = {};
      $scope.scar =  function(){
        native.Barcode(function(r){
            $scope.searchobj.tiaomiao  =   r.text;
            
        });
      };
  $scope.selectsearchstat  = function (r,e){
    $scope.searchobj.swatch  = true;
    $scope.searchobj.state  = r;
  }

  $scope.swatchtstate  = function (){
    $scope.searchobj.swatch   = !$scope.searchobj.swatch;
  }

    $scope.$on('$destroy', function() {
      $scope.listsearch.remove();
      $scope.goodsfenle.remove();
      $scope.selectgoods.remove();
      $scope.edithgoodsclass.remove();

    });



    $ionicModal.fromTemplateUrl('edithgoodsclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.edithgoodsclass = modal;
    });


    $ionicModal.fromTemplateUrl('selectgoods.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.selectgoods = modal;
    });

    $ionicModal.fromTemplateUrl('listsearch.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.listsearch = modal;
    });

    $ionicModal.fromTemplateUrl('goodsfenle.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.goodsfenle = modal;
    });

    //上下架数量统计
    $scope.salestotin  = {};
    $scope.salestotin.up  =0;
    $scope.salestotin.down  =0;
    function  inlit (){


      if(goodsState.goods_basic_id){
            angular.forEach($scope.datalist,function(r){
              
                  if(r.goods_basic_id  == goodsState.goods_basic_id){
                    r.goods_title  = goodsState.goods_title;
                    r.img_url  = goodsState.img_url;
                    r.activity_price  = goodsState.activity_price;
                    r.total_in_number  = goodsState.total_in_number;                    
                  }
            })
      } 


      if(goodsState.Refresh){
          goodsState.Refresh   =false;
          return  false;
      };

      $timeout(function(){
        $ionicScrollDelegate.$getByHandle('list').scrollTop();
        $scope.downlistloadmor  = true;
        $scope.page_number  = 1;
        $scope.datalist  = [];

        Tools.getData({
         "interface_number": "030105",
         "post_content": {
            "cate_id":$stateParams.id,
         }
        },function(r){
         if(r){
             $scope.salestotin.up  = r.resp_data.on_sale;
             $scope.salestotin.down  = r.resp_data.un_sale;
         }
        })
        //获取分类列表


      },500)
    };





   //保存分类名称
   $scope.saveClassName =  function(){
        if(!$scope.classinfo.title){
          native.task('请输入')
          return  false;
        }

        if($scope.classinfo.title  == $scope.title){
          $scope.goodsfenle.hide();
          return  false;
        }

        Tools.getData({
          "interface_number": "030202",
          "post_content": {
            "cate_name":$scope.classinfo.title,
            "cate_id": $stateParams.id,
   }
        },function(r){
          if(r){
            $scope.title  = $scope.classinfo.title;
                $scope.goodsfenle.hide();
          }
        })

   }



    $scope.searchclarall = function (){
      $scope.searchobj.fel  = undefined;
      $scope.searchobj.id  = undefined;
      $scope.searchobj.tiaomiao  = undefined;
      $scope.searchobj.state  = undefined;
    }

    $scope.searchselctme =  function (r){
      if(!r.select){
        angular.forEach($scope.fenliedata,function(s){
          s.select   = false;
        })
        r.select=  true;
        $scope.searchobj.fel =  r.cate_name;
        $scope.searchobj.id  =   r.cate_id;
        $scope.goodsfenle.hide();
      }
    }

    $scope.$on('$ionicView.beforeEnter',function(){
      inlit()
    });



    //切换上线 状态
    $scope.liststate  =  true;
    $scope.left =  function (){
      if(!$scope.liststate){
            $ionicScrollDelegate.$getByHandle('list').scrollTop();
            $scope.liststate  =  true;
            $scope.downlistloadmor  = true;
            $scope.page_number  = 1;
            $scope.datalist  = [];


      }

    }
    $scope.right =  function (){
      if($scope.liststate){
        $ionicScrollDelegate.$getByHandle('list').scrollTop();
        $scope.liststate  =  false;
        $scope.downlistloadmor  = true;
        $scope.page_number  = 1;
        $scope.datalist  = [];
      }
    }


    $scope.closectr  =   function (){
        angular.forEach($scope.datalist,function(c){
          c.ctr  = false;
        })
    };

    $scope.swatchctr =  function (r,$event){
        $event.stopPropagation();  
        r.ctr   = !r.ctr;
        
    }




   $scope.searchresult  = function (){
          $scope.listsearch.hide();
          $timeout(function(){
              $scope.customcucdownlisloadMore(true);
          },300)
   }

    $scope.customcucdownlisloadMore  =  function (type){
        var sendoption  = {
          "interface_number": "030104",
         "post_content": {
         "searchParam": {
             "is_sales": 1,
             "shop_cate_id":$stateParams.id
           }
        }
      };

      if($scope.liststate){
        sendoption.post_content.searchParam.is_sales  = 1;
      }else{
        sendoption.post_content.searchParam.is_sales  = 0;
      }

      if(type){
          sendoption.post_content.page_num  = $scope.page_number  = 1;
      }else{
        sendoption.post_content.page_num  = $scope.page_number;
      }
      //搜索的处理

      if($scope.searchobj.tiaomiao){
        sendoption.post_content.searchParam.keyword  =  $scope.searchobj.tiaomiao;
      }else{
        sendoption.post_content.searchParam.keyword  = '';
      }

      if($scope.searchobj.state  == '上架' ){
        sendoption.post_content.searchParam.is_sales  = 1;
        $scope.liststate  = true;

      }else if($scope.searchobj.state  == '下架' ){
        $scope.liststate  = false;
        sendoption.post_content.searchParam.is_sales  = 0;
      }



      Tools.getData(sendoption,function(r){
            if(r){

                  if(r.resp_data.nextPage  == 0 ){
                  $scope.downlistloadmor  = false;
                  $scope.page_number  =1;
                  }else{
                    $scope.downlistloadmor  = true;
                    $scope.page_number  =r.resp_data.nextPage;
                  }
                   angular.forEach(r.resp_data.data,function(c){
                       c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
                       c.ctr  = false;
                   });

                   if(type){
                      $scope.datalist  = r.resp_data.data;
                   }else{
                     angular.forEach(r.resp_data.data,function(c){
                         $scope.datalist.push(c);
                     });
                   }




            }
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }

    $scope.Add  = function(){
      $state.go('r.goodsEdit')
    };






    $scope.$on('$stateChangeSuccess',function(){
      $scope.loginboj = {};
      $scope.ing  = false;
    });


    $scope.caklateheight  = {};
    function   caklatehe  (){
         if(window.platform  == 'ios'){
           $scope.caklateheight  = {
             height:window.innerHeight-(64+44+20)+'px'
           }
         }else{
           $scope.caklateheight  = {
             height:window.innerHeight-(44+44+20)+'px'
           }
         }
    };
    caklatehe();
    $timeout(function(){
    caklatehe();
    },600)




}])

Ctr.controller('ConfirmorderZfctr',['$scope','buyConfirmorde','Tools','$timeout','$state','comforderlistadder','native','fromStateServ',function ($scope,buyConfirmorde,Tools,$timeout,$state,comforderlistadder,native,fromStateServ) {



$scope.comorder  =function () {

    if(!$scope.info.address.addr_id){
        native.task('请选择收货地址');
        return  false;
    }    
    Tools.showlogin();
    var  carids  = '';
    angular.forEach($scope.info.goods,function (sff) {
        angular.forEach(sff.goods_info,function (aaa) {
           carids+= aaa.cart_id+',';
        })
    })

     carids  =    carids.substring(carids.lastIndexOf(','),'')
    Tools.getData({
         "interface_number": "020607",
         "post_content": {
            "addr_id": $scope.info.address.addr_id,
            "remark": $scope.info.make?$scope.info.make:'',
            "cartIds":carids
        }
    },function (r) {
        if(r){

            console.log(r);

        }

    })


}
    $scope.chikethi  =function (r) {
        
        

        if(r.active){
            $scope.closetallcationvalue()
        }else{
            angular.forEach($scope.addlist,function (ww) {
                ww.active   =false;
            })
            r.active  =  true;
        

            $scope.info.address   = r;
            $scope.closetallcationvalue();



            

        }

    }
    $scope.editadder  = function(r){

        comforderlistadder.no    =  true;
        $state.go('r.AddressEdith',{id:r.addr_id});
        $scope.closetallcationvalue();
    }
    $scope.addadder  =  function(){
                comforderlistadder.no    =  true;
            $state.go('r.AddressEdith');
            $scope.closetallcationvalue();
    }

    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }

  $scope.addjoinshopcart  = function () {
            Tools.getData({
                 "interface_number": "020505",
                "post_content": {}
            },function(r){
                if(r){

                        $scope.addlist  = r.resp_data.data;
                        
                        angular.forEach($scope.addlist,function(s) {
                            if(s.addr_id  == $scope.info.address.addr_id){
                                s.active  =true;
                            }else{
                                s.active  =false;
                            }

                        });
                        
                        $scope.setallcationstate = true;

                    }
            })
        }        
        $scope.closetallcationvalue  =   function(){
            $scope.setallcationstate  =  false;
            var  c   =   document.querySelector('#cutom_sheet');
            c.className = "action-sheet-backdrop";
            $timeout(function(){
                c.className  ="action-sheet-backdrop cutom-sheet"
            },400);
            };

   function  inlit  (){
            if(comforderlistadder.no){
                comforderlistadder.no  = false
                return false;
            }
                Tools.showlogin();
                if(buyConfirmorde.cart){
                    //购物车过来的 接口    
                    Tools.getData({
                   "interface_number": "020601",
                    "post_content": {
                        "cartIds": buyConfirmorde.cart
                        }
                    },function(r){
                    buyConfirmorde.cart  = undefined;
                                if(r){
                                    $scope.info = r.resp_data;
                                    $scope.info.total_pricy  = $scope.info.total_pricy.toFixed(2);
                                    $scope.info.goods  =  $scope.info.goodsInfo;
                                     
                                    angular.forEach($scope.info.goods,function(ssz){
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/1/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/1/w/200/h/200';
                                          })
                                    })

                                    console.log($scope.info)
                                    $scope.addjoinshopcart();
                                    
                                }
                    })



                    


                }else{

                    Tools.getData({
                   "interface_number": "020600",
                    "post_content": {
                        "shop_id": buyConfirmorde.shop_id,
                        "sku_id":buyConfirmorde.sku_id ,
                        "goods_basic_id":buyConfirmorde.goods_basic_id,
                        "number": buyConfirmorde.number
                        }
                    },function(r){
                                if(r){
                                    $scope.info = r.resp_data;
                                    $scope.info.total_pricy  = $scope.info.total_pricy.toFixed(2);

                                    angular.forEach($scope.info.goods,function(ssz){
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/1/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/1/w/200/h/200';
                                          })
                                    })

                                    $scope.addjoinshopcart();
                                }
                    })
                }
   }

$scope.$on('$ionicView.beforeEnter',function(){
            
            if(fromStateServ.getState('r.ConfirmorderZf')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.ConfirmorderZf').title;
            }else{
                $scope.showtitle  = false;
            }

            inlit();    
})



}])
Ctr.controller('ProductdetailsCtr',['$scope','$stateParams','fromStateServ','$ionicHistory','Tools','$ionicModal','$timeout','native','buyConfirmorde','$state',function($scope,$stateParams,fromStateServ,$ionicHistory,Tools,$ionicModal,$timeout,native,buyConfirmorde,$state){
  $scope.addoactionlistimte  = function (pr) {
        if($scope.showstockprice){
          if($scope.selectsku.state){
                
                 Tools.showlogin();
                $scope.closetallcationvalue();
                $timeout(function () {
                  //去确认订单
                  buyConfirmorde.shop_id  = $scope.goods.shopInfo.shop_id;
                  buyConfirmorde.sku_id  =  $scope.selectsku.skuid;
                  buyConfirmorde.goods_basic_id  =  $scope.goods.goodsInfo.goods_basic_id;
                  buyConfirmorde.number  =  $scope.selectsku.number;
                  Tools.hidelogin();
                  $state.go('r.ConfirmorderZf')

                },300)

                //   //立即购买
                //   Tools.showlogin();
                //   Tools.getData({
                //    "interface_number": "020600",
                //     "post_content": {
                //         "shop_id": $scope.goods.shopInfo.shop_id,
                //         "sku_id": $scope.selectsku.skuid,
                //         "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                //         "number": $scope.selectsku.number
                //     }
                // },function (r) {
                //     if(r){

                    
                //     }
                // })







          }else{
          //加入购物车

          Tools.showlogin();
          Tools.getData({
             "interface_number": "020401",
              "post_content": {
                  "shop_id": $scope.goods.shopInfo.shop_id,
                  "sku_id": $scope.selectsku.skuid,
                  "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                  "number": $scope.selectsku.number
              }
          },function (r) {
              if(r){
                  native.task('加入购物成功');
              }
          })






          }




        }else{
          native.task('请选择一条完整的规格属性!')

        }



  }
  


    $scope.selectsku  ={};
    $scope.selectsku.number  =1;
    $scope.selectsku.state  =  false;



    $scope.addnumber  = function () {
      $scope.selectsku.number ++;
    }
    $scope.removeumber  = function () {
      $scope.selectsku.number--;
      if($scope.selectsku.number  >= 0){
        $scope.selectsku.number  =1;
      }
      
    }



    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      var  c   =   document.querySelector('#cutom_sheet');
      c.className = "action-sheet-backdrop";
      $timeout(function(){
        c.className  ="action-sheet-backdrop cutom-sheet"
      },400);
      $scope.shopcartnumber = 0;
      angular.forEach($scope.shopcart,function(key){
        $scope.shopcartnumber  =  ($scope.shopcartnumber+key.number);
      })


    };



   $scope.goodskumsg  ={};



   $scope.chekdskucombination  = function (parentobj,nowobj){





      // this  state  is
      $scope.showstockprice = false;
      if(!nowobj.disable){
        if(nowobj.active){
          //close this    state  active
          nowobj.active = false;
        }else {
          angular.forEach(parentobj.attrbute,function(mad){
            mad.active = false;
          });
          //open this    state  active
          nowobj.active  =true;
        }

        //Only one
        if($scope.skugroup.length == 1 &&  $scope.skugroup[0].sku_strand.length == 1){
          angular.forEach($scope.skugroup,function(key) {
            if (nowobj.active) {
              $scope.showstockprice = true;
            } else {
              $scope.showstockprice = false;
            }
            $scope.goodskuimte_attrbutsmsg = {};
            var char = '';
            angular.forEach(key.sku_strand,function(kin){
              char+=kin[0]+':'+kin[1]+';';
            });
            angular.forEach($scope.goodskustockinfo,function(valure,key){
              if(key == char){
                $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
              }
            });
            $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
            $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
            $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
            $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
            $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;


            $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
            $scope.selectsku.price =   key.baseinfo.activity_price;


            $scope.goodskuimte_attrbutsmsg.price =key.baseinfo.activity_price;
            $scope.goodskumsg.price   =   key.baseinfo.activity_price



            $scope.skuimteinfo = key;
          });

          return  false;
        }
        var  isonegood = 0;
        var  cc =  $scope.skugroup[0].sku_strand[0][0];
        angular.forEach($scope.skugroup,function(xxin){
          angular.forEach(xxin.sku_strand,function(zz){
            if(cc  == zz[0]){
              isonegood++;
            }
          })
        });

        if(isonegood == $scope.skugroup.length  &&  $scope.keyslist.length  ==1){
          angular.forEach($scope.skugroup,function(key){
            if(key.sku_strand[0][1] ==  nowobj.subid){
              if(nowobj.active){
                $scope.showstockprice = true;
              }else{
                $scope.showstockprice = false;
              }
              $scope.goodskuimte_attrbutsmsg = {};
              var char = '';
              angular.forEach(key.sku_strand,function(kin){
                char+=kin[0]+':'+kin[1]+';';
              });
              angular.forEach($scope.goodskustockinfo,function(valure,key){
                if(key == char){
                  $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                }
              });
              $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
              $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
              $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
              $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
              $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;

                    $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
                  $scope.selectsku.price =   key.baseinfo.activity_price;
      


              //零售价统一
              $scope.goodskuimte_attrbutsmsg.price =key.baseinfo.activity_price;
              $scope.goodskumsg.price   =   key.baseinfo.activity_price




              $scope.skuimteinfo = key;
            }

          });
          return false;
        }




        if($scope.keyslist.length == 2){


          var  activelistxx  =[];
          angular.forEach($scope.showskudata,function(key){
            angular.forEach(key.attrbute,function(subkey){
              if(subkey.disable == false  &&  subkey.active){
                var  nowactiveimte = {};
                nowactiveimte.parentId =  key.parentId;
                nowactiveimte.attrsbute  = subkey.subid;
                activelistxx.push(nowactiveimte);
              }
            })
          });


          var  isover  =false;
          angular.forEach($scope.showskudata,function(kkk){
            angular.forEach(kkk.attrbute,function(kksub){
              var  ishasactive  = false;
              ///exclude  existence
              angular.forEach(activelistxx,function(haskey){
                if(kksub.subid ==haskey.attrsbute  && kkk.parentId  == haskey.parentId ){
                  ishasactive  =true;
                }
              });
              if(!ishasactive){
                var  relyon  =false;
                angular.forEach($scope.skugroup,function(key){
                  //if(kksub.subid  == subkey[1] &&  kkk.parentId  ==  subkey[0]){
                  //    relyon  = true;
                  //}
                  var   Long  = 0;
                  ///exclude  existence
                  angular.forEach(activelistxx,function(haskey){
                    angular.forEach(key.sku_strand,function(subkey){
                      if(subkey[1] ==haskey.attrsbute  && subkey[0] == haskey.parentId ){
                        Long++;
                      }
                    })
                  });
                  if(Long == activelistxx.length){
                    angular.forEach(key.sku_strand,function(subkey){
                      if(subkey[1] ==kksub.subid && subkey[0] == kkk.parentId ){
                        relyon  =true;
                      }
                    });
                  }
                });

                if(!relyon){
                  if(activelistxx.length==2){
                    isover  =  true;
                  }
                  kksub.active  = false;
                  kksub.disable  =true;
                }else{
                  kksub.active  = false;
                  kksub.disable  =false;
                }
              }
            })
          });



          if(isover){
            if(nowobj.active){
              $scope.showstockprice = true;
            }else{
              $scope.showstockprice = false;
            }
            var xxdata =  [];
            angular.forEach(activelistxx,function(xx){
              xxdata.push([
                xx.parentId,
                xx.attrsbute
              ]);
            });
            angular.forEach($scope.skugroup,function(key){
              if(activelistxx.length  == key.sku_strand.length){
                var  compare = [];
                angular.forEach(activelistxx,function(kin){
                  var  arr = [];
                  arr[0]  = kin.parentId;
                  arr[1]  = kin.attrsbute;
                  compare.unshift(kin)
                })
                var  len = 0;
                angular.forEach(compare,function(mbd,index){
                  if(mbd.parentId  == key.sku_strand[index][0]  &&  mbd.attrsbute  == key.sku_strand[index][1] ){
                    len++;
                  }
                });
                $scope.showstockprice = true;
                if(len == activelistxx.length ){
                  $scope.goodskuimte_attrbutsmsg = {};
                  var char = '';
                  angular.forEach(key.sku_strand,function(kin){
                    char+=kin[0]+':'+kin[1]+';';
                  });
                  angular.forEach($scope.goodskustockinfo,function(valure,key){
                    if(key == char){
                      $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                    }
                  });
                  $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
                  $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
                  $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
                  $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;



                  $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
                  $scope.selectsku.price =   key.baseinfo.activity_price;





                  $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;
                  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.activity_price;
                  $scope.goodskumsg.price   =   key.baseinfo.activity_price;






                  $scope.skuimteinfo = key;
                }
              }
            })
          }



          return false;
        }




        //filter   Already existing  Connected data
        //storage   now  active attrbute
        var  activelist  =[];
        angular.forEach($scope.showskudata,function(key){
          angular.forEach(key.attrbute,function(subkey){
            if(subkey.disable == false  &&  subkey.active){
              var  nowactiveimte = {};
              nowactiveimte.parentId =  key.parentId;
              nowactiveimte.attrsbute  = subkey.subid;
              activelist.push(nowactiveimte);
            }
          })
        });
        angular.forEach($scope.showskudata,function(kkk){
          angular.forEach(kkk.attrbute,function(kksub){
            var  ishasactive  = false;
            ///exclude  existence
            angular.forEach(activelist,function(haskey){
              if(kksub.subid ==haskey.attrsbute  && kkk.parentId  == haskey.parentId ){
                ishasactive  =true;
              }
            });
            if(!ishasactive){
              var  relyon  =false;
              angular.forEach($scope.skugroup,function(key){
                //if(kksub.subid  == subkey[1] &&  kkk.parentId  ==  subkey[0]){
                //    relyon  = true;
                //}
                var   Long  = 0;
                var   back  =  Tools.clone(activelist);
                if(back.length  == 1){
                  $scope.showstockprice = false;
                  back =[]
                }if(back.length  == key.sku_strand.length-1) {
                  //closed  path
                  $scope.showstockprice = false;
                }else{
                  $scope.showstockprice = false;
                  Tools.Arrayremove(back,0);
                  if(back.length  == key.sku_strand.length-1){
                    if(activelist.length  == key.sku_strand.length){
                      var  compare = [];
                      angular.forEach(activelist,function(kin){
                        var  arr = [];
                        arr[0]  = kin.parentId;
                        arr[1]  = kin.attrsbute;
                        compare.unshift(kin)
                      });

                      var  len = 0;
                      angular.forEach(compare,function(mbd,index){
                        if(mbd.parentId  == key.sku_strand[index][0]  &&  mbd.attrsbute  == key.sku_strand[index][1] ){
                          len++;
                        }
                      });
                      $scope.showstockprice = true;
                      if(len == activelist.length ){
                        $scope.goodskuimte_attrbutsmsg = {};
                        var char = '';
                        angular.forEach(key.sku_strand,function(kin){
                          char+=kin[0]+':'+kin[1]+';';
                        });

                        angular.forEach($scope.goodskustockinfo,function(valure,key){
                          if(key == char){
                            $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                          }
                        });

                        $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
                        $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
                        $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
                        $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
                        $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;

                        //if($scope.clientobject.type  =='1'){
                        //  //这里去销售价格
                        //  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.trade_price;
                        //  $scope.goodskumsg.price  =   key.baseinfo.trade_price;
                        //}else {
                        //  //这里去零售价
                        //  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.retail_price;
                        //  $scope.goodskumsg.price   =   key.baseinfo.retail_price
                        //}


                        //零售价
                        $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.retail_price;
                        $scope.goodskumsg.price   =   key.baseinfo.retail_price



                        $scope.skuimteinfo = key;
                      }
                    }
                  }
                }
                ///exclude  existence
                angular.forEach(back,function(haskey){
                  angular.forEach(key.sku_strand,function(subkey){
                    if(subkey[1] ==haskey.attrsbute  && subkey[0] == haskey.parentId ){
                      Long++;
                    }
                  })
                });
                if( Long == back.length){
                  angular.forEach(key.sku_strand,function(subkey){
                    if(subkey[1] ==kksub.subid && subkey[0] == kkk.parentId ){
                      relyon  = true;
                    }
                  });
                }else{
                }
              });
              if(!relyon){
                kksub.active  = false;
                kksub.disable  =true;
              }else{
                kksub.active  = false;
                kksub.disable  =false;
              }
            }
          })
        });

        //$scope.skugroup;
      }
    };






   $scope.$on('$destroy', function() {
    
   });

  $scope.addjoinshopcart  = function () {

            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  false;
  }

  $scope.lijibuy  = function () {
            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  true;
  }
    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }


  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Productdetails')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Productdetails').title;
            }else{
                $scope.showtitle  = false;
            }
            inlit();            
    });

    function  inlit  (){
      Tools.showlogin();
      Tools.getData({
        "interface_number": "020205",
         "post_content": {
        "goods_basic_id":$stateParams.id        
        }
      },function(r){
          if(r){

              if(!r.resp_data.goodsInfo.img.length){
                  var   width  =  window.innerWidth*2;
                  r.resp_data.goodsInfo.img[0]  =    window.qiniuimgHost+r.resp_data.goodsInfo.img_url+'?imageView2/1/w/'+width+'/h/'+width; ;
              }

              console.log(r.resp_data.goodsInfo.img)
              angular.forEach(r.resp_data.goodsInfo.img,function (fff) {
                   var   width  =  window.innerWidth*2;
                   fff  =    window.qiniuimgHost+fff+'?imageView2/1/w/'+width+'/h/'+width;
              });

              $scope.goods  = r.resp_data;
              console.log($scope.goods);
              $scope.goods.goodsInfo.img_url  =  window.qiniuimgHost+$scope.goods.goodsInfo.img_url+ '?imageView2/1/w/150/h/150';

                //this  is show sku data  list
            $scope.showskudata = [];
            angular.forEach(r.resp_data.normsInfo,function(value,key){
              var  skuitme =  {};
              skuitme.parentname =value.name;
              skuitme.parentId =key;
              skuitme.attrbute =[];
              angular.forEach(value.list,function(subvalue,subkey){
                var  attrbteitme  = [];
                attrbteitme.subid = subkey;
                attrbteitme.subname = subvalue;
                attrbteitme.active = false;
                attrbteitme.disable = false;
                skuitme.attrbute.push(attrbteitme);
              });
              $scope.showskudata.push(skuitme);
              $scope.goodskubaseinfo  = r.resp_data.goodsInfo;
              $scope.goodskustockinfo = r.resp_data.stockInfo;
            });

            //this is handle sku  rey on  sku group
            $scope.skugroup = [];
            angular.forEach(r.resp_data.basicData,function(value,key){
              var  skugroupitme  = {};
              skugroupitme.baseinfo  =value;
              skugroupitme.sku_strand  =[];
              var skukey =   key.split(';');
              angular.forEach(skukey,function(subvlaue){
                if(subvlaue!=''){
                  var  this_strand  = subvlaue.split(':');
                  skugroupitme.sku_strand.push(this_strand)
                }
              });
              $scope.skugroup.push(skugroupitme);
            });

            angular.forEach($scope.localprice,function (keyxx){
              angular.forEach($scope.skugroup,function(groupitme){
                if(groupitme.baseinfo.local_sku_id  == keyxx.local_sku_id){
                  groupitme.baseinfo.retail_price  = keyxx.retail_price;
                }
              })
            });
            $scope.expar  = r.resp_data.goodsInfo.express_fee;
            $scope.keyslist =   r.resp_data.keys;
            //$scope.allocationbumer.number  =1;


            console.log($scope.showskudata);


            // $timeout(function(){
            //   $scope.chekdskucombination($scope.showskudata[0],$scope.showskudata[0].attrbute[0]);
            // },400)











          }else{
            if($scope.showtitle){
                $scope.backtoprevView('r.Productdetails');
            }else{
              $ionicHistory.goBack();
            }


          }
      });


    }




}])

/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal','$rootScope','goodsState','$ionicScrollDelegate','$ionicActionSheet',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal,$rootScope,goodsState,$ionicScrollDelegate,$ionicActionSheet){








    //删除规格属性的方法
    $scope.delattritem  = function(obj,index){
      //维护skulist
      //记录该条sku是否没有依赖则完全删除

      if($scope.goods.edit){
        //编辑状态下最少要保留一个
        if(obj.length==1){
          native.task('编辑状态下最少要保留一条属性规格!');
          return  false;
        }
      }

    native.confirm('删除是不可撤销的操作是否继续？','删除属性规格',['删除','取消'],function(c){
                  if(c  == 1){

                  if($scope.attrsprices.length == 1){
                    $scope.attrsprices = [];
                    $scope.goodsexpandc  =false;
                  }else{
                    $scope.goodsexpandc  =true;
                  }
                        var destroylist  = [];
                        angular.forEach(obj,function(key,inz){
                          if(index == inz){
                            angular.forEach(key.sku,function(skuitem,skuindex){
                              var  nwobj  = {};
                              nwobj.name =  skuitem;
                              nwobj.repeat = 0;
                              angular.forEach(obj,function(kl,i){
                                angular.forEach(kl.sku,function(sub_sku,lin){
                                  if(sub_sku.goods_prop_id  ==  skuitem.goods_prop_id ){
                                    //哈哈
                                    if( sub_sku.prop_value == skuitem.prop_value ){
                                      //蛋筒
                                      nwobj.repeat++;
                                    }
                                  }
                                })
                              });
                              destroylist.push(nwobj)
                            })
                          }
                        });
                        angular.forEach(destroylist,function(key){
                          if(key.repeat ==1){
                            var parentID =   key.name.goods_prop_id;
                            var  sku_value =  key.name.prop_value;
                            angular.forEach($scope.attslist,function(attslist){
                              if(attslist.goods_prop_id  == parentID ){
                                var  parentisselet = false;
                                angular.forEach(attslist.propValue,function(sub_attslist,indx){
                                  if(sub_attslist.prop_value  == sku_value ){
                                    sub_attslist.select = false;
                                  }
                                  if(sub_attslist.select){
                                    parentisselet = true;
                                  }
                                });
                                if(parentisselet){
                                  attslist.select = true;
                                }else{
                                  attslist.select = false;
                                }
                              }
                            })
                          }
                        });
                        Tools.rmArrin(obj,index);
                        //更新索引
                        angular.forEach(obj,function(l,inz){
                          l.index=inz;
                        });
                           if($scope.attrsprices.length){
                                $scope.hassku  = true;
                            }else{
                              $scope.hassku  = false;

                            }

                      
                    


                  }
              })


     
      
    };
    
    
    


    //批量设置价格
    $scope.openlistset  = function (){
      if($scope.attrsprices.length>0){
        // 显示操作表
        var  funlist   =  [
            { text: '市场价' },
            { text: '平台价' },
            { text: '库存' },
          ];
        $ionicActionSheet.show({
          buttons:funlist,
          titleText: '选择需要批量设置的属性',
          cancelText: '取消',
          buttonClicked: function(index) {
          
            if(index != 4 && index != 5 ){
              //打开输入框
              $ionicPopup.prompt({
                title:'输入批量设置的数量!',
                inputType:'number',
                inputPlaceholder:'请输入数量',
                okText:'确认',
                cancelText:'取消'
              }).then(function(res){
                var resulf =null;
                if(index==0){
                  //进货价
                  resulf = 'retail_price';
                }
                if(index ==1){
                  //零售价
                  resulf = 'activity_price';
                }
                if(index ==2){
                  //批发价
                  resulf = 'number';
                }
                angular.forEach($scope.attrsprices,function(key){
                  key.msg[resulf] = res
                });
              });
            };

            return true;
          }
        });
      }else{

        native.task('请添加至少一个,商品的规格属性!');


      }
    };

        
        $scope.attrsprices  = [];
        $scope.savesku  = function(){
          $scope.attrsprices  = [];
          var   cheklist   = [];
          angular.forEach($scope.goods.skuSpe,function(ff){
              if(ff.select){
                    var  chillist  = [];                
                    angular.forEach(ff.child,function(ssz){

                      if(ssz.select){
                         chillist.push({
                                        goods_prop_id:ff.goods_prop_id,
                                        prop_name:ff.prop_name,
                                        prop_value:ssz.prop_value,
                                        prop_value_id:ssz.prop_value_id,
                                        start:false                                        
                         });
                      }
                    });
                    cheklist.push(chillist);
              }
          });

            var   msgint  ={
              retail_price:undefined,
              activity_price:undefined,
              number:undefined,
            };            

          var   c  = Tools.descartes(cheklist);
          var  ref = [];
          for(var o = 0; o< c.length;o++){
            var newobj = {};
            newobj.sku = c[o];
            newobj.index = ref.length;
            ref.push(newobj)
          }

      angular.forEach($scope.attrsprices,function(kin){
        angular.forEach(ref,function(ls){
          if( kin.sku[0].goods_prop_id  ==  ls.sku[0].goods_prop_id  &&  kin.sku[0].prop_value_id  ==   ls.sku[0].prop_value_id  ){
            ls.msg = kin.msg;
            if(kin.local_sku_id){
              ls.msg.local_sku_id = kin.local_sku_id;
            }

          }
        })
      });

      if($scope.attrsprices.length==0){
        $scope.attrsprices = Tools.clone(ref);
      }else{
        //length不对直接对比条数进行删除
        if(ref.length != $scope.attrsprices.length){
          if(ref.length>$scope.attrsprices.length){
            //这里是生成的数据大于源有的
            angular.forEach(ref,function(key,index){
              if($scope.attrsprices[index] == undefined){

                key.msg =Tools.clone(msgint);
                key.index = $scope.attrsprices.length;
              }else{

                key.msg = Tools.clone($scope.attrsprices[index].msg);
                if($scope.attrsprices[index].local_sku_id){
                  key.msg.local_sku_id  =  $scope.attrsprices[index].local_sku_id;
                }
              }
            });
            $scope.attrsprices  =Tools.clone(ref);
          }else if(ref.length<$scope.attrsprices.length){
            angular.forEach($scope.attrsprices,function(key,inc){
              if(ref[inc] == undefined){
                delete  $scope.attrsprices[inc];
                $scope.attrsprices.length = $scope.attrsprices.length-1;
              }else{
                key.sku = Tools.clone(ref[inc].sku);
              }
            })
          }
        }else{
          angular.forEach($scope.attrsprices,function(key,inc){
            key.sku  = Tools.clone(ref[inc].sku);
          })
        }
      }
      if($scope.attrsprices.length!=0){
        $scope.goodsexpandc  =true;
      }else  if($scope.attrsprices.length==0){
        $scope.goodsexpandc  =false;
      }
      
      angular.forEach($scope.attrsprices,function(kin){
        if(kin.msg){
        }else{
          kin.msg = Tools.clone(msgint);
        }
      });

        if($scope.attrsprices.length){
              $scope.hassku  = true;
        }else{
          $scope.hassku  = false;

        }



        


        $scope.sku.hide();
        

        };





        $scope.sublistaddnew  = {};
        $scope.appenattributobj  =   function(){
        if($scope.sublistaddnew.prop_value){

         var  poid  = undefined;
          angular.forEach($scope.goods.skuSpe,function(ss,kyein){
                 if(ss.chekd){
                   poid =  ss.goods_prop_id
                 }                 
               })

          Tools.getData({
            "interface_number":"030305",
            "post_content":{
              "goods_prop_id":poid,
              "prop_value":$scope.sublistaddnew.prop_value
            }
        },function(r){
            if(r){

               r.resp_data.select  = false;

               //$scope.subattrslist.unshift(r.resp_data);

               var   inde  = undefined;
               angular.forEach($scope.goods.skuSpe,function(ss,kyein){
                 if(ss.chekd){                                     
                   inde = kyein;
                 }                 
               })

              $scope.goods.skuSpe[inde].child.unshift(r.resp_data);
            }


            $scope.sublistaddnew.prop_value   = undefined;

            debugger

          })


        }else{
          native.task('请输入属性名');
        }
    }


    $scope.addnewskukey  =  function(){
          native.prompt('','添加新规格',['添加','取消'],'',function(result){
                if(result.buttonIndex  == 1){
                      if(result.input1 ==''  ||  result.input1 == undefined){
                        native.task('请填写规格名');
                        return false;
                      }else{
                        Tools.getData({
                           "interface_number": "030304",
                              "post_content": {
                              "prop_name":result.input1,
                            }
                        },function(r){
                                  r.resp_data.chekd  = false;
                                  r.resp_data.select  = false;
                                   $scope.goods.skuSpe.unshift(r.resp_data);
                        })

                      }
                
                }

          })

    }


  $scope.canlshowright  = function(){
      $scope.showchildnode  = false;
  }

  $scope.sublistchekselect   = function(s,ll){
        var  ff   = true;
        angular.forEach(s,function(f){
              if(f.select){
                   ff  = false;
              }
        })

        if($scope.goods.edit){
          if(ff){
            ll.select   = true;
            native.task('编辑状态下必须至少选中一个属性!')
            return  false;
          }
        }else{
          if(ff){
                angular.forEach($scope.goods.skuSpe,function(ff){
                        if(ff.chekd){
                            ff.select  = false;
                        }
                })
          }else{
             angular.forEach($scope.goods.skuSpe,function(ff){
                        if(ff.chekd){
                            ff.select  = true;
                        }
                })
          }
        }




  }
  
  $scope.subattrslist  = [];


  $scope.showmichild   =  function (targe){

            angular.forEach($scope.goods.skuSpe,function(ha){
                      ha.chekd  = false;
              });
              targe.chekd  = true;
              $scope.showchildnode  = true;
              if(targe.child){
                $scope.subattrslist  = targe.child;
              }else{
              Tools.showlogin();
              Tools.getData({
                "interface_number": "030303",
                "post_content": {
                    "goods_id": $scope.goods.edit?$scope.goods.id:'',
                    "goods_prop_id": targe.goods_prop_id,
                  }
              },function(r){
                $ionicScrollDelegate.$getByHandle('childlistsku').scrollTop();
                if(r){

                   targe.child   = r.resp_data;
                   $scope.subattrslist  = r.resp_data;

                }
              })


              }


            

  }






  //规格属性编辑
  $scope.openattslist  = function(){
      $scope.sku.show();
  }





    //添加分类
    $scope.newclass  = {};
    $scope.addnewclass  = function(){
      console.log($scope.newclass)
      if(!$scope.newclass.name){
        native.task('请填写分类名称');
        return false;
      }
      Tools.showlogin();
      Tools.getData({
            "interface_number": "030204",
          "post_content": {
          "cate_name":$scope.newclass.name,
          "goodsIds":[]
        }
      },function(r){
        if(r){
              $scope.goods.catelist.push(r.resp_data)
              $scope.newclass.name  = undefined;
              native.task('分类添加成功');
        }


      })

    }


    goodsState.Refresh = true;

    $scope.$ionicGoBack  = function (){
    }
    //商城分类对象
    $scope.$on('$destroy', function() {
      $scope.goodclass.remove();
      $scope.sku.remove();
    });

    $ionicModal.fromTemplateUrl('goodclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.goodclass = modal;
    });



    $ionicModal.fromTemplateUrl('sku.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sku = modal;
    });





  //构建商品对象  基本信息
  $scope.goods = {};
  $scope.goods.edit  =  false;  //商品编辑状态
  $scope.goods.Stock_number = 1;
  $scope.goods.systemSelect  = undefined;
  $scope.goods.systemchidSelct  =undefined;
  $scope.goods.systemchidlist  = undefined;
  $scope.goods.cateSelctItem  = '请选择分类';
  $scope.goods.catelist =  [];

  function inlint(){
    Tools.showlogin();
    Tools.getData({
      "interface_number": "030102",
          "post_content": {
            "goods_id": $stateParams.id?$stateParams.id:'',
         }
    },function(r){
         if(r){           
              $scope.goods.systemClass   = r.resp_data.sys_cate;
              $scope.goods.catelist  = r.resp_data.shop_cate;
              $scope.systemparnslec();
              //$scope.goods.Stock_number  =
              $scope.hassku  = false;

              angular.forEach(r.resp_data.prop,function(ha){
                      ha.chekd  = false;
                      if(ha.select){
                            $scope.hassku =  true;
                      }
              });
              $scope.goods.skuSpe  =  r.resp_data.prop;
              $scope.chengselect();
              $scope.goods.skuinfo  = [];

              if($scope.goods.edit){
                $scope.goods.barcode =   r.resp_data.goodsInfo.barcode;
                $scope.goods.freight_price =   parseFloat(r.resp_data.goodsInfo.express_fee);
                $scope.goods.is_virtual  =     r.resp_data.goodsInfo.is_virtual?true:false;
                $scope.goods.title =     r.resp_data.goodsInfo.goods_title;

                

                $scope.goods.id  = r.resp_data.goodsInfo.goods_basic_id;
                
                $scope.goods.goodsDesc     =  r.resp_data.goodsInfo.total_in_number;
                $scope.goods.skuinfo  =  r.resp_data.skuInfo;

                angular.forEach(r.resp_data.goodsInfo.arr_img,function (v){
                  var   c = undefined;
                  if(v  == r.resp_data.goodsInfo.img_url){
                    c   = {
                      fengmian:true,
                      img:window.qiniuimgHost+v+'?imageView2/1/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }else{
                    c   = {
                      fengmian:false,
                      img:window.qiniuimgHost+v+'?imageView2/1/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }
                  $scope.goodspice.push(c);
                })

                if($scope.hassku){
                  //还原sku
                  angular.forEach($scope.goods.skuinfo,function(ff){

                          var skuin   = [];
                          var skuid  =  ff.properties.split(";");
                          var skuname  =  ff.properties_name.split(";");
                             skuname.length  =  skuname.length-1;
                             skuid.length  =  skuid.length-1;
                             
                            angular.forEach(skuid,function(skulitem,skuinde){
                            var   idhan  =  skulitem.split(':');
                            var   namhan   = skuname[skuinde].split(':');
                            


                            skuin.push({
                              goods_prop_id:idhan[0],
                              prop_value_id:idhan[1],
                              prop_name:namhan[0],
                              prop_value:namhan[1],
                            })

                          })


                        $scope.attrsprices.push({
                          index:$scope.attrsprices.length,
                          msg:{
                            activity_price:ff.activity_price,
                            number:ff.quantity,
                            retail_price:ff.retail_price,
                            local_sku_id:ff.local_sku_id
                          },
                          sku:skuin
                        })
                  })

                  console.log($scope.attrsprices);

                    



                }else{
                  $scope.goods.Market_price    =      parseFloat($scope.goods.skuinfo[0].retail_price);
                  $scope.goods.Platform_price  =    parseFloat($scope.goods.skuinfo[0].activity_price);
                  $scope.goods.Stock_number    =     parseFloat($scope.goods.skuinfo[0].quantity);
                }

                




                //$scope.
              }


         }
    })
  }
 //初始化 goods 对象


$timeout(function(){
  inlint();
},400)




  $scope.showdetail = false;
  $scope.swatchdetial  = function (){
        $scope.showdetail = !$scope.showdetail;
  }



  $scope.chengselect = function (r){

    if(r){
    r.select  = !r.select;
    }


    var selectleng  = 0;
    var sselctname  =  undefined;
     angular.forEach($scope.goods.catelist,function(k){

          if(k.select){
            selectleng++;
            sselctname = k.cate_name;
          }
     });



     if(selectleng == 0 ){
          $scope.goods.cateSelctItem    ='请选择分类';
     }else if(selectleng == 1){
       $scope.goods.cateSelctItem  = sselctname;
     }else{
       $scope.goods.cateSelctItem  = selectleng+' 个';
     }



  }


  //父类
  $scope.systemparnslec =   function (){


    if($scope.goods.systemSelect){
        angular.forEach($scope.goods.systemClass,function(c){

                if(c.cate_id   ==  $scope.goods.systemSelect){
                  c.select  =true;
                }else{
                  c.select  = false;
                }
        })
    }



    var hanparnselect = true;
    angular.forEach($scope.goods.systemClass,function(c){

          if(c.select){
            $scope.goods.systemSelect   =  c.cate_id;
            hanparnselect  = false;
          }

          if(c.cate_id  == $scope.goods.systemSelect  &&  c.children.length !=0){

                //计算那个   默认选中
                $scope.goods.systemchidlist  =  c.children;
                var hasslect = true;

                angular.forEach($scope.goods.systemchidlist,function(xx){
                        if(xx.select){
                          hasslect = false;;
                            $scope.goods.systemchidSelct   = xx.cate_id;
                        }
                });
                if(hasslect){
                    $scope.goods.systemchidSelct   =  $scope.goods.systemchidlist[0].cate_id;
                }

          }else{
            $scope.goods.systemchidlist  =  undefined;
            $scope.goods.systemchidSelct  =  undefined;
          }




    })

    if(hanparnselect){
    $scope.goods.systemClass[0].select = true;
    $scope.goods.systemSelect  = $scope.goods.systemClass[0].cate_id;

    }

  };
  //子类
  $scope.chidselect   = function(){
      //console.log($scope.goods.systemchidSelct)
  }

  //$scope.goods.

  //title
  //is_virtual
  //barcode
  //goodsDesc
  $scope.$watch('goods.retail_price',function(newValue,oldValue, scope){
           if(Math.abs(newValue)  >= 999999){
             $scope.goods.Market_price  = 999999;
           }
   });

   $scope.$watch('goods.Platform_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Platform_price  = 999999;
            }
    });
    $scope.$watch('goods.Stock_number',function(newValue,oldValue, scope){
             if(Math.abs(newValue)  >= 999999){
               $scope.goods.Stock_number  = 999999;
             }
     });
     $scope.$watch('goods.freight_price',function(newValue,oldValue, scope){
              if(Math.abs(newValue)  >= 999999){
                $scope.goods.freight_price  = 999999;
              }
      });

  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
          $scope.goods.barcode   =  r.text;
          $scope.$apply();
    });
  }


$scope.delimg  = function(r,kye){
  Tools.rmArrin(r,kye)
}

$scope.chkefengmian  = function (c){
  angular.forEach($scope.goodspice,function(r){
    r.fengmian   =false;
  })
  c.fengmian  = true;
}

//商品图片list
 $scope.goodspice  = [];

 // $scope.goodspice.push({
 //   fengmian:true,
 //   img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1027673320,1338089337&fm=116&gp=0.jpg'
 // })

  //选择图片
  $scope.selectpirce  = function (){
    var ss  = $scope.goodspice;
    if( Object.keys(ss).length >= 5 ){
      native.task('最大上传5张图片');
      return false;
    }else{

          Tools.chekpirc({
                targetWidth:1500,
              },function(r){
                  $scope.goodspice.push({
                    fengmian:false,
                    img:r,
                    news:true,
                    key:undefined
                  })
              })
    }


  };

  //图片上传
  function  uploadimg (claback){
    //待上传图片
    var   imguplist = [];
    //保存索引
    var   imgindex = [];


    if($scope.goodspice.length == 0){

      claback();
      return  false;
    }


    angular.forEach($scope.goodspice,function(v,key){
      if(v.news){
        imguplist.push(v.img)
        imgindex.push(key);
      }
    })
  Tools.sendqiniu_queue(imguplist,function(r){
    angular.forEach(imgindex,function(v,key){

      $scope.goodspice[v].key  = r[key].key
    });
    claback()
  },'goods')
  }
//sendqiniu_queue


//商品的发布保存
$scope.save  = function (){
  if(!$scope.goods.title){
    native.task('请填写标题!')
    return  false;
  }
  if(!$scope.goods.barcode){
    native.task('请填写条码!')
    return  false;
  }

  native.loading();
  uploadimg(function(){
      // console.log(JSON.stringify($scope.goodspice))
      var hasfengmiang   = true;
      var fenmiangtuimg   = undefined;
      var imglist = [];

      if($scope.goodspice.length){
        angular.forEach($scope.goodspice,function(v){
          if(v.fengmian){
            hasfengmiang    = false;
            fenmiangtuimg  = v.key;
          }
          imglist.push(v.key);
        });
        if(hasfengmiang){
            fenmiangtuimg = $scope.goodspice[0].key;
        }
      }



     var sys_catId  ='';

     if($scope.goods.systemSelect){
        sys_catId   = $scope.goods.systemSelect
     }

    if($scope.goods.systemchidSelct){
        sys_catId   = $scope.goods.systemchidSelct
    }

    var cartlist  = [];
    angular.forEach($scope.goods.catelist,function(c){
      if(c.select){
        cartlist.push(c.cate_id);
      }
    })

    var sku = [];
    if($scope.attrsprices.length == 0){

        if(!$scope.goods.Market_price){
          native.task('请填写市场价!')
          native.hidloading();
          return  false;
        }
        if(!$scope.goods.Platform_price){
          native.task('请填写平台价!')
          native.hidloading();
          return  false;
        }

        var loid  =undefined;

        if($scope.goods.skuinfo.length){
              loid =   $scope.goods.skuinfo[0].local_sku_id;
        }
        
        sku.push({
          activity_price:$scope.goods.Platform_price,
          retail_price:$scope.goods.Market_price,
          properties:'',                    
          quantity:$scope.goods.freight_price?$scope.goods.freight_price:'0',
          local_sku_id:loid,

        })
    }else{

      var  bitian  = true;
      angular.forEach($scope.attrsprices,function(fff){
          if(!fff.msg.activity_price   || !fff.msg.retail_price){
             bitian  = false;
          }
          var skuid  = '';
          angular.forEach(fff.sku,function(xxx){
                skuid+=xxx.goods_prop_id+':'+xxx.prop_value_id+';';
          })
          sku.push({
          activity_price:fff.msg.activity_price,
          retail_price:fff.msg.retail_price,
          properties:skuid,                    
          quantity:fff.msg.number?fff.msg.number:'0',
          local_sku_id:fff.msg.local_sku_id?fff.msg.local_sku_id:''
        })
      })

      if(!bitian){
        native.task('请填写完整价格信息!');
        native.hidloading();
        return false;
      }



    }   


    var sendoption  =  {
        "interface_number": '030101',
        "post_content": {
         "goods_title": $scope.goods.title,
         "sys_cate_id":sys_catId,
         "barcode": $scope.goods.barcode,
         "express_fee": $scope.goods.freight_price?$scope.goods.freight_price:0,
         "img_url": fenmiangtuimg?fenmiangtuimg:'',
         "arr_img":imglist.length?imglist:[],
         "cateIds": cartlist.length?cartlist:'',
         "desc": $scope.goods.goodsDesc?$scope.goods.goodsDesc:'',
          total_in_number:'',
          total_in_price:'',
          skuInfo:sku,
          }
    };

    if($scope.goods.edit){
      sendoption.interface_number   = "030103";
      sendoption.post_content.goods_basic_id  = $scope.goods.id;
    }

    Tools.getData(sendoption,function(r){
      if(r){
        if(window.cordova){
            window.cordova.plugins.Keyboard.close();
        }
        if($scope.goods.edit){

            goodsState.goods_basic_id  = r.resp_data.goods_basic_Id;
            goodsState.goods_title  = r.resp_data.goods_title;
            goodsState.img_url  = window.qiniuimgHost+r.resp_data.img_url+'?imageView2/1/w/200/h/200';
            goodsState.activity_price  = r.resp_data.total_in_price;
            goodsState.total_in_number   = r.resp_data.total_in_number;



          native.task('保存成功!',3000)

          $timeout(function(){
              $rootScope.$ionicGoBack();
          },300)

        }else{
          native.task('发布成功!',3000)
          $timeout(function(){
              goodsState.Refresh  = false;
              $rootScope.$ionicGoBack();
          },300)
        }








      }
    })
  })
}

  if($stateParams.state){
    $scope.title  = '商品编辑';
    $scope.state  = '保存';
    $scope.goods.edit  = true;

  }else{
    $scope.title  = '商品添加';
    $scope.state  = '发布';
  }

  $scope.scoptopheihgt  = {};
  function gehiehgt (){    
      if(window.platform  == 'ios'){
            $scope.scoptopheihgt  ={
              height:(window.innerHeight-64-80)+'px'
            }
      }else{
           $scope.scoptopheihgt = {
              height:(window.innerHeight-44-80)+'px'
            }
      }
  }
  gehiehgt();
  $timeout(function(){
    gehiehgt();
  },500)

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('listofgoodsCtr',['$scope','fromStateServ','$timeout','$state','$ionicModal','native','Tools','$ionicScrollDelegate','goodsState','$ionicPopup',function($scope,fromStateServ,$timeout,$state,$ionicModal,native,Tools,$ionicScrollDelegate,goodsState,$ionicPopup){







 $scope.searchresult  = function (){
          $scope.listsearch.hide();
          $timeout(function(){
              $scope.customcucdownlisloadMore(true);
          },300)
   }




    $scope.chengselect =  function(i){
        i.select  = !i.select;
    }
    //编辑goods分类      Edit product categories
    $scope.edithgoodsclassopen  = function (xx){
      $scope.nowgoodid  = xx.goods_basic_id;
      
      $scope.edithgoodsclass.show();
      $timeout(function(){
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030109",
            "post_content": {
              "goods_id": xx.goods_basic_id,
          }
        },function(r){
              if(r){  
              
                $scope.goodsClasda  = r.resp_data.shop_cate;
              }
        })
      },400)
    };

    //edit goods class data 
    $scope.goodsClasda  = [];
    $scope.newgoodsclass = {};
    $scope.newgoodsclass.name =undefined;

    $scope.addgoodsClass = function(){
        if(!$scope.newgoodsclass.name){
          native.task('请填写分类名称');
          return false;
        };
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030204",
          "post_content": {        
          "cate_name":$scope.newgoodsclass.name,
          "goodsIds":[]
        }
        },function(r){
              if(r){
                $scope.goodsClasda.unshift(r.resp_data);  
                native.task('添加成功');
              }
        })
        $scope.newgoodsclass.name =undefined;
    }

    $scope.savegoodsClass  = function(){
        Tools.showlogin();
        var sendoption  =[];
        angular.forEach($scope.goodsClasda,function(c){
            if(c.select){
                sendoption.push(c.cate_id)
            }
            
        })

        Tools.getData({
           "interface_number": "030205",
          "post_content": {
          "goods_id":$scope.nowgoodid,
          "cateIds":sendoption,
          }
        },function(r){
              $timeout(function(){
               $scope.goodsClasda = [];
               $scope.newgoodsclass.name =undefined; 
              },300)
              if(r){
                $scope.edithgoodsclass.hide();
                native.task('保存成功');
              }
        })   
    }

    //商品上架  
    $scope.goodsup = function (b,index){
        
        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
        $scope.salestotin.up  =  parseInt($scope.salestotin.up)+1;
            $scope.salestotin.down   = parseInt($scope.salestotin.down)-1;
            native.task('上架成功');
        })
    }
    //商品下架 
    $scope.goodsdown = function (b,index){
      
        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
            $scope.salestotin.up  = parseInt($scope.salestotin.up)-1;
            $scope.salestotin.down   =  parseInt($scope.salestotin.down)+1;
            native.task('下架成功');
        })
    }
    function goodsuprodow(par,calback){
          Tools.showlogin();
          Tools.getData({
            "interface_number": "030107",
            "post_content": {
            "goodsId": par,
            "status":$scope.liststate?0:1 
            }
          },function(r){
              if(r){
                    calback(r);
              }
          })
    };

    //删除商品
    $scope.delgoods =  function (targe,index){


         native.confirm('你确定删除该商品?','删除商品?',['确定','取消'],function(c){
            if(c  == 1){

                Tools.showlogin();
                Tools.getData({
                  "interface_number": "030108",
                  "post_content": {
                    "goodsId":targe.goods_basic_id 
                  }
                },function(r){
                    if(r){
                      if(!$scope.liststate){
                        $scope.salestotin.down =  parseInt($scope.salestotin.down) -1; 
                      }else{
                        $scope.salestotin.up =  parseInt($scope.salestotin.up) -1;
                      }
                      Tools.rmArrin($scope.datalist,index);
                      native.task('删除成功');
                    }
                  }
                );
                  }
              });

    }




  //编辑
  $scope.edith  = function (r){
    goodsState.goods_basic_id  = r.goods_basic_id;
    goodsState.goods_title  = r.goods_title;
    goodsState.img_url  = r.img_url;
    goodsState.activity_price  = r.activity_price;
    r.total_in_number  = goodsState.total_in_number;     

    $state.go('r.goodsEdit',{state:'edit',id:r.goods_basic_id});
  };


  //构建搜索功能
  $scope.searchobj  = {};
    $scope.scar =  function(){
      native.Barcode(function(r){
          $scope.searchobj.tiaomiao  =   r.text;
          $scope.$apply();
      });
    };
$scope.selectsearchstat  = function (r,e){
  $scope.searchobj.swatch  = true;
  $scope.searchobj.state  = r;
}

$scope.swatchtstate  = function (){
  $scope.searchobj.swatch   = !$scope.searchobj.swatch;
}

  $scope.$on('$destroy', function() {
    $scope.listsearch.remove();
    $scope.goodsfenle.remove();
     $scope.edithgoodsclass.remove();
  });

      $ionicModal.fromTemplateUrl('edithgoodsclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.edithgoodsclass = modal;
    });



  $ionicModal.fromTemplateUrl('listsearch.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.listsearch = modal;
  });

  $ionicModal.fromTemplateUrl('goodsfenle.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.goodsfenle = modal;
  });


  //上下架数量统计
  $scope.salestotin  = {};
  $scope.salestotin.up  =0;
  $scope.salestotin.down  =0;

  function  inlit (){

   if(goodsState.goods_basic_id){
            angular.forEach($scope.datalist,function(r){
                  if(r.goods_basic_id  == goodsState.goods_basic_id){        
                    r.goods_title  = goodsState.goods_title;
                    r.img_url  = goodsState.img_url;
                    r.activity_price  = goodsState.activity_price;
                    r.total_in_number  = goodsState.total_in_number;     
                    
                  }
            })
      }

      
      if(goodsState.Refresh){
          goodsState.Refresh   =false;
          return  false;
      };

    $timeout(function(){
      $ionicScrollDelegate.$getByHandle('list').scrollTop();
      $scope.downlistloadmor  = true;
      $scope.page_number  = 1;
      $scope.datalist  = [];

      Tools.getData({
       "interface_number": "030105",
       "post_content": {}
      },function(r){
       if(r){
           $scope.salestotin.up  = r.resp_data.on_sale;
           $scope.salestotin.down  = r.resp_data.un_sale;
       }
      })
      //获取分类列表
      Tools.getData({
        "interface_number": "030201",
         "post_content": {}
      },function(r){
       if(r){
           $scope.fenliedata  = r.resp_data;
           angular.forEach($scope.fenliedata,function(s){
             s.select   = false;




           })

       }
      })
    },500)
  };


  $scope.searchclarall = function (){
    $scope.searchobj.fel  = undefined;
    $scope.searchobj.id  = undefined;
    $scope.searchobj.tiaomiao  = undefined;
    $scope.searchobj.state  = undefined;
  }

  $scope.searchselctme =  function (r){
    if(!r.select){
      angular.forEach($scope.fenliedata,function(s){
        s.select   = false;
      })
      r.select=  true;
      $scope.searchobj.fel =  r.cate_name;
      $scope.searchobj.id  =   r.cate_id;
      $scope.goodsfenle.hide();
    }
  }

  $scope.$on('$ionicView.beforeEnter',function(){
    inlit()
  });



  //切换上线 状态
  $scope.liststate  =  true;
  $scope.left =  function (){
    if(!$scope.liststate){
          $ionicScrollDelegate.$getByHandle('list').scrollTop();
          $scope.liststate  =  true;
          $scope.downlistloadmor  = true;
          $scope.page_number  = 1;
          $scope.datalist  = [];
    }
  }

  $scope.right =  function (){
    if($scope.liststate){
      $ionicScrollDelegate.$getByHandle('list').scrollTop();
      $scope.liststate  =  false;
      $scope.downlistloadmor  = true;
      $scope.page_number  = 1;
      $scope.datalist  = [];
    }
  }

  $scope.closectr  =   function (){
      angular.forEach($scope.datalist,function(c){
        c.ctr  = false;
      })
  };

  $scope.swatchctr =  function (r,$event){
      $scope.closectr();
      $event.stopPropagation();
      r.ctr   = !r.ctr;
  }



  $scope.customcucdownlisloadMore  =  function (type){
      var sendoption  = {
        "interface_number": "030104",
       "post_content": {
       "searchParam": {
           "is_sales": 1
         }
      }
    };

    if($scope.liststate){
      sendoption.post_content.searchParam.is_sales  = 1;
    }else{
      sendoption.post_content.searchParam.is_sales  = 0;
    }

    if(type){
        sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }
    //搜索的处理

    if($scope.searchobj.tiaomiao){
        sendoption.post_content.searchParam.keyword  =  $scope.searchobj.tiaomiao;
      }else{
        sendoption.post_content.searchParam.keyword  = ''
      }

      if($scope.searchobj.state  == '上架' ){
        sendoption.post_content.searchParam.is_sales  = 1;
        $scope.liststate  = true;

      }else if($scope.searchobj.state  == '下架' ){
        $scope.liststate  = false;
        sendoption.post_content.searchParam.is_sales  = 0;
      }

      if($scope.searchobj.id){
          sendoption.post_content.searchParam.shop_cate_id  = $scope.searchobj.id;
      }else{
        sendoption.post_content.searchParam.shop_cate_id  = ''
      }




    Tools.getData(sendoption,function(r){
          if(r){

                if(r.resp_data.nextPage  == 0 ){
                $scope.downlistloadmor  = false;
                $scope.page_number  =1;
                }else{
                  $scope.downlistloadmor  = true;
                  $scope.page_number  =r.resp_data.nextPage;
                }
                 angular.forEach(r.resp_data.data,function(c){
                     c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
                     c.ctr  = false;
                 });

                 if(type){
                    $scope.datalist  = r.resp_data.data;
                 }else{
                   angular.forEach(r.resp_data.data,function(c){
                       $scope.datalist.push(c);
                   });
                 }
          }else{

            $scope.downlistloadmor  = false;

          }
          
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
    })
  }

  $scope.Add  = function(){
    $state.go('r.goodsEdit')
  };

  $scope.backtoprevView  =     function (r){
     window.androdzerofun_clback =  function (){
       $scope.page_number  = 1;
       $scope.datalist  = [];
     }

    fromStateServ.backView(r,window.androdzerofun_clback);

  }




  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.listofgoods').title;
  });


  $scope.caklateheight  = {};
  function   caklatehe  (){
       if(window.platform  == 'ios'){
         $scope.caklateheight  = {
           height:window.innerHeight-(64+44+20)+'px'
         }
       }else{
         $scope.caklateheight  = {
           height:window.innerHeight-(44+44+20)+'px'
         }
       }
  };
  caklatehe();
  $timeout(function(){
  caklatehe();
  },600)






}])

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('chariCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {



  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020201",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "searchParam": {
          "sys_cate_id": "0"         //代表只搜索 此分类下的商品
        },
      }

    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){

        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

        });

        if(type){
          $scope.ShoppingList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.ShoppingList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };




/*
  Tools.getData({
    "interface_number": "020201",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){
    if(r){
      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

      });
      $scope.Charitable = (r.resp_data.data)


    }
  });*/




  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+166)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+166)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory) {



  $scope.xiaoshouorder = function () {
    
     if(storage.getObject('UserInfo').user_id){
      $state.go('r.tab.HomSales');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }

  }

  $scope.caigoudindan1  =function () {

     if(storage.getObject('UserInfo').user_id){
      $scope.gosales('r.HomPurchase');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  $scope.shomsge  =function () {
     if(storage.getObject('UserInfo').user_id){
      $scope.gosales('r.HomShopadmin');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  //商品详情
  $scope.goodsdetila  =  function () {
    $scope.goModular('r.Productdetails',{id:192});
  }


 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
       window.androdzerofun  =  undefined
       window.androdzerofun_parms  =undefined;
       window.androdzerofun_clback  = undefined;
    });

$scope.gosales=function (r) {
  fromStateServ.stateChange(r);
}


    $scope.a1 = function (){

      $scope.goModular('r.Shophome',{id:'4'});

    };


    //商品分类
    $scope.goodsClass  = function (){

      if(storage.getObject('UserInfo').user_id){
      $scope.goModular('r.goodsclasslist')
      }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });

      }

    }

    //商品管理
    $scope.goodmsg =  function (){

    if(storage.getObject('UserInfo').user_id){
    $scope.goModular('r.listofgoods')
    }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });


    }
    }

    $scope.goModular  =    function(r,p){
        fromStateServ.stateChange(r,p);
    };


    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.company = (r.resp_data.data)

      }
    });

  Tools.getData({
    "interface_number": "020002",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.news = (r.resp_data.data)

    }
  });



  //最新动态
  $scope.Newnews = function (r) {


    fromStateServ.stateChange(r);
  };



}]);

/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('NewnewsCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,fromStateServ){



  $scope.newsList =[]
  $scope.expression=true


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020003",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": ""
      }
    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){

        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/1/w/200/h/200';

        });

        if(type){
          $scope.newsList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.newsList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };


  //最新动态详情'',

  $scope.newsContent = function (value) {

    $state.go('r.homeNewsContent',{postID:value});
  };

  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.homeNews').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };


  $scope.caklateheight  = {};

  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+44+30-95)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+44+30-95)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

}]);

/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('newsContentCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize){

 $scope.Postid = $stateParams.postID;


  Tools.getData({
    "interface_number": "020004",
    "post_content": {
      "token":"",
      "token_phone": "",
      "articleId": $scope.Postid
    }

  },function(r){


    if(r.msg== "success"){

      r.resp_data.qiniu_key  =  window.qiniuimgHost+r.resp_data.qiniu_key +'?imageView2/1/w/200/h/200';
      $scope.newsList = r.resp_data

      $scope.myHtml=r.resp_data.content


    /*  $scope.myHtml = '<p style="color:blue">an html\n' +
        '<em onclick="this.textContent=\'code_bunny\'">click here</em>\n' +
        'snippet</p>';*/


    }else{

      return false

    }


  });





}]);


/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('ordersbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams) {


  
  $scope.ID = $stateParams.basicID;

  Tools.getData({
    "interface_number": "020703",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "orderId": $scope.ID,
    }
  },function(r){
    if(r){
      $scope.shopbody = (r.resp_data);
      $scope.shopname = $scope.shopbody.order.data[0].buyer_nick
      $scope.id = $scope.shopbody.order.data[0].order_basic_id
      $scope.pay = $scope.shopbody.order.data[0].total_fee
      $scope.time = $scope.shopbody.order.data[0].order_created
      $scope.name = $scope.shopbody.address.receiver_name
      $scope.mobile= $scope.shopbody.address.receiver_mobile
      $scope.street= $scope.shopbody.address.receiver_province+$scope.shopbody.address.receiver_city+$scope.shopbody.address.receiver_region+$scope.shopbody.address.receiver_street
      $scope.total = $scope.shopbody.order.data[0].total_fee
      $scope.totalNum = $scope.shopbody.order.data[0].total_num
      $scope.shopchirld = $scope.shopbody.order.data[0].orderDetail
      console.log( $scope.shopchirld)
      console.log($scope.shopbody)
console.log($scope.shopbody.order.data[0].buyer_nick)


    }
  });

}]);

/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('purbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams) {

  $scope.ID = $stateParams.basicID;

 console.log($scope.ID)
  Tools.getData({
    "interface_number": "020705",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "orderId": $scope.ID,
    }
  },function(r){
    if(r){
      $scope.shopbody = (r.resp_data);
      console.log($scope.shopbody)

      /*$scope.shopname = $scope.shopbody.order.data[0].buyer_nick
      $scope.id = $scope.shopbody.order.data[0].order_basic_id
      $scope.pay = $scope.shopbody.order.data[0].total_fee
      $scope.time = $scope.shopbody.order.data[0].order_created
      $scope.name = $scope.shopbody.address.receiver_name
      $scope.mobile= $scope.shopbody.address.receiver_mobile
      $scope.street= $scope.shopbody.address.receiver_province+$scope.shopbody.address.receiver_city+$scope.shopbody.address.receiver_region+$scope.shopbody.address.receiver_street
      $scope.total = $scope.shopbody.order.data[0].total_fee
      $scope.totalNum = $scope.shopbody.order.data[0].total_num
      $scope.shopchirld = $scope.shopbody.order.data[0].orderDetail
      console.log( $scope.shopchirld)
      console.log($scope.shopbody)
      console.log($scope.shopbody.order.data[0].buyer_nick)*/


    }
  });
  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomPurchase').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.title="订单详情";


}]);

/**
 * Created by Administrator on 2016 /21.
 */
Ctr.controller('purchaseorderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate) {
  $scope.datacaigou=true

  var bascId = $stateParams.datacaigou;
  $scope.ShoppingList = [];
  $scope.newexpression=false

  $scope.expression=true

  var pageNum = 0;
if(bascId==1){

  $scope.datacaigou=false

}


  //翻页加载
  $scope.loadOlderStories=function (type) {

    pageNum +=1;





    Tools.getData({
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": pageNum,
        "page_per":10
      }
    },function (r) {
      if (r) {

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });


        if (r.resp_data.data.length ==0) {

          $scope.ShoppingList=$scope.ShoppingList;
          $scope.expression = false
          $scope.newexpression=true

        } else {
          $scope.newexpression=false

          for(var i=0;i<r.resp_data.data.length;i++){
            $scope.ShoppingList.push(r.resp_data.data[i])
          }
        }
        $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 600);

      }


    });



  };


  $scope.all = true;
  $scope.dfk = false;
  $scope.dfc = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });
        $ionicScrollDelegate.scrollTop();
        $scope.ShoppingList = (r.resp_data.data)
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };
  //待发货
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "1",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });
        $ionicScrollDelegate.scrollTop();
        $scope.ShoppingList = (r.resp_data.data)
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });
  };

  //待收货
  $scope.dfcs = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "2",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });
        $ionicScrollDelegate.scrollTop();
        $scope.ShoppingList = (r.resp_data.data)
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };


  //已完成
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;

    Tools.getData({
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "4",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });
        $ionicScrollDelegate.scrollTop();
        $scope.ShoppingList= (r.resp_data.data)
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };

  $scope.purchaseorde=function (value) {
    $state.go('r.tab.HomPurordersbody',{basicID:value});
  }

  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };

  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+41)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+41)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


  /*//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomPurchase').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };*/

}]);

/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicScrollDelegate',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicScrollDelegate) {


  $scope.SalesList = [];
  var pageNum = 0;
  $scope.newexpression=false
  $scope.expression=true



  //翻页加载
  $scope.loadOlderStories=function (type) {

    pageNum +=1;


    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": pageNum,
        "page_per":10
      }
    }, function (r) {
      if (r) {

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });

        if (r.resp_data.data.length == 0) {
          $scope.expression = false
          $scope.newexpression=true
          $scope.SalesList=$scope.SalesList

        } else {
          $scope.newexpression=false

          for(var i=0;i<r.resp_data.data.length;i++){
            $scope.SalesList.push(r.resp_data.data[i])
          }
        }
        $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 600);

      }


    });



  };



  $scope.all = true;
  $scope.dfk = false;
  $scope.dfc = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)


        $scope.post_status=[];

      }
    });

  };
  //待发货
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "1",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });
  };

  //待收货
  $scope.dfcs = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "2",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };


  //已完成
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "4",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };

  $scope.ordersbody= function (value) {

    $state.go('r.tab.Homordersbody',{basicID:value});
  }
  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+41)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+41)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };




}]);



/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','$state','$ionicHistory',function($scope,$state,$ionicHistory) {
    
  $scope.back  =  function (){
      $ionicHistory.goBack();
  }

}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicViewSwitcher',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicViewSwitcher) {


  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    Initial  ();
            console.log(fromStateServ.getState('r.HomShopadmin'))
            if(fromStateServ.getState('r.HomShopadmin')){
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.HomShopadmin').title;
            }
  });


  //去查看店铺主页
  $scope.shophome  =function (){
      if(storage.getObject('UserInfo').shop_id){

        $state.go('r.Shophome',{id:storage.getObject('UserInfo').shop_id})
      }else{
        native.task('还没有加入公司');
      }
  }



  $scope.shopadmindata=[];
  Tools.getData({
    "interface_number": "010101",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)

    }
  });

  function  Initial  (){

    Tools.getData({
      "interface_number": "010101",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.shopadmindata = (r.resp_data)

      }
    });

    



  }




  $scope.shopName = function (Classitem) {
    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };
  $scope.shopBrief = function (Classitem) {

    $state.go('r.tab.HomShopadminbrief', {Classitem: Classitem});
  };


  $scope.goodspice  = [];

  $scope.selectpir  = function (){

    if($scope.goodspice.lenght >= 5){

      return false;
    }

    Tools.chekpirc({
      targetWidth:1500,
    },function(r){
      $scope.goodspice.push({
        fengmian:false,
        img:r,
        news:true,
        key:undefined
      })
    })
  };

  //图片上传
  function  uploadimg (claback){
    //待上传图片
    var   imguplist = [];
    //保存索引
    var   imgindex = [];


    if($scope.goodspice.length==0){

      claback();
      return  false;
    }


    angular.forEach($scope.goodspice,function(v,key){
      if(v.news){
        imguplist.push(v.img)
        imgindex.push(key);
      }
    })
    Tools.sendqiniu_queue(imguplist,function(r){
      angular.forEach(imgindex,function(v,key){
        console.log(JSON.stringify(r))
        $scope.goodspice[v].key  = r[key].key
      });
      claback()
    },'goods')
  }



}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {





  var Name = [];
  var oldName = $stateParams.Classitem
  $scope.shop = {};
  $scope.shop.Name = oldName;
  $scope.ziflength = 40
  $scope.$watch('shop.Name',function(newvalue,olavalue,scope){
    $scope.ziflength =  (40)-(newvalue.length);
    if($scope.ziflength < 0 ){
      $scope.shop.Name  = olavalue;
      $ionicPopup.alert({
        title:'已达最大输入长度!',
        okText:'确认'
      });
    }
  });

  $scope.backlistrotop  = function(){
    $state.go('r.tab.HomShopadmin');
  };

  $scope.querybriefing = function () {

    if($scope.shop.Name  == "" ||  $scope.shop.Name == undefined){
      $ionicPopup.alert({
        title:'请填写店铺描述!',
        okText:'确认'
      });
      return false;
    }else{
      Tools.showlogin();
    Tools.getData({
      "interface_number": "010104",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "description": $scope.shop.Name
      }
    },function(r){
      if(r!='error'){
        $ionicPopup.alert({
          title:'修改成功',
          okText:'确认'
        }).then(function(){
          $stateParams.Classitem = $scope.shop.Name;



        });
        $timeout(function(){
          Tools.hidelogin();
        },300)
      }
    });

    }
  }

  //收货人

  $scope.newshopBname = function (value) {

  };





}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {

  var Name=[]
  var oldName = $stateParams.Classitem
  $scope.ShopName = oldName;
  $scope.showclear  =false;
  $scope.shop = {};
  $scope.shop.name = oldName
  if($scope.shop.name !== '' ||   $scope.shop.name !==   undefined){
    $scope.showclear  =true;
  }

  $scope.backlistrotop  = function(){
    $state.go('r.tab.HomShopadmin');
  };

//收货人
  $scope.newshopname = function (value) {
    if(value ==''  ||  value ==  undefined){
      $scope.showclear = false;
    }else{
      $scope.showclear = true;
    }
  };

  //del
  $scope.clear = function(){
    $scope.shop = {};
    $scope.showclear = false;
  };

  //保存
  $scope.queryname = function () {
    if($scope.shop.name  == "" ||  $scope.shop.name == undefined) {
      $ionicPopup.alert({
        title: '请填写店铺名称!',
        okText: '确认'
      });
    }else{

      Tools.showlogin();
    Tools.getData({
      "interface_number": "010103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "name": $scope.shop.name
      }
    },function(r){
      if(r!='error'){
        $ionicPopup.alert({
          title:'修改成功',
          okText:'确认'
        }).then(function(){


          $stateParams.Classitem = $scope.shop.name;



        });
        $timeout(function(){
          Tools.hidelogin();
        },300)
      }
    });
  }
  }

}]);

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {


  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020202",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "searchParam": {
          "sys_cate_id": "2"         //代表只搜索 此分类下的商品
        },
      }

    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){
debugger;
        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

        });

        if(type){
          $scope.ShoppingList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.ShoppingList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };

 /* Tools.getData({
    "interface_number": "020202",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){

    if(r){
      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

      });

      $scope.Taste = (r.resp_data.data)


    }
  });
*/

  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+166)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+166)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


}]);

/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('applicationCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$stateParams','$ionicModal','$ionicNativeTransitions','$timeout','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$stateParams,$ionicModal,$ionicNativeTransitions,$timeout,$ionicHistory){

  $scope.Id = $stateParams.companyID;


//name
  $scope.newshopname = function (value) {

    $scope.name = value;
    console.log($scope.name)
  };

//phone
  $scope.phoneshopname = function (value) {

    $scope.phone = value;
    console.log($scope.phone)
  };

  $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope,

  }).then(function(modal) {
    $scope.modalapp = modal;
  });


  $scope.next  = function (){
    Tools.getData({
      "interface_number": "000105",
      "post_content": {
        "token": "",
        "company_id": $scope.Id,
        "real_name":$scope.name ,
        "phone": $scope.phone,
        "token_phone": ""
      }

    },function(r){


      if(r.msg== "success"){

        $scope.modalapp.show();

        //$state.go('r.login',{title:''});


      }else{
        $ionicPopup.alert({
          title:"加入公司失败！",
          okText:'请重新输入'

        });
      }


    })



  }

  $scope.shenhe=function () {

    $scope.modalapp.hide();
    $ionicHistory.goBack(-2);
    //$rootScope.$ionicGoBack();
    /*  window.androdzerofun  =  function(ba,com){

        $ionicViewSwitcher.nextDirection('back');
        $ionicNativeTransitions.stateGo(ba,{},{
          "type": "slide",
          "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
          "duration": 400, // in milliseconds (ms), default 400
        });
        $timeout(function(){
          com();
          window.androdzerofun  =   undefined;
          window.androdzerofun_parms  =   undefined;
          window.androdzerofun_clback  =   undefined;
        },200)
      };

      window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);*/
  }

$scope.title = "提交申请信息"

}]);

/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('canpanyCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout){


//收货人
  $scope.newshopname = function (value) {

   $scope.id = value;
    console.log($scope.id)
  };






  $scope.next  = function (){
    Tools.getData({
      "interface_number": "000104",
      "post_content": {
        "token":"",
        "token_phone": "",
        "company_id": $scope.id,
      }

    },function(r){


        if(r.msg== "success"){
   /*    var popup =   $ionicPopup.alert({
            title:"验证成功",
            okText:'确认'

          });
          $timeout(function() {
            popup.close(); // 3秒后关闭弹窗
          }, 800);*/


          $state.go('r.application',{companyID:$scope.id});
          native.task('验证成功！')
        }else{

          return false

        }


    });



    return  false;


  }



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$state','Tools','$stateParams','$ionicPopup','storage','$ionicHistory','native',function($scope,$state,Tools,$stateParams,$ionicPopup,storage,$ionicHistory,native){



  $scope.password  = {};
  //选择认证方式

  console.log($stateParams.phone)
  $scope.next =  function (){

  if(!$scope.password.Original || !$scope.password.Repeat)  {

    native.task('请填写密码!');
    return false;
  }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      native.task('密码不一致!');
      return false;
    };

    Tools.getData({
      "interface_number": "000103",
         "post_content": {
             "phone":$stateParams.phone,
             "password":window.md5($scope.password.Original),
             "repassword":window.md5($scope.password.Repeat),
             uuid:storage.getObject('device').uuid,
             "push_registration_id" : storage.getObject('jPush').RegistrationID,
         }
    },function(r){
      if(r){
        window.Token  = r.resp_data.token;
        r.resp_data.user_info.token  = window.Token;
        storage.setObject('UserInfo',r.resp_data.user_info);
        $state.go('r.selectAuth');
        $scope.password  = {};
        native.task('注册成功！')


      }
    })
    return  false;
  }





}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','Tools','$ionicPopup','$timeout','native','$ionicNativeTransitions','storage','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,Tools,$ionicPopup,$timeout,native,$ionicNativeTransitions,storage,$state){


  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
      
      
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){

      $scope.identity.inverse  = r;
      
      

    });
  }
  
  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };
  
  //基本表单信息
  $scope.from   = {};
  
  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive || !$scope.identity.inverse){

      native.task('请上传审核照片')
      return false;
    }
    if( !$scope.from.License  || !$scope.from.mechanism  ||  !$scope.from.legal ){
      native.task('请填写完整基本信息');
      return false;
    }

    Tools.showlogin();
       //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){

    Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"0",
          legal:$scope.from.legal,
          "license": $scope.from.License,
          "certificate_no": $scope.from.mechanism,
          "license_img":f[0].key,
          "certificate_img":f[1].key
        }
      },function(r){
        if(r){
          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页        
            $ionicViewSwitcher.nextDirection('back');
            $ionicNativeTransitions.stateGo('r.tab.Settings',{}, {
              "type": "slide",
              "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration": 400, // in milliseconds (ms), default 400
            });
            $timeout(function(){
              $ionicHistory.clearHistory();
            },100)


          }
        }


      });

    },'auth_'+(storage.getObject('UserInfo').company_id)+'_')

    



  }









}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('grAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','native','$ionicActionSheet','Tools','$ionicPopup','storage','$state','$ionicNativeTransitions','$timeout',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,native,$ionicActionSheet,Tools,$ionicPopup,storage,$state,$ionicNativeTransitions,$timeout){


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  
  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  };

  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };

  $scope.form = {};

  //提交审核
  $scope.Submitaudit  =  function (){




    if(!$scope.identity.Positive || !$scope.identity.inverse){

      native.task('请上传审核照片')
      return false;
    }
    if(!$scope.form.id ||  !$scope.form.name ){      
      native.task('请填写完审核信息')
      return false;
    }
    
    Tools.showlogin();
    //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){
      //发送请求
      Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"1",
          "card_no":$scope.form.id+"",
          name:$scope.form.name,
          "card_front_img":f[0].key,
          "card_back_img":f[1].key
        }
      },function(r){
        if(r){
          
          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页            
           
            $ionicViewSwitcher.nextDirection('back');
            $ionicNativeTransitions.stateGo('r.tab.Settings',{}, {
              "type": "slide",
              "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
              "duration": 400, // in milliseconds (ms), default 400
            });
            $timeout(function(){
              $ionicHistory.clearHistory();
            },100)
        
            
          }



        }
      });
    },'auth_'+(storage.getObject('UserInfo').company_id)+'_');


  }
  console.log(  JSON.stringify(storage.getObject('UserInfo')))

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout','loginregisterstate','native',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout,loginregisterstate,native){

  //处理登录
  $scope.loginboj  = {};

  $scope.loginhan  = function (){
      if(!$scope.loginboj.userName){

        native.task('请输入用户名');
        return false;
      }
      if(!$scope.loginboj.Pwd){

        native.task('请输入密码');
        return false;
      }
      $scope.ing  = true;
      var devinfo  =   storage.getObject('device');
      Tools.getData({
        "interface_number": "000001",
        "client_type": window.platform,
        "post_content": {
          "phone":$scope.loginboj.userName,
          "push_registration_id" : storage.getObject('jPush').RegistrationID,
          "password":window.md5($scope.loginboj.Pwd),
          "uuid":devinfo.uuid
        }
      },function(r){
        if(r){
          

                 if(window.cordova){
                  window.cordova.plugins.Keyboard.close();
                }


              window.Token  = r.resp_data.token;
              r.resp_data.user_info.token  = window.Token;
              storage.setObject('UserInfo',r.resp_data.user_info);
              $timeout(function(){
                    $scope.backtoprevView('r.login');
                    $timeout(function(){
                      native.task('登录成功');
                    },400);


              },400)

        }else{
          $scope.ing  = false;
        }




      },function(){
        $timeout(function(){
          $scope.ing  = false;
        },600)

      })
  };


  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){

      $scope.loginboj = {};
      $scope.ing  = false;
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };

  $scope.register  =  function (){
      if(!$scope.ing){
            loginregisterstate.Refresh   =  true;
            $state.go('r.register');
      }
  }

  $scope.renzhen=function () {

    $state.go('r.canpany');
  }

  $scope.password=function () {

    $state.go('r.passwordold');
  }



}])

/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('passwordoldCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout){

  $scope.registbasinfo  = {};
  $scope.password ={};

  //获取验证码
  var sctolthi  = true;
  $scope.GetverCode =  function (){
    if(sctolthi){

      sctolthi  = false;
      if(!$scope.registbasinfo.phone){
        $ionicPopup.alert({
          title:'请填写手机号码!',
          okText:'确认'
        });
        sctolthi  = true;
        return false;
      };
      Tools.getData({
        "interface_number": "050304",
        "post_content": {
          "phone":$scope.registbasinfo.phone
        }
      },function(r){
        if(r){
          native.task('发送成功');
          $scope.vercodeing  = true;
          $scope.nextvercode =  60;
          var   time  = setInterval(function(){
            $scope.nextvercode--;
            if($scope.nextvercode <= 0){
              sctolthi  = true;
              $scope.vercodeing  =  false;
              clearInterval(time);
            }
            $scope.$apply();
          },1000)

        }else{
          sctolthi  = true;
        }

      },function(){
        sctolthi  = true;
      });
    }



  };



  //下一步
  $scope.next =  function (){

    if(!$scope.registbasinfo.phone){
      $ionicPopup.alert({
        title:'请输入手机号码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
      $ionicPopup.alert({
        title:'请输入正确的手机号码!',
        okText:'确认'
      });
      return  false;
    }
    if(!$scope.registbasinfo.Vercode){
      $ionicPopup.alert({
        title:'请输入验证码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.negative($scope.registbasinfo.Vercode)) {
      $ionicPopup.alert({
        title:'请输入正确的验证码!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.password.Original || !$scope.password.Repeat)  {
      $ionicPopup.alert({
        title:'请填写密码!',
        okText:'确认'
      });
      return false;
    }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      $ionicPopup.alert({
        title:'密码不一致!',
        okText:'确认'
      });
      return false;
    };





  //交互
  Tools.getData({

    "interface_number": "050305",
    "post_content": {
      "token": "",
      "token_phone": "",
      "phone": $scope.registbasinfo.phone,
      "new_password":window.md5($scope.password.Original) ,
      "confirm_password":window.md5($scope.password.Repeat) ,
      "verify_code":$scope.registbasinfo.Vercode
    }
  },function(r){
   
    if(r.msg== "success"){

      $rootScope.$ionicGoBack();
      native.task('修改成功！')

    }
  });




    return  false;



  }




}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native){

  
   //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    if(loginregisterstate.Refresh){
        $scope.registbasinfo  = {};
        loginregisterstate.Refresh  = false;
    }  
  });


  $scope.registbasinfo  = {};
  $scope.nextvercode =  60;
  $scope.vercodeing  = false;
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  //获取验证码
  var sctolthi  = true;
  $scope.GetverCode =  function (){
    if(sctolthi){

          sctolthi  = false;
          if(!$scope.registbasinfo.phone){

            native.task('请填写手机号码!');
            sctolthi  = true;
            return false;
          };
          Tools.getData({
            "interface_number": "000101",
            "post_content": {
              "phone":$scope.registbasinfo.phone
            }
          },function(r){
            if(r){
              native.task('发送成功');
              $scope.vercodeing  = true;
              $scope.nextvercode =  60;
              var   time  = setInterval(function(){
                $scope.nextvercode--;
                if($scope.nextvercode <= 0){
                  sctolthi  = true;
                  $scope.vercodeing  =  false;
                  clearInterval(time);
                }
                $scope.$apply();
              },1000)

            }else{
              sctolthi  = true;
            }
            
          },function(){
            sctolthi  = true;
          });
    }


  }

  //下一步
  $scope.next =  function (){

    if(!$scope.registbasinfo.phone){
      native.task('请输入手机号码!');
      return  false;
    }else  if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
      native.task('请输入正确的手机号码!');
      return  false;
    }
    if(!$scope.registbasinfo.Vercode){
      native.task('请输入验证码!');
      return  false;
    }

    if(!$scope.registbasinfo.CorporateName){

      native.task('请输入公司名称!');
      return  false;
    }
    if(!$scope.registbasinfo.userName){
      
      native.task('请输入姓名!');
      return  false;
    }
    //交互
    Tools.getData({
      "interface_number": "000102",
      "post_content": {
          "phone":$scope.registbasinfo.phone,
          "register_code":$scope.registbasinfo.Vercode,
          "company_name":$scope.registbasinfo.CorporateName,
          "real_name":$scope.registbasinfo.userName,
          "invite_code":$scope.registbasinfo.InvitationCode?$scope.registbasinfo.InvitationCode:''
      }
    },function(r){
    if(r){
        if(window.cordova){
            window.cordova.plugins.Keyboard.close();
        }


        $state.go('r.registercfpwd',{phone:r.resp_data.phone})
    }
    });
    return  false;



  }

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$scope','$state','Tools','$ionicViewSwitcher','$ionicNativeTransitions','$timeout','$ionicHistory',function($scope,$state,Tools,$ionicViewSwitcher,$ionicNativeTransitions,$timeout,$ionicHistory){
  


   //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
      //注册安卓返回的处理
      window.androdzerofun  =  function(ba,com){
          $ionicViewSwitcher.nextDirection('back');
                $ionicNativeTransitions.stateGo(ba,{},{
                  "type": "slide",
                  "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                  "duration": 400, // in milliseconds (ms), default 400
                });
              $timeout(function(){
                  com();
                  window.androdzerofun  =   undefined;
                  window.androdzerofun_parms  =   undefined;
                  window.androdzerofun_clback  =   undefined;
              },200)
      };
      window.androdzerofun_parms  =    'r.tab.Home';
      window.androdzerofun_clback  =    function(){
        $ionicHistory.clearHistory();
      };
      
      $scope.GoBackHome =  function(){
          window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
      }
  })








}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions){
  
 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
      //注册安卓返回的处理
      window.androdzerofun  =  function(ba,com){

          $ionicViewSwitcher.nextDirection('back');
                $ionicNativeTransitions.stateGo(ba,{},{
                  "type": "slide",
                  "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                  "duration": 400, // in milliseconds (ms), default 400
                });
              $timeout(function(){
                  com();
                  window.androdzerofun  =   undefined;
                  window.androdzerofun_parms  =   undefined;
                  window.androdzerofun_clback  =   undefined;
              },200)
      };
      window.androdzerofun_parms  =    'r.tab.Home';
      window.androdzerofun_clback  =    function(){
        $ionicHistory.clearHistory();
      };

      $scope.GoBackHome =  function(){
          window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
      }




  })








  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }


}]);

/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('informationCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize){

  $scope.newsList =[]
  $scope.expression=true;


  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "000400",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "count": "0"
      }
    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){


        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }


        if(type){
          $scope.newsList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.newsList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };






  $scope.caklateheight  = {};

  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+44+30-95)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+44+30-95)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

  $scope.agreeSize = function(value,index) {

    $ionicPopup.show({

      title: '同意申请人加入公司?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "000401",
              "post_content": {
                "token":"",
                "token_phone": "",
                "userId": value,
                "isPass": "1"
              }

            },function(r){



              if(r.msg== "success"){
                Tools.rmArrin($scope.newsList,index);
                native.task('成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });

  };



  $scope.refuseOne = function(value,index) {


    $ionicPopup.show({

      title: '拒绝申请人加入公司?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "000401",
              "post_content": {
                "token":"",
                "token_phone": "",
                "userId": value,
                "isPass": "0"
              }

            },function(r){


              if(r.msg== "success"){
                Tools.rmArrin($scope.newsList,index);
                native.task('成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });

    
  };




  }]);


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage,fromStateServ){

 

  $scope.adminer = storage.getObject('UserInfo').is_admin;

  $scope.expression = true;
  if($scope.adminer == "1"){
    $scope.expression = true
  }else {
    $scope.expression= false
  }

  $scope.$on('$ionicView.beforeEnter',function(){

    //页面的状态变化  请求
    handtat();
    if ($ionicHistory.backView()) {
      window.androdzerofun  = function(parm1,parm2){
        $ionicHistory.goBack();
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }
  });


  //对安卓返回键的  特殊处理  tabs

 /* if($scope.adminer == undefined){

  }else{
    $scope.$on('$ionicView.beforeEnter',function(){

      Initial ();


    });
  }*/




  $scope.application = function () {
    $state.go('r.tab.information')
  }


 /* function  Initial  () {

    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }


      } else {
        return false

      }

    });
  }
*/


  $scope.login  =  function(r){
    fromStateServ.stateChange(r);
  };

  function handtat  (){
    if(storage.getObject('UserInfo').user_id){
      $scope.isShow = false;

      $scope.doRefresh();
    }else{
      $scope.isShow = true;
    }
  }

  $scope.doRefresh  = function () {
    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }


      } else {
        return false

      }

    });
  }



}])



  .controller('noticeDetailCtr', ['$scope',function($scope) {

  }]);

Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('rootCtr',[function(){
  
}])

/**
 * Created by Administrator on 2016/7/5.
 */
Ctr.controller('SettingsAddAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {
  var Address =[],Name=[],Number=[],Email=[],Checked=1;
  $scope.pushNotification = { checked: true};
  var dataadd = $stateParams.dataAdd
    console.log(dataadd);
  //默认
  $scope.pushNotificationChange = function() {

    console.log('Push Notification Change', $scope.pushNotification.checked);
    if($scope.pushNotification.checked==false){
      Checked=0;
    }else{
      Checked=1;
    }
  };

  //详细地址
    $scope.Addaddress = function (newaddress) {
      Address = newaddress
};

  //收货人
  $scope.newname = function (name) {
      Name = name;
  };

  //电话
  $scope.newnumber = function (number) {
    Number=number;
  };

  //邮编
  $scope.newemail = function (email) {
    Email=email;
  };

  // 保存地址
  $scope.keepaddress = function () {


  native.confirm('确定要保存该地址吗？','保存地址',['确定','取消'],function(c){
          if(c  == 1){
            

        
        Tools.getData({
          "interface_number": "020501",
          "client_type": window.platform,
          "post_content": {
            "token": "",
            "token_phone": "",
            "province": "湖南省",
            "city": "长沙市",
            "region": "天心区",
            "street": Address,
            "zcode": Email,
            "link_man": Name,
            "link_phone":Number,
            "is_default": Checked
          }
        },function(r){
          $state.go('r.addAddress')
        });


  }          
        });
  }


  /*//保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;
  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.addAddress').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };*/

}]);

Ctr.controller('AddresslistCtr',['$scope','fromStateServ','Tools','native','$state','adderupdatastat','$ionicScrollDelegate',function($scope,fromStateServ,Tools,native,$state,adderupdatastat,$ionicScrollDelegate){


  $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            if(adderupdatastat.id){
                if(adderupdatastat.is_default  == '1'){
                     angular.forEach($scope.datalist,function(s){
                         s.is_default  = false;
                        if(s.addr_id  == adderupdatastat.id){
                         s.addr_id  =  adderupdatastat.id  ;
                         s.link_man  = adderupdatastat.linkname ;
                         s.link_phone  = adderupdatastat.phone  ;
                         s.city  = adderupdatastat.city  ;
                         s.province  =  adderupdatastat.province  ;
                         s.region  = adderupdatastat.region   ;
                         s.street  = adderupdatastat.street  ;
                         s.is_default  =  true;
                            }
                        });
                }else{
                     angular.forEach($scope.datalist,function(s){
                        if(s.addr_id  == adderupdatastat.id){
                         s.addr_id  =  adderupdatastat.id  ;
                         s.link_man  = adderupdatastat.linkname ;
                         s.link_phone  = adderupdatastat.phone  ;
                         s.city  = adderupdatastat.city  ;
                         s.province  =  adderupdatastat.province  ;
                         s.region  = adderupdatastat.region   ;
                         s.street  = adderupdatastat.street  ;
                         s.is_default  =  false;                         
                            }
                        })
                    }

                          adderupdatastat.id   = undefined;
                          adderupdatastat.linkname  = undefined;
                          adderupdatastat.phone  = undefined ;
                          adderupdatastat.city  = undefined ;
                          adderupdatastat.province  = undefined ;
                          adderupdatastat.region   = undefined ;
                          adderupdatastat.street  = undefined ;
                          adderupdatastat.is_default = undefined ;
            }else{
                    inlite();
            }

            if(fromStateServ.getState('r.Addresslist')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Addresslist').title;
            }else{
                $scope.showtitle  = false;
            }

    });


    function   inlite  (){
           $ionicScrollDelegate.scrollTop();
        Tools.getData({
                        "interface_number": "020505",
                        "post_content": {
                        }
        },function(r){
                if(r){
                        $scope.datalist = [];
                        angular.forEach(r.resp_data.data,function(s){
                                s.select  =false;  
                                if(s.is_default  == '1'){
                                        s.is_default  = true
                                }else{
                                    s.is_default =  false;  
                                } 
                                
                                $scope.datalist.push(s);     
                        })
                }
        })
    }

    $scope.showdelt  = false;
    $scope.edith  =false;


    $scope.swatch  = function(){
        if($scope.edith){
                //删除
                    var relf  = [];
                    var index  = [];
                    angular.forEach($scope.datalist,function(s,lineind){
                                if(s.select){
                                  relf.push(s.addr_id);  
                                  index.push(lineind)
                                }     
                        })

                        if(relf.length){

                            Tools.getData({
                            "interface_number": "020504",
                                "post_content": {
                                    "addr_id":relf                                    
                                }
                            },function(r){
                                if(r){

                                angular.forEach(index,function(s){
                                        console.log(parseInt(s));
                                        Tools.rmArrin($scope.datalist,parseInt(s))   
                                })

                                

                                native.task('删除成功!');

                                }
                            })
                        }

        }
        $scope.showdelt  = !$scope.showdelt; 
        $scope.edith   =  !$scope.edith;  
    }

//编辑  
$scope.adderedit  = function(tar){
   $state.go('r.AddressEdith',{id:tar.addr_id}); 
}
//选中 
$scope.selectthi  = function(tar){
    tar.select   = !tar.select; 
}

//添加地址
$scope.addreder   =  function(){
    $state.go('r.AddressEdith')
}

}])

.controller('AddressEdithCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){



  


  $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            console.log(fromStateServ.getState('r.AddressEdith'))
            if(fromStateServ.getState('r.AddressEdith')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.AddressEdith').title;
            }else{
                $scope.showtitle  = false;
            }

    });

            $scope.addrs  = {};
            if($stateParams.id){
                $scope.title = '编辑地址';

            //020506
                Tools.getData({
                     "interface_number": "020506",
                    "client_type": "ios",
                    "post_content": {
                        addrId : $stateParams.id 
                    }
                },function(r){

                    $scope.addrs.name  = r.resp_data.link_man;
                    $scope.addrs.phone  = r.resp_data.link_phone;

                    if(r.resp_data.is_default  =='1'){
                            $scope.addrs.is_virtual  = true;
                    }else{
                        $scope.addrs.is_virtual  = false;
                    }
                    $scope.addrs.zipcode  = r.resp_data.zcode;
                    $scope.addrs.detailmsg   =  r.resp_data.street;

                    $scope.addrs.province =  r.resp_data.province;
                    $scope.addrs.city =   r.resp_data.city;

                if(!r.resp_data.region){
                    $scope.addrs.region = '';
                }else{
                    $scope.addrs.region =  r.resp_data.region;
                }
                $scope.opitionmsg.text =     $scope.addrs.province+' '+$scope.addrs.city+' '+$scope.addrs.region;
                })



            }else{
                $scope.title = '添加地址';
            }
        // 保存        
        $scope.savechil   =  function(){

            if(!$scope.addrs.name){
                native.task('请填写收货人姓名');
                return false;
            }
            if(!$scope.addrs.phone){
                native.task('请填写联系方式');
                return false;
            }
              if(!$scope.opitionmsg.text){
                native.task('请选择省市区');
                return false;
            }
             if(!$scope.addrs.detailmsg){
                native.task('请填写详细地址');
                return false;
            }


            if(!$stateParams.id){
                  Tools.getData({
                  "interface_number": "020501",
                    "post_content": {
                        "province": $scope.addrs.province,
                        "city": $scope.addrs.city ,
                        "region":  $scope.addrs.region ,
                        "street":  $scope.addrs.detailmsg,
                        "zcode":   $scope.addrs.zipcode,
                        "link_man": $scope.addrs.name,
                        "link_phone":$scope.addrs.phone,
                        "is_default": $scope.addrs.is_virtual?1:0
                    }
            },function(r){
                    if(r){

                        $rootScope.$ionicGoBack();
                        native.task('保存成功');       
                    }
            })
            }else{
                  Tools.getData({
                  "interface_number": "020502",
                    "post_content": {
                        "province": $scope.addrs.province,
                        "city": $scope.addrs.city ,
                        "region":  $scope.addrs.region ,
                        "street":  $scope.addrs.detailmsg,
                        "zcode":   $scope.addrs.zipcode,
                        "link_man": $scope.addrs.name,
                        "link_phone":$scope.addrs.phone,
                        "is_default": $scope.addrs.is_virtual?1:0,
                        "addr_id": $stateParams.id
                    }
            },function(r){
                    if(r){

                         adderupdatastat.id  =  $stateParams.id;
                         adderupdatastat.linkname  = $scope.addrs.name;
                         adderupdatastat.phone   =   $scope.addrs.phone;
                         adderupdatastat.city   =   $scope.addrs.city ;
                         adderupdatastat.province   =$scope.addrs.province;
                         adderupdatastat.region   =$scope.addrs.region;
                         adderupdatastat.street  = $scope.addrs.detailmsg,
                         adderupdatastat.is_default   = $scope.addrs.is_virtual?'1':'0';
 

                        $rootScope.$ionicGoBack();
                        native.task('保存成功');       
                    }
            })




            }

          



        }






        $scope.cityall  = window.city;
        $scope.openselectprovince  =  function(){

            Tools.showlogin();
            $scope.shenfeng  = [];
            angular.forEach($scope.cityall,function(sheng){
                    sheng.select   = false;                    
                    $scope.shenfeng.push(sheng);
            })   

            $timeout(function(){
                Tools.hidelogin();
                $scope.sheng.show();
            },300)            
        };

        $scope.selectshengf  =  function(shenfeng,aa){
                     angular.forEach(shenfeng,function(sheng){
                                sheng.select   = false;                                    
                     });

                     aa.select  = true;
                     if(aa.child.length){
                            $scope.childCity = [];   
                            Tools.showlogin();
                            angular.forEach(aa.child,function(chidlist){
                                $scope.childCity.push(chidlist);
                            });                            
                         $timeout(function(){
                                Tools.hidelogin();
                                $scope.city.show();
                            },300)   

                     }else{
                        $scope.sheng.hide();
                     }
        };


        $scope.selectCity  =  function(ss,ff){

             angular.forEach(ss,function(sheng){
                                sheng.select   = false;                                    
                     });
                     ff.select  = true;
                     if(ff.child.length){
                         //选择市区
                             $scope.childarea = [];   
                            Tools.showlogin();
                            angular.forEach(ff.child,function(chidlist){
                                $scope.childarea.push(chidlist);
                            });

                         $timeout(function(){                             
                                Tools.hidelogin();
                                $scope.area.show();
                            },300)

                     }else{

                            Tools.showlogin();
                            $scope.sheng.hide();
                            $timeout(function(){
                                    $scope.chomfadder(); 
                                    Tools.hidelogin();
                                    $scope.city.hide();

                            },300)

                     }
        };

        $scope.selectArea  = function(ss,ff){

                angular.forEach(ss,function(sheng){
                        sheng.select   = false;
                     });

                     ff.select  = true;
                     Tools.showlogin();
                     $scope.sheng.hide();
                     $scope.city.hide();                     
                     $timeout(function(){
                            Tools.hidelogin();
                            $scope.chomfadder(); 
                            $scope.area.hide();

                     },300)
        };



        $scope.chomfadder  =   function () {
            //获取  身份
            angular.forEach($scope.shenfeng,function(r){
                if(r.select){
                            $scope.shenfengtext   =r.cityName;                            
                }   
            })
            //获取城市
             angular.forEach($scope.childCity,function(r){
                if(r.select){
                            $scope.Citytext   =r.cityName;                            
                }   
            });

            if($scope.childarea){
                    angular.forEach($scope.childarea,function(r){
                        if(r.select){
                            $scope.areatext   =r.cityName;                            
                        }
                    });
            };
            $scope.shenfeng  = [];
            $scope.childCity  = [];
            $scope.childarea  = [];

            if(!$scope.areatext){
                $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext;
                $scope.addrs.province = $scope.shenfengtext;
                $scope.addrs.city = $scope.Citytext;
                $scope.addrs.region = '';
            }else{

                $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext+' '+$scope.areatext;
                $scope.addrs.province = $scope.shenfengtext;
                $scope.addrs.city =   $scope.Citytext;
                $scope.addrs.region =  $scope.areatext;
            }

            $scope.shenfengtext  = undefined;
            $scope.Citytext  = undefined;
            $scope.areatext  = undefined;
                
        };

        $scope.opitionmsg   = {};
        $scope.opitionmsg.text   =  undefined;


        $scope.shenfengtext  = undefined;
        $scope.Citytext  = undefined;
        $scope.areatext  = undefined;

        $scope.$on('$destroy', function() {

            $scope.sheng.remove();
            $scope.city.remove();
            $scope.area.remove();


        });

        $ionicModal.fromTemplateUrl('sheng.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.sheng = modal;
        });


      $ionicModal.fromTemplateUrl('city.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.city = modal;
        });

        $ionicModal.fromTemplateUrl('area.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.area = modal;
        });
        


        









    

}])
/**
 * Created by Administrator on 2016/7/5.
 */

Ctr.controller('SettingsAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$ionicHistory) {





  var arrs = [];
  $scope.addressList=[]

  //获取收货地址

  Tools.getData({

    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.addressList= (r.resp_data.data)

    }
  });




  $scope.expressionA = true;

  $scope.deleteAdress=function (item) {

    if($scope.expression==true){

      console.log(arrs)

      if(arrs==""||arrs== undefined){
        $scope.expression = false;
        $scope.expressionA = true;
      }else{







  native.confirm('确定要删除选中地址吗？','删除地址',['确定','取消'],function(c){
        if(c  == 1){



          Tools.getData({
          "interface_number": "020504",
          "client_type": window.platform,
          "post_content": {
            "token" : "",
            "token_phone": "",
            "addr_id": arrs
          }
        },function(r){
          if(r){
          }
        });
          Tools.getData({
            "interface_number": "020505",
            "client_type": window.platform,
            "post_content": {
              "token" : "",
              "token_phone": ""
            }
          },function(r){
            if(r){
              $scope.expression = false;
              $scope.expressionA = true;
              $scope.addressList= (r.resp_data.data)

            }
          });

          setTimeout(function () {
            $scope.$apply(function () {
              $scope.addressList = $scope.addressList
            });
          }, 1000);

        }
       });
       
      }

    }else{
      $scope.expressionA = false;
      $scope.expression=true
    }


  };

  $scope.gainAdress = function (gain) {

   if(arrs.indexOf(gain) == -1){
     arrs.push(gain)
   }else{
     for(var i = 0;i<arrs.length;i++){
       var pageId =  arrs[i];
       if(pageId==gain){
         Tools.rmArrin(arrs,i);
       }

     }
     console.log(arrs)
   }
  }

//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$ionicView.beforeEnter',function(){    
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.ClassifDetails').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };


  //add
  $scope.addArddss=function () {

    $state.go('r.addAddress')
  }




}]);

/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state',function($scope,storage,Tools,native,$state){
  $scope.Hight={}

  $scope.Hight =window.innerHeight+"px";
  console.log($scope.Hight)
  Tools.getData({
    "interface_number": "050203",
    "post_content": {
      "token":"",
      "token_phone": ""

    }

  },function(r){


    if(r.msg== "success"){
        $scope.one = r.resp_data.one;
       $scope.count = r.resp_data.total_count;
       $scope.rebate = r.resp_data.total_rebate

    }else{

      return false

    }


  });





}])


/**
 * Created by Administrator on 2016/7/15.
 */
Ctr.controller('SettingsSelectCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {




}]);

/**
 * Created by Administrator on 2016/7/15.
 */
Ctr.controller('UpdateaddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams) {

  
  var item = $stateParams.item;
  console.log(item)

}]);

/**
 * Created by Administrator on 2016/7/7.
 */
Ctr.controller('SettingsUpdateCtr',['$scope','storage','Tools','native','$state',function($scope,storage,Tools,native,$state){




  


  $scope.$on('$ionicView.beforeEnter',function(){
          var userin  =  storage.getObject('UserInfo');
          $scope.header  =    window.qiniuimgHost+userin.avatar+'?imageView2/1/w/130/h/130';
          $scope.real_name  =    userin.real_name;
          if(userin.sex  == '0'){
            $scope.sex     =  '男';
          }else{
            $scope.sex     =  '女';
          }
          $scope.qq  =   userin.qq;          
  });
  $scope.Headportrait   =  function(){
        Tools.chekpirc({
          allowEdit:true
        },function(r){
          Tools.sendqiniu_queue([r],function(f){
            Tools.showlogin();
            Tools.getData({
                "interface_number": "050306",
                "post_content": {
                      "avatar":f[0].key,
                  }
            },function(s){
              if(s){

                      var reif = storage.getObject('UserInfo');
                      reif.avatar  =f[0].key;
                      storage.setObject('UserInfo',reif);
                      $scope.header =r;
                      //$scope.$apply();
                      native.task('修改头像成功');
                      
              }
            })
          },'user_img')
        })
  };




  //修改qqdsadsa
  $scope.qqc  = function (){
    $state.go('r.tab.SettingsQQ')
  }


  //修改性别
  $scope.sexgo  = function(){
    $state.go('r.tab.SettingsSexUsername');
  }
  //修改  秘密
  $scope.resetPwd  =  function(){
      $state.go('r.tab.SettingsPassword');
  }
  //收货地址




}])
.controller('SettingsUpdateSexCtr',['$scope','Tools','storage','$rootScope','native',function($scope,Tools,storage,$rootScope,native){

  $scope.$on('$ionicView.beforeEnter',function(){
    var userin  =  storage.getObject('UserInfo');    
    if(userin.sex  == '0'){
      $scope.sex  = true;
    }else{
      $scope.sex  = false;
    }
  })

$scope.swatch   = function (){
  $scope.sex  =  true;   
}
$scope.swatch1   = function (){
  $scope.sex  =  false;   
}

$scope.save  = function (){
  Tools.getData({
     "interface_number": "050301",
    "post_content": {
        "sex": $scope.sex?0:1
    }
  },function(r){
      if(r){

                    var reif = storage.getObject('UserInfo');
                      reif.sex  = $scope.sex?'0':'1';
                      storage.setObject('UserInfo',reif);
                      $rootScope.$ionicGoBack();      
                      native.task('保存成功');
        
      }

  })


}
}])

 .controller('SettingsUpdateQQCtr',['$scope','Tools','storage','native','$rootScope',function($scope,Tools,storage,native,$rootScope){
    
  $scope.$on('$ionicView.beforeEnter',function(){
          var userin  =  storage.getObject('UserInfo');
          $scope.msg  = {};
          $scope.msg.qq  =   userin.qq;          
  });

  $scope.clear  = function(){
    $scope.msg.qq   =undefined;
  }




$scope.save  = function (){
  Tools.getData({
   "interface_number": "050307",
    "post_content": {
        "qq": $scope.msg.qq,
    }

  },function(r){
      if(r){
                    var reif = storage.getObject('UserInfo');
                      reif.qq  =  $scope.msg.qq;
                      storage.setObject('UserInfo',reif);
                      $rootScope.$ionicGoBack();      
                      native.task('保存成功');
        
      }

  })






}    
 }])
.controller('SettingsUpdatePasswordCtr',['$scope','Tools','storage','native','$rootScope',function($scope,Tools,storage,native,$rootScope){

 $scope.$on('$ionicView.beforeEnter',function(){
          $scope.msg  = {};          
  });

  $scope.save  = function(){
    if(!$scope.msg.jiumimi ||  !$scope.msg.newmima  ||  !$scope.msg.chormima  ){
      native.task('请填写完整信息')
      return  false;
    }
    
    Tools.getData({
       "interface_number": "050303",
       "post_content": {
        "old_password": window.md5($scope.msg.jiumimi),
        "new_password": window.md5($scope.msg.newmima) ,
        "confirm_password": window.md5($scope.msg.chormima),
    }
    },function(r){
          if(r){      
                      $rootScope.$ionicGoBack();      
                      native.task('修改密码成功');
          }
    })

  }




   




}])
/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('companyInstallCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','storage',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,storage){



  $scope.expression = true;
  $scope.newexpression =true;
$scope.companyID = storage.getObject('UserInfo').company_id;
  $scope.companyName = storage.getObject('UserInfo').company_name;
  $scope.adminer = storage.getObject('UserInfo').is_admin;
  $scope.userid = storage.getObject('UserInfo').user_id;



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    Initial ();

  });


  if($scope.adminer == "1"){
    $scope.newexpression = true
  }else {
    $scope.newexpression = false
  }


function Initial() {

  Tools.getData({
    "interface_number": "000405",
    "post_content": {
      "token":"",
      "token_phone": "",

    }

  },function(r){

    if(r.msg== "success"){
      $scope.auth =r.resp_data.is_auth;
      if($scope.auth=="0"){
        $scope.autName="未认证"
        $scope.expression = false;
      }else if($scope.auth=="1"){
        $scope.autName="审核中"
      }else if($scope.auth=="2"){
        $scope.autName="审核通过";

      }else if($scope.auth=="3"){
        $scope.autName="审核失败"
      }


      $scope.integral =r.resp_data.integral

    }else{

      return false

    }


  });

}






$scope.Unauthorized=function () {
  alert('前往认证页面')
}

$scope.goManagement = function (value) {
  $state.go('r.tab.management',{integral:value})
}

  //解除绑定
$scope.deleteCompany=function () {

if($scope.adminer == "0"){

  $ionicPopup.alert({
    title:"请先移交管理员！",
    okText:'确定'

  });
  return false;
}else {

  Tools.getData({
    "interface_number": "000402",
    "post_content": {
      "token":"",
      "token_phone": "",
      "userId": $scope.userid,
      "isSelf":"1"
    }

  },function(r){

    if(r.msg== "success"){

      native.task('解绑成功');
      window.outlogin(function(){
        $timeout(function(){
          newInitial();
        },30)
      })

      $state.go('r.tab.Settings');
    }else{

      return false

    }


  });


}


}

  //初始  信息
  function  newInitial  (){

    var   user = storage.getObject('UserInfo');
    if(user.user_id){
      //登录了
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/1/w/300/h/300';
      //哈哈哈
      if(user.sex  =='0'){
        $scope.Userinfo.sex  =  './img/icon_man@3x.png';
      }else{
        $scope.Userinfo.sex  =  './img/icon_women.png';

      }
      $scope.Userinfo.login  = true;
      $scope.Userinfo.name  = user.real_name;
      Tools.getData({
        "interface_number": "050300",
        "post_content": {}
      },function(r) {
        if(r){
          $scope.Userinfo.integral   =     r.resp_data.integral;
        }
      })
    }else{
      //没有登录
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  = user.avatar  ;
      $scope.Userinfo.sex  =     user.sex;
      $scope.Userinfo.login  = false;
      $scope.Userinfo.integral    = user.integral
    }
  };




}]);

/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('managementCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','storage','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,storage,fromStateServ){

  $scope.newsList =[]
  $scope.expression=true;
  $scope.userid = storage.getObject('UserInfo').user_id;
  $scope.integralnew = $stateParams.integral;

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "000406",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "count": "0"
      }
    };



    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){

      if(r){


        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }


        if(type){
          $scope.newsList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.newsList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };






  $scope.caklateheight  = {};

  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+44+30-95)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+44+30-95)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600);


  $scope.deleteCompany=function (value,index) {

    $scope.userID = value;


    if($scope.userID==$scope.userid){
      $ionicPopup.alert({
        title:"不能对自己离职！",
        okText:'请重新操作'

      });
      return false;
    }


    $ionicPopup.show({

      title: '确定对员工离职?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "000402",
              "post_content": {
                "token":"",
                "token_phone": "",
                "userId": value,
                "isSelf":"2"
              }

            },function(r){



              if(r.msg== "success"){
                Tools.rmArrin($scope.newsList,index);
                native.task('操作成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });


  };


$scope.recharge = function (value) {

  $scope.data={}

  $ionicPopup.show({
    template: '<input type="text" ng-model="data.integral">',
    title: '充值积分',
    subTitle: '请输入充值积分数量<br>（余额：'+$scope.integralnew+'）',
    scope: $scope,
    buttons: [
      { text: '取消' },
      {
        text: '<b>确认</b>',
        type: 'button-positive',
        onTap: function(e) {


          if (!$scope.data.integral) {
            // 不允许用户关闭，除非输入 wifi 密码
            e.preventDefault();
          } else {
            console.log($scope.data.integral)
           $scope.integrals =  $scope.data.integral;
            Tools.getData({
              "interface_number": "000404",
              "post_content": {
                "token":"",
                "token_phone": "",
                "staffId":value,
                "integral":$scope.integrals

              }

            },function(r){


              if(r.msg== "success"){
                $scope.integralnew =   parseInt($scope.integralnew) - parseInt($scope.integrals)
                native.task('充值成功');
              }



            });

          }

          console.log(e)
        }
      },
    ]
  });





}


  $scope.handed = function (value) {
    $scope.data={}

    $ionicPopup.show({

      title: '移交管理员',
      subTitle: '移交权限需要重新登录，且本次操作不可逆，请确认是否移交?',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
             "interface_number": "000403",
             "post_content": {
             "token":"",
             "token_phone": "",
             "userId":value

             }

             },function(r){

             if(r.msg== "success"){

             window.outlogin(function(){
             $timeout(function(){
             Initial();
             },30)
             })

               $state.go('r.tab.Settings');

             }



             });





          }


        },
      ]
    });

  }

//初始  信息
  function  Initial  (){

    var   user = storage.getObject('UserInfo');
    if(user.user_id){
      //登录了
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/1/w/300/h/300';
      //哈哈哈
      if(user.sex  =='0'){
        $scope.Userinfo.sex  =  './img/icon_man@3x.png';
      }else{
        $scope.Userinfo.sex  =  './img/icon_women.png';

      }
      $scope.Userinfo.login  = true;
      $scope.Userinfo.name  = user.real_name;
      Tools.getData({
        "interface_number": "050300",
        "post_content": {}
      },function(r) {
        if(r){
          $scope.Userinfo.integral   =     r.resp_data.integral;
        }
      })
    }else{
      //没有登录
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  = user.avatar  ;
      $scope.Userinfo.sex  =     user.sex;
      $scope.Userinfo.login  = false;
      $scope.Userinfo.integral    = user.integral
    }
  };




}]);


/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout','$state','$ionicHistory','storage','fromStateServ','$ionicScrollDelegate','Tools','native',function($scope,$ionicPopover, $ionicPopup,$timeout,$state,$ionicHistory,storage,fromStateServ,$ionicScrollDelegate,Tools,native) {


$scope.userfanhui  = function () {
  $state.go('r.tab.SettingsUser')
}


//切换到登录   login
function   login   (){


      native.confirm('该操作需要登录','你还没有登录',['登录','取消'],function(c){


        if(c  == 1){
          fromStateServ.stateChange('r.login');
          }


      })
};

$scope.getMdl   =      fromStateServ.stateChange;
$scope.Personalsetting  = function (){
   if(!storage.getObject('UserInfo').user_id){
        login();
   }else{
       $state.go('r.tab.SettingsUpdate');
   }


}

$scope.addermge  = function(){

    if(!storage.getObject('UserInfo').user_id){
        login();
   }else{

        $scope.getMdl('r.Addresslist')


   }
}

$scope.updateAPP  =  function () {
    window.updateAPP();
}
  $scope.integral  = function(){


    if(!storage.getObject('UserInfo').user_id){
      login();
    }else{

      $state.go('r.tab.SettingOne');


    }
  }

  $scope.companyInstall=function () {

    if(!storage.getObject('UserInfo').user_id){

      login();
    }else{
      $state.go('r.tab.companyInstall');
    }


  }



 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    if(window.platform  !== 'ios'){
      $scope.update  =  true;
    }

    Initial();
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });

  $scope.outlogin  =   function (){



   native.confirm('你确定要退出当前用户吗','退出登录',['登出','取消'],function(c){

        if(c  == 1){
                  window.outlogin(function(){
                    $timeout(function(){
                        Initial();
                    },30)
                      })
          }
      })
  };


var   userone = storage.getObject('UserInfo');
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  = userone.avatar  ;
      $scope.Userinfo.sex  =     userone.sex
      $scope.Userinfo.login  = false;
      $scope.Userinfo.integral    = userone.integral;


  //初始  信息
  function  Initial  (){

    var   user = storage.getObject('UserInfo');
    if(user.user_id){
      //登录了
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/1/w/300/h/300';
      //哈哈哈
      if(user.sex  =='0'){
        $scope.Userinfo.sex  =  './img/icon_man@3x.png';
      }else{
        $scope.Userinfo.sex  =  './img/icon_women.png';

      }
      $scope.Userinfo.login  = true;
      $scope.Userinfo.name  = user.real_name;
      Tools.getData({
        "interface_number": "050300",
        "post_content": {}
      },function(r) {
        if(r){
           $scope.Userinfo.integral   =     r.resp_data.integral;
        }
      })
    }else{
      //没有登录
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  = user.avatar  ;
      $scope.Userinfo.sex  =     user.sex;
      $scope.Userinfo.login  = false;
      $scope.Userinfo.integral    = user.integral
      }
    }

        $scope.opencustomenuatts  = false;

        $scope.showco  =   function  () {
          var uil   = storage.getObject('UserInfo');
        if(!uil.user_id){
              login();
        }else{
          $scope.shopid  = 'http://pan.baidu.com/share/qrcode?w=400&h=400&url='+uil.shop_id;
          $scope.opencustomenuatts   = true;
        }






        }

         $scope.closecustomenu  =   function  () {
              $scope.opencustomenuatts   = false;
            }

         $scope.$on('$ionicView.beforeLeave',function(){
           $scope.closecustomenu();
         })



  }])
  .controller('SettingsUserCtr',['$scope',function($scope){

  }])



Ctr.controller('shophomeCtr',['$scope','$timeout','Tools','$stateParams','$state','fromStateServ','$ionicScrollDelegate',function($scope,$timeout,Tools,$stateParams,$state,fromStateServ,$ionicScrollDelegate){
     
   $scope.title  ='店铺';


   $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
            
            

            if(fromStateServ.getState('r.Shophome')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Shophome').title;
            }else{
                $scope.showtitle  = false;
            }
            
            $timeout(function(){
                        inlit();
            },400)             
    });

    var   inlit  = function (){
                Tools.getData({ "interface_number": "030201",
                "post_content": {shop_id:$stateParams.id}         
                },function(r){
                        if(r){
                            $scope.shopclasslist = r.resp_data.cate_info;
                            $scope.shopclasslist.unshift({
                                cate_id:"",
                                cate_name:"最新商品",
                                num:"0"
                            })
                            $scope.shopclasslist[0].select  =true;                            
                            $scope.shop_info = r.resp_data.shop_info;                            
                            $scope.shop_info.img_header  = window.qiniuimgHost+$scope.shop_info.img_header+'?imageView2/2/w/800';
                            $scope.shop_info.img_shop  =  window.qiniuimgHost+$scope.shop_info.img_shop+'?imageView2/2/w/200';


                            $ionicScrollDelegate.$getByHandle('goodslistshop').scrollTop();
                            $scope.goodlistdata = [];
                            $scope.pagnumber = 1;
                            $scope.loadermoer = true;                  
                        }
                })
    };



        //切换分类
        $scope.swatchclass = function (item){
                if(!item.select){
                    angular.forEach($scope.shopclasslist,function(s){
                        s.select  = false;
                    })
                           $ionicScrollDelegate.$getByHandle('goodslistshop').scrollTop();
                           item.select  = true; 
                           $scope.goodlistdata = [];
                            $scope.pagnumber = 1;
                            $scope.loadermoer = true;     
                }
        }

        $scope.goodslisthe =  {};
        function getgoodslisthe  (){
                    $scope.goodslisthe   ={
                        height:(window.innerHeight-(window.document.querySelector('ion-header-bar').offsetHeight+window.document.querySelector('.shopclaslist').offsetHeight))+'px'
                    }
        };
        $timeout(function(){
                getgoodslisthe();
        },500);
        //加载商品列表
        $scope.pagnumber = 1;
        $scope.goodlistdata = [];
        $scope.loadermoer = false;

        $scope.customcucdownlisloadMore  = function(parm){

                    if(parm){
                            $scope.pagnumber   = 1;       
                            $scope.goodlistdata = [];                     
                    }
                    
                    var nowid = undefined;                    
                    angular.forEach($scope.shopclasslist,function(v) {
                            if(v.select){
                                nowid = v.cate_id;
                            }
                    });

                    var senpo  = {
                         "interface_number": "030104",
                         "post_content": {
                            "searchParam": {
                                "is_sales": 1,
                                "company_id":$scope.shop_info.company_id,
                                "shop_cate_id":nowid,
                            }
                        }
                    };

                    senpo.post_content.page_num  = $scope.pagnumber;

                    Tools.getData(senpo,function(r){
                        if(r){

                            angular.forEach(r.resp_data.data,function(s){
                                s.img_url  = window.qiniuimgHost+s.img_url+'?imageView2/2/w/300/h/300';
                                $scope.goodlistdata.push(s)
                            });

                            if(r.resp_data.nextPage  == 0){
                            $scope.pagnumber = 1;
                            $scope.loadermoer = false;
                            }else{
                            $scope.pagnumber = r.resp_data.nextPage;
                            $scope.loadermoer = true;
                            }
                        }else{
                            $scope.loadermoer = false;
                            
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    });


        }
        





    


}])
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ','storage','Tools','$rootScope','$ionicPopup','$ionicHistory','native','buyConfirmorde',function($scope,fromStateServ,storage,Tools,$rootScope,$ionicPopup,$ionicHistory,native,buyConfirmorde){

 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    //页面的状态变化  请求
    handtat();
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });

      $scope.login  =  function(r){
            fromStateServ.stateChange(r);
      };
      $scope.shopcartdata  =[];
      $scope.TotalPrice  = '0.00';

  //统计总价
  $scope.Total  =function (){
    $scope.TotalPrice  = 0;
    angular.forEach($scope.shopcartdata,function(v){
      angular.forEach(v.goods_info,function(value){
        if(value.select){
          $scope.TotalPrice += parseFloat(value.total_in_price)*parseInt(value.number);
        }
      })
    });
    $scope.TotalPrice   = $scope.TotalPrice.toFixed(2);
  };


      //请求购物数据  整体刷新
      $scope.doRefresh  =  function (){
           Tools.getData({
             "interface_number": "020402",
             "post_content": {}
           },function(r){
             $scope.$broadcast('scroll.refreshComplete');
             $scope.selectall   = false;
             if(r){
                      if(r.resp_data.cart == []){
                        $scope.noitem  = true;
                        return  false;
                      }else{
                        $scope.noitem  = false;
                      }

                    $scope.shopcartdata  = r.resp_data.cart;

                    if(Object.keys($scope.shopcartdata).length  == 0){
                      $scope.noitem  = true;
                    }else{
                      $scope.noitem  = false;
                      angular.forEach($scope.shopcartdata,function(value){
                          angular.forEach(value.goods_info,function(subvalue){
                              subvalue.edit  =false;
                          })
                      })
                    }
             }

           })
      };

      function handtat  (){
        if(storage.getObject('UserInfo').user_id){
            $scope.isShow = false;

            $scope.doRefresh();
        }else{
          $scope.isShow = true;
        }
      }

      //编辑
      $scope.edit  =function (e){
        if(!e.edit){
            e.edit  = true;
        }else{
            e.edit  = false;

          var changedatat =  [];
          angular.forEach(e.goods_info,function(v){
            changedatat.push({
              number:v.number,
              cart_id:v.cart_id
            });

          });
          //完成的交互
          Tools.showlogin();
          Tools.getData({
            "interface_number": "020404",
            "post_content": {
              "cart_data": changedatat
            }
          },function(r){
            if(r){
              Tools.hidelogin();

                console.log(r)
            }
          })



        }
      };

  //选中自身
  $scope.chekthis  = function (r){

       if(!r.select){
         r.select  =true;
       }else{
         r.select  =false;
       }

    $scope.Total();
  };


  //选中所以
  $scope.selctall   = function (){


      if(!$scope.selectall){
        $scope.selectall   = true;
        angular.forEach($scope.shopcartdata,function(v){
          angular.forEach(v.goods_info,function(value){
            value.select  = true;
          })
        })

      }else {
        $scope.selectall   = false;
        angular.forEach($scope.shopcartdata,function(v){
          angular.forEach(v.goods_info,function(value){
            value.select  = false;
          })
        })

      }

    $scope.Total()

  }



   //自  --
        $scope.Subtractme  = function (r){
            r.number    = (parseInt(r.number) -1);
            if(r.number  <=1){
              r.number  = 1;
            }
        }
   //增加  ++
        $scope.Increase  = function (r){

            r.number    = (parseInt(r.number)+1);
            if(r.number  >=  parseInt(r.max_buy_num)){
              r.number  = parseInt(r.max_buy_num);
            }
        }

        //del    Myself
        $scope.delmyseif  = function (c,key,parnt,parntkey,root){

          Tools.getData({
              "interface_number": "020403",
              "post_content": {
              "cart_id": [c.cart_id]
              }
          },function(r){
            if(r){
               Tools.rmArrin(parnt.goods_info,key)
               if(parnt.goods_info.length  ==0 ){
                    delete  root[parntkey];
               }
            }
          });
          $scope.Total();
        };


        //去结算
        $scope.Settlement  = function (){

          //用于结算的  订单的 商品存储对象
          var   shopcartOrder  = '';
          var   nogoods  = true;

          angular.forEach($scope.shopcartdata,function(v){
            angular.forEach(v.goods_info,function(value){
              if(value.select){
                nogoods   = false;
                shopcartOrder += value.cart_id+','
              }
            })
          });          
          if(nogoods){
            native.task('请选择结算的商品');
            return false;
          }
          //选中的商品
            shopcartOrder  = shopcartOrder.substring(0,shopcartOrder.length-1);
            buyConfirmorde.cart   =shopcartOrder;
            fromStateServ.stateChange('r.ConfirmorderZf');
          
          //这里去 确认订单          


        };






}])

/**
 * Created by Why on 16/6/12.
 */

     //全局变量定义
    /* window.Interactivehost  = 'http://192.168.0.89:7878/index.php?r=app/index';*/
    //  window.Interactivehost  = 'http://192.168.0.149:8001/index.php?r=app/index';
    window.Interactivehost  = 'http://192.168.0.56:1155/index.php?r=app/index';
    //window.Interactivehost =  'http://app.ywyde.com/index.php?r=app/index';


    window.qiniuimgHost =  'http://oap3nxgde.bkt.clouddn.com/';
  //window.Interactivehost  = 'http://192.168.0.115:8001/index.php?r=app/index';
  //没有使用过度的返回页面的使用

  //本地缓存   对象列表 定义
  // window.LocalCacheStatelist  =  {
  //   shopCart:'YES',
  // };
  window.defaultUserheader  =  './img/sys_male.jpg';

  Server.factory('const',['$window','$ionicHistory','$timeout','$ionicNativeTransitions',function($window,$ionicHistory,$timeout,$ionicNativeTransitions){
      return{
        haha:'哈哈'
      }
    }])

    //商品编辑状态
    .factory('goodsState',[function(){
      return{
         Refresh:false,
         goods_basic_id:undefined,
         goods_title:undefined,
         img_url:undefined,
         activity_price:undefined,
         total_in_number:undefined
      }
    }])


    .factory('loginregisterstate',[function(){
      return{
         Refresh:false,
      }
    }])
    .factory('adderupdatastat',[function(){
      return{
          id:false,
          linkname:undefined,
          phone:undefined,
          city:undefined,
          province:undefined,
          region:undefined,
          street:undefined,
          is_default:undefined,
      }
    }])
    .factory('buyConfirmorde',[function(){
      return{
      }
    }])
    .factory('comforderlistadder',[function(){
      return{
      }
    }])
    
    
    
/**
 * Created by Why on 16/6/10.
 */
//推送的方法类封装
Server.factory('native',['$window',function($window){
  return{
    //存储单个属性
    set :function(key,value){
      $window.localStorage[key]=value;
    },
  }

}]);

/**
 * Created by Why on 16/6/10.
 */
//调用原生方法类
Server.factory('native',['$window','$cordovaCamera','$cordovaDialogs','$cordovaActionSheet','$cordovaAppVersion','$cordovaBadge','$cordovaBarcodeScanner','$cordovaToast','$cordovaProgress','$cordovaCalendar','$ionicLoading',function($window,$cordovaCamera,$cordovaDialogs,$cordovaActionSheet,$cordovaAppVersion,$cordovaBadge,$cordovaBarcodeScanner,$cordovaToast,$cordovaProgress,$cordovaCalendar,$ionicLoading){
  //跟新方法






  return{
    ref:this,
    //原生输出
    alert:function(content,title,buttontext){
      //ios 类型检测
      if(typeof   content  !=='string'){
        $cordovaDialogs.alert('输出内容只能为字符串',title?title:'信息',buttontext?buttontext:'取消')
        return false;
      }
      //content     输出内容
      //title       输出标题
      //buttontext  按钮文字
        $cordovaDialogs.alert(content?content:'',title?title:'信息',buttontext?buttontext:'取消')

    },
    //原生confirm
    confirm:function(content,title,buttons,Callback){
      //content     内容
      //title       标题
      //buttontext  按钮数组
      // no button = 0, 'OK' = 1, 'Cancel' = 2
      $cordovaDialogs.confirm(content,title,buttons).then(Callback);
    },
    //原生  输入框
    prompt:function(content,title,buttons,defaultText,Callback){
      //content     内容
      //title       标题
      //buttontext  按钮数组
      //defaultText  默认值
      //result.input1   result.buttonIndex
      // no button = 0, 'OK' = 1, 'Cancel' = 2
      $cordovaDialogs.prompt(content,title,buttons,defaultText).then(Callback);
    },
    //原生  逼逼声(⊙﹏⊙)b
    beep:function(number){
      $cordovaDialogs.beep(number);
    },
    //调用摄像头
    Camera :function(config,Callback,errCallback){
      //config 可以传空对象
      var options = {
        quality: config.quality?config.quality:50, //图片的压缩质量  0-100  默认50
        destinationType: config.destinationType?config.destinationType:Camera.DestinationType.DATA_URL,
        //图片返回的类型
        // Camera.DestinationType.DATA_URL    //配置对象config 0  base64位图片
        // Camera.DestinationType.FILE_URI    //配置对象config 1  图片地址
        // Camera.DestinationType.NATIVE_URI  //配置对象config 2  图片地址(相对与原生   assets-library://  )
        sourceType: config.sourceType?config.sourceType:Camera.PictureSourceType.CAMERA,
        //图片来源  (调用方式)
        //Camera.PictureSourceType.PHOTOLIBRARY      //配置对象config  0  图库 (有可能有的设备没有  建议使用 1和 2)
        //Camera.PictureSourceType.CAMERA            //配置对象config  1  摄像头
        //Camera.PictureSourceType.SAVEDPHOTOALBUM   //配置对象config  2 相册
        allowEdit: config.allowEdit?config.allowEdit:false,  //是否允许裁切
        encodingType: config.encodingType?config.encodingType:Camera.EncodingType.JPEG,
        //返回图片类型
        //配置对象config  0   JPEG
        //配置对象config  1   PNG

        //返回图片高宽 设置
        mediaType:config.mediaType?config.mediaType:0,
        //可以选择的媒体类型
        //配置对象config  0 静态图片
        //配置对象config  1 视频  (配合 destinationType  使用);
        //配置对象config  2 所有类型  (配合 destinationType  使用);
        cameraDirection:config.cameraDirection?config.cameraDirection:0,
        //配置调用的摄像头位置
        //配置对象config  0 背面摄像头
        //配置对象config  1 正面摄像头
        popoverOptions: CameraPopoverOptions,  //ios  的弹出位置 不予配置
        saveToPhotoAlbum: config.saveToPhotoAlbum?config.saveToPhotoAlbum:false,
        //获取图片完成后是否在 设备上相册保留
        correctOrientation:config.correctOrientation?config.correctOrientation:true
        //支持图片旋转是否
      };

      if(config.targetWidth){
        options.targetWidth  = config.targetWidth;
      }else  if(config.targetHeight){
        options.targetHeight  = config.targetHeight;
      }


      $cordovaCamera.getPicture(options).then(function(imageData) {
        var  data = "data:image/jpeg;base64," + imageData;
        Callback(data,imageData);
      }, function(err) {
        $cordovaToast.show('获取图片错误',1000,animte?animte:'bottom');
        errCallback();
        // error
        //this.alert(err,'信息','确认')

      });

    },
    //ActionSheet  弹出面板  选择框(类似)
    ActionSheet:function(config,Callback){
    //Callback  返回对应数组 索引
    $cordovaActionSheet.show({
      title: config.title?config.title:'选择',
      //标题
      buttonLabels: config.buttonLabels?config.buttonLabels:['我是默认的选项'],
      //选项的内容
      addCancelButtonWithLabel:config.addCancelButtonWithLabel?config.addCancelButtonWithLabel:'取消',
      //取消按钮的文字
      androidEnableCancelButton :config.androidEnableCancelButton?config.androidEnableCancelButton:true,
      //安卓的默认取消键
      winphoneEnableCancelButton : false, //windowsPhone  不予配置
      addDestructiveButtonWithLabel: config.addDestructiveButtonWithLabel?config.addDestructiveButtonWithLabel:''
      //会被添加的到第一个选项  ios  下是红色的
    }).then(Callback);
    },
    //获取app 版本号
    getAppVersion:function(Callback){
      $cordovaAppVersion.getVersionNumber().then(Callback);
    },
    //获取app 版本代码
    getAppVersionCode:function(Callback){
      $cordovaAppVersion.getVersionCode().then(Callback);
    },
    //获取app 名称
    getAppName:function(Callback){
      alert($cordovaAppVersion.getAppName)
      $cordovaAppVersion.getAppName().then(Callback);
    },
    //获取app 包名称
    getAppPackageName:function(Callback){
      $cordovaAppVersion.getPackageName().then(Callback);
    },
    //app的徽章操作  (需要有通知权限)
    //app  是否有权限操作徽章
    BadgPermission:function(Callback){
      $cordovaBadge.hasPermission().then(Callback,function(no){})
    },
    //设置徽章数
    Badgeset:function(number,Callback,error){
      $cordovaBadge.set(number).then(Callback?Callback:function(r){}, error?error:function(error){});
    },
    //获取徽章数
    Badgeget:function(Callback,error){
      $cordovaBadge.get().then(Callback?Callback:function(r){}, error?error:function(error){  });
    },
    //扫码
    Barcode:function(Callback,error){
      $cordovaBarcodeScanner.scan().then(Callback,error);
    },
    //消息框
    task:function(msg,time,animte){
      //msg     消息主题   必传
      //time    消失时间  毫秒数  默认 1000
      //animte  动画方式   'top', 'center', 'bottom'
      $cordovaToast.show(msg,time?time:1000,animte?animte:'bottom')
      .then(function(success) {
          // success
        }, function (error) {
          // error
        });
    },
    //原生 加载条
    loading:function(text){

      // $ionicLoading.show({
      // template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
      // //template: '<ion-spinner  icon="ripple" class="spinner-energized"  ></ion-spinner>',
      // delay:100
      // });


      if(window.ProgressIndicator){
        if(text){
          $cordovaProgress.showText(false, 100000, text)
        }else{
          $cordovaProgress.showSimple(true)
        }
      }else{
        $ionicLoading.show({
        template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
        //template: '<ion-spinner  icon="ripple" class="spinner-energized"  ></ion-spinner>',
        delay:100
      });
      }
    },
    //隐藏加载条
    hidloading:function(){

    if(window.ProgressIndicator){
      $cordovaProgress.hide();
    }else{
      $ionicLoading.hide();
    }

    },
    //复制
    Copy:function(text,success,error){
      $cordovaClipboard.copy(text).then(success,error);
    },
    //粘贴
    Paste:function(success,error){
      $cordovaClipboard.paste().then(success,error);
    }
    //日历
    //Calendar:function(){
    //  $cordovaCalendar.createCalendar({
    //    calendarName: 'Cordova Calendar',
    //    calendarColor: '#FF0000'
    //  }).then(function (result) {
    //    alert('成功')
    //    // success
    //  }, function (err) {
    //    // error
    //    alert('错误')
    //  });
    //}


  }

}]);

/**
 * Created by Why on 16/6/6.
 */
Server.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout','$ionicNativeTransitions',function($state,$ionicViewSwitcher,$ionicHistory,$timeout,$ionicNativeTransitions){
    var box  = {
        data: {},
        savestate:false,
        backView:function(tartg,clback){
          $ionicViewSwitcher.nextDirection('back');
          if(window.cordova  && window.cordova.plugins.Keyboard.isVisible ){
                        window.cordova.plugins.Keyboard.close();
                    $timeout(function(){
                      $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                        "type": "slide",
                        "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                        "duration": 400, // in milliseconds (ms), default 400
                      });
                    },300)
                    
                  }else{
                    $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                      "type": "slide",
                      "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                      "duration": 400, // in milliseconds (ms), default 400
                    });
                  }

                    $timeout(function () {
                    if(clback){
                        clback()
                    }
              window.backtoinroot  = undefined;
              window.androdzerofun  =  undefined;
              window.androdzerofun_parms  = undefined;
              window.androdzerofun_clback  = undefined;
              window.backtoinroot_parms  =  undefined;
              $ionicHistory.clearHistory();
            }, 100);

        },
        setState: function(module, fromState, fromParams,title,viewid) {
            this.data[module] = {
                "fromState": fromState,
                "fromParams": fromParams,
                title:title,
                viewId:viewid
            };
        },
        getState: function(module) {
            return this.data[module];
        },
        stateChange: function(stateName,parms,animation){

            box.savestate = true;
            //$ionicViewSwitcher.nextDirection(animation?animation:'forward');
            // $ionicNativeTransitions.stateGo(stateName,parms,{
            //     "type": "drawer",
            //     "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
            //     "duration": 1000 // in milliseconds (ms), default 400
            // });
          $ionicViewSwitcher.nextDirection('forward');
          $ionicNativeTransitions.stateGo(stateName,parms, {
            "type": "slide",
            "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
            "duration": 400, // in milliseconds (ms), default 400
          });

        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },
        saveHisty:function ($histy,stateNa){

            if(this.savestate){
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

/**
 * Created by Why on 16/6/14.
 */
  //本地存储数据===================================
Server.factory('share',['$window','native',function($window,native){



  //是否安装微信
  function wechatishas  (sharego){
    native.loading('启动微信...');
    if($window.Wechat   ==  undefined  ){
      native.hidloading()
      native.alert('微信插件没有安装!');
      return false;
    }
    $window.Wechat.isInstalled(function (installed) {
      if(installed){
        setTimeout(function(){
          native.hidloading()
          sharego();
        },300)
      }else{
        native.alert('请安装,微信!')
        native.hidloading()
      }
    }, function (reason) {
      alert("Failed: " + reason);
      native.hidloading()
    });
  }

  return{
    //微信分享
    weichat:function(config){
      wechatishas(function(){
        window.Wechat.share({
          message: {
            title: "这是测试",
            description: "易物app",
            thumb: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1903957143,479133575&fm=111&gp=0.jpg",
            mediaTagName: "TEST-TAG-001",
            messageExt: "易物",
            messageAction: "<action>dotalist</action>",
            media: {
              type: window.Wechat.Type.LINK,
              webpageUrl: "http://tech.qq.com/zt2012/tmtdecode/252.htm"
            }
          },
          scene: window.Wechat.Scene.SESSION   // share to Timeline
          //TIMELINE   盆友圈
          //FAVORITE   收藏
          //SESSION    微信聊天回话



        }, function () {
        }, function (reason) {
          alert("Failed: " + reason);
        });
      })
    }



  }


}]);

/**
 * Created by Why on 16/6/10.
 */
  //本地存储数据===================================
Server.factory('storage',['$window',function($window){
    return{
      //存储单个属性
      set :function(key,value){
        $window.localStorage[key]=value;
      },
      //读取单个属性
      get:function(key,defaultValue){
        return  $window.localStorage[key] || defaultValue;
      },
      //存储对象，以JSON格式存储
      setObject:function(key,value){
        $window.localStorage[key]=JSON.stringify(value);
      },      
      //读取对象
      getObject: function (key) {
          return JSON.parse( $window.localStorage[key] || '{}'   );
      }
    }


  }]);

/**
 * Created by Why on 16/6/10.
 */
//小工具方法类
Server.factory('Tools',['$window','$ionicLoading','$http','$timeout','$ionicPopup','storage','native','$ionicHistory','$state',function($window,$ionicLoading,$http,$timeout,$ionicPopup,storage,native,$ionicHistory,$state){

  //加在视图的加载效果http前调用
  var   showlogin = function() {
    native.loading();
  };
  
    function  clone  (myObj){
      if(typeof(myObj) != 'object') return myObj;
      if(myObj == null) return myObj;
      if(  myObj instanceof Array ){
        var myNewObj = new Array();
        for(var i in myObj){
          myNewObj[i] = clone(myObj[i]);
        }
      }else{
        var myNewObj = new Object();
        for(var i in myObj){
          myNewObj[i] = clone(myObj[i]);
        }
      }
      return myNewObj;
    }


  //上传到七牛  图片单张
  var   sendqiniu_single  =  function (data,claback,key_header,next){



      var  piclen  =   '-1';
      var  key  = Base64.encode(key_header+'_'+(storage.getObject('UserInfo').user_id?storage.getObject('UserInfo').user_id:'-1_')+'_'+(Date.parse(new Date()))+(Math.random()*1000).toFixed(1)+'.jpg');
        data  = data.substring(data.indexOf(",")+1);

        var pic =data;
        var url = 'http://upload.qiniu.com/putb64/'+piclen+'/key/'+key;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function(){
          if (xhr.readyState==4){
            if (xhr.status == 200) {
              claback(JSON.parse(xhr.responseText));
              if(next){
                next(JSON.parse(xhr.responseText));
              }
            }else{
              native.task('图片上传失败!',1000);
            }
          }
        }

        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/octet-stream");
        xhr.setRequestHeader("Authorization", 'UpToken '+storage.getObject('qiniu').qp_token);
        xhr.send(pic);






  };

  //上传到七牛  图片多张队列
  var   sendqiniu_queue  =  function (data,claback,key_header){
    getData({
          "interface_number": "000002",
          "client_type": "ios",
          "post_content": {}
        },function(r){
          if(r){
            storage.setObject('qiniu',r.resp_data);

                  var   index  =  -1;
                  var   reslf  = [];
                  !function  run (){
                    index++;
                    if(index>=data.length){
                      claback(reslf);
                      return false;
                    }else{
                      sendqiniu_single(data[index],function (r){
                        reslf.push(r);
                        run();
                      },key_header)
                    }
                  }();
          }else{
            native.task('获取图片Token失败！');
          }
        });
  };

  //选择图片  提供相机  和  相册功能
   var  chekpirc    = function (cofnig,claback){
     if(!typeof   cofnig  == 'object' || !cofnig){
       cofnig = {};
     }
     native.ActionSheet({
       title:'图片来源',
       buttonLabels:['相册'],
       addDestructiveButtonWithLabel:'拍照'
     },function(r){

       if(r==1) {

         cofnig.quality?cofnig.quality:50;
         cofnig.allowEdit?cofnig.allowEdit:false;
         native.Camera(cofnig,function(r){
           //base64 回调
           claback(r)
         },function(){
         });
       }else if(r==2){
         cofnig.quality?cofnig.quality:50;
         cofnig.allowEdit?cofnig.allowEdit:false;
         cofnig.sourceType  =  Camera.PictureSourceType.SAVEDPHOTOALBUM;
         native.Camera(cofnig,function(r){
           //base64 回调
           claback(r);
         },function(){
         });
       }else{
         native.task('取消');
       }





     })
   };

  var   hidelogin = function(){
            native.hidloading();
  };
  var   getData  = function(data,Callback,errorCallback,sendType){
    data.client_type =   window.platform?window.platform:'ios';
    data.post_content.token  = window.Token?window.Token:storage.getObject('UserInfo').token?storage.getObject('UserInfo').token:'';
    data.post_content.token_phone  = window.token_phone?window.token_phone:storage.getObject('UserInfo').phone?storage.getObject('UserInfo').phone:'';

    console.log('数据监控 ....')
    console.log(JSON.stringify(data));


    $http({
      url:window.Interactivehost,
      method:sendType?sendType:'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      data:data
    }).success(function(r){

      $timeout(function(){
                hidelogin();
              },200);
      if(r.resp_code== '0000'){
        Callback(r);
      } else if(r.resp_code ==  '0001' ){

            window.outlogin(function(){
              $state.go('r.tab.Home');
              $timeout(function(){
                  $ionicHistory.clearHistory();
              },40)
              native.task(r.msg,3000);
            })
      }  else{
        Callback(false);
        // Callback(false);
        // errorCallback?errorCallback(r):null;
        if(r.msg){

          native.task(r.msg);

        }else{
           native.task('异常错误!')
        }
      }
    }).error(function(e){
      // errorCallback?errorCallback(e):null;
      $timeout(function(){
        hidelogin();
      },200);
      Callback(false);
      native.task('网络错误,请确认网络连接!')


    });

  };
  var  reg = {
    USPhone: function (val) {
      return /^0?1[3|4|5|7|8][0-9]\d{8}$/.test(val);
    },
    //邮编
    Zipcode:function(val){
      return /^[0-9][0-9]{5}$/.test(val);
    },
    //汉字
    chinese:function(val){
      return /[\u4E00-\u9FA5]/.test(val);
    },
    //身份证验证
    ID:function(val){
      return  /^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(19\d{2}(0[13578]|1[02])31)|(19\d{2}02(0[1-9]|1\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\d{3}(\d|X)?$/.test(val);
    },
    //固定电话
    tel:function(val){
      var mobilecheck = /^(\d{3,4}-)?\d{7,8}$/i;
      return mobilecheck.test(val);
    },
    //传真
    Fax:function(val){
      var mobilecheck = /^(\d{3,4}-)?\d{7,8}$/i;
      return  mobilecheck.test(val);
    },
    //不能为负数
    negative:function(val){
      return  /(^\+?\d+((\.{1}\d+)|(\d*))$)/.test(val);
    },
    // matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
    date: function (val) {
      return /^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i.test(val);
    },
    email: function (val) {
      return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val);
    },

    minLength: function (val, length) {
      return val.length >= length;
    },

    maxLength: function (val, length) {
      return val.length <= length;
    },
    equal: function (val1, val2) {
      return (val1 == val2);
    }

  };

  return{
    //angualr  本事自带的一些小方法
    //angualr.forEach
    //.isArray
    //.isDate
    //.isFunction
    //.isNumber
    //.isObject
    //.isObject
    //.isString
    //.isUndefined
    //删除数组中的一个元素  传入索引下标即可   结果返回自身
    rmArrin:function (arr,index){
      if(arr.length == 0 || arr.length == 1){
        arr.length = 0;
        return true;
      }else if(arr.length == 2){
        if(index  == 0){
          arr[0] =arr[1];
          arr.length  =1;
        }else if(index ==1) {
          arr.length  =1;
        }

        return false;
      } else{
        for(var i = 0 ;i<arr.length;i++){
          var temp = arr[i];
          if(!isNaN(index)){
            temp=i;
          }
          if(temp==index){
            for(var j  =i;j<arr.length;j++){
              arr[j]=arr[j+1];
            }
            arr.length=arr.length-1;
          }
        }
      }
    },
    //克隆对象


    clone:clone,
    //笛卡尔积  操作
    descartes:function(list) {
//parent上一级索引;count指针计数
      var point = {};

      var result = [];
      var pIndex = null;
      var tempCount = 0;
      var temp = [];

//根据参数列生成指针对象
      for(var index in list)
      {
        if(typeof list[index] == 'object')
        {
          point[index] = {'parent':pIndex,'count':0}
          pIndex = index;
        }
      }

//单维度数据结构直接返回
      if(pIndex == null)
      {
        return list;
      }

//动态生成笛卡尔积
      while(true)
      {
        for(var index in list)
        {
          tempCount = point[index]['count'];
          temp.push(list[index][tempCount]);
        }

//压入结果数组
        result.push(temp);
        temp = [];

//检查指针最大值问题
        while(true)
        {
          if(point[index]['count']+1 >= list[index].length)
          {
            point[index]['count'] = 0;
            pIndex = point[index]['parent'];
            if(pIndex == null)
            {
              return result;
            }

//赋值parent进行再次检查
            index = pIndex;
          }
          else
          {
            point[index]['count']++;
            break;
          }
        }
      }
    },
    showlogin:showlogin,
    hidelogin:hidelogin,
    getData:getData,
    reg:reg,
    sendqiniu_single:sendqiniu_single,
    sendqiniu_queue:sendqiniu_queue,
    chekpirc:chekpirc







  }

}]);
