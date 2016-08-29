/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state','fromStateServ','$timeout','share',function($scope,storage,Tools,native,$state,fromStateServ,$timeout,share){



  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingOne')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingOne').title;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingOne';
                window.androdzerofun_clback  = function(){};
            }else{
                $scope.showtitle  = false;
            }
            $scope.initialize();
  })
  








$scope.initialize  =  function(){
  Tools.getData({
    "interface_number": "050203",
    "post_content": {
      "token":"",
      "token_phone": ""
    }
  },function(r){
    if(r){  
       $scope.one = r.resp_data.one;
       $scope.count = r.resp_data.total_count;
       $scope.rebate = r.resp_data.total_rebate
    }   
  });
}




$scope.yaoqing =   function(){
  $scope.setallcationstate =  true;
}
  $scope.stopporp  = function (e) {
        e.stopPropagation();
    }
  $scope.closetallcationvalue  =   function(){
            $scope.setallcationstate  =  false;
            var  c   =   document.querySelector('#cutom_sheetsharer');
            c.className = "action-sheet-backdrop";
            $timeout(function(){
                c.className  ="action-sheet-backdrop cutom-sheet"
            },400);            
};

$scope.getyaoqincode  = function(xxx){
  Tools.showlogin();
  Tools.getData({
       "interface_number": "050206",
       "post_content": {
      }
  },function(r){
    if(r){
        if(xxx  == 1){
                share.weichat({
                  title:'欢迎加入易物宜得',
                  description:r.resp_data.msg,
                })
        }else if(xxx  == 2){
              share.weichat({
                  title:'欢迎加入易物宜得',
                  description:r.resp_data.msg,
                  type:window.Wechat.Scene.TIMELINE
                })
        }
    }
  })
}



$scope.wei = function(){
  //$scope.getyaoqincode(1)
  native.task('该功能在下一个版本,上线')
}
$scope.penyouq = function(){
  //$scope.getyaoqincode(2)
  native.task('该功能在下一个版本,上线')
}
$scope.qq = function(){
  native.task('该功能在下一个版本,上线')
  //$scope.getyaoqincode(2)
}














        
}])

