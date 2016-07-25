/**
 * Created by Why on 16/6/12.
 */

   //全局变量定义
  /* window.Interactivehost  = 'http://192.168.0.89:7878/index.php?r=app/index';*/
 //window.Interactivehost  = 'http://192.168.0.149:8001/index.php?r=app/index';

    //window.Interactivehost  = 'http://192.168.0.89:7878/index.php?r=app/index';
	  window.Interactivehost = 'http://192.168.0.56:1155/index.php?r=app/index'
  
  
   window.qiniuimgHost =  'http://oap3nxgde.bkt.clouddn.com/';
  //window.Interactivehost  = 'http://192.168.0.115:8001/index.php?r=app/index';
  //没有使用过度的返回页面的使用

  //本地缓存   对象列表 定义
  // window.LocalCacheStatelist  =  {
  //   shopCart:'YES',
  // };


  //路由改变监听  队列 处理事件
  window.stateChangeListen   ={};
  Server.factory('const',['$window','$ionicHistory','$timeout','$ionicNativeTransitions',function($window,$ionicHistory,$timeout,$ionicNativeTransitions){
      return{
        haha:'哈哈'
      }
    }])
    .factory('goodsState',[function(){
      return{
         Refresh:false,
         goods_basic_id:undefined,
         goods_title:undefined,
         img_url:undefined,
         activity_price:undefined,
         
      }
    }])
