var  Server = angular.module('starter.services', []);

/**
 * Created by Why on 16/6/12.
 */

   //全局变量定义
   window.Interactivehost  = 'http://192.168.0.149:8001/index.php?r=app/index';
  //window.Interactivehost  = 'http://192.168.0.115:8001/index.php?r=app/index';


    Server.factory('const',['$window',function($window){
      return{
        haha:'哈哈'
      }
    }]);

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
Server.factory('native',['$window','$cordovaCamera','$cordovaDialogs','$cordovaActionSheet','$cordovaAppVersion','$cordovaBadge','$cordovaBarcodeScanner','$cordovaToast','$cordovaProgress','$cordovaCalendar',function($window,$cordovaCamera,$cordovaDialogs,$cordovaActionSheet,$cordovaAppVersion,$cordovaBadge,$cordovaBarcodeScanner,$cordovaToast,$cordovaProgress,$cordovaCalendar){
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
    Camera :function(config,Callback){
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
        targetWidth: config.targetWidth?config.targetWidth:400,
        targetHeight: config.targetHeight?config.targetHeight:400,
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
      $cordovaCamera.getPicture(options).then(function(imageData) {
        var  data = "data:image/jpeg;base64," + imageData;
        Callback(data,imageData);
      }, function(err) {
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
      if(text){
        $cordovaProgress.showText(false, 100000, text)
      }else{
        $cordovaProgress.showSimple(true)
      }
    },
    //隐藏加载条
    hidloading:function(){
      $cordovaProgress.hide();
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


Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout',function($state,$ionicViewSwitcher,$ionicHistory,$timeout){
    var box  = {
        data: {},
        savestate:false,
        backView:function(tartg){
            $ionicViewSwitcher.nextDirection('back');
            //$ionicNativeTransitions.stateGo(box.getState(tartg).fromState,box.getState(tartg).fromParams);
            $state.go(box.getState(tartg).fromState,box.getState(tartg).fromParams);
            $timeout(function(){
                // var inc  = false;
                // var overflow  = [];
                // angular.forEach($ionicHistory.viewHistory().views,function(v,k){
                //   if(inc){  overflow.push(k); }
                //   if(v.stateName  == tartg){ inc=true;  }} )
                // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});
                console.log($ionicHistory.viewHistory())
            },500)



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
            $ionicViewSwitcher.nextDirection(animation?animation:'forward');
            // $ionicNativeTransitions.stateGo(stateName,parms,{
            //     "type": "drawer",
            //     "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
            //     "duration": 1000 // in milliseconds (ms), default 400
            // });
            $state.go(stateName,parms)



        },
        removebackregistevent:function(){
            window.androdzerofun   =  undefined;
        },
        saveHisty:function ($histy,stateNa){
            var hostiy  = $histy.currentView();

            //注册安卓返回监听
            window.androdzerofun  =  box.backView;
            window.androdzerofun_parms  = stateNa;


            // var inc  = false;
            // var overflow  = [];
            // angular.forEach($ionicHistory.viewHistory().views,function(v,k){if(inc){overflow.push(k);}if(v.stateName  == stateNa){inc=true;}})
            // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});

            $timeout(function(){
                $ionicHistory.clearHistory();
            },500)

            if(this.savestate){
                this.savestate  = false;
                box.data = {};
                this.setState(stateNa,hostiy.stateName,hostiy.stateParams,hostiy.title,hostiy.viewId);
                console.log(box.data)
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
//小工具方法类
Server.factory('Tools',['$window','$ionicLoading','$http','$timeout','$ionicPopup','storage',function($window,$ionicLoading,$http,$timeout,$ionicPopup,storage){

  //加在视图的加载效果http前调用
  var   showlogin = function() {
    $ionicLoading.show({
      //template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
      template: '<ion-spinner  icon="ripple" class="spinner-energized"  ></ion-spinner>',
      delay:100
    });
  };
  var   hidelogin = function(){
    $ionicLoading.hide();
  };
  var   getData  = function(data,Callback,errorCallback,sendType){

    data.client_type =   window.platform?window.platform:'ios';
    data.post_content.token  = window.Token?window.Token:storage.getObject('UserInfo').token?storage.getObject('UserInfo').token:'';
    data.post_content.token_phone  = window.token_phone?window.token_phone:storage.getObject('UserInfo').phone?storage.getObject('UserInfo').phone:'';

    $http({
      url:window.Interactivehost,
      method:sendType?sendType:'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      data:data
    }).success(function(r){
      if(r.resp_code== '0000'){
        $timeout(function(){
          hidelogin();
        },200);
        Callback(r);
      }else{
        $timeout(function(){
          hidelogin();
        },200);
        Callback(false);
        errorCallback?errorCallback(r):null;
        if(r.msg){
          $ionicPopup.alert({
            title: r.msg
          });
        }else{
          $ionicPopup.alert({
            title: '异常错误!'
          });

        }
      }
    }).error(function(e){
      errorCallback?errorCallback(e):null;
      $timeout(function(){
        hidelogin();
      },200);
      $ionicPopup.alert({
        title:'网络错误,请确认网络连接!'
      });
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
    clone:function (myObj){
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
    },
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
    reg:reg







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
