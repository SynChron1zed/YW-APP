/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicViewSwitcher',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicViewSwitcher) {




  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
            Initial  ();
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


  function  Initial  (){

    Tools.getData({
      "interface_number": "010101",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){

        $scope.shopadmindata = (r.resp_data);

        $scope.shopadmindata.basic_info.img_shop  =   window.qiniuimgHost+$scope.shopadmindata.basic_info.img_shop+'?imageView2/1/w/200/h/200';



      }
    });

    



  }




  $scope.shopName = function (Classitem) {
    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };
  $scope.shopBrief = function (Classitem) {
    $state.go('r.tab.HomShopadminbrief', {Classitem: Classitem});
  };

  $scope.goodspice  = [];
  $scope.selectpir  = function (){
                Tools.chekpirc({
                    allowEdit:true
                  },function(r){
                    Tools.sendqiniu_queue([r],function(f){
                      Tools.showlogin();
                      Tools.getData({
                          "interface_number": "010102",
                          "post_content": {
                                "img_shop":f[0].key,
                            }
                            
                      },function(s){
                        if(s){
                                 $scope.shopadmindata.basic_info.img_shop  =   r;
                                //$scope.$apply();
                                  native.task('修改店头像成功');
                        }
                      })
                    },'user_img')
                  })





  };


}]);
