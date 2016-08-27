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
App.directive('newdraggable', function($document, $timeout) {

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
        var  allleft  = element[0].scrollWidth - window.innerWidth;
        var  endoption  =element[0].style.webkitTransform.replace('translateX(','').replace('px)','');
        if(endoption > 0){
          element[0].style.webkitTransform = 'translateX(0px)';
        }
        else  if( Math.abs(endoption) >= allleft){
          if(element[0].scrollWidth< window.innerWidth ){
            element[0].style.webkitTransform = 'translateX(0px)';
          } else{
            element[0].style.webkitTransform = 'translateX('+(-allleft-10)+'px)';
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
App.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider','$httpProvider','$ionicNativeTransitionsProvider','$sceDelegateProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider,$httpProvider,$ionicNativeTransitionsProvider,$sceDelegateProvider){


  $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'http://m.kuaidi100.com/**',
      'https://m.kuaidi100.com/**',
    ]);



  $ionicNativeTransitionsProvider.setDefaultOptions({
    duration: 400, // in milliseconds (ms), default 400,
    slowdownfactor: 1, // overlap views (higher number is more) or no overlap (1), default 4
    iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
    androiddelay: 20, // same as above but for Android, default -1
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
  $ionicNativeTransitionsProvider.enable(true);

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

        }else if(value instanceof Object) {
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

  $ionicConfigProvider.views.swipeBackEnabled(false);

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

//诚信企业
    .state('r.Companies', {
      url: '/Companies',

      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Companies')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/Companies.html',
          controller: 'CompaniesCtr'
        }
      }
    })


    //注册

    .state('r.register', {
      url: '/register',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.register')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/login/register.html',
          controller: 'registerCtr'
        }
      }
    })

  /*  .state('r.register',{
      url: '/register',

       views: {
        'rootview': {
          templateUrl: 'templates/login/register.html',
          controller: 'registerCtr'
        }
       }
    })*/


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
  /*  .state('r.registercfpwd',{
      url: '/registercfpwd?phone:',
      views: {
        'rootview': {
          params:{phone:null},
          templateUrl: 'templates/login/registercfpwd.html',
          controller: 'registercfpwdCtr'
        }
      }
    })*/

    .state('r.registercfpwd', {
      url: '/registercfpwd?phone:',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.registercfpwd')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
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
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.grAuthentication')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      url: '/grAuthentication',
      views: {
        'rootview': {
          templateUrl: 'templates/login/grAuthentication.html',
          controller: 'grAuthenticationctr'
        }
      }
    })

/*
     .state('r.grAuthentication',{
        url: '/grAuthentication',
        views: {
          'rootview': {
            templateUrl: 'templates/login/grAuthentication.html',
            controller: 'grAuthenticationctr'
          }
        }
      })*/

    //企业认证
    .state('r.entAuthentication',{
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.entAuthentication')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      url: '/entAuthentication/:selectData',
      views: {
        'rootview': {
          templateUrl: 'templates/login/entAuthentication.html',
          controller: 'entAuthenticationctr'
        }
      }
    })

   /*   .state('r.entAuthentication',{
        url: '/entAuthentication',
        views: {
          'rootview': {
            templateUrl: 'templates/login/entAuthentication.html',
            controller: 'entAuthenticationctr'
          }
        }
      })*/

    .state('r.selectPaydues',{
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.selectPaydues')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      url: '/selectPaydues',
      views: {
        'rootview': {
          templateUrl: 'templates/login/selectPaydues.html',
          controller: 'selectPayduesctr'
        }
      }
    })

/*      .state('r.selectPaydues',{
        url: '/selectPaydues',
        views: {
          'rootview': {
            templateUrl: 'templates/login/selectPaydues.html',
            controller: 'selectPayduesctr'
          }
        }
      })*/
    //分类
   /* .state('r.tab.Classif', {
      url: '/Classif',
      nativeTransitions: null,
      views: {
        'Classif': {
          templateUrl: 'templates/Classif/Classif.html',
          controller: 'Classif'
        }
      }
    })*/

    .state('r.tab.Classif', {
      url: '/Classif',
      nativeTransitions: null,
      views: {
        'Classif': {
          templateUrl: 'templates/Classif/newClass.html',
          controller: 'Classif'
        }
      }
    })

    .state('r.classContent',{
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.classContent')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      url: '/classContent/:id/:Name',
      views: {
        'rootview': {
          templateUrl: 'templates/Classif/classContent.html',
          controller: 'classContentCtr'
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



    .state('r.HomeSearch',{
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomeSearch')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      url: '/HomeSearch',
      views: {
        'rootview': {
          templateUrl: 'templates/Home/search.html',
          controller: 'homesearchCtr'
        }
      }
    })


    .state('r.selfShop',{
      url: '/selfShop/:goodsId/:company_id',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.selfShop')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/selfShop.html',
          controller: 'selfShopCtr'
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

      //活动

    .state('r.stretchOne', {
      url: '/stretchOne',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.stretchOne')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,inside:null},
          templateUrl: 'templates/shop/stretchOne.html',
          controller: 'stretchOneCtr'
        }
      }
    })


    //交易流程



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

    .state('r.shopAddress',{
      url: '/shopAddress/:province/:city/:region/:detailmsg',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.shopAddress')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/shopAddress.html',
          controller: 'shopAddressCtr'
        }
      }
    })



    .state('r.shopNumber',{
      url: '/shopNumber/:Number',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.shopNumber')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/shopNumber.html',
          controller: 'shopNumberCtr'
        }
      }
    })

    .state('r.classAdvice',{
      url: '/classAdvice/:id',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.classAdvice')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Classif/ClassAdvice.html',
          controller: 'ClassAdviceCtr'
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



    //采购订单
    .state('r.HomPurchase', {
      url: '/HomPurchase/:data',

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



    .state('r.Homordersbody', {
      url: '/Homordersbody/:basicID/:seorde',

      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Homordersbody')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/ordersbody.html',
          controller: 'ordersbodyCtr'
        }
      }
    })

    //采购订单详情

  /*  .state('r.HomPurordersbody', {
      url: '/HomPurOrdersBody/:basicID',
      cache: false,
      views: {
        'rootview': {
          params:{'basicID':null},
          templateUrl: 'templates/Home/purchasebody.html',
          controller: 'purbodyCtr'
        }
      }
    })*/



    .state('r.HomPurordersbody', {
      url: '/HomPurOrdersBody/:basicID/:seorde',

      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.HomPurordersbody')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Home/purchasebody.html',
          controller: 'purbodyCtr'
        }
      }
    })
    //采购订单搜索
    .state('r.searchPurchase',{
      url: '/searchPurchase/:keyValue/:newData',
      views: {
        'rootview': {
          templateUrl: 'templates/Home/searchPurchase.html',
          controller: 'searchPurchaseCtr'
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

 /*   // Notice   员工审核消息
    .state('r.tab.information',{
      url: '/information',
      views: {
        'notice': {
          templateUrl: 'templates/Notice/applicationinformation.html',
          controller: 'informationCtr'
        }
      }
    })*/


    .state('r.information', {
      url: '/information',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.information');
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
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
    .state('r.SettingsUpdate', {
      url: '/Settings/update',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.SettingsUpdate');
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/SettingsUpdate.html',
          controller: 'SettingsUpdateCtr'
        }
      }
    })

    //setting  个人设置 客户反馈
    .state('r.SettingsUser', {
      url: '/Settings/user',
             onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.SettingsUser');
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      cache:false,
      views: {
        'rootview': {
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
    .state('r.SettingsSexUsername', {

      url: '/Settings/update/sex',
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/SettingsUpdateSex.html',
          controller: 'SettingsUpdateSexCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改 QQ
    .state('r.SettingsQQ', {
      url: '/Settings/update/qq',
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/SettingsUpdateQQ.html',
          controller: 'SettingsUpdateQQCtr'
        }
      }
    })

    //setting  个人设置 个人资料修改 password
    .state('r.SettingsPassword', {
      url: '/Settings/update/password',
      views: {
        'rootview': {
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
      url: '/management',
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
    .state('r.SettingOne', {
      url: '/Settings/SettingOne',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.SettingOne')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/Settinginvite.html',
          controller: 'SettinginviteCtr'
        }

      }
    })

    //setting  关于企业
    .state('r.SettingWe', {
      url: '/Settings/SettingWe',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.SettingWe')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },

      views: {
        'rootview': {
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
      url: '/Shophome?id:&ref:&inside:',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Shophome')
      },
      onExit:function(fromStateServ){
        fromStateServ.removebackregistevent();
      },
      views: {
        'rootview': {
          params:{id:null,ref:null,inside:null},
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

      //查看物流
    .state('r.SeeshopPint',{
      url: '/SeeshopPint?name:',
      cache:false,
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.SeeshopPint')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        params:{name:null},
        'rootview': {
          templateUrl: 'templates/shop/showpint.html',
          controller: 'SeeshopPintCtr'
        }
      }
    })

    //交易物流消息
    .state('r.LogisticsInformation',{
      url: '/LogisticsInformation',
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.LogisticsInformation')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        'rootview': {
          templateUrl: 'templates/Notice/logisticsInfo.html',
          controller: 'LogisticsInformationCtr'
        }
      }
    })

    //系统消息
    .state('r.Systemessagenotice',{
      url: '/Systemessagenotice',
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.Systemessagenotice')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        'rootview': {
          templateUrl: 'templates/Notice/logisticsInfo.html',
          controller: 'SystemessagenoticeCtr'
        }
      }
    })
    //系统消息
    .state('r.Companynotice',{
      url: '/Companynotice',
      onEnter: function(fromStateServ,$ionicHistory) {
          fromStateServ.saveHisty($ionicHistory,'r.Companynotice')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        'rootview': {
          templateUrl: 'templates/Notice/logisticsInfo.html',
          controller: 'CompanynoticeCtr'
        }
      }
    })

    //门店管理
    .state('r.Storemanagement',{
      url: '/Storemanagement',
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/Storemanagement.html',
          controller: 'StoremanagementCtr'
        }
      }
    })

    //门店  编辑 增加
    .state('r.StoremanagementEdit',{
      url: '/StoremanagementEdit',
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/StoremanagementEdit.html',
          controller: 'StoremanagementEditCtr'
        }
      }
    })
    //员工详情
    .state('r.Employeedetails',{
      url: '/Employeedetails',
      views: {
        'rootview': {
          templateUrl: 'templates/Setting/managementDetail.html',
          controller: 'EmployeedetailsCtr'
        }
      }
    })
    //支付·密码 (暂时支持密码)
    .state('r.comforderpayPwd',{
      url: '/comforderpayPwd',
      cache:false,

        onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.comforderpayPwd')
        },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
        'rootview': {
          templateUrl: 'templates/root/comfpayPwd.html',
          controller: 'comforderpayPwdCtr'
        }
      }
    })
    
    //二维码 支付页面
    .state('r.ercodepayPage',{
      url: '/ercodepayPage?ecode:&monye:',
      views: {
        params:{ecode:null,monye:null},
        'rootview': {
          templateUrl: 'templates/root/ercodepay.html',
          controller: 'ercodepayPageCtr'
        }
      }
    })

    //充值 选择输入金额
    .state('r.Inputamount',{
      url: '/Inputamount?type:&monye:',
      onEnter: function(fromStateServ,$ionicHistory) {
        fromStateServ.saveHisty($ionicHistory,'r.Inputamount')
      },
       onExit:function(fromStateServ){
         fromStateServ.removebackregistevent();
       },
      views: {
         params:{type:null,monye:null},
        'rootview': {
          templateUrl: 'templates/root/inputamount.html',
          controller:  'InputamountCtr'
        }
      }
    })
    
    //充值 选择支付方式
    .state('r.Selectpaymentmethod',{
      url: '/Selectpaymentmethod?type:&monye:&toSt:',
      cache:false,
      views: {
         params:{type:null,monye:null,toSt:null},
        'rootview': {
          templateUrl: 'templates/root/Selectpaymentmethod.html',
          controller:  'SelectpaymentmethodCtr'
        }
      }
    })

    


    





















  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/r/tab/Home');

}]);


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
                      window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);

                  }
                })
            };


          $rootScope.$on('$stateChangeSuccess', function() {
          console.log($location.path());
          console.log($ionicHistory.viewHistory())
          });

  
  $ionicPlatform.ready(function() {

    if(window.cordova){

      window.cordova.getAppVersion.getVersionNumber(function (version) {
            window.dev_version  = version;






      })

    }
  
  
   setTimeout(function () {
     if(navigator){
       navigator.splashscreen.hide();
       }
    }, 500);
    //$state.go('r.selectPaydues');
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

        window.jpushreightid  = data;
        //alert(window.jpushreightid,'获取推送id成功')

        if(data){
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
      //error
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

    window.extapp   =  function () {
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
     if (JSON.stringify($location.path()) == '/r/tab/Home'  ||  JSON.stringify($location.path()) == '/r/tab/goodsclasslist' ||  JSON.stringify($location.path()) == '/r/tab/Notice'  ||  JSON.stringify($location.path()) == '/r/tab/Settings' ) {
       showConfirm();
     } else if ($ionicHistory.backView()) {
       if(window.lockingJump) return  false;
       window.lockingJump  =  true;
       $rootScope.$ionicGoBack();

       $timeout(function(){
          window.lockingJump  =  false;
       },600)

     }else {
       // This is the last page: Show confirmation popup
       window.extapp();
     }
     return false;
   }, 100);






    $window.platform = window.platform = ionic.Platform.platform();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)


    //极光推送  初始初始化
    var  jpushstat  =   window.plugins.jPushPlugin.init();

    //调试模式
    window.plugins.jPushPlugin.setDebugMode(true);



    //极光推送事件处理
    //极光数据处理  兼容ios  安卓平台  剥离数据
    var bestripped  =  function(data){


    var result = {};
      if(device.platform == "Android") {
        result.alert = data.alert;
        data.extras['cn.jpush.android.EXTRA'].img  =  window.qiniuimgHost+data.extras['cn.jpush.android.EXTRA'].img+'?imageView2/2/w/120/h/120';
        result.value = data.extras['cn.jpush.android.EXTRA'];
        result.See  = false;
        result.title = result.value.title;
      }else{
        var iosVlue  ={};
        angular.forEach(data,function(value,key){
          if(key  !=='aps' || key  !=='_j_msgid'){
            iosVlue[key] = value;
          }
        })
        iosVlue.img  = window.qiniuimgHost+iosVlue.img+'?imageView2/2/w/120/h/120';
        result.See  = false;
        result.title   =  iosVlue.title;
        result.alert = data.aps.alert;
        result.value = iosVlue;
      }
      return  result;
      };
      window.hannotilistnow  = function(e) {
      var alertContent  =  bestripped(e);



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
          //  case  '3':
          //   if(!nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice){
          //     nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice  = [];
          //   }
          //         nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice.unshift(alertContent)
          // break;
           default:
           return false;
        }

      if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics){
          if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics.length > 30){
        nownotilist.userlist[storage.getObject('UserInfo').user_id].Tradelogistics.length  = 30
        }
      }

      if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice){
        if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice.length){
          nownotilist.userlist[storage.getObject('UserInfo').user_id].Companynotice.length = 30
        }
      }

      // if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage){
      //   if(nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage.length){
      //     nownotilist.userlist[storage.getObject('UserInfo').user_id].Systemmessage.length = 30
      //   }
      // }

        if(window.platform  == 'ios'){
                        var nule  = storage.getObject('badge');
                        if(!nule.number){
                            nule.number  = 0;
                        }
                        var sss  = ++nule.number;
                         window.plugins.jPushPlugin.setApplicationIconBadgeNumber(sss);

                         storage.setObject('badge',nule);
        }
      storage.setObject('Notice',nownotilist);
      $timeout(function () {
          $rootScope.newnotice  = new  Date()+Math.random()*1000;
        });

      }







      //点击通知的处理 click  jpush  event  Handle
      window.document.addEventListener("jpush.openNotification", function(e){

      //推送的附带对象 数据 直接访问
      //console.log(alertContent,'收到的数据');
      $state.go('r.tab.Notice');
      $timeout(function () {
        $ionicHistory.clearHistory();
      },20)
      }, true);

      document.addEventListener("jpush.receiveNotification", function(e){
          window.hannotilistnow(e);
      }, false);
      if(window.platform  == 'ios'){
        document.addEventListener("jpush.backgoundNotification", function (e) {
          window.hannotilistnow(e)
        }, false);
      }
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

    return  false;
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
    Storemanagement:{
        login:true,
        admin:true,
        company:true,
        auth:true,
        Integritygold:true
    }
  }

  window.Permission  =  function (a,b,c) {
  

    if(a  ==  'r.SeeshopPint') {
      return  true;
    }

    if(a =='r.Storemanagement'){
      return   handeposins(a,PermissionConfig.Storemanagement)
    }
    
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




/**
 * Created by Administrator on 2016/8/25.
 */
Ctr.controller('ClassAdviceCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){
  $scope.shop={}
  $scope.shop.id  = $stateParams.id;


  Tools.getData({
    "interface_number": "020206",
    "post_content": {
      "shop_id":$scope.shop.id,
    }
  },function (r) {
    if(r){
        $scope.item= r.resp_data

    }

  })

  


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


      r.resp_data.data.img_url  =  window.qiniuimgHost+r.resp_data.data.img_url+'?imageView2/2/w/200/h/200';
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

  $scope.$on('$ionicView.beforeEnter',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    
        if(fromStateServ.getState('r.ClassifDetails')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.ClassifDetails').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.ClassifDetails';
                window.androdzerofun_clback  = function(){};    

            }


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
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('classContentCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop,$stateParams) {

  $scope.bascId = $stateParams.id;
 $scope.title = $stateParams.Name;
  $scope.dataList = true;
  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法


  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {

    if (fromStateServ.getState('r.classContent')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.classContent').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.classContent';
      window.androdzerofun_clback = function () {
      };


    }
  });




  function  inlit   (){


    if($scope.guankao){ return false; }
    $scope.goodsdetail  = function(r){
     $state.go('r.Productdetails',{id:r.goods_basic_id});
    }
    $scope.guankao = true

    $scope.scorllheader  =  {};
    var  gescoheight   =   function () {
      /*
      if(window.platform  == 'ios'){
        debugger
        $scope.scorllheader  =  {
          height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight+6-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
        }
      }else{
        debugger
        $scope.scorllheader  =  {//26
          height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight-0-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
        }
      }*/
      if(window.platform  == 'ios'){
        $scope.scorllheader  = {
          height:window.innerHeight-(64+29)+'px'
        }
      }else{
        $scope.scorllheader  = {
          height:window.innerHeight-(44+50)+'px'
        }
      }


    }
    gescoheight();
    $timeout(function() {
      gescoheight();
    },500)

    $scope.swatch   =  function(ff){

      if(!ff.select){
        angular.forEach($scope.claslist,function(zf){
          zf.select   = false;
        })
        ff.select  = true;
        $ionicScrollDelegate.$getByHandle('small').scrollTop(true);
        $timeout(function(){
          $scope.customcucdownlisloadMore(true)
        },200)
      }
    }
    Tools.getData({
      "interface_number": "020101",
      "post_content": {
        "sys_cate_id":$scope.bascId
      },

    },function (r) {

      if(r){

        if( r.resp_data==""){


        }else{
        angular.forEach(r.resp_data,function(ss) {
          ss.select  = false;
        });
        $scope.claslist  = r.resp_data;
        $scope.claslist[1].select  =  true;
        $scope.loadermoer  = true;

      }
      }
    })

    $scope.goodlist  = [];
    $scope.loadermoer  = false;
    $scope.pagenumber  = 1;
    $scope.customcucdownlisloadMore = function (ss) {

      if(ss){
        $scope.pagenumber  = 1;
      }
      var   parmsss  = undefined;
      angular.forEach($scope.claslist,function (sss) {
        if(sss.select){
          parmsss  =  sss.cate_id;
        }
      })
      if(!parmsss){
        return  false;
      }
      var pang  = $scope.pagenumber;
      Tools.getData({
        "interface_number": "020104",
        "post_content": {
          "cateId": parmsss,
          page_num:pang
        }
      },function (r) {

        $timeout(function(){
          $ionicScrollDelegate.$getByHandle('small').resize();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },200)
        if(r){
          if(r.resp_data.nextPage  ==  0 ){
            $scope.loadermoer  = false;
            $scope.pagenumber  = 1;
          }else  {
            $scope.loadermoer  = true;
            $scope.pagenumber  = r.resp_data.nextPage;
          }
          if(ss){
            $scope.goodlist = [];
            angular.forEach(r.resp_data.data,function(ff){
              ff.img_url   = window.qiniuimgHost+ff.img_url+'?imageView2/2/w/300/h/300';
              $scope.goodlist.push(ff);
            })
          }else{
            angular.forEach(r.resp_data.data,function(ff){
              ff.img_url   = window.qiniuimgHost+ff.img_url+'?imageView2/2/w/300/h/300';
              $scope.goodlist.push(ff);
            })
          }
        }
      })
    }





  }



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

  
    inlit();





  });




}]);


