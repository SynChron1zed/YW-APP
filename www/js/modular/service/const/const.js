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

  Server.factory('const',['$window','$ionicHistory','$timeout','$ionicNativeTransitions','storage',function($window,$ionicHistory,$timeout,$ionicNativeTransitions,storage){
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



//验证状态
  .factory('selectArr',['storage',function(storage){
    return{
      userid:storage.getObject('UserInfo').user_id,
      isadmin:storage.getObject('UserInfo').is_admin,
      iscampany:storage.getObject('UserInfo').company_id,
      authstatus:storage.getObject('UserInfo').auth_status,
      needpaid:storage.getObject('UserInfo').need_paid,
      selectarrs:[storage.getObject('UserInfo').user_id,storage.getObject('UserInfo').is_admin,storage.getObject('UserInfo').company_id,storage.getObject('UserInfo').auth_status,storage.getObject('UserInfo').need_paid]

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

