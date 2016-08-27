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
