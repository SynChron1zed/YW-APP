/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicViewSwitcher',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicViewSwitcher) {



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            Initial();

            if(fromStateServ.getState('r.HomShopadmin')){
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.HomShopadmin').title;


                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.HomShopadmin';
                window.androdzerofun_clback  = function(){};


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
  $scope.addrs={}

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

        $scope.shopadmindata = r.resp_data;
        $scope.shopadmindata.basic_info.img_shop  =   window.qiniuimgHost+$scope.shopadmindata.basic_info.img_shop+'?imageView2/2/w/200/h/200';
        $scope.addrs.province =  $scope.shopadmindata.basic_info.province
        $scope.addrs.city=  $scope.shopadmindata.basic_info.city
        $scope.addrs.region =  $scope.shopadmindata.basic_info.region
        $scope.addrs.detailmsg= $scope.shopadmindata.basic_info.shop_addr

      }
    });
  }


  $scope.shopName = function () {
      $state.go('r.HomShopadminname',{nowname:$scope.shopadmindata.basic_info.shop_name});
  };

  $scope.shopBrief = function () {
    $state.go('r.HomShopadminbrief', {nowdec:$scope.shopadmindata.basic_info.description});
  };

  $scope.shopAddress = function () {
    $state.go('r.shopAddress',{province:$scope.addrs.province,city:$scope.addrs.city,region:$scope.addrs.region,detailmsg:$scope.addrs.detailmsg})
  }

  $scope.shopNumber = function () {
    $state.go('r.shopNumber',{Number:$scope.shopadmindata.basic_info.shop_phone})
  }

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
                                  native.task('修改店头像成功');

                        }

                      })


                    },'user_img')


                  })





  };


}]);
