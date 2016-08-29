/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state','fromStateServ','$timeout',function($scope,storage,Tools,native,$state,fromStateServ,$timeout){



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
        
}])

