/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout','$state','$ionicHistory','storage','fromStateServ','$ionicScrollDelegate','Tools',function($scope,$ionicPopover, $ionicPopup,$timeout,$state,$ionicHistory,storage,fromStateServ,$ionicScrollDelegate,Tools) {
  
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

  $scope.getMdl   =      fromStateServ.stateChange;
  $scope.Userinfo = {};
  $scope.Userinfo.imgheader  = window.defaultUserheader  ;  
  $scope.Userinfo.sex  =  './img/icon_man@3x.png';


  

  

  //初始  信息
  function  Initial  (){
      Tools.getData({
        "interface_number": "050300",
        "post_content": {}        
      },function(r) {
        if(r){
          console.log(r);
        }
      })
  }





  }]);
