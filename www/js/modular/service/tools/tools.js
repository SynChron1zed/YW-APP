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

            //线上
            //var data   =  'http://120.26.120.213:8080/EWPayServer/alipay/getOrderInfo?type='+config.type+'&buyer_id='+config.buyer_id+'&total_amount='+config.money;
            //测试
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
    //判断类型
    if(obj.value.msg_type  == '1'){
      //物流信息
       if(obj.value.action_type  == '1' || obj.value.action_type  == '3' || obj.value.action_type  == '4'){
        //obj.value.pk_id
        //采购
        $state.go('r.Homordersbody',{basicID:obj.value.pk_id})
       }
       if(obj.value.action_type  == '2'){
        //销售订单
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