/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal,$ionicBackdrop) {





  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.confirmOrder')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.confirmOrder').title;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.confirmOrder';
                window.androdzerofun_clback  = function(){};              
            }

  })





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
          c.shop_img =  window.qiniuimgHost+c.shop_img+'?imageView2/2/w/200/h/200';
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



        r.resp_data.data.img_url  =  window.qiniuimgHost+r.resp_data.data.img_url+'?imageView2/2/w/200/h/200';
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
 * Created by Administrator on 2016/8/17.
 */
/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {

  function  inlit   (){
    if($scope.guankao){ return false; }
    Tools.getData({
      "interface_number": "050401",
      "post_content": {
        "type": "2",
      }
    },function(r){
      if(r){
        angular.forEach(r.resp_data,function(fff){
          fff.qiniu_key  =  window.qiniuimgHost+fff.qiniu_key+'?imageView2/2/w/828/h/362';
        })
        $scope.guankao   =   r.resp_data;
      }
    })
    $scope.gogunal  =  function(item){
      if(item.request_type  == '1'){
        fromStateServ.stateChange('r.homeNewsContent',{postID:item.request_id});
      }else  if(item.request_type  == '2'){
        fromStateServ.stateChange('r.Shophome',{id:item.request_id});
      }else  if(item.request_type  == '3'){
        fromStateServ.stateChange('r.Productdetails',{id:item.request_id});
      }else  if(item.request_type  == '4'){

        fromStateServ.stateChange('r.stretchOne',{id:item.request_id});
      }else{
        native.task('活动暂未开始');
      }
    }

  }



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    if ($ionicHistory.backView()) {

      window.androdzerofun  = function(parm1,parm2){
        window.extapp()
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }


    inlit();
  });

//alert();

$scope.newclass = function (value,name) {

  fromStateServ.stateChange('r.classContent',{id:value,Name:name});
}







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

            window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.goodsclasslist';
                window.androdzerofun_clback  = function(){};






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
inlit();

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

          $timeout(function(){
            $ionicScrollDelegate.$getByHandle('list').resize();
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },200)

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
                  c.img_url   =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200',
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
    goodsState.total_in_price  = r.total_in_price;
    goodsState.total_in_number  = r.total_in_number;

        if(window.lockingJump) return  false;
        window.lockingJump  =  true;

        $ionicNativeTransitions.stateGo('r.goodsEdit',{state:'edit',id:r.goods_basic_id}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: 20, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1

              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });

            $timeout(function(){
              window.lockingJump  =  false;
            },1100)


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
                    r.total_in_price  = goodsState.total_in_price;
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
                native.task('保存成功');
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

          $timeout(function(){
            $ionicScrollDelegate.$getByHandle('list').resize();
              $scope.$broadcast('scroll.refreshComplete');
              $scope.$broadcast('scroll.infiniteScrollComplete');
          },200)



            if(r){

                  if(r.resp_data.nextPage  == 0 ){
                  $scope.downlistloadmor  = false;
                  $scope.page_number  =1;
                  }else{
                    $scope.downlistloadmor  = true;
                    $scope.page_number  =r.resp_data.nextPage;
                  }
                   angular.forEach(r.resp_data.data,function(c){
                       c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';
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

      })
    }

    $scope.Add  = function(){




        if(window.lockingJump) return  false;
        window.lockingJump  =  true;

        $ionicNativeTransitions.stateGo('r.goodsEdit',{}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: 20, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1

              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });

            $timeout(function(){
              window.lockingJump  =  false;
            },1100)



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

Ctr.controller('ConfirmorderZfctr',['$scope','buyConfirmorde','Tools','$timeout','$state','comforderlistadder','native','fromStateServ','$ionicScrollDelegate','comfrombackresitl','storage',function ($scope,buyConfirmorde,Tools,$timeout,$state,comforderlistadder,native,fromStateServ,$ionicScrollDelegate,comfrombackresitl,storage){




$scope.showgoodmappintthi  = function (params) {

    comfrombackresitl.ref  =true;
    $state.go('r.selfShop',{goodsId:'',company_id:params.goods_info[0].company_id});
}


$scope.seltwuiluthi  = function (it) {
        angular.forEach($scope.wuliuseleclist,function (ss) {
                ss.select   = false;
        })

        it.select  =  true;

        angular.forEach($scope.ctrnowobj.goods_info,function (ss) {
                if(it.value){
                    ss.express_fee_back  =  ss.express_fee;
                    ss.express_fee  ='0.00';
                    $scope.info.total_pricy   =   parseFloat($scope.info.total_pricy)- parseFloat(ss.express_fee_back) ;
                    $scope.info.total_pricy  =  $scope.info.total_pricy.toFixed(2);

                }else{
                    if(ss.express_fee_back){

                        ss.express_fee    =  parseFloat(ss.express_fee_back);
                        ss.express_fee =  ss.express_fee.toFixed(2);
                        $scope.info.total_pricy   =   parseFloat($scope.info.total_pricy)+ parseFloat(ss.express_fee_back);
                        $scope.info.total_pricy  =  $scope.info.total_pricy.toFixed(2);
                    }
                }
        })

        if(it.value){
            $scope.ctrnowobj.showcatmapint   = true;
        }else{
            $scope.ctrnowobj.showcatmapint   = false;
        }
        $ionicScrollDelegate.resize();
        $scope.closetallcationvalue();

}

$scope.selecthiswuliufun  =   function(r){

        if(r.buyer_take){

            if(r.showcatmapint){}
            $scope.wuliuseleclist  = [
                        {
                            name:'快递物流',
                            value:0,
                            select:r.showcatmapint?false:true
                        },
                        {
                            name:'门店自提',
                            value:1,
                            select:r.showcatmapint?true:false
                        }
                    ];



            $scope.ctrnowobj  = r;

            $scope.addjoinshopcart(true);

        }else{
            native.task('部分商品支持在快递物流,不可选择其他配送方式');
        }

};

$scope.comorder  =function () {

    if(!$scope.info.address.addr_id){
        native.task('请选择收货地址');
        return  false;
    }
        if(parseFloat(storage.getObject('UserInfo').integral) <  parseFloat($scope.info.total_pricy)  ){

                    //积分不足
                    native.task('积分不足');
                    native.confirm('积分不足,当前积分:￥'+storage.getObject('UserInfo').integral,'提示',['充值','取消'],function(c){
                            if(c  == 1){ 
                                comfrombackresitl.ref  = true;
                                $state.go('r.Inputamount',{type:2})
                    }})
                return  false;
        }
     


    var  carids  = '';

    angular.forEach($scope.info.goods,function (sff) {
        angular.forEach(sff.goods_info,function (aaa) {
           carids+= aaa.cart_id+',';
        })
    })

     carids  =    carids.substring(carids.lastIndexOf(','),'')
     var shopin  ={};
     var  takeBy   = {};
     angular.forEach($scope.info.goods,function(aaa){
            var inde  =  parseInt(aaa.shop_id);
            shopin[inde]  = aaa.make?aaa.make:'';
            takeBy[inde]   = aaa.showcatmapint?'1':'0'

     })

    Tools.showlogin();
    Tools.getData({
         "interface_number": "020607",
         "post_content": {
            "addr_id": $scope.info.address.addr_id,
            "remark": shopin,
            "cartIds":carids,
            takeBySelf:takeBy
        }
    },function (r) {
        if(r){


            $state.go('r.HomPurchase',{data:1});
            native.task('确认订单成功');

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

  $scope.addjoinshopcart  = function (r) {

                if(r){

                    $timeout(function () {
                                      $scope.selectstat  = true;
                                      $scope.setallcationstate = true;
                    },200)
                    return false;
                }

            Tools.showlogin();
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

                        $timeout(function () {
                                $scope.selectstat  = false;
                                $scope.setallcationstate = true;
                        },200)

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


       if(comfrombackresitl.ref){

           comfrombackresitl.ref  = false;
           return  false;
       }
       $ionicScrollDelegate.scrollTop();
            if(comforderlistadder.no){
                comforderlistadder.no  = false
                return false;
            }

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
                                    //$scope.info.goods  =  $scope.info.goodsInfo;


                                    angular.forEach($scope.info.goods,function(ssz){
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/2/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/2/w/200/h/200';
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
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/2/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/2/w/200/h/200';
                                          })
                                    })

                                    $scope.addjoinshopcart();
                                }
                    })
                }
   }

$scope.$on('$ionicView.beforeEnter',function(){

            $scope.showpanl = true;
            if(fromStateServ.getState('r.ConfirmorderZf')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.ConfirmorderZf').title;


                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.ConfirmorderZf';
                window.androdzerofun_clback  = function(){};
                


            }else{
                $scope.showtitle  = false;
            }
            inlit();
})


$scope.$on('$ionicView.beforeLeave',function(){

           $timeout(function(){
            $scope.showpanl = false;
           },300)
         })



}])

Ctr.controller('ProductdetailsCtr',['$scope','$stateParams','fromStateServ','$ionicHistory','Tools','$ionicModal','$timeout','native','buyConfirmorde','$state','$rootScope','$ionicNativeTransitions','storage','shopcartbactitle',function($scope,$stateParams,fromStateServ,$ionicHistory,Tools,$ionicModal,$timeout,native,buyConfirmorde,$state,$rootScope,$ionicNativeTransitions,storage,shopcartbactitle){


  $scope.gouwuche  = function (){

    if(storage.getObject('UserInfo').user_id){

                  shopcartbactitle.state   =  true;
                 $ionicNativeTransitions.stateGo('r.tab.Shopping_Cart',{}, {
                    "type": "slide",
                    "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
                    "duration": 400,  // in milliseconds (ms), default 400
                  });
      }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $state.go('r.login');

          }
        });


      }







  }


  $scope.toback  = function () {
            $rootScope.$ionicGoBack();
  }



  $scope.goshop  = function () {
    $state.go('r.Shophome',{id:$scope.goods.shopInfo.shop_id,ref:'yes',inside:'yes'})
  }

  $scope.zixun= function () {
    $state.go('r.classAdvice',{id:$scope.goods.shopInfo.shop_id})
  }

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

                  console.log($scope.selectsku,'沙龙的拉升的萨克的萨克拉的卡拉上课了')

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


                  $scope.closetallcationvalue();
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
      if($scope.selectsku.number  <= 0){
        $scope.selectsku.number  =1;
      }

    }



    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      var  c   =   document.querySelector('#goodslia');
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
        //是所有属性只有一个

        if(Object.keys($scope.goods.basicData).length  == 1){

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
          if($scope.showskudata.length   ==  activelistxx.length){

                  $scope.goodskuimte_attrbutsmsg = {};
                 angular.forEach($scope.goods.basicData,function(key){

                  $scope.showstockprice = true;

                  $scope.goodskuimte_attrbutsmsg.skuname = key.name;

                  $scope.goodskuimte_attrbutsmsg.local_sku_id =key.local_sku_id;
                  $scope.goodskumsg.stock_num  = key.stockNum;




                  $scope.selectsku.skuid =   key.local_sku_id;
                  $scope.selectsku.price =   key.activity_price;

                  $scope.goodskuimte_attrbutsmsg.price =  key.activity_price;
                  $scope.goodskumsg.price   =   key.activity_price;


                 });








          }







          return  false;
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

              ///ishasactive   = false;

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
                  Tools.rmArrin(back,0);
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

                        $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
                        $scope.selectsku.price =   key.baseinfo.activity_price;
                        //零售价
                        $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.activity_price;
                        $scope.goodskumsg.price   =   key.baseinfo.activity_price



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




    if(storage.getObject('UserInfo').user_id){
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){
          $state.go('r.login');

        }
      });

      return false;
    }





    if(Object.keys($scope.goods.basicData).length  == 1){
                      Tools.showlogin();
                      var  skuid =  undefined;
                      angular.forEach($scope.goods.basicData,function(xxx){
                          skuid  = xxx.local_sku_id;
                      })
                      Tools.getData({
                        "interface_number": "020401",
                          "post_content": {
                              "shop_id": $scope.goods.shopInfo.shop_id,
                              "sku_id": skuid,
                              "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                              "number":1
                          }
                      },function (r){
                          if(r){
                              native.task('加入购物成功');
                          }
                      })
            return false;
            }


            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  false;
  }

  $scope.lijibuy  = function () {

              if(storage.getObject('UserInfo').user_id){
              }else{
                native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
                  if(c  == 1){
                    $state.go('r.login');

                  }
                });

                return false;
              }
              $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  true;
  }
    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }



$scope.$on('$ionicView.beforeLeave',function(){
           $timeout(function(){
            $scope.showpanl = false;
           },300)
         })

  $scope.$on('$ionicView.beforeEnter',function(event, data){
            $scope.showpanl = true;

            if(fromStateServ.getState('r.Productdetails')   &&  !$stateParams.inside ){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Productdetails').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Productdetails';
                window.androdzerofun_clback  = function(){};


            }else{
                $scope.showtitle  = false;
            }
            if(!$scope.parenttitle){
                    $scope.parenttitle  = '返回';
            }
            inlit();
    });
    function  inlit  (){

      if($scope.goods){
        return false;
      }


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
                  r.resp_data.goodsInfo.img[0]  =    window.qiniuimgHost+r.resp_data.goodsInfo.img_url+'?imageMogr2/thumbnail/'+width+'x/gravity/Center/crop/'+width+'x'+width;

              }else{

                  angular.forEach(r.resp_data.goodsInfo.img,function (fff,index) {
                        var   width  =  window.innerWidth*2;
                  r.resp_data.goodsInfo.img[index]     =  window.qiniuimgHost+fff+'?imageMogr2/thumbnail/'+width+'x/gravity/Center/crop/'+width+'x'+width;
                    });
              }

              r.resp_data.goodsInfo.img_url =  window.qiniuimgHost+ r.resp_data.goodsInfo.img_url + '?imageView2/2/w/150/h/150';



              $scope.goods  = r.resp_data;


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
                  groupitme.baseinfo.activity_price  = keyxx.activity_price;
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



            $timeout(function(){

                if($scope.showtitle){
                      $scope.backtoprevView('r.Productdetails');
                  }else{
                    $ionicHistory.goBack();
                  }


            },420)





          }
      });


    }




}])

