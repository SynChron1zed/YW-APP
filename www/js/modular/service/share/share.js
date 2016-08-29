/**
 * Created by Why on 16/6/14.
 */
  //本地存储数据===================================
Server.factory('share',['$window','native',function($window,native){
  
  //是否安装微信
  function wechatishas  (sharego){
        if(window.platform  == 'android'){
            native.loading('启动微信...');
        }
        Wechat.isInstalled(function (installed) {
        if(!installed){
            native.hidloading()
            native.task('没有安装微信')
        }else{
            native.hidloading()
            sharego();
        }
       }, function (reason) {
            native.hidloading()
            native.task('打开微信失败')
      });
  }

  return{
    //微信分享
    weichat:function(config){

      wechatishas(function(){
        window.Wechat.share({
          message: {
            title: config.title?config.title:"默认标题",
            description: config.dec?config.dec:"默认描述",
            thumb: config.thumb?config.thumb:"http://oap3nxgde.bkt.clouddn.com/sys_yw.png?imageView2/2/w/200/h/200",
            mediaTagName: "TEST-TAG-001",
            messageExt: "易物宜得",
            messageAction: "<action>dotalist</action>",
            media: {
              type: window.Wechat.Type.LINK,
              webpageUrl:config.webURL?config.webURL:"http://www.ywyde.com/"
            }
          },
          scene: config.type?config.type:window.Wechat.Scene.SESSION   // share to TIMELINE
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
