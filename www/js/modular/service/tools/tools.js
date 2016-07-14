/**
 * Created by Why on 16/6/10.
 */
//小工具方法类
Server.factory('Tools',['$window','$ionicLoading','$http','$timeout','$ionicPopup','storage','native',function($window,$ionicLoading,$http,$timeout,$ionicPopup,storage,native){

  //加在视图的加载效果http前调用
  var   showlogin = function() {
    $ionicLoading.show({
      //template: '<ion-spinner icon="crescent" class="spinner-royal"></ion-spinner>',
      template: '<ion-spinner  icon="ripple" class="spinner-energized"  ></ion-spinner>',
      delay:100
    });
  };



  //上传到七牛  图片单张
  var   sendqiniu_single  =  function (data,claback,key_header,next){

      var  piclen  =   '-1';
      var  key  = Base64.encode(key_header+(Date.parse(new Date()))+'.jpg');
    $http({
      type:'POST',
      url:'http://upload.qiniu.com/putb64/'+piclen+'/key/'+key,
      headers:{
        "Content-Type":'application/octet-stream',
        ///服务器交互token
        "Authorization":'UpToken '+storage.getObject('qiniu').qp_token
      },
      data:{
        pice:data
      },
    }).success(function(r){
      claback(r);
      if(next){
        next(r);
      }

    }).error(function(r,s){
      console.log('error_r',JSON.stringify(r),'xxx',JSON.stringify(s));
      native.task('网络异常!',1000);
    })



  };
  //上传到七牛  图片多张队列
  var   sendqiniu_queue  =  function (data,claback,key_header){
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
         cofnig.quality?cofnig.quality:0;
         cofnig.allowEdit?cofnig.allowEdit:false;
         native.Camera(cofnig,function(r){
           //base64 回调
           claback(r)
         });
       }else if(r==2){

         cofnig.quality?cofnig.quality:0;
         cofnig.allowEdit?cofnig.allowEdit:false;
         cofnig.sourceType  =  Camera.PictureSourceType.SAVEDPHOTOALBUM;
         native.Camera(cofnig,function(r){
           //base64 回调
           claback(r);
         });
       }else{
         native.task('取消');
       }
     })

   }










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
    reg:reg,
    sendqiniu_single:sendqiniu_single,
    sendqiniu_queue:sendqiniu_queue,
    chekpirc:chekpirc,
    rmArrin:rmArrin,
    clone:clone,
    descartes:descartes






  }

}]);