/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal','$rootScope','goodsState','$ionicScrollDelegate','$ionicActionSheet','storage',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal,$rootScope,goodsState,$ionicScrollDelegate,$ionicActionSheet,storage){

if(window.$cordovaGeolocation){

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
      //error
    });


}








 if(window.platform   == 'ios'){
   $scope.plfisios  = true;
 }else{
   $scope.plfisios  = false;
 }


$scope.selectthi  = function(tar){
    tar.select   = !tar.select;
}

$scope.chekselectpintlist = function(){
    $scope.shouldShowDelete  =  !$scope.shouldShowDelete;
}
$scope.chekselectpintlistdel = function(){
    $scope.shouldShowReorder  =  !$scope.shouldShowReorder;
}


    $scope.Sincesome =  [];

    $scope.opensincesetiing  = function(){
      if($scope.goods.Since){
          $scope.Since.show();

          $timeout(function(){


                   if($scope.Sincesome.length  == 0){
            Tools.showlogin();
            Tools.getData({
              "interface_number": "020801",
              "post_content": {
                  "goods_id":$scope.goods.edit?$scope.goods.id:'',
              }
            },function(r){
                if(r){

                  $scope.Sincesome  = r.resp_data;

                }
            })
          }
          },420)
      }
    }

    $scope.savePintthi =  function (){
        if(!$scope.mapTagging.title){
          $scope.setmendianmsg();
          native.task('请填写自提点名称');
        }else  if($scope.mapTagging.position  == '获取中....'){
            native.task('请点击地图,选择自提点位置');
        }else{
          Tools.showlogin();
          Tools.getData({
              "interface_number": "020802",
              "post_content": {
                "goods_id":$scope.goods.edit?$scope.goods.id:'',
                "take_id": $scope.mapTagging.take_id?$scope.mapTagging.take_id:'',
                "name": $scope.mapTagging.title,
                "address": $scope.mapTagging.position,
                "gps_lat": $scope.mapTagging.lat+'',
                "gps_long": $scope.mapTagging.long+'',
                "take_time": $scope.mapTagging.business?$scope.mapTagging.business:'',
                "link": $scope.mapTagging.tel?$scope.mapTagging.tel:''
              }
          },function(r){
            if(r){

                $scope.Sincesome.unshift({
                   "select": false,
                   "link": $scope.mapTagging.tel?$scope.mapTagging.tel:'',
                   "name":$scope.mapTagging.title,
                   "long": $scope.mapTagging.long,
                   "lat": $scope.mapTagging.lat,
                   "take_id": $scope.mapTagging.take_id?$scope.mapTagging.take_id:'',
                   "address":$scope.mapTagging.position
                });


                $scope.closetallcationvalue();
                $timeout(function(){
                      $scope.map.hide();
                },400)



            }
          })
        }
        //console.log($scope.mapTagging);
    }

  $scope.comfpintbasemsg  = function (){

      //$scope.closetallcationvalue();
      $scope.savePintthi();
      
      if(marker){
          infoWindow.setContent(setcontext());
          openinfo();
      }
    }

   $scope.stopporp  = function(e){e.stopPropagation();}

    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      var  c   =   document.querySelector('#setmapid');
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







function  creatpint   (e){


        Tools.getData({},function(r){
        },function(){},'GET','http://api.map.baidu.com/geocoder/v2/?ak=RRcZDvEYvUVZXVXRbipOwytFrXflZlNg&callback=renderReverse&location='+e.point.lat+','+e.point.lng+'&output=json&pois=1',true)

        infoWindow = new BMap.InfoWindow(setcontext(),{
          height:0,
          width:200
        });






          map.clearOverlays(marker);
          var icon = new BMap.Icon('./img/pint.png', new BMap.Size(20, 32), {
              anchor: new BMap.Size(10, 30),
              infoWindowAnchor: new BMap.Size(20,5),
              raiseOnDrag: true
            });



          marker = new BMap.Marker(e.point,{icon:icon});  // 创建标注
          map.addOverlay(marker);               // 将标注添加到地图中
          //marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          //console.log(marker.getShadow());

          openinfo = function(){
            marker.openInfoWindow(infoWindow,e.point);
          }

          marker.enableMassClear(true);



}





  function  setcontext  (){

      return "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>"+$scope.mapTagging.title+"</h5>" +
	      "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 地 址 :  <span style='color:#4a4a4a'>"+$scope.mapTagging.position+"</span>  </p>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 联 系 方 式 : <span style='color:#4a4a4a'>"+$scope.mapTagging.tel+"</span> </p>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 营 业 时 间 : <span style='color:#4a4a4a'>"+$scope.mapTagging.business+"</span> </p>" +
	      "</div>";
  }

    var openinfo  = undefined;
    var marker  = undefined;
    var infoWindow   =  undefined;
    var map  =  undefined;



  $scope.xuanzheopition  = function (tage){






 $scope.map.show();
      $scope.mapTagging   ={};
      $scope.mapTagging.title  = '';
      $scope.mapTagging.tel  = '';
      $scope.mapTagging.business  = '';
      //$scope.mapTagging.position  = '获取中....';
      $scope.mapTagging.position  = undefined;
      $scope.mapTagging.long   =  '';
      $scope.mapTagging.lat   =  '';
      
    $scope.map.show();

    $timeout(function(){

      $scope.setmendianmsg();

    },600)
    return false;

        if(!tage){
                if(marker){
                  map.clearOverlays(marker);
                }

           $timeout(function(){

                $scope.setmendianmsg();
           },700)
        }


      //$scope.mapTagging.take_id


      if(map){

        if(tage){
              creatpint(tage);
        }
      }else{
      $timeout(function(){
      var ss  = storage.getObject('location');


      map = new BMap.Map("container");          // 创建地图实例
      var point = new BMap.Point(ss.long, ss.lat);  // 创建点坐标
      map.centerAndZoom(point, 25);

      window.renderReverse  = function(r){
          $scope.mapTagging.position  = r.result.formatted_address+','+r.result.sematic_description;
          infoWindow.setContent(setcontext());
          openinfo();
      }

      //map.setZoom()
      map.addEventListener("click", function(e){
        $scope.mapTagging.lat  =e.point.lat;
        $scope.mapTagging.long  =e.point.lng ;
        creatpint(e)
      });
      },400)


      }






  }









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


            var defulattext  = '请输入价格';
            if(window.platform  ==  'ios'){
              var defulattext ='';
            }
            var subtext  =  '';
            if(index  == 0){
              subtext   ='请输入市场价';
            }

            if(index  == 1){
              subtext   ='请输入平台价';
            }
            if(index  == 2){
              subtext   ='请输入库存数';
            }


              native.prompt(subtext,'提示',['确认','取消'],defulattext,function(ss){
                if(ss.buttonIndex  ==1){
                  if(ss.input1  !== "请输入价格"){

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
                                 if(Math.abs(ss.input1)  >= 999999){
                                    ss.input1  = 999999;
                                  }
                                key.msg[resulf] = Math.abs(parseInt(ss.input1));


                              });

                  }
                }
              })







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
      $scope.map.remove();
      $scope.Since.remove();

    });

    $ionicModal.fromTemplateUrl('Since.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.Since = modal;
    });

  $ionicModal.fromTemplateUrl('map.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.map = modal;
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
  $scope.goods.post = true;



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

              $timeout(function(){
                $scope.systemparnslec();

              },10)


              if($scope.goods.edit){
                $scope.goods.barcode =   r.resp_data.goodsInfo.barcode;
                $scope.goods.freight_price =   parseFloat(r.resp_data.goodsInfo.express_fee);
                $scope.goods.is_virtual  =     r.resp_data.goodsInfo.is_virtual?true:false;
                $scope.goods.title =     r.resp_data.goodsInfo.goods_title;

                if(r.resp_data.goodsInfo.buyer_take == '1'){
                  $scope.goods.Since  = true;
                }

                $scope.goods.id  = r.resp_data.goodsInfo.goods_basic_id;
                $scope.goods.goodsDesc     =  r.resp_data.goodsInfo.desc;
                $scope.goods.skuinfo  =  r.resp_data.skuInfo;
                angular.forEach(r.resp_data.goodsInfo.arr_img,function (v){
                  var   c = undefined;
                  if(v  == r.resp_data.goodsInfo.img_url){
                    c   = {
                      fengmian:true,
                      img:window.qiniuimgHost+v+'?imageView2/2/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }else{
                    c   = {
                      fengmian:false,
                      img:window.qiniuimgHost+v+'?imageView2/2/w/200/h/200',
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
$scope.$on('$ionicView.beforeEnter',function(){
  inlint();
})





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

          if(c.cate_id  == $scope.goods.systemSelect  && c.children.length !=0){

                //计算那个   默认选中
                $timeout(function(){



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


                })



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

  }

  //$scope.goods.

  //title
  //is_virtual
  //barcode
  //goodsDesc
$scope.bilfthivla = function(r){
     if(Math.abs(r.msg.retail_price)  >= 999999){
        r.msg.retail_price  = 999999;
      }
}
$scope.bilfthivlabr   = function(r){
      r.msg.retail_price   = Math.abs(r.msg.retail_price);
}


$scope.bilfthivlapre = function(r){
     if(Math.abs(r.msg.activity_price)  >= 999999){
        r.msg.activity_price  = 999999;
      }
}
$scope.bilfthivlabrpre   = function(r){
      r.msg.activity_price   = Math.abs(r.msg.activity_price);
}


$scope.bilfthivlanumber = function(r){
     if(Math.abs(r.msg.number)  >= 999999){
        r.msg.number  = 999999;
      }
}

$scope.bilfthivlanumberbr   = function(r){
      r.msg.number   = Math.abs(r.msg.number);
}






$scope.matthisvalu   = function(s){
  s.Market_price = Math.abs(s.Market_price);
}
$scope.matthisvaluplaform   = function(s){
  s.Platform_price = Math.abs(s.Platform_price);
}
$scope.matthisvalstok   = function(s){
  s.Stock_number = Math.abs(s.Stock_number);
}
$scope.matthisvalfrprice   = function(s){
  s.freight_price = Math.abs(s.freight_price);
}








  $scope.$watch('goods.Market_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Market_price  = 999999;
            }
           ///$scope.goods.Market_price  = Math.abs($scope.goods.Market_price)
   });

   $scope.$watch('goods.Platform_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Platform_price  = 999999;
            }
            //$scope.goods.Platform_price  = Math.abs($scope.goods.Platform_price)
    });
    $scope.$watch('goods.Stock_number',function(newValue,oldValue, scope){
             if(Math.abs(newValue)  >= 999999){
               $scope.goods.Stock_number  = 999999;
             }
             //$scope.goods.Stock_number  = Math.abs($scope.goods.Stock_number)
     });

     $scope.$watch('goods.freight_price',function(newValue,oldValue, scope){
              if(Math.abs(newValue)  >= 999999){
                $scope.goods.freight_price  = 999999;
              }
          //$scope.goods.freight_price  = Math.abs($scope.goods.freight_price)
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

      // if(!$scope.goods.Market_price){
      //     native.task('请填写市场价!')
      //     native.hidloading();
      //     return  false;
      //   }
      //   if(!$scope.goods.Platform_price){
      //     native.task('请填写平台价!')
      //     native.hidloading();
      //     return  false;
      //   }
      // if(!Tools.reg.negative($scope.goods.Market_price)){
      //   native.task('请填写正确的市场价!');
      //   return  false;
      // }

      // if(!Tools.reg.negative($scope.goods.Platform_price)){
      //   native.task('请填写正确的平台价!');
      //   return  false;
      // }






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

        var loid  =undefined;
        if($scope.goods.skuinfo.length){
              loid =   $scope.goods.skuinfo[0].local_sku_id;
        }

        sku.push({
          activity_price:Math.abs($scope.goods.Platform_price),
          retail_price:Math.abs($scope.goods.Market_price),
          properties:'',
          quantity:$scope.goods.Stock_number?Math.abs($scope.goods.Stock_number):'0',
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
          activity_price:Math.abs(fff.msg.activity_price),
          retail_price:Math.abs(fff.msg.retail_price),
          properties:skuid,
          quantity:fff.msg.number?Math.abs(fff.msg.number):'0',
          local_sku_id:fff.msg.local_sku_id?fff.msg.local_sku_id:''

        })
      })

      if(!bitian){
        native.task('请填写完整价格信息!');
        native.hidloading();
        return false;
      }
    }

    var  takelist =  [];
    angular.forEach($scope.Sincesome,function(ss){
      if(ss.select){
          takelist.push(ss.take_id);
      }
    })

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
          buyer_take:$scope.goods.Since?'1':'0',
          take_ids:takelist
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
            goodsState.img_url  = window.qiniuimgHost+r.resp_data.img_url+'?imageView2/2/w/200/h/200';
            goodsState.total_in_price  = r.resp_data.total_in_price;
            goodsState.total_in_number   = r.resp_data.total_in_number;
            //console.log(goodsState)

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
Ctr.controller('listofgoodsCtr',['$scope','fromStateServ','$timeout','$state','$ionicModal','native','Tools','$ionicScrollDelegate','goodsState','$ionicPopup','$ionicNativeTransitions',function($scope,fromStateServ,$timeout,$state,$ionicModal,native,Tools,$ionicScrollDelegate,goodsState,$ionicPopup,$ionicNativeTransitions){



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
                      $ionicScrollDelegate.$getByHandle('list').resize();
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
    goodsState.total_in_price  = r.total_in_price;
    goodsState.total_in_number  = r.total_in_number ;


    
        if(window.lockingJump) return  false;
        window.lockingJump  =  true;
             $timeout(function(){
              window.lockingJump  =  false;
            },400)

        $ionicNativeTransitions.stateGo('r.goodsEdit',{state:'edit',id:r.goods_basic_id}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -500, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });

       


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
                      r.total_in_price  = parseFloat(goodsState.total_in_price).toFixed(2);
                      r.total_in_number  = goodsState.total_in_number;

                  }
            })
      }

      if(goodsState.Refresh){
          goodsState.Refresh   =false;
        
          return  false;
      };

    $scope.datalist  = [];
    $scope.page_number  = 1;
    $ionicScrollDelegate.scrollTop();
    $scope.downlistloadmor  = true;
    $scope.loginboj = {};
    $scope.ing  = false;


    $scope.parenttitle     =   fromStateServ.getState('r.listofgoods').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.listofgoods';
                window.androdzerofun_clback  = function(){};






    $timeout(function(){

    },500)


  };



      //$ionicScrollDelegate.$getByHandle('list').scrollTop();
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

          $timeout(function(){
            $ionicScrollDelegate.$getByHandle('list').resize();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },200)

          if(r){
               if($scope.liststate){
                $scope.salestotin.up   =  r.resp_data.totalCount
                }else{
                $scope.salestotin.down   =  r.resp_data.totalCount
                }
                if(r.resp_data.nextPage  == 0 ){
                $scope.downlistloadmor  = false;
                $scope.page_number  =1;
                }else{
                  $scope.downlistloadmor  = true;
                  $scope.page_number  =r.resp_data.nextPage;
                }
                 angular.forEach(r.resp_data.data,function(c){
                     c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';
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


    })
  }

  $scope.Add  = function(){


        if(window.lockingJump) return  false;
        window.lockingJump  =  true;

               $timeout(function(){
              window.lockingJump  =  false;
            },400)

        $ionicNativeTransitions.stateGo('r.goodsEdit',{}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -500, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1

              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });




  };

  $scope.backtoprevView  =     function (r){
     window.androdzerofun_clback =  function (){
       $scope.page_number  = 1;
       $scope.datalist  = [];
     }

    fromStateServ.backView(r,window.androdzerofun_clback);

  }






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
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('CompaniesCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,fromStateServ){



  $scope.newsList =[]
  $scope.expression=true


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020001",
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
          c.shop.img_shop  =  window.qiniuimgHost+c.shop.img_shop+'?imageView2/2/w/200/h/200/q/100';

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

  $scope.goshopin =  function (tart) {
    $state.go('r.Shophome',{id:tart.shop.shop_id});
  }
  //最新动态详情'',




  

  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.Companies')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.Companies').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.Companies';
      window.androdzerofun_clback = function () {
      };


    }
  });

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
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('chariCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop','selectArr',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop,selectArr) {



  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];

var a = selectArr.selectarrs;

  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020201",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",

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
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';

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


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(44)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(24)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

//广告位接口
  Tools.getData({
    "interface_number": "050401",
    "post_content": {
      "token":"",
      "token_phone": "",
      "type": "1"
    }

  },function(r){



    if(r.msg== "success"){
      angular.forEach(r.resp_data,function(c){
        c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/2/w/828/h/362';
      })
      $scope.guankao   =   r.resp_data;

    }else{

      return false

    }


  });

  $scope.gogunal  =  function(item){
    if(item.request_type  == '1'){
      $state.go('r.homeNewsContent',{postID:item.request_id});
    }else  if(item.request_type  == '2'){
      $state.go('r.Shophome',{id:item.request_id});
    }else  if(item.request_type  == '3'){
      $state.go('r.Productdetails',{id:item.request_id});
    }else{
      native.task('活动暂未开始');
    }
  }


  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.HomeCharitable')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.HomeCharitable').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.HomeCharitable';
      window.androdzerofun_clback = function () {
      };


    }
  });


  $scope.goodsdetail  = function(r){

    $state.go('r.Productdetails',{id:r.goods_basic_id})
   // fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }

}]);

