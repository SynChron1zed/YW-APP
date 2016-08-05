/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory','selectArr','selectaouthfunl',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory,selectArr,selectaouthfunl) {




$scope.aouthc =  function () {

    $scope.goModular('r.selectAuth');
       
}

  //慈善

  $scope.charitable =  function () {

    $scope.goModular('r.HomeCharitable');

  }

  //体验

  $scope.tastetable =  function () {

    $scope.goModular('r.HomTaste');

  }

//查看物流
$scope.showlogistics  =  function () {
      //160719000024
      //160715000053
      //$scope.goModular('r.Logistics',{id:'160719000024'});
}

  $scope.goshopin =  function (tart) {
      $scope.goModular('r.Shophome',{id:tart.shop.shop_id});
  }
  //广告位
  Tools.getData({
        "interface_number": "050401",
        "post_content": {
        "type": "0",
        }
    },function(r){
      if(r){
            angular.forEach(r.resp_data,function(fff){
                fff.qiniu_key  =  window.qiniuimgHost+fff.qiniu_key+'?imageView2/2/w/828/h/362';
            })
            $scope.guankao   =   r.resp_data;
      }
    })

    $scope.gogunal  =  function(item){
       if(item.request_type  == '1'){
          fromStateServ.stateChange('r.homeNewsContent',{postID:item.request_id});
       }else  if(item.request_type  == '2'){
         fromStateServ.stateChange('r.Shophome',{id:item.request_id});
       }else  if(item.request_type  == '3'){
          fromStateServ.stateChange('r.Productdetails',{id:item.request_id});
       }else{
         native.task('活动暂未开始');
       }
    }





  // $scope.judge =selectArr.selectarrs;
  // $scope.select = ModuleArr


  $scope.jindian  =  function () {

        native.Barcode(function (rr) {
          if(!rr.cancelled){
                if(rr.text){
                    $scope.goModular('r.Shophome',{id:rr});
                }
          }


        })
  };

  $scope.xiaoshouorder = function (r) {

      fromStateServ.stateChange('r.HomSales');

  }

  $scope.caigoudindan1  =function () {

     if(storage.getObject('UserInfo').user_id){
      $scope.gosales('r.HomPurchase');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  $scope.shomsge  =function (value) {




     if(storage.getObject('UserInfo').user_id){

                 $scope.gosales('r.HomShopadmin');


      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  //商品详情
  $scope.goodsdetila  =  function () {
    $scope.goModular('r.Productdetails',{id:192});
  }


 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
       window.androdzerofun  =  undefined
       window.androdzerofun_parms  =undefined;
       window.androdzerofun_clback  = undefined;
    });

$scope.gosales=function (r) {
  fromStateServ.stateChange(r);
}


    $scope.a1 = function (){

      $scope.goModular('r.Shophome',{id:'4'});

    };


    //商品分类
    $scope.goodsClass  = function (){

      if(storage.getObject('UserInfo').user_id){


                  $scope.goModular('r.goodsclasslist')

      }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });

      }

    }

    //商品管理
    $scope.goodmsg =  function (){

    if(storage.getObject('UserInfo').user_id){

                $scope.goModular('r.listofgoods')


    }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });


    }
    }

    $scope.goModular  =    function(r,p){
        fromStateServ.stateChange(r,p);
    };


    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.company = (r.resp_data.data)

      }
    });

  Tools.getData({
    "interface_number": "020002",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.news = (r.resp_data.data)

    }
  });



  //最新动态
  $scope.Newnews = function (r) {


    fromStateServ.stateChange(r);
  };



}]);
