/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout','$state','$ionicHistory','storage','fromStateServ','$ionicScrollDelegate','Tools',function($scope,$ionicPopover, $ionicPopup,$timeout,$state,$ionicHistory,storage,fromStateServ,$ionicScrollDelegate,Tools) {




//切换到登录   login 
function   login   (){
        $ionicPopup.confirm({
        title: '<strong>你还没有登录</strong>',
        okText: '登录',        
        cancelText: '取消'        
      }).then(function(aa){
        if(aa){
            fromStateServ.stateChange('r.login');
        }
      })
};

$scope.getMdl   =      fromStateServ.stateChange;
$scope.Personalsetting  = function (){
   if(!storage.getObject('UserInfo').user_id){
        login();
   }else{
       $state.go('r.tab.SettingsUpdate');
   }


}






 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    Initial();    
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });

  

  $scope.outlogin  =   function (){
       $ionicPopup.confirm({
        title: '<strong>退出登录?</strong>',
        template: '你确定要退出当前用户吗?',
        okText: '登出',
        cancelText: '取消'
      }).then(function(aa){
            if(aa){
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
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/1/w/300/h/300';
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
  }

        $scope.opencustomenuatts  = false;

        $scope.showco  =   function  () {

              window.document.querySelector('#ahseetparn').style.zIndex  =  '2';
              $scope.opencustomenuatts   = true;
        } 

         $scope.closecustomenu  =   function  () {
              $scope.opencustomenuatts   = false;
              setTimeout(function(){
                  window.document.querySelector('#ahseetparn').style.zIndex  =  '-1';
              },400)
            }
            
         $scope.$on('$ionicView.beforeLeave',function(){
           $scope.closecustomenu();
         })



  }]);