/**
 * Created by Administrator on 2016/8/2.
 */
/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('deliveryCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicModal','$stateParams','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicModal,$stateParams,$ionicHistory){

  $scope.id = $stateParams.odId
  $scope.number = $stateParams.Num
  $scope.goods = []
  $scope.SalesList=[]
  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
      $scope.goods.barcode   =  r.text;
      $scope.$apply();
    });
  }


  $scope.deliveryList = function () {

    Tools.getData({
      "interface_number": "020704",
      "post_content": {
        "token":"",
        "token_phone": "",

      }

    },function(r){


      if(r.msg== "success"){

        $scope.SalesList  = r.resp_data;

      }else{

        return false

      }


    });


    $scope.modal.show();



  }


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

/*  $scope.clientSideList = [
    { text: "Backbone", value: "bb" },
    { text: "Angular", value: "ng" },
    { text: "Ember", value: "em" },
    { text: "Knockout", value: "ko" }
  ];*/


  $scope.data = [];

  $scope.data.clientSide




  $scope.deliveryNew=function () {

    if(!$scope.data.clientSide){
      native.task('请选择物流!')
      return  false;
    }
    if(!$scope.goods.barcode){
      native.task('请填写单号!')
      return  false;
    }
    /*call ($scope.goods.barcode );*/

    Tools.getData({
      "interface_number": "020706",
      "post_content": {
        "token":"",
        "token_phone": "",
        "orderId":$scope.id,
        "logistCompanyId": $scope.data.clientSide.logistics_company_id,
        "logistCompanyName": $scope.data.clientSide.logistics_company_name,
        "mailNo": $scope.goods.barcode

      }

    },function(r){



      if(r.msg== "success"){

        $ionicHistory.goBack(-1);

      }else{

        return false

      }


    });

  }




}]);

/**
 * Created by Administrator on 2016/8/5.
 */
/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('flowCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize){







}]);


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory','selectArr','selectaouthfunl','seeshopPint','$http','share',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory,selectArr,selectaouthfunl,seeshopPint,$http,share) {


window.share  = share;
$scope.paly  = function () {
  share.weichat()
  // Tools.pay.alipaly({
  //   type:1,
  //   buyer_id:1222,
  //   money:1.00
  // },function(r){
  //   console.log(r)
  // },function(r){
  //   console.log(r)
  // });
}





$scope.paly =  function(){

}

$scope.catshowtakepint  = function () {
  seeshopPint.datalist  = [
    {
      name:'我是自提点',
      lat:28.188874,
      lng:112.991093,
      link:13517437502,
      business:'早上7点到晚上12点1111',
      opsition:'xxx小学校，距离xxx多少米'
    },
     {
      name:'我是自提点',
      lat:28.188464,
      lng:112.991093,
      link:13517437502,
      business:'早上7点到晚上12点',
      opsition:'xxx小学校，距离xxx多少米'
    }
  ];

fromStateServ.stateChange('r.SeeshopPint',{name:'测试的店铺'});


}

  //打开一个浏览器
  $scope.openinboower  =function () {
  }

  $scope.aouthc =  function () {
    $scope.goModular('r.selectAuth');
  }
  //慈善

  $scope.charitable =  function () {

   // native.task('该活动暂未开放，敬请期待');
   // return false;
   // $scope.goModular('r.HomeCharitable');


    if(storage.getObject('UserInfo').user_id){
      $scope.goModular('r.stretchOne');
    }else{
      native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
        if(c  == 1){
          $scope.goModular('r.login');
        }
      });
    }

  }

  //体验

  $scope.tastetable =  function () {

    $scope.goModular('r.HomTaste');
  }

//查看物流
$scope.showlogistics  =  function () {
      //160719000024
      //160715000053
    $scope.goModular('r.Logistics',{id:'160719000024'});
}

  $scope.goshopin =  function (tart) {
      $scope.goModular('r.Shophome',{id:tart.shop.shop_id});
  }
  //广告位
  Tools.getData({
        "interface_number": "050401",
        "post_content": {
        "type": "0",
        }
    },function(r){
      if(r){
            angular.forEach(r.resp_data,function(fff){
                fff.qiniu_key  =  window.qiniuimgHost+fff.qiniu_key+'?imageView2/2/w/828/h/362';
            })
            $scope.guankao   =   r.resp_data;
      }
    })

    $scope.gogunal  =  function(item){

       if(item.request_type  == '1'){
          fromStateServ.stateChange('r.homeNewsContent',{postID:item.request_id});
       }else  if(item.request_type  == '2'){
         fromStateServ.stateChange('r.Shophome',{id:item.request_id});
       }else  if(item.request_type  == '3'){

          fromStateServ.stateChange('r.Productdetails',{id:item.request_id});
       }else  if(item.request_type  == '4'){

         fromStateServ.stateChange('r.stretchOne',{id:item.request_id});
       }
       else{
         native.task('活动暂未开始');
       }
    }





  // $scope.judge =selectArr.selectarrs;
  // $scope.select = ModuleArr


  $scope.jindian  =  function () {

        native.Barcode(function (rr) {


          if(!rr.cancelled){

                if(rr.text){



                    if(rr.text.length  == 12){

                      Tools.showlogin();
                      Tools.getData({
                          "interface_number": "020605",
                          "post_content": {
                          "orderId": rr.text,
                          "r_token": "sanReceive",
                          "receive":1
                          }
                      },function (r) {
                        if(r){
                          native.task('自提订单验证成功',4000);
                        }
                      })
                    }else if( rr.text.length  == 10 ){



                      Tools.showlogin();
                      Tools.getData({
                       "interface_number": "020708",
                        "client_type": "ios",
                        "post_content": {
                          key:rr.text
                        }
                      },function (r) {
                        if(r){
                        native.confirm(r.resp_data.real_name+'正在向你支付:￥'+r.resp_data.payMoney,'提示',['收款','取消'],function(c){
                        if(c  == 1){    
                            Tools.showlogin();
                            Tools.getData({
                            "interface_number": "020709",
                              "post_content": {
                                ensureCharge:'1',
                                key:rr.text
                              }
                            },function (ff) {
                              if(ff){

                                  native.task('收款成功');
                              }

                            })


                          }
                      });



                        }
                      })


                    }
                    else{
                        $scope.goModular('r.Shophome',{id:rr.text});
                    }




                }
          }


        })
  };

  $scope.xiaoshouorder = function (r) {

      fromStateServ.stateChange('r.HomSales');

  }
  $scope.searchBody=function () {
    fromStateServ.stateChange('r.HomeSearch');
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


  $scope.shomsge  =function (value) {




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
      newsList();

       window.androdzerofun  =  function(r,b){
         window.extapp()
       }
       window.androdzerofun_parms  ='ffffff';
       window.androdzerofun_clback  = 'xxxx';
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




  function newsList() {
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


    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){

      if(r){

        angular.forEach(r.resp_data.data,function(c){
          c.shop.img_shop  =  window.qiniuimgHost+c.shop.img_shop+'?imageView2/2/w/200/h/200/q/100';

        });
        $scope.company = (r.resp_data.data)

      }
    });
  }





  //最新动态
  $scope.Newnews = function (r) {


    fromStateServ.stateChange(r);
  };

  $scope.flow=function () {
    $state.go('r.flow')
  }


  //诚信企业
  $scope.moreCompany = function (r) {

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
          c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/2/w/200/h/200/q/100';

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

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.homeNews')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.homeNews').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.homeNews';
      window.androdzerofun_clback = function () {
      };


    }
  });

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
Ctr.controller('newsContentCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','fromStateServ','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,fromStateServ,$ionicHistory){

 $scope.Postid = $stateParams.postID;


  $scope.$on('$ionicView.beforeEnter',function(event, data){


    if(fromStateServ.getState('r.homeNewsContent')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.homeNewsContent').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });

 function  init() {

   Tools.getData({
     "interface_number": "020004",
     "post_content": {
       "token":"",
       "token_phone": "",
       "articleId": $scope.Postid
     }

   },function(r){


     if(r.msg== "success"){

       r.resp_data.qiniu_key  =  window.qiniuimgHost+r.resp_data.qiniu_key +'?imageView2/2/w/400/q/100';
       $scope.newsList = r.resp_data

       $scope.myHtml=r.resp_data.content




     }else{
       $timeout(function(){

         if($scope.showtitle){
           $scope.backtoprevView('r.homeNewsContent');
         }else{
           $ionicHistory.goBack();
         }


       },420)

     }


   });




 }









}]);


/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('ordersbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout,$ionicHistory) {



  $scope.ID = $stateParams.basicID;
  $scope.seordeData = $stateParams.seorde;

  $scope.$on('$ionicView.beforeEnter',function(event, data){


    if(fromStateServ.getState('r.Homordersbody')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.Homordersbody').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });

function init() {

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
      $scope.shopname = $scope.shopbody.order.data[0].shop_name
      $scope.id = $scope.shopbody.order.data[0].order_basic_id
      $scope.pay = $scope.shopbody.order.data[0].total_fee
      $scope.postage =  $scope.shopbody.order.data[0].post_fee
      $scope.newTotal = parseInt($scope.pay)+parseInt($scope.postage)
      $scope.message = $scope.shopbody.order.data[0].buyer_message
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


    }else{
      $timeout(function(){

        if($scope.showtitle){
          $scope.backtoprevView('r.Homordersbody');
        }else{
          $ionicHistory.goBack();
        }


      },420)
    }
  });

}


  $scope.goShop=function () {
    $state.go('r.Shophome',{id:$scope.shopbody.order.data[0].shop_id})
  }
  $scope.goSeorder=function () {
    $state.go('r.HomSales')
  }


}]);

/**
 * Created by Administrator on 2016/7/23.
 */
Ctr.controller('purbodyCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout,$ionicHistory) {

  $scope.ID = $stateParams.basicID;
  $scope.seordeData = $stateParams.seorde;


  $scope.status= false;
  $scope.statusOne= false;
  $scope.$on('$ionicView.beforeEnter',function(event, data){


    if(fromStateServ.getState('r.HomPurordersbody')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.HomPurordersbody').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });



  console.log($scope.ID)



  function init() {
    Tools.showlogin();
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
        if($scope.shopbody.post_status!=5){
          $scope.status = true
        }else{
          $scope.statusOne = true
        }

        console.log($scope.shopbody)

        $scope.pay = $scope.shopbody.total_fee
        $scope.postage =  $scope.shopbody.post_fee
        $scope.newTotal = parseInt($scope.pay)+parseInt($scope.postage)

      }else{
        $timeout(function(){
          if($scope.showtitle){
            $scope.backtoprevView('r.HomPurordersbody');
          }else{
            $ionicHistory.goBack();
          }

        },420)
      }
    });
  }

$scope.goShop=function () {
  $state.go('r.Shophome',{id:$scope.shopbody.shop_id})
}

  $scope.goSeorder=function () {
    $state.go('r.HomPurchase')
  }


}]);

/**
 * Created by Administrator on 2016 /21.
 */
Ctr.controller('purchaseorderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {




  $scope.$on('$ionicView.beforeEnter',function(){

    if($stateParams.data==1){
      $scope.dfks();
    }

            if(fromStateServ.getState('r.HomPurchase')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.HomPurchase').title;
            }else{
                $scope.showtitle  = false;

                  $scope.backv    =function (){

                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });

                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
                    }

                window.androdzerofun  = function(parm1,parm2){

                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });

                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
                }
                  window.androdzerofun_parms   ='tabswtathing';
                  window.androdzerofun_clback  = 'nothing';

            }
    });

     $scope.$on('$ionicView.beforeLeave',function(){

            window.androdzerofun   =undefined;
    })







  $scope.datacaigou=true

  var bascId = $stateParams.datacaigou;
  $scope.ShoppingList = [];
  $scope.newexpression=false

  $scope.expression=true


if(bascId==1){

  $scope.datacaigou=false

}

  $scope.statusData = ""
  $scope.expression=true;
  $scope.dataNew = false

  $scope.ShoppingList = [];

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "status": $scope.statusData,
        "keyword":$scope.key
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
            c.pic_path  =  window.qiniuimgHost+c.pic_path +'?imageView2/1/w/200/h/200';
            if(c.post_status=="2"){
              $scope.dataNew = true
            }

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
    $scope.page_number  =1;
    $scope.ShoppingList=[];
    $scope.statusData = "";
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();


  };
  //待发货
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.page_number  =1;
    $scope.statusData = "1";
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();

  };

  //待收货
  $scope.dfcs = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;
    $scope.page_number  =1;
    $scope.statusData = '2'
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();


  };


  //已完成
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;
    $scope.page_number  =1;
    $scope.statusData = '3'
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();

  };

  $scope.purchaseorde=function (value) {
    $state.go('r.HomPurordersbody',{basicID:value,seorde:1});
  }


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



  $scope.dataLeft =function (value,id,index) {

    $ionicPopup.show({

      title: '确认收货?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "020605",
              "post_content": {
                "token":"",
                "token_phone": "",
                "orderId":value,
                "orderBasicId": id,
                "receive":1

              }

            },function(r){

              if(r.msg== "success"){


                Tools.rmArrin($scope.ShoppingList,index);
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


  $scope.deleteOrder =function (value,id,index) {

    $ionicPopup.show({

      title: '取消订单?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "020606",
              "post_content": {
                "token":"",
                "token_phone": "",
                "orderId":value,

              }

            },function(r){

              if(r.msg== "success"){


                Tools.rmArrin($scope.ShoppingList,index);
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


  $scope.dataRight =function (value) {

    $state.go('r.Logistics',{id:value})
  };



  $scope.selfRight = function (val) {

    $state.go('r.selfShop',{goodsId:val,company_id:""})




  }

  $scope.newQuery =function () {
    $scope.leftmodal.hide();
  }

  $scope.selfLeft = function (val) {

    $scope.selfId  = 'http://pan.baidu.com/share/qrcode?w=400&h=400&url='+val;
    console.log(val);
    $scope.opencustomenuatts  = true;
  }

  $scope.closecustomenu  =   function  () {
    $scope.opencustomenuatts   = false;
  }
  $scope.$on('$ionicView.beforeLeave',function(){
    $scope.closecustomenu();
  })


  $ionicModal.fromTemplateUrl('templates/searchModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newModal = modal;
  });



  $scope.searchBody=function () {
    $scope.newModal.show();


  }

  $scope.back  =  function (){
    $rootScope.$ionicGoBack();
  };


  $scope.msg={};

  $scope.clear  = function(){
    $scope.msg.key   = undefined;
  }

  $scope.myKeyup = function (e) {
    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){

     $scope.key = $scope.msg.key
      $scope.newModal.hide();
      $scope.ShoppingList=[];
      $scope.page_number  =1;
      $ionicScrollDelegate.scrollTop();
      $scope.all = true;
      $scope.dfk = false;
      $scope.dfc = false;
      $scope.dfh = false;
      $scope.expression  = true;
    }



  }
$scope.leftHide =  function () {
  $scope.newModal.hide();

}

  $scope.homeSearch = function () {
    $scope.newModal.hide();
  }

}]);

/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','$ionicScrollDelegate','$ionicModal','$ionicHistory','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,$ionicScrollDelegate,$ionicModal,$ionicHistory,fromStateServ){


  $scope.expression=true;
   $scope.dataNew = false
$scope.dataList = false
  $scope.SalesList = [];
  $scope.statusData = ""
  $scope.datanum =  $stateParams.dataNum;
  $scope.$on('$ionicView.beforeEnter',function(){

    //页面的状态变化  请求



    if ($ionicHistory.backView().forwardViewId) {
      window.androdzerofun  = function(parm1,parm2){
        $ionicHistory.goBack();
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }
  });

  $scope.dataLeft = function (value,num,index) {

    $scope.Odid = value;
    $scope.Num = num
    $scope.index = index

    $scope.newmodal.show();


  }

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "status": $scope.statusData,
        "keyword":$scope.key
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

          c.pic_path  =  window.qiniuimgHost+c.pic_path +'?imageView2/1/w/200/h/200';

        });


        if(type){
          $scope.SalesList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.SalesList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };





  $scope.all = true;
  $scope.dfk = false;
  $scope.dfc = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.dataNew = false
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.statusData = "";
    $scope.SalesList = [];
    $ionicScrollDelegate.scrollTop();
    $scope.page_number=1;
    $scope.expression = true



  };
  //待发货
  $scope.dfks =  function  (){

    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.statusData = "1";
    $scope.SalesList = [];
    $ionicScrollDelegate.scrollTop();
    $scope.page_number=1;
    $scope.expression = true


  };

  //待收货
  $scope.dfcs = function  (){
    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;
    $scope.statusData = '2';
    $scope.SalesList = [];
    $scope.page_number=1;
    $scope.expression = true
    $ionicScrollDelegate.scrollTop();

  };


  //已完成
  $scope.dfns = function  (){
    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;
    $scope.statusData = "3";
    $scope.SalesList = [];
    $scope.page_number=1;
    $scope.expression = true
    $ionicScrollDelegate.scrollTop();


  };

  $scope.ordersbody= function (value) {

    $state.go('r.Homordersbody',{basicID:value,seorde:1});
  };

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


  $ionicModal.fromTemplateUrl('templates/newModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.newmodal = modal;
  });


  $scope.newQuery= function () {


    $scope.modal.hide()
    $scope.newmodal.show();
  }
  $scope.queryTwo =function () {
    $scope.newmodal.hide();
    $scope.expressionList = false
    $scope.dfks();
  }

  //物流单号
  $scope.selectList = []

  $scope.deliveryList = function () {
    $scope.expressionList = true;
    $scope.modal.show();

    $scope.loadOlderStoriesList=function (type) {

      var sendoption  = {
        "interface_number": "020704",
        "client_type": window.platform,
        "post_content": {
          "token":"",
          "token_phone": "",
          "keyword": $scope.data.companyname,
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
            $scope.expressionList  = false;
            $scope.page_number  =1;
          }else{
            $scope.expressionList = true;
            $scope.page_number  =r.resp_data.nextPage;
          }



          if(type){
            $scope.selectList  = r.resp_data.data;
          }else{
            angular.forEach(r.resp_data.data,function(c){
              $scope.selectList.push(c);
            });

          }




        }
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });


    };



  };


  $scope.myKeyup = function(e){

    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){


      if($scope.expressionList){
        $scope.expressionList=false;
        $ionicScrollDelegate.scrollTop();
      }
      $scope.selectList=[];
      $scope.page_number  = 1;

      $scope.expressionList= true;




    }
  };


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.query =function () {
  $scope.modal.hide();

}

  $scope.goods = []
  $scope.SalesList=[]
  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
      $scope.goods.barcode   =  r.text;
      $scope.$apply();
    });
  }


  $scope.data = [];

  $scope.data.clientSide




  $scope.deliveryNew=function () {

    if(!$scope.data.clientSide){
      native.task('请选择物流!')
      return  false;
    }
    if(!$scope.goods.barcode){
      native.task('请填写单号!')
      return  false;
    }


    Tools.getData({
      "interface_number": "020706",
      "post_content": {
        "token":"",
        "token_phone": "",
        "orderId":$scope.Odid,
        "logistCompanyId": $scope.data.clientSide.logistics_company_id,
        "logistCompanyName": $scope.data.clientSide.logistics_company_name,
        "mailNo": $scope.goods.barcode

      }

    },function(r){

      if(r.msg== "success"){

        $scope.newmodal.hide();
        $scope.modal.hide();
        $scope.dfks();
        $scope.data=[];
        $scope.goods= [];

      }else{

        return false

      }



    });

  }


  $scope.caklateheightList  = {};
  function   caklateheList  (){
    if(window.platform  == 'ios'){
      $scope.caklateheightList  = {
        height:window.innerHeight-(64+26)+'px'
      }
    }else{
      $scope.caklateheightList  = {
        height:window.innerHeight-(44+26)+'px'
      }
    }
  };
  caklateheList();
  $timeout(function(){
    caklateheList();
  },600)







  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.HomSales')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.HomSales').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.HomSales';
      window.androdzerofun_clback = function () {
      };


    }
  });

  $scope.dataRight =function (value) {

    $state.go('r.Logistics',{id:value})
  }



  $ionicModal.fromTemplateUrl('templates/searchModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Modal = modal;
  });

  $scope.searchBody=function () {
    $scope.Modal.show();


  }

  $scope.back  =  function (){
    $rootScope.$ionicGoBack();
  };


  $scope.msg={};
  $scope.clear  = function(){
    $scope.msg.key   = undefined;
  }


  $scope.newKeyup = function (e) {

    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){

      $scope.key = $scope.msg.key
      $scope.Modal.hide();
      $scope.SalesList=[];
      $scope.page_number  =1;
      $ionicScrollDelegate.scrollTop();
      $scope.all = true;
      $scope.dfk = false;
      $scope.dfc = false;
      $scope.dfh = false;
      $scope.expression  = true;
    }


  }



  $scope.leftHide =  function () {

    $scope.Modal.hide();
  }

  $scope.homeSearch = function () {
    $scope.Modal.hide();
  }


}]);



