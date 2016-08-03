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
          
        }
        ,

      }

    }
  }])

  //模块权限
    .factory('ModuleArr',['storage',function(storage){ //登录 0，管理员 1，认证 2，诚信金3，加入公司4 1代表需要验证 0代表不需要验证
      return{

           setting:[{address:[1,0,0,0,0]},{two:[1,0,0,0,1]},{friends:[1,0,0,0,0]},{user:[0,0,0,0,0]},{we:[0,0,0,0,0]},{qiyesz1:[1,0,0,0,1],qiyesz2:[1,1,1,1,1]},{gerensz:[1,0,0,0,0]}],
           claasif:[0,0,0,0,0],
           shoppingcar:[1,0,0,0,0],
           shop:[{shopone:[0,0,0,0,0]},{addcar:[1,0,0,0,0]},{buy:[1,0,0,0,0]}],
           home:[{xiaoshou:[1,1,1,1,1]},{caigou:[1,0,0,0,0]},{jiaoyiliuchen:[0,0,0,0,0]},{dongtai:[0,0,0,0,0]},{tiyan:[0,0,0,0,0]},{cishan:[0,0,0,0,0]},{dianpuguanli:[1,1,1,1,1]},{shangpingunali:[1,1,1,1,1]},{shangpingfenlei:[1,1,1,1,1]}]
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

