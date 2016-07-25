/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicViewSwitcher',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicViewSwitcher) {
  

  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            console.log(fromStateServ.getState('r.HomShopadmin'))
            if(fromStateServ.getState('r.HomShopadmin')){
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.HomShopadmin').title;
            }

  });



  //去查看店铺主页
  $scope.shophome  =function (){
      if(storage.getObject('UserInfo').shop_id){  
        
        $state.go('r.Shophome',{id:storage.getObject('UserInfo').shop_id})
      }else{
        native.task('还没有加入公司');
      }      
  }
 


  $scope.shopadmindata=[];
  Tools.getData({
    "interface_number": "010101",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){      
      $scope.shopadmindata = (r.resp_data)

      


    }
  });


  $scope.shopName = function (Classitem) {
    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };
  $scope.shopBrief = function (Classitem) {

    $state.go('r.tab.HomShopadminbrief', {Classitem: Classitem});
  };

}]);