/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {

  $scope.back  =  function (){
      $rootScope.$ionicGoBack();
  };
  $scope.ShoppingList=[];

  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$ionicView.beforeEnter',function(){

    $scope.loginboj = {};
    

            if(fromStateServ.getState('r.HomeSearch')){
              
                $scope.parenttitle     =   fromStateServ.getState('r.HomeSearch').title;
                $scope.ing  = false;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.HomeSearch';
                window.androdzerofun_clback  = function(){};




            }



  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.msg={};
  $scope.clear  = function(){
    $scope.msg.key   =undefined;
  }


  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020204",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "searchParam": {
          "keyword": $scope.msg.key         //代表只搜索 此分类下的商品
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
          c.img_url  =  window.qiniuimgHost+c.img_url +'?imageView2/1/w/200/h/200';


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

$scope.myKeyup = function (e) {


  var keycode = window.event?e.keyCode:e.which;
  if(keycode==13){

    $scope.ShoppingList = [];
    if($scope.expression==true){
      $scope.expression =false;
      $ionicScrollDelegate.scrollTop();
    }
    $scope.expression = true;

    $scope.page_number  = 1
  }



}


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(44)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(24)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

  $scope.goodsdetail  = function(r){

    $state.go('r.Productdetails',{id:r.goods_basic_id})
    // fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }

  $scope.leftHide =function () {
    $ionicHistory.goBack()
  }

  $scope.homeSearch = function () {
    $ionicHistory.goBack()
  }


}]);

/**
 * Created by Administrator on 2016/8/11.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('searchPurchaseCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {

  $scope.back  =  function (){
    $rootScope.$ionicGoBack();
  };
  $scope.ShoppingList=[];



  $scope.msg={};
  $scope.clear  = function(){
    $scope.msg.key   = undefined;
  }


  $scope.myKeyup = function (e) {
    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){
      
       $state.go('r.HomPurchase',{keyValue:$scope.msg.key,newData:"1"})

    }

  }




}]);

/**
 * Created by Administrator on 2016/8/11.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selfShopCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal','seeshopPint',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal,seeshopPint) {




  $scope.goodID = $stateParams.goodsId;
  $scope.companyID = $stateParams.company_id


  Tools.getData({
    "interface_number": "020804",
    "post_content": {
      "token":"",
      "token_phone": "",
      "goods_id": $scope.goodID,
      "company_id": $scope.companyID


    }

  },function(r){

    if(r.msg== "success"){
      $scope.selfList =r.resp_data


    }else{

      return false

    }


  });


  $scope.newMap = function (val) {

     seeshopPint.datalist  =[];
    $scope.mapList = val;

    seeshopPint.datalist  = [
      {
        name:$scope.mapList.name,
        lat:$scope.mapList.gps_lat,
        lng:$scope.mapList.gps_long,
        link:$scope.mapList.link,
        business:$scope.mapList.take_time,
        opsition:$scope.mapList.address
      }
    ];
    $state.go('r.SeeshopPint',{name:$scope.mapList.name});


    };



  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.selfShop')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.selfShop').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.selfShop';
      window.androdzerofun_clback = function () {
      };


    }
  });



  /*for(var i = 0 ;i<$scope.selfList.length;i++){
    seeshopPint.datalist.push({}[i])
    for(var j = 0 ; j<$scope.selfList[i].length;j++){
      if($scope.selfList[i].take_time){
        seeshopPint.datalist[i].business = $scope.selfList[i].take_time
      }
      if($scope.selfList[i].gps_lat){
        seeshopPint.datalist[i].lat = $scope.selfList[i].gps_lat
      }
      if($scope.selfList[i].link){
        seeshopPint.datalist[i].link = $scope.selfList[i].link
      }
    }

  }*/



}]);


/**
 * Created by Administrator on 2016/8/25.
 */
/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopAddressCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){


  $scope.opitionmsg={}
  $scope.$on('$ionicView.beforeEnter',function(){
    $scope.addrs={}
    $scope.addrs.province=$stateParams.province;
    $scope.addrs.city=$stateParams.city;
    $scope.addrs.region=$stateParams.region;
    $scope.addrs.detailmsg= $stateParams.detailmsg;
    $scope.opitionmsg.text =     $scope.addrs.province+' '+$scope.addrs.city+' '+$scope.addrs.region;

  });




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
      console.log($scope.addrs)
    }

    console.log($scope.addrs.detailmsg)

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



$scope.queryAddress= function () {
  
  if(!$scope.opitionmsg.text){
    native.task('请选择省市区');
    return false;
  }
  if(!$scope.addrs.detailmsg){
    native.task('请填写详细地址');
    return false;
  }
  Tools.showlogin();
  Tools.getData({
    "interface_number": "010108",
    "post_content": {
      "province": $scope.addrs.province,
      "city": $scope.addrs.city ,
      "region":  $scope.addrs.region ,
      "shop_addr":  $scope.addrs.detailmsg,
    }
  },function(r){
    if(r){

      $rootScope.$ionicGoBack();
      native.task('保存成功');
    }

  });



  console.log($scope.addrs.detailmsg)
}



}]);

/**
 * Created by Administrator on 2016/8/25.
 */
Ctr.controller('shopNumberCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){


  $scope.shop  = {};
  $scope.shop.name  = $stateParams.Number;
  $scope.clear  = function () {
    $scope.shop.name   = undefined;
  }
  $scope.queryname  = function () {
    if(!$scope.shop.name){
      native.task('请填写联系方式')
    return false;
  }

    if(!Tools.reg.USPhone($scope.shop.name)){
      native.task('请填写正确的联系方式')
      return false;
    }
    Tools.showlogin();
    Tools.getData({
      "interface_number": "010109",
      "post_content": {
        "phone":$scope.shop.name,
      }
    },function (r) {
      if(r){
        $rootScope.$ionicGoBack();
        native.task('修改联系方式成功')
      }

    })


  }



}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicViewSwitcher',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicViewSwitcher) {



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            Initial();

            if(fromStateServ.getState('r.HomShopadmin')){
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.HomShopadmin').title;


                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.HomShopadmin';
                window.androdzerofun_clback  = function(){};


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
  $scope.addrs={}

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

        $scope.shopadmindata = r.resp_data;
        $scope.shopadmindata.basic_info.img_shop  =   window.qiniuimgHost+$scope.shopadmindata.basic_info.img_shop+'?imageView2/2/w/200/h/200';
        $scope.addrs.province =  $scope.shopadmindata.basic_info.province
        $scope.addrs.city=  $scope.shopadmindata.basic_info.city
        $scope.addrs.region =  $scope.shopadmindata.basic_info.region
        $scope.addrs.detailmsg= $scope.shopadmindata.basic_info.shop_addr

      }
    });
  }


  $scope.shopName = function () {
      $state.go('r.HomShopadminname',{nowname:$scope.shopadmindata.basic_info.shop_name});
  };

  $scope.shopBrief = function () {
    $state.go('r.HomShopadminbrief', {nowdec:$scope.shopadmindata.basic_info.description});
  };

  $scope.shopAddress = function () {
    $state.go('r.shopAddress',{province:$scope.addrs.province,city:$scope.addrs.city,region:$scope.addrs.region,detailmsg:$scope.addrs.detailmsg})
  }

  $scope.shopNumber = function () {
    $state.go('r.shopNumber',{Number:$scope.shopadmindata.basic_info.shop_phone})
  }

  $scope.goodspice  = [];
  $scope.selectpir  = function (){

                Tools.chekpirc({
                    allowEdit:true
                  },function(r){
                    Tools.sendqiniu_queue([r],function(f){

                      Tools.showlogin();

                      Tools.getData({
                          "interface_number": "010102",
                          "post_content": {
                                "img_shop":f[0].key,
                            }
                      },function(s){

                        if(s){
                                  $scope.shopadmindata.basic_info.img_shop  =   r;
                                  native.task('修改店头像成功');

                        }

                      })


                    },'user_img')


                  })





  };


}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','Tools','$stateParams','$rootScope',function($scope,native,$state,Tools,$stateParams,$rootScope){

  $scope.shop  ={};
  $scope.shop.dec  = $stateParams.nowdec;

  $scope.querybriefing   =  function () {
    if(!$scope.shop.dec){
      native.task('请填写店铺简介')
      return false;
    }
    Tools.getData({
      "interface_number": "010104",
      "post_content": {
        "description": $scope.shop.dec,
      }
    },function (r) {
          if(r){

                $rootScope.$ionicGoBack();
                native.task('修改店铺简介成功');

          }

    })


  }



}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','Tools','$stateParams','$rootScope',function($scope,native,Tools,$stateParams,$rootScope) {


      $scope.shop  = {};
      $scope.shop.name  = $stateParams.nowname;
      $scope.clear  = function () {
          $scope.shop.name   = undefined;
      } 
      $scope.queryname  = function () {
      if(!$scope.shop.name){
        native.task('请填写店铺名称')
        return false;
      }
      Tools.showlogin();
      Tools.getData({
        "interface_number": "010103",
        "post_content": {
        "name":$scope.shop.name,
        } 
      },function (r) {
        if(r){
          $rootScope.$ionicGoBack();
          native.task('修改店铺名称成功')
        }
        
      }) 
        

      }




}]);

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {


  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];


  $scope.newDetail  = function(r){


    $state.go('r.Productdetails',{id:r.goods_basic_id})
    // fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }



  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020202",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",

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
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';

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

  //广告位接口
  Tools.getData({
    "interface_number": "050401",
    "post_content": {
      "token":"",
      "token_phone": "",
      "type": "3"
    }

  },function(r){



    if(r.msg== "success"){
      angular.forEach(r.resp_data,function(c){
        c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/2/w/828/h/362';
      })
      $scope.guankao   =   r.resp_data;

    }else{

      return false

    }


  });

  $scope.gogunal  =  function(item){

    if(item.request_type  == '1'){
      $state.go('r.homeNewsContent',{postID:item.request_id});
    }else  if(item.request_type  == '2'){
      $state.go('r.Shophome',{id:item.request_id});
    }else  if(item.request_type  == '3'){
      $state.go('r.Productdetails',{id:item.request_id});
    }else  if(item.request_type  == '4'){

      fromStateServ.stateChange('r.stretchOne',{id:item.request_id});
    }else{
      native.task('活动暂未开始');
    }
  }


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(44)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(24)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)




  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.HomTaste')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.HomTaste').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.HomTaste';
      window.androdzerofun_clback = function () {
      };


    }
  });


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



  function init() {
    Tools.showlogin();
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


  $scope.next  = function (){

    init();


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

    native.task('请确认密码!');
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
             "push_registration_id" : storage.getObject('jPush').RegistrationID?storage.getObject('jPush').RegistrationID:'',
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
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','Tools','$ionicPopup','$timeout','native','$ionicNativeTransitions','storage','$state','$stateParams',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,Tools,$ionicPopup,$timeout,native,$ionicNativeTransitions,storage,$state,$stateParams){



  $scope.selectAuth =  $stateParams.selectData;
  $scope.oldSelect = false;



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

  //基本表单信息
  $scope.from   = {};

  if($scope.selectAuth=='old'){
    $scope.oldSelect = true
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
            "certificate_img":f[1].key,
            "entrance":"old"
          }
        },function(r){
          if(r){
            var setin   =  storage.getObject('UserInfo');
            setin.auth_status   ='1';
            storage.setObject('UserInfo',setin);

            native.task('认证已提交,个人中心查看审核进度!',4000)
            //需要支付会费
            if(r.resp_data.need_paid){
              $state.go('r.selectPaydues');
            }else{
              //返回原始入口页
              selectaouthfunl.state=false;
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


  }else{



  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive){

      native.task('请上传审核照片')
      return false;
    }
    if( !$scope.from.License   ||  !$scope.from.legal  ){
      native.task('请填写完整基本信息');
      return false;
    }
    if($scope.from.License.length<18){
      native.task('请填写正确的社会信用代码');
      return false;
    }

    Tools.showlogin();
       //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,

    ],function(f){

    Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"0",
          legal:$scope.from.legal,
          "credit_code": $scope.from.License,
          "license_img":f[0].key,
          "entrance":"new"
        }
      },function(r){
        if(r){
          var setin   =  storage.getObject('UserInfo');
          setin.auth_status   ='1';
          storage.setObject('UserInfo',setin);

          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页
            selectaouthfunl.state=false;
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

      if(!Tools.reg.Pid($scope.form.id)){

        native.task('请输入正确的身份证号码！');
        return false
      }

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

          var setin   =  storage.getObject('UserInfo');
          setin.auth_status   ='1';
          storage.setObject('UserInfo',setin);


          native.task('认证已提交,个人中心查看审核进度!',4000)
          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页
            selectaouthfunl.state=false;
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
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout','loginregisterstate','native','$rootScope',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout,loginregisterstate,native,$rootScope){

      $scope.Userinfo =  {};
      var   user = storage.getObject('UserInfo');
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+'sys_male.jpg?imageView2/2/w/300/h/300';
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
          "push_registration_id" : storage.getObject('jPush').RegistrationID?storage.getObject('jPush').RegistrationID:'',
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


                if(fromStateServ.getState('r.login')){
     $scope.backtoprevView('r.login');
                    $timeout(function(){
                      native.task('登录成功');
                    },400);

                }else{
                    $rootScope.$ionicGoBack();
                      $timeout(function(){
                      native.task('登录成功');
                    },400);

                  
                }

               


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


  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);

  $scope.$on('$ionicView.beforeEnter',function(){

            if(fromStateServ.getState('r.login')){
                $scope.showtitle  = true;
                $scope.ing  = false;

                $scope.parenttitle    =   fromStateServ.getState('r.login').title;
                $scope.backtoprevView =   fromStateServ.backView;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.login';
                window.androdzerofun_clback  = function(){};


       
      
            }else{

                $scope.showtitle  = false;

            }

            $scope.loginboj = {};
    });    


  $scope.$on('$stateChangeSuccess',function(){

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
      }else if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
        $ionicPopup.alert({
          title:'请输入正确的手机号码!',
          okText:'确认'
        });
        sctolthi  = true;
        return  false;
      }


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

      if(!Tools.reg.Tphone($scope.registbasinfo.phone)){
        native.task('请输入正确的手机号码！');
        sctolthi  = true;
        return false
      }

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
Ctr.controller('selectPayduesctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions','selectaouthfunl','storage','fromStateServ',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions,selectaouthfunl,storage,fromStateServ){




               window.androdzerofun  = function(){
                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });
                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
               };

                window.androdzerofun_parms  = '';
                window.androdzerofun_clback  = function(){};
                $scope.backtoprevView  =  function(){
                     $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });
                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)                            
                }



      $scope.renzhi  =function(){
        $state.go('r.Inputamount',{type:1,monye:'0.01'})        
      }


  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

          ///判断是否认证
          if(storage.getObject('UserInfo').need_paid){
            $scope.norepsit  = false;
          }else{
            $scope.norepsit  = true;
          }
          if(fromStateServ.getState('r.selectPaydues')){
            $scope.showtitle  = true;
            $scope.parenttitle     =   fromStateServ.getState('r.selectPaydues').title;   
          }else{
            $scope.showtitle  = false;
          }


  })


}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state','$timeout','$ionicNativeTransitions','selectaouthfunl','storage','fromStateServ','$ionicModal',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state,$timeout,$ionicNativeTransitions,selectaouthfunl,storage,fromStateServ,$ionicModal){





   //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    

      if(storage.getObject('UserInfo').need_paid  =='false'){
        $state.jiaofei  = false;
      }else{
        $state.jiaofei  = true;
      }


    if(fromStateServ.getState('r.selectAuth')){
        $scope.showtitle  = true;
        $scope.backtoprevView  =   fromStateServ.backView;
        $scope.parenttitle     =   fromStateServ.getState('r.selectAuth').title;
        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.selectAuth';
                window.androdzerofun_clback  = function(){};


    }else{
        $scope.showtitle  = false;
    }




      //注册安卓返回的处理
      window.androdzerofun  =  function(ba,com){

           if(selectaouthfunl.state){
            selectaouthfunl.state  = false;
            $rootScope.$ionicGoBack();
          }else{

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

          }

      };


        window.androdzerofun_parms  =    'r.tab.Home';
        window.androdzerofun_clback  =    function(){
        $ionicHistory.clearHistory();

      };





      $scope.GoBackHome =  function(){
          if(selectaouthfunl.state){
            selectaouthfunl.state  = false;
            $rootScope.$ionicGoBack();
          }else{
            window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);
          }

      }










  })








  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $scope.Modal.show();

    //$state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }

  $ionicModal.fromTemplateUrl('templates/selectModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.Modal = modal;
  });



  $scope.goSelect = function () {
    $scope.Modal.hide();
  }

  $scope.newSelect = function () {
    $scope.Modal.hide();
    $state.go('r.entAuthentication',{selectData:'new'});
  }
  $scope.oldSelect = function () {
    $scope.Modal.hide();
    $state.go('r.entAuthentication',{selectData:'old'});
  }

}]);

