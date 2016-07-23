/**
 * Created by Why on 16/6/10.
 */
//调用原生方法类
Server.factory('native',['$window','$cordovaCamera','$cordovaDialogs','$cordovaActionSheet','$cordovaAppVersion','$cordovaBadge','$cordovaBarcodeScanner','$cordovaToast','$cordovaProgress','$cordovaCalendar','$ionicLoading',function($window,$cordovaCamera,$cordovaDialogs,$cordovaActionSheet,$cordovaAppVersion,$cordovaBadge,$cordovaBarcodeScanner,$cordovaToast,$cordovaProgress,$cordovaCalendar,$ionicLoading){
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
      
      $ionicLoading.show({
      template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
      //template: '<ion-spinner  icon="ripple" class="spinner-energized"  ></ion-spinner>',
      delay:100
      });

      return false;
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

      $ionicLoading.hide();


      return false;
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