/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('informationCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,fromStateServ){

  $scope.newsList =[]
  $scope.expression=true;





  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.information')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.information').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.information';
      window.androdzerofun_clback = function () {
      };


    }
  });



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
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage','fromStateServ','selectArr',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage,fromStateServ,selectArr){

//物流消息
$scope.goinstinfo  = function (params) {
   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Tradelogistics){
                    if(noti.userlist[usid].Tradelogistics.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Tradelogistics,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })
                      storage.setObject('Notice',noti);
                      if(window.platform  == 'ios'){

                       var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);
                      }
                    }
                }
              }
          }
    }

  var     noti   =   storage.getObject('Notice');


  fromStateServ.stateChange('r.LogisticsInformation');
};
//系统消息
$scope.goinstinfosystem  = function (params) {



   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Systemmessage){
                    if(noti.userlist[usid].Systemmessage.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Systemmessage,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })
                      storage.setObject('Notice',noti);
                      Handlenotice()
                      if(window.platform  == 'ios'){
                           var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);
                      }
                    }
                }
              }
          }
    }
  fromStateServ.stateChange('r.Systemessagenotice')
};

//公司消息
$scope.goinstinfoCompoen  = function (params) {

   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Companynotice){
                    if(noti.userlist[usid].Companynotice.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Companynotice,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })
                      storage.setObject('Notice',noti);
                      Handlenotice()

                      if(window.platform  == 'ios'){
                        var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);

                      }
                    }
                }
              }
          }
    }

  fromStateServ.stateChange('r.Companynotice')
};
  $scope.mathData = true;
  function select() {
    $scope.adminer = selectArr.selectarrs.isadmin();
    $scope.expression = true;
    $scope.mathData = true;
    if($scope.adminer == "1"){
      $scope.expression = true
      $scope.doRefresh();

    }else {
      $scope.expression= false
    }
  }



$scope.notice = {
  Tradelogistics:0,
  Systemmessage:0,
  Companynotice:0
};



$rootScope.$watch('newnotice', function() {
        $timeout(function () {
          Handlenotice()
        })
    });

function Handlenotice() {

  var  id   = storage.getObject('UserInfo').user_id;
    if(id){

        if(storage.getObject('UserInfo').company_id !=''){
          $scope.hasCompay  = true;
        }
        //多去当前用户消息
        var notilength   = 0;
         notilength  =  storage.getObject('Notice');
         if(!notilength.userlist){
           return false;
         }
          var nowuser  =   notilength.userlist[id];
          if(!nowuser)  return  false;
          if(nowuser.Tradelogistics){
               if(nowuser.Tradelogistics.length){
                var badgenumber =  0;
                var fistnoseemsg  = 0;
                angular.forEach(nowuser.Tradelogistics,function (params) {
                    if(!params.See){
                      badgenumber++;
                      if(!fistnoseemsg){
                        fistnoseemsg  = params.title;
                      }
                    }
                })


                 $scope.notice.Tradelogistics   =  badgenumber;
                 $scope.notice.Tradelogisticsdesc   =   fistnoseemsg;
               }
          }else{
            $scope.notice.Tradelogistics  = 0
          }

          if(nowuser.Systemmessage){
               if(nowuser.Systemmessage.length){
                   var badgenumber =  0;
                   var firsetnoseemasg  = 0;
                angular.forEach(nowuser.Systemmessage,function (params) {
                    if(!params.See){
                      badgenumber++;
                      if(!firsetnoseemasg){
                        firsetnoseemasg  = params.title
                      }
                    }
                })
                 $scope.notice.Systemmessage   =  badgenumber;
                 $scope.notice.Systemmessagedesc   =   firsetnoseemasg;

               }
          }else{
            $scope.notice.Systemmessage  = 0
          }

            if(nowuser.Companynotice){
               if(nowuser.Companynotice.length){

                   var badgenumber =  0;
                   var firsetnoseemasg  = 0;
                angular.forEach(nowuser.Companynotice,function (params) {
                    if(!params.See){
                      badgenumber++;
                      if(!firsetnoseemasg){
                        firsetnoseemasg  = params.title
                      }
                    }
                })
                 $scope.notice.Companynotice   =  badgenumber;
                 $scope.notice.Companynoticedesc   =   firsetnoseemasg;

               }
          }else{
            $scope.notice.Systemmessage  = 0
          }

          if(window.platform  == 'ios'){
            var c  = $scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice;
            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
              var  nule = {};
              nule.number  = c;
              storage.setObject('badge',nule);


            }

    }


}


  $scope.$on('$ionicView.beforeEnter',function(){

    //处理通知
    Handlenotice();



    //页面的状态变化  请求
    select()
    handtat();

    if ($ionicHistory.backView()) {
      window.androdzerofun  = function(parm1,parm2){

        window.extapp()
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }

  });





  $scope.application = function () {
    fromStateServ.stateChange('r.information');
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
  $scope.all = false;

  $scope.login  =  function(r){
    fromStateServ.stateChange(r);
  };

  function handtat  (){

    if(storage.getObject('UserInfo').user_id){
      $scope.isShow = false;

    }else{
      $scope.isShow = true;
    }

  }

  $scope.doRefresh  = function () {
    //Tools.showlogin();
    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count;
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }

        if($scope.newsList!= 0 ){
          $scope.all=true;

        }


      } else {
        return false

      }

    });
  }

}])
  .controller('noticeDetailCtr', ['$scope',function($scope) {
  }])

  .controller('LogisticsInformationCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){







     $scope.actionTy =  function (params) {
      Tools.Notificationjump(params)
     }
     $scope.back  = function () {
      $scope.backtoprevView('r.LogisticsInformation')
     }

     $scope.title  =  '交易物流';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){
     $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');
     },300)
      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Tradelogistics){
                    if(noti.userlist[userin.user_id].Tradelogistics.length){

                      $scope.nomsg    = false;
                      $scope.notilist = noti.userlist[userin.user_id].Tradelogistics;










                    }
                }
              }
          }
       }
     }
      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.LogisticsInformation')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.LogisticsInformation').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.LogisticsInformation';
                window.androdzerofun_clback  = function(){};


            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });
  }])
  .controller('SystemessagenoticeCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){

     $scope.actionTy =  function (params) {

      console.log(params,'执行动作')
      Tools.Notificationjump(params)
     }

     $scope.back  = function () {
      $scope.backtoprevView('r.Systemessagenotice')
     }

     $scope.title  =  '系统消息';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){

       $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');
       },300)

      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var   noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Systemmessage){
                    if(noti.userlist[userin.user_id].Systemmessage.length){
                      $scope.nomsg =  false;
                      $scope.notilist  = noti.userlist[userin.user_id].Systemmessage;
                    }
                }
              }
          }
       }
     }
      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.Systemessagenotice')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Systemessagenotice').title;

                        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Systemessagenotice';
                window.androdzerofun_clback  = function(){};

            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });
  }])
 .controller('CompanynoticeCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){
     $scope.actionTy =  function (params) {

      Tools.Notificationjump(params)
     }
     $scope.back  = function () {
      $scope.backtoprevView('r.Companynotice')
     }

     $scope.title  =  '公司消息';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){

       $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');
       },300)

      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var   noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Companynotice){
                    if(noti.userlist[userin.user_id].Companynotice.length){
                      $scope.nomsg =  false;
                      $scope.notilist  = noti.userlist[userin.user_id].Companynotice;
                    }
                }
              }
          }
       }
     }

      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.Companynotice')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Companynotice').title;


                        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Companynotice';
                window.androdzerofun_clback  = function(){};

                
            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });



  }])





Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])

.controller('LogisticsCtr',['$scope','Tools','fromStateServ','$stateParams','native','$rootScope','$timeout',function($scope,Tools,fromStateServ,$stateParams,native,$rootScope,$timeout){




  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Logistics')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Logistics').title;
                

                

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Logistics';
                window.androdzerofun_clback  = function(){};

                
                


            }else{                
                $scope.showtitle  = false;
            }
            inlit();
            
    });
    $scope.state  = true;
    




    var inlit  =   function   (){


        
         Tools.getData({
              "interface_number": "020609",
                "post_content": {
                "order_basic_id": $stateParams.id,
                }
         },function(r){
                if(r){



                    console.log(r);
                    $scope.postiobasinfo  = r.resp_data;
                    




            Tools.getData({
              "interface_number": "020608",
                "post_content": {
                "order_basic_id": $stateParams.id,
                }
         },function(r){
                    
                    if(r){

                    
                      if(r.resp_data.length){
                        //渲染数据
                        $scope.other  = true;
                        $scope.state =  false;
                        $scope.logiaclist  = r.resp_data;
                        $scope.logiaclist[0].now  = true;
                        }else {
                        $scope.other  = true;
                        $scope.state  = true;
                        $scope.openruil =  function(){

                            cordova.InAppBrowser.open(r.resp_data.url, '_blank', 'location=yes');
                        }



                      }
                }else{



                }

         })



                }else{


                    $timeout(function(){

                        if($scope.backtoprevView){
                            $scope.backtoprevView('r.Logistics');
                      }else{
                          $rootScope.$ionicGoBack();
                      }

                    },400)

                   
                    
                }

         })




    }

   








}])
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

                   window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Addresslist';
                window.androdzerofun_clback  = function(){};



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

                                        index.reverse();
                                        angular.forEach(index,function(s){
                                                Tools.rmArrin($scope.datalist,parseInt(s))
                                        })

                                        native.task('删除成功');


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
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.AddressEdith';
                window.androdzerofun_clback  = function(){};



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

      if(fromStateServ.getState('r.ClassifDetails')){
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.ClassifDetails').title;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.ClassifDetails';
                window.androdzerofun_clback  = function(){};
            }



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
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state','fromStateServ',function($scope,storage,Tools,native,$state,fromStateServ){
  $scope.Hight={}


  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingOne')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingOne').title;
                                         
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingOne';
                window.androdzerofun_clback  = function(){};

            }else{
                $scope.showtitle  = false;
            }

  })
  


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


  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.SettingOne').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };



}])


/**
 * Created by Administrator on 2016/7/15.
 */
Ctr.controller('SettingsSelectCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {




}]);


Ctr.controller('StoremanagementCtr',['$scope','Tools','native','StoredataEdit','$state',function($scope,Tools,native,StoredataEdit,$state) {

$scope.delthis  = function(r,item){
    //console.log(item.take_id);

    Tools.showlogin();
    Tools.getData({
         "interface_number": "020803",
         "post_content": {
             takeAddrId:item.take_id
         }         
    },function(r){
            if(r){

                  Tools.rmArrin($scope.storelist,r-1)
                  native.task('删除成功',1000);
            }
    })
}
//新增  门店
$scope.addnewmendian   = function(){
    StoredataEdit.Ref  =  true;
    $state.go('r.StoremanagementEdit');
}

//编辑门店
$scope.edithmenid  = function(r){ 
       StoredataEdit.Ref  =  true;
       StoredataEdit.name  = r.name;
       StoredataEdit.link  =  r.link;
       StoredataEdit.address  = r.address;
       StoredataEdit.take_id  = r.take_id;
       StoredataEdit.gps_lat  =  r.gps_lat;
       StoredataEdit.gps_long  = r.gps_long;
       StoredataEdit.take_time   =  r.take_time;
        $state.go('r.StoremanagementEdit');

}





$scope.delstate =  function(){
    $scope.shouldShowDelete  = !$scope.shouldShowDelete; 
}

$scope.loadDatae  =  function(){

    if(StoredataEdit.take_id){

        angular.forEach($scope.storelist,function(ff){
                    if(ff.take_id  == StoredataEdit.take_id){
                        ff.name =  StoredataEdit.name;
                        ff.link   = StoredataEdit.link;
                        ff.address  = StoredataEdit.address;
                        ff.take_id  = StoredataEdit.take_id ;
                        ff.gps_lat  =  StoredataEdit.gps_lat ;
                        ff.gps_long  = StoredataEdit.gps_long ;
                        ff.take_time =  StoredataEdit.take_time ;
                        StoredataEdit.take_id =  undefined;  
                    }
        })
    }else{


    }

    if(StoredataEdit.Ref) {StoredataEdit.Ref = false;   return  false;}
    Tools.getData({
         "interface_number": "000408",
         "post_content": {}
    },function(r){
            if(r){
                $scope.storelist  = r.resp_data;
            }
    })
};
$scope.$on('$ionicView.beforeEnter',function(){
    $scope.loadDatae();
})
$scope.sendSms =   function(r) {
        window.sms.send(r.link, '', {
            replaceLineBreaks: false, 
            android: {
                intent: 'INTENT' 
            }
        }, function () {  }, function (e) {});
    }

$scope.callphone  =  function (r){
    window.plugins.CallNumber.callNumber(function(){}, function(){},r.link, true);
}

}])
.controller('StoremanagementEditCtr',['$scope','Tools','native','StoredataEdit','$rootScope',function($scope,Tools,native,StoredataEdit,$rootScope){

        $scope.stroe  = {};
        if(StoredataEdit.take_id){
            $scope.title  =  StoredataEdit.name;
            $scope.stroe.name  =  StoredataEdit.name;
            $scope.stroe.phone  =  StoredataEdit.link;
            $scope.stroe.position  =  StoredataEdit.address;
            $scope.stroe.take_id  =  StoredataEdit.take_id;
            $scope.stroe.gps_lat  =  StoredataEdit.gps_lat;
            $scope.stroe.gps_long  =  StoredataEdit.gps_long;
            $scope.stroe.businessHours  = StoredataEdit.take_time;
        }else{
            $scope.title  =  '添加门店';
        }

        $scope.keepaddress =  function(){
                if(!$scope.stroe.name){
                    native.task('请填写门店名称');
                    return  false;
                }
                if(!$scope.stroe.phone){
                    native.task('请填写联系方式');
                    return  false;
                }
                if(!$scope.stroe.position){
                    native.task('请填写位置信息');
                    return  false;
                }
                if(!$scope.stroe.businessHours){
                    native.task('请填写营业时间');
                    return  false;
                }
            
                Tools.showlogin();
                Tools.getData({
                       "interface_number": "020802",
                        "post_content": {
                            "goods_id": "",
                            "take_id": $scope.stroe.take_id?$scope.stroe.take_id:"",
                            "name": $scope.stroe.name,
                            "address": $scope.stroe.position,
                            "gps_lat":$scope.stroe.gps_lat?$scope.stroe.gps_lat:'',
                            "gps_long": $scope.stroe.gps_long?$scope.stroe.gps_long:'',
                            "take_time":$scope.stroe.businessHours,
                            "link": $scope.stroe.phone,
                        }
                },function(r){
                    if(r){

                        if(!StoredataEdit.take_id){
                            StoredataEdit.Ref  = false;
                        }
                        $rootScope.$ionicGoBack();
                        native.task('保存成功');
                    }
                })






        }


}])

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
Ctr.controller('SettingsUpdateCtr',['$scope','storage','Tools','native','$state','fromStateServ',function($scope,storage,Tools,native,$state,fromStateServ){

  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingsUpdate')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingsUpdate').title;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingsUpdate';
                window.androdzerofun_clback  = function(){};






            }else{
                $scope.showtitle  = false;
            }



          var userin  =  storage.getObject('UserInfo');
          $scope.header  =    window.qiniuimgHost+userin.avatar+'?imageView2/2/w/130/h/130';
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
          Tools.showlogin();
          Tools.sendqiniu_queue([r],function(f){
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
    $state.go('r.SettingsQQ')
  }


  //修改性别
  $scope.sexgo  = function(){
    $state.go('r.SettingsSexUsername');
  }
  //修改  秘密
  $scope.resetPwd  =  function(){
      $state.go('r.SettingsPassword');
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

  if(!Tools.reg.qq($scope.msg.qq)){
    native.task('请输入正确的QQ号码！');
    return false
  }


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
 * Created by Administrator on 2016/8/5.
 */
/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('aboutWeCtr',['$scope','fromStateServ',function($scope,fromStateServ){

  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingWe')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingWe').title;


                                             
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingWe';
                window.androdzerofun_clback  = function(){};



                
            }else{
                $scope.showtitle  = false;
            }
  })

}]);


/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('companyInstallCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','storage','fromStateServ','selectaouthfunl','selectArr',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,storage,fromStateServ,selectaouthfunl,selectArr){



  $scope.chongzhi1  =function(){

         native.confirm('充值积分','提示',['充值','取消'],function(c){
          if(c  == 1){
             $state.go('r.Inputamount',{type:3});
          }
        });


  }

  $scope.goselectaouth  =  function  (){
      selectaouthfunl.state=true;
      $state.go('r.selectAuth');
  }

  $scope.Storemage   = function(r){
     $state.go('r.Storemanagement');
  }

  $scope.expression = true;
  $scope.newexpression =true;

  $scope.companyName = storage.getObject('UserInfo').company_name;
  $scope.adminer = storage.getObject('UserInfo').is_admin;
  $scope.userid = storage.getObject('UserInfo').user_id;





  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    Initial ();
    select()


      if(fromStateServ.getState('r.companyInstall')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.companyInstall').title;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.companyInstall';
                window.androdzerofun_clback  = function(){};



            }






  });

  function select() {
    $scope.companyID =  selectArr.selectarrs.companyid();
    $scope.companyName =  selectArr.selectarrs.companyname();
    $scope.adminer = selectArr.selectarrs.isadmin();
    $scope.expression = true;

    if($scope.adminer == "1"){
      $scope.newexpression = true
    }else {
      $scope.newexpression= false
    }
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
        $scope.expression = false;
        $scope.autName="审核失败"
      }


      $scope.integral =r.resp_data.integral

    }else{

      return false

    }


  });

}





$scope.goManagement = function () {

  
  $state.go('r.management')
}

  //解除绑定
$scope.deleteCompany=function () {

/*if($scope.adminer == 1){

  $ionicPopup.alert({
    title:"请先移交管理员！",
    okText:'确定'

  });
  return false;
}else {*/

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




  //初始  信息
  function  newInitial  (){

    var   user = storage.getObject('UserInfo');
    if(user.user_id){
      //登录了
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/2/w/300/h/300';
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



  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.companyInstall')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.companyInstall').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.companyInstall';
      window.androdzerofun_clback = function () {
      };


    }
  });


}]);


Ctr.controller('managementCtr',['$scope','Tools','native','EmployeeObjdata','$state','$ionicNativeTransitions','$timeout',function($scope,Tools,native,EmployeeObjdata,$state,$ionicNativeTransitions,$timeout){

//充值  
$scope.Recharge  = function(item){ 
      native.prompt('正在为'+item.user.real_name+'分配积分,该员工积分余额:'+item.user.integral,'提示',['确认','取消'],'',function(c){
                    if(c.buttonIndex == 1){

                          ///console.log(parseInt(c.input1))
                          var mony = 0;
                          if(!isNaN(parseFloat(c.input1)))  {
                            mony =   parseFloat(c.input1);

                          }
                            var  userlist =  [];
                            userlist.push(item.user_id);
                             native.confirm('积分:'+mony,'确认分配?',['确定','取消'],function(c){
                                if(c  == 1){
                                    Tools.showlogin();
                                    Tools.getData({
                                        "interface_number": "000404",
                                        "post_content": {
                                            "staffId": userlist,
                                            "integral": mony
                                        },
                                        "client_type": "android"
                                    },function(r){
                                        if(r){
                                            $timeout(function(){
                                              item.user.integral=  parseFloat(item.user.integral)+parseFloat(mony);
                                            })
                                            native.task('分配成功');

                                        }
                                    })
                             }})                          
                    }
            })
}






  $scope.$on('$ionicView.beforeEnter',function(){
    if(!EmployeeObjdata.user_id){
      $scope.listdata = []
      $scope.loadstat = true;
      $scope.pag_number  = 1;
    }else{

    if(EmployeeObjdata.leave){
        //解雇了员工
        EmployeeObjdata.leave =  false;
        var  index  =  undefined;
        angular.forEach($scope.listdata,function(xxx,indxxxx){
            if(xxx.user_id   ==   EmployeeObjdata.user_id){
              index  =  indxxxx
            }
        })
        $timeout(function(){
          

          Tools.rmArrin($scope.listdata,index)

        },400)
    }
    //跟新  门店信息
    if(EmployeeObjdata.take_name){
             angular.forEach($scope.listdata,function(xxx,indxxxx){
              if(xxx.user_id   ==   EmployeeObjdata.user_id){
              xxx.takeAddr  = {};
              xxx.takeAddr.name   =   EmployeeObjdata.take_name;
              EmployeeObjdata.take_name  = undefined;
              
            }
        })
        
    }
  
    EmployeeObjdata.user_id  = false;
    }
  })

$scope.sendSms =   function(r) {    
        window.sms.send(r.user.phone, '', {
            replaceLineBreaks: false, 
            android: {
                intent: 'INTENT' 
            }
        }, function () {  }, function (e) {});
    }

$scope.callphone  =  function (r){
    window.plugins.CallNumber.callNumber(function(){}, function(){},r.user.phone, true);
}

$scope.edithmenid =  function(item){

        EmployeeObjdata.user_id     =   item.user_id;
        $ionicNativeTransitions.stateGo('r.Employeedetails',{}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -250, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -500, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });




}

  $scope.listdata = []
  $scope.loadstat = false;
  $scope.pag_number  = 1;
  $scope.loadmoreData =  function (ff){
    var sendopition  =  {
    "interface_number": "000406",
    "post_content": {}
    };

    if(ff){
      $scope.pag_number  = 1;
      sendopition.post_content.page_num   = $scope.pag_number;
    }else{
      sendopition.post_content.page_num   = $scope.pag_number;
    }

    Tools.getData(sendopition,function(r){
      if(r){

          if(ff){
               angular.forEach(r.resp_data.data,function(itme){
                        itme.user.avatar  =  window.qiniuimgHost+itme.user.avatar+'?imageView2/2/w/150/h/150';
               })
              $scope.listdata =  r.resp_data.data;
          }else{
            angular.forEach(r.resp_data.data,function(itme){
              itme.user.avatar  =  window.qiniuimgHost+itme.user.avatar+'?imageView2/2/w/150/h/150';
              $scope.listdata.push(itme);

            })
          }

          if(r.resp_data.nextPage  == 0){
              $scope.loadstat = false;
              $scope.pag_number  = 1;

          }else{
            $scope.loadstat = true;
            $scope.pag_number  = r.resp_data.nextPage;
          }


      }
    })

  }
}])

.controller('EmployeedetailsCtr',['$scope','Tools','native','EmployeeObjdata','$ionicModal','$timeout','storage','$rootScope','$state',function($scope,Tools,native,EmployeeObjdata,$ionicModal,$timeout,storage,$rootScope,$state){

//  =
$scope.changethisuerinfo =  function(r){

    if(!r.select){
          angular.forEach($scope.Identity,function(xx){
            xx.select  =  false;
          })
        r.select  =  true;
        if(r.name  == '管理员'){
          $scope.info.company_relation.is_admin  = '1'
          $scope.info.company_relation.is_sales  = '0'                 
        }else{
              $scope.info.company_relation.is_admin  = '0'
              $scope.info.company_relation.is_sales  = '1'  
        }
    }




}

$scope.save  = function(){
  
  Tools.showlogin();

  var  statin  =  0;
  

    angular.forEach($scope.Identity,function(xx){
        if(xx.select){
          if(xx.name  =='管理员'){
              statin  = 1
          }else{
            statin  = 2
          }
        }
    })

    if(statin  = 1){
      if($scope.info.company_relation.is_admin   ==  $scope.nowuserinfostat){
          statin  = undefined
      }

    }

  Tools.getData({
    "interface_number": "000407",
    "post_content": {
        "staff": $scope.info.company_relation.user_id,
        "take_id": $scope.info.company_relation.take_id,
        "role": statin,
    },
  },function(r){
      if(r){

        if($scope.info.company_relation.is_admin   ==  $scope.nowuserinfostat){
          //没有移交管理员
          $rootScope.$ionicGoBack();
          
          //native.task('设置收银员成功')
        }else{
            window.outlogin(function(){
                          $timeout(function(){
                                  $state.go('r.tab.Settings');
                                  $timeout(function(){
                                    $ionicHistory.clearHistory();
                                  },30)
                          },30)
                })
          native.task('移交管理员成功')  
        }

        EmployeeObjdata.take_name  =   $scope.info.company_relation.take_name;

          

          

      }
  })

}


  $scope.edithmenid  =  function(item){

    angular.forEach($scope.storelist,function(xxx){
        if(xxx.take_id   == item.take_id){
          xxx.select  = true;
          $scope.info.company_relation.take_name  =  xxx.name;
          $scope.info.company_relation.take_id   =   xxx.take_id;
        }else{
          xxx.select  =false
        }
    })

    $timeout(function(){
      $scope.Since.hide();
    },200)
    


  }
  $scope.$on('$destroy', function() {
      $scope.Since.remove();
    });
    $ionicModal.fromTemplateUrl('Since.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.Since = modal;
    });
    $scope.storelist  = [];
    $scope.openstorelist  = function(){
          $scope.Since.show();
    }

$scope.shohwchange   = false;
      $scope.choice =   true;
      $scope.Identity  = [
        {
          name:'管理员',
          desc:'公司的管理员',
          select:false
        },
        {
           name:'收银员',
           desc:'收银人员',
           select:false
        }
      ];

      $scope.lizhi  = function(){
          //自己离职自己
          if(storage.getObject('UserInfo').user_id   == $scope.info.company_relation.user_id){
            native.confirm('你确定离开该公司?','提示',['确定','取消'],function(c){
              if(c  == 1){

                Tools.showlogin();
                Tools.getData({
                    "interface_number": "000402",
                    "post_content": {
                        "userId":$scope.info.company_relation.user_id,
                        "isSelf": "1",
                    }
                },function(r){
                    if(r){
                       window.outlogin(function(){
                          $timeout(function(){
                                  $state.go('r.tab.Settings');
                                  $timeout(function(){
                                    $ionicHistory.clearHistory();
                                  },30)
                          },30)
                      })
                      native.task('解散公司,成功');
                    }
                })
            }})
          }else{
            native.confirm('你确定解雇该员工','提示',['确定','取消'],function(c){
                if(c  == 1){
                Tools.showlogin();
                Tools.getData({
                    "interface_number": "000402",
                    "post_content": {
                        "userId":$scope.info.company_relation.user_id,
                        "isSelf": "0",
                    }
                },function(r){
                    if(r){
                      EmployeeObjdata.leave  =  true;
                      $rootScope.$ionicGoBack();
                      native.task('解雇成功!')
                    }
                })
                }
            })
          }
      }

      $scope.$on('$ionicView.beforeEnter',function(){
      Tools.showlogin();
      Tools.getData({
            "interface_number": "000409",
            "post_content": {
              staff:EmployeeObjdata.user_id
            }
      },function(r){
          if(r){
                $scope.info  =r.resp_data;   
                $scope.nowuserinfostat  =$scope.info.company_relation.is_admin;                 
                $scope.info.company_relation.take_name  = '加载中...';
                if(r.resp_data.company_relation.is_admin  =='1'){
                  $scope.shohwchange   = false;
                }else{
                  $scope.shohwchange   = true;
                }
                if(r.resp_data.company_relation.is_sales == '1'){
                  $scope.Identity[1].select  = true;
                }
                    Tools.getData({
                    "interface_number":"000408",
                    "post_content":{}
                  },function(r){
                    if(r){
                      $timeout(function(){
                        $scope.info.company_relation.take_name  = '暂未设置';
                        angular.forEach(r.resp_data,function(xxx){
                          if($scope.info.company_relation.take_id  == xxx.take_id){
                              $scope.info.company_relation.take_name  = xxx.name;
                              xxx.select  = true;
                          }else{
                              xxx.select  = false;
                          }                          
                        })
                       $scope.storelist    = r.resp_data;
                      })
                    }
                  })
          }
      })
    })


}])

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout','$state','$ionicHistory','storage','fromStateServ','$ionicScrollDelegate','Tools','native','selectArr','$rootScope',function($scope,$ionicPopover, $ionicPopup,$timeout,$state,$ionicHistory,storage,fromStateServ,$ionicScrollDelegate,Tools,native,selectArr,$rootScope) {

$scope.chongjif1 =  function(){
   if(storage.getObject('UserInfo').user_id){
        fromStateServ.stateChange('r.Inputamount',{type:2});
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){

          fromStateServ.stateChange('r.login');
        }
      }); 
      return false;
    }
}

$scope.ercodepay =  function(){

   if(storage.getObject('UserInfo').user_id){
      fromStateServ.stateChange('r.comforderpayPwd');
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){
          fromStateServ.stateChange('r.login');
        }
      });
      
      return false;
    }



}

$scope.showjif   =  function(){
  //alert();
  native.task('当前积分:'+$scope.Userinfo.integral,4000);
}


  $scope.userfanhui  = function () {

    if(storage.getObject('UserInfo').user_id){
      fromStateServ.stateChange('r.SettingsUser');
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){

          fromStateServ.stateChange('r.login');
        }
      });

      return false;
    }




}


//切换到登录   login
function   login   (){
      native.confirm('该操作需要登录','你还没有登录',['登录','取消'],function(c){

        if(c  == 1){
          fromStateServ.stateChange('r.login');
          }
      })
};


$scope.getMdl   =     function(r){
  fromStateServ.stateChange(r)
} ;

$scope.Personalsetting  = function (){
      var uil   = storage.getObject('UserInfo');
        if(!uil.user_id){
              login();
        }else{
            fromStateServ.stateChange('r.SettingsUpdate');
        }
  }

  $scope.aboutWe  = function (){
    fromStateServ.stateChange('r.SettingWe');
  }


$scope.addermge  = function(){
        $scope.getMdl('r.Addresslist')
}
$scope.updateAPP  =  function () {
    window.updateAPP();
}
$scope.integral  = function(){
    if(storage.getObject('UserInfo').user_id){
      fromStateServ.stateChange('r.SettingOne');
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){
          fromStateServ.stateChange('r.login');
        }
      });
      return false;
    }
  }
  
  $scope.companyInstall=function () {
        $scope.getMdl('r.companyInstall')
  }



 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    if(window.platform  !== 'ios'){
      $scope.update  =  true;
    }




    Initial();
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         window.extapp()
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });




  $scope.outlogin  =   function (){

   native.confirm('你确定要退出当前用户吗','退出登录',['退出','取消'],function(c){

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
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/2/w/300/h/300';
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
           var  user = storage.getObject('UserInfo');
           if(user.user_id){
              user.integral   = r.resp_data.integral;
              storage.setObject('UserInfo',user)


           }


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


        $scope.showco  =   function  (f) {

        var uil   = storage.getObject('UserInfo');

        if(!uil.user_id){

          if(!f){
            login();
          }
          
        }else{

          if(!selectArr.selectarrs.companyid()){
            native.task('请先加入公司');
            return false
          }

            $scope.shopid  = 'http://pan.baidu.com/share/qrcode?w=400&h=400&url='+uil.shop_id;

            if(!f){
            $rootScope.hideTabs =true;
            $scope.setallcationstate   = true;
            }
            

        }
      }


  $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      $rootScope.hideTabs = false;


      //alert($rootScope.hideTabs)

      var  c   =   document.querySelector('#seletercode');
      c.className = "action-sheet-backdrop";
      $timeout(function(){
        c.className  ="action-sheet-backdrop cutom-sheet"
      },400);
      $scope.shopcartnumber = 0;
      angular.forEach($scope.shopcart,function(key){
        $scope.shopcartnumber  =  ($scope.shopcartnumber+key.number);
      })

    };



 $scope.$on('$ionicView.beforeLeave',function(){
           $scope.closetallcationvalue();
           //$scope.showco(true);



    })
  }])

  .controller('SettingsUserCtr',['$scope','Tools','$rootScope','native','fromStateServ',function($scope,Tools,$rootScope,native,fromStateServ){


      $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingsUser')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingsUser').title;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingsUser';
                window.androdzerofun_clback  = function(){};



            }else{
                $scope.showtitle  = false;
            }
      });

    $scope.fankui  = {};
    //$rootScope.$ionicGoBack();
    $scope.submitfankui  = function(){
      if(!$scope.fankui.qq  ||  !$scope.fankui.make){
          native.task('请填写反馈信息')
          return false;
      }
      Tools.showlogin();
      Tools.getData({
          "interface_number": "050202",
          "post_content": {
            "suggest":$scope.fankui.make,
            "contact_way":$scope.fankui.qq
            }
      },function(r){
        if(r){
            $rootScope.$ionicGoBack();
            native.task('反馈成功，感谢你的意见',2000);
        }
      })




    }

  }])



Ctr.controller('shophomeCtr',['$scope','$timeout','Tools','$stateParams','$state','fromStateServ','$ionicScrollDelegate','$rootScope',function($scope,$timeout,Tools,$stateParams,$state,fromStateServ,$ionicScrollDelegate,$rootScope){


    $scope.gogoodsdetial  = function   (r){
            $state.go('r.Productdetails',{id:r.goods_basic_id,inside:'dsadsa'})
    }

   $scope.title  ='店铺';
   $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  
  $scope.$on('$ionicView.beforeEnter',function(){

            if($stateParams.inside){
                $scope.showtitle  = false;
            }else  if(fromStateServ.getState('r.Shophome')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;

                $scope.parenttitle     =   fromStateServ.getState('r.Shophome').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Shophome';
                window.androdzerofun_clback  = function(){};



            }else{
                $scope.showtitle  = false;
            }
            $timeout(function(){
                if($scope.goodlistdata.length){
                }else{
                        inlit();
                }

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
                        }else{
                                    if(fromStateServ.getState('r.Shophome')){
                                        fromStateServ.backView('r.Shophome')
                                        }else{
                                            $timeout(function(){
                                                $rootScope.$ionicGoBack();
                                            },400)


                                         }




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
                            $scope.customcucdownlisloadMore(true);
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








}]).controller('SeeshopPintCtr',['$scope','seeshopPint','$stateParams','$timeout','fromStateServ','native',function($scope,seeshopPint,$stateParams,$timeout,fromStateServ,native){


          $scope.title  = $stateParams.name;
          $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.SeeshopPint')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SeeshopPint').title;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SeeshopPint';
                window.androdzerofun_clback  = function(){};




            }else{
                $scope.showtitle  = false;
            }

            $timeout(function(){
                console.log(seeshopPint);
                inli();
            },400)
    });

    function  inli (){
        if(!seeshopPint.datalist.length){
            native.task('数据为空');
            return false;
        }

        //获取第一个点
        var Firstpoint    =  seeshopPint.datalist[0];

        map = new BMap.Map("showshopint");          // 创建地图实例
        var point = new BMap.Point(Firstpoint.lng, Firstpoint.lat);  // 创建点坐标
        map.centerAndZoom(point, 25);
        //初始化图标
        var icon = new BMap.Icon('./img/pint.png', new BMap.Size(20, 32), {
              anchor: new BMap.Size(10, 30),
              infoWindowAnchor: new BMap.Size(20,5),
              raiseOnDrag: true
            });
        //开始循环插入make
        //make  对象列表

        var makelist  = [];
        angular.forEach(seeshopPint.datalist,function(element,index) {
               makelist[makelist.length]   =  marker = new BMap.Marker({lng:element.lng,lat:element.lat},{icon:icon});  // 创建标注
               map.addOverlay(marker);


                        (function(element,marker,index){

  function  setcontext  (){
                                return "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>"+element.name+"</h5>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 地 址 :  <span style='color:#4a4a4a'>"+element.opsition+"</span>  </p>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 联 系 方 式 : <span style='color:#4a4a4a'>"+element.link+"</span> </p>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 营 业 时 间 : <span style='color:#4a4a4a'>"+element.business+"</span> </p>" +
                                "</div>";
                        }

                    var infoWindow = new BMap.InfoWindow(setcontext(),{
                            height:0,
                            width:200
                            });
                    marker.addEventListener('click',function(){



                            marker.openInfoWindow(infoWindow,{lng:element.lng,lat:element.lat});
                           })

                           if(index  == 0){
                               marker.openInfoWindow(infoWindow,{lng:element.lng,lat:element.lat});
                           }




                    })(element,marker,index);//调用时参数


        });

















    }




}])

/**
 * Created by Administrator on 2016/8/26.
 */
Ctr.controller('stretchOneCtr',['$scope','$interval','$timeout','$ionicPlatform','$cordovaNativeAudio','$cordovaDeviceMotion','fromStateServ','$sce','Tools','storage',function($scope,$interval,$timeout,$ionicPlatform,$cordovaNativeAudio,$cordovaDeviceMotion,fromStateServ,$sce,Tools,storage) {
//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法


  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.stretchOne')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.stretchOne').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.stretchOne';
      window.androdzerofun_clback = function () {
      };



    }
  });


  Tools.getData({
    "interface_number": "020207",
    "post_content": {
      "token":"",
      "token_phone": "",

    }

  },function(r){

    if(r){
         $scope.Url = r.resp_data.link

    }else{

      return false

    }


  });



  $timeout(function(){

    $scope.token = storage.getObject('UserInfo').token;
    $scope.token_phone =  storage.getObject('UserInfo').token_phone;


    $scope.MyUrl="yiwu.com/index.php?r=web/prize/index&token=123&token_phone=%27%27"

   // $scope.MyUrl=$scope.Url+'&'+'token='+$scope.token+'&'+'token_phone='+$scope.token_phone
    $scope.trustSrc = $sce.trustAsResourceUrl("http://" + $scope.MyUrl)

  //  $scope.trustSrc = $sce.trustAsResourceUrl($scope.MyUrl)

  },1000)



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ','storage','Tools','$rootScope','$ionicPopup','$ionicHistory','native','buyConfirmorde','$stateParams','shopcartbactitle',function($scope,fromStateServ,storage,Tools,$rootScope,$ionicPopup,$ionicHistory,native,buyConfirmorde,$stateParams,shopcartbactitle){


 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    //页面的状态变化  请求
      handtat();
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         
         window.extapp()

       }
       window.androdzerofun_parms   ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }

     if(shopcartbactitle.state){
       $scope.showtitle  = true;
       $scope.backv    =function (){
         $rootScope.$ionicGoBack();
       }

        window.androdzerofun  = function(parm1,parm2){
         $rootScope.$ionicGoBack();
       }
       window.androdzerofun_parms   ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';

     }else{
        $scope.showtitle  = false;
     }

    });

    $scope.$on('$ionicView.beforeLeave',function(){
      window.androdzerofun  = undefined;
      $scope.showtitle  = false;
      shopcartbactitle.state  =  false;

    })







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
          $scope.TotalPrice += parseFloat(value.activity_price)*parseInt(value.number);
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
            $scope.Total();
        }else{
          $scope.isShow = true;
        }
      $scope.TotalPrice  = '0.00';

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

    
    if($scope.shopcartdata.length==0){
      $scope.selectall   = false;
      return false
    }

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
      //window.Interactivehost  = 'http://192.168.0.149:8001/index.php?r=app/index';
      window.Interactivehost  = 'http://192.168.0.56:1155/index.php?r=app/index';
      window.dev_version   = '1.1.0';
      //window.Interactivehost  = 'http://pay.ywyde.com/index.php?r=app/index';
      //window.Interactivehost =  'http://app.ywyde.com/index.php?r=app/index';
      //window.Interactivehost  = 'http://192.168.0.89:7878/index.php?r=app/index';
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

 /* var selectStorge =  function () {
     return
  }*/



//验证状态
  .factory('selectArr',['storage',function(storage){
    return{

            selectarrs: {
        id:function () {
          return storage.getObject('UserInfo').user_id
        },
        isadmin:function () {
          return  storage.getObject('UserInfo').is_admin
        }  ,
        companyid:function () {
          return storage.getObject('UserInfo').company_id
        },
        authstatus:function () {
          return  storage.getObject('UserInfo').auth_status
        },
        needpaid:function () {
          return  storage.getObject('UserInfo').need_paid
        },
              companyname:function () {
                return  storage.getObject('UserInfo').company_name
              },

      }
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
    .factory('shopcartbactitle',[function(){
      return{
      }
    }])
     .factory('selectaouthfunl',[function(){
      return{
      }
    }])
    .factory('seeshopPint',[function(){
      return{
      }
    }])
     .factory('comfrombackresitl',[function(){
      return{
      }
    }])
    .factory('StoredataEdit',[function(){
      return{
      }
    }])
    .factory('EmployeeObjdata',[function(){
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
        //popoverOptions: CameraPopoverOptions,  //ios  的弹出位置 不予配置
        //saveToPhotoAlbum: config.saveToPhotoAlbum?config.saveToPhotoAlbum:false,
        //获取图片完成后是否在 设备上相册保留
        //correctOrientation:config.correctOrientation?config.correctOrientation:true
        //支持图片旋转是否
      };
      
      if(config.targetWidth){
        options.targetWidth  = config.targetWidth;
      }else  if(config.targetHeight){
        options.targetHeight  = config.targetHeight;
      }
    
    
      $cordovaCamera.getPicture(
        options
      ).then(function(imageData) {
        var  data = "data:image/jpeg;base64," + imageData;
        Callback(data,imageData);
      }, function(err) {

        //$cordovaToast.show('获取图片错误',1000,'bottom');

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
      $cordovaToast.show(msg,time?time:2000,animte?animte:'bottom')
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

          if(window.lockingJump) return  false;
          window.lockingJump  =  true;
          $ionicViewSwitcher.nextDirection('back');
          if(window.cordova  && window.cordova.plugins.Keyboard.isVisible ){
           window.cordova.plugins.Keyboard.close();
                    $timeout(function(){
                                $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                                "type": "slide",
                                "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                                "duration":400, // in milliseconds (ms), default 400
                                slowdownfactor: 1,
                                iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
                                androiddelay: 20, // same as above but for Android, default -1
                                fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                                fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                                triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
                          });
                        },300)
                           $timeout(function(){
                                    window.lockingJump =  false;
                            },860)
                  }else{

                    $ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams, {
                            "type": "slide",
                            "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                            "duration":400, // in milliseconds (ms), default 400
                            slowdownfactor: 1,
                            iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
                            androiddelay: 20, // same as above but for Android, default -1
                            fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
                            fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
                            triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
                    });
                         $timeout(function(){
                                    window.lockingJump =  false;
                        },560)
                  }
        $timeout(function () {
            $ionicHistory.clearHistory();
                if(clback){
                        clback()
                }
              window.backtoinroot  = undefined;
              window.androdzerofun  =  undefined;
              window.androdzerofun_parms  = undefined;
              window.androdzerofun_clback  = undefined;
              window.backtoinroot_parms  =  undefined;
            }, 100);
        },
        setState: function(module, fromState, fromParams,title,viewid,backV) {
            this.data[module] = {
                "fromState": fromState,
                "fromParams": fromParams,
                 title:title,
                 viewId:viewid,
            };
        },
        getState: function(module) {
            return this.data[module];
        },
        stateChange: function(stateName,parms,animation){
            if(window.Permission(stateName,parms,animation)){
                            return  false;
            }
            if(window.lockingJump) return  false;
            window.lockingJump =  true;
            box.savestate = true;
            $ionicViewSwitcher.nextDirection('forward');
            $ionicNativeTransitions.stateGo(stateName,parms, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":400, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });
            $timeout(function(){
                    window.lockingJump =  false;
            },560)
        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },
        saveHisty:function ($histy,stateNa){
            //|| box.getState(stateNa)
            if(this.savestate  ){
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
          //alert("Failed: " + reason);

        });


      })








    }



  }


}]);

/**
 * Created by Why on 16/6/10.
 */
//小工具方法类
Server.factory('Tools',['$window','$ionicLoading','$http','$timeout','$ionicPopup','storage','native','$ionicHistory','$state','$ionicNativeTransitions',function($window,$ionicLoading,$http,$timeout,$ionicPopup,storage,native,$ionicHistory,$state,$ionicNativeTransitions){



  //支付的封装  支持ios  安卓
  var  pay = {
    alipaly:function(config,success,error){
        // 1 平台诚信金缴纳
        // 2 个人积分充值
        // 3 公司积分充值
            var data   =  'http://121.40.62.137/alipay/getOrderInfo?type='+config.type+'&buyer_id='+config.buyer_id+'&total_amount='+config.money;
            getData({},function(r){},function(){},'POST',data,false,false,function(r){
              if(r.code  == "success"){
                 window.alipay.pay({
                  tradeNo: new Date().getTime()+(Math.random()*10000),
                  subject: "yiwuyid",
                  body: r.msg,  //这个是 支付的秘钥    
                  price: 0.01,
                  notifyUrl: "http://your.server.notify.url"
                  }, function(successResults){
                    success(successResults)
                  }, function(errorResults){
                     error(errorResults) 
                  });
              }else{

                  native.task('支付失败')

              }

          })

            //     $http.jsonp(data).success(
            //       function(data, status, header, config){

            //       //var c  =  data;
            //       //var c  = eval(data)
            //       alert(data)


            //       }
            //   ).error(
            //     function(data){
            //     native.task('支付失败');
            //   }
            // );



    }

  }


  //通知挑战
  var  Notificationjump  = function (obj) {
    console.log(obj);
    //判断类型
    if(obj.value.msg_type  == '1'){
      //物流信息
       console.log(obj)
       if(obj.value.action_type  == '1' || obj.value.action_type  == '3' || obj.value.action_type  == '4'){
        //obj.value.pk_id
         $state.go('r.Homordersbody',{basicID:obj.value.pk_id})
       }
       if(obj.value.action_type  == '2'){
         $state.go('r.HomPurordersbody',{basicID:obj.value.pk_id})
       }
    }

    //系统通知
    if(obj.value.msg_type  == '2'){
      //系统通知
    }
    //公司消息
    if(obj.value.msg_type  == '3'){
    //公司消息
    }


  }
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

              hidelogin();
              native.task('图片上传失败!',2000);


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
        },function () {},'POST',false,false,true);
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
  var   getData  = function(data,Callback,errorCallback,sendType,host,jsonp,cansologin,playclbac){
    
    if(!host){
      data.client_type =   window.platform?window.platform:'ios';
      data.post_content.token  = window.Token?window.Token:storage.getObject('UserInfo').token?storage.getObject('UserInfo').token:'';
      data.post_content.token_phone  = window.token_phone?window.token_phone:storage.getObject('UserInfo').phone?storage.getObject('UserInfo').phone:'';

      data.version  =  window.dev_version;
      if(!window.dev_version){
        $timeout(function(){
            getData(data,Callback,errorCallback,sendType,host,jsonp,cansologin);
        },400)
          return false;
      }

    }


    
    if(!window.networonline){
      Callback(false);
      native.task('检查网络是否开启!')
      return false;
    }

    // console.log('数据监控 ....')
    // console.log(JSON.stringify(data));

    if(jsonp){

        $http.jsonp(host).success(
        function(data, status, header, config){
            Callback(JSON.parse(data));
        }
    )
    .error(
        function(data){
            //native.task('获取数据失败,请检查网络')
        }
    );


      return false;
    }


    $http({
      url:host?host:window.Interactivehost,
      method:sendType?sendType:'POST',
      timeout: 12000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      data:data
    }).success(function(r){

      //针对支付的特殊回调
      if(playclbac){
        playclbac(r)

        return false;
      }
      

      $timeout(function(){

              if(!cansologin){
                  hidelogin();
              }

              },200);
      if(r.resp_code== '0000'){
        Callback(r);
      } else if(r.resp_code ==  '0001' ||  r.resp_code ==  '1001' ){

            if(r.type  != '000003'){

                        // window.Token   = undefined;
                        // window.token_phone   = undefined;
                        // storage.setObject('UserInfo',{
                        // real_name:'还没有登录!',
                        // avatar:window.defaultUserheader,
                        // integral:'0.00',
                        // sex:'./img/icon_man@3x.png',
                        // })

                        $timeout(function () {

                              window.outlogin(function(){
                              $state.go('r.tab.Home');
                                $timeout(function(){
                                    $ionicHistory.clearHistory();
                                },40)
                                native.task(r.msg,3000);
                              })

                        },520)


            Callback(false);
            }else{
            Callback(r);


            }


      }  else{
        Callback(false);
        // Callback(false);
        // errorCallback?errorCallback(r):null;
        if(r.msg){

          native.task(r.msg);

        }else{

           //native.task('异常错误!')
        }
      }
    }).error(function(e){
      // errorCallback?errorCallback(e):null;
      $timeout(function(){
          if(!cansologin){
              hidelogin();
          }
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
    jifen:function (val) {
      return /^(\d+(.\d{1,2})?)$/g.test(val);
    },

    //汉字
    chinese:function(val){
      return /[\u4E00-\u9FA5]/.test(val);
    },
    //身份证验证
    Pid:function (val) {
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
    },

    //密码正则
    Password:function (val) {
      return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/.test(val);
    },


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
    },
    qq:function (val) {
      return /^[1-9]\d{4,11}$/.test(val)
    },
    Tphone:function (val) {
      return /^1[3|4|5|7|8]\d{9}$/.test(val)
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
    chekpirc:chekpirc,
    Notificationjump:Notificationjump,
    pay:pay







  }

}]);
