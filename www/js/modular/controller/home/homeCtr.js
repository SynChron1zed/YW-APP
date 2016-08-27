/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory','selectArr','selectaouthfunl','seeshopPint','$http','share',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory,selectArr,selectaouthfunl,seeshopPint,$http,share) {


window.share  = share;
$scope.paly  = function () {
  share.weichat()
  // Tools.pay.alipaly({
  //   type:1,
  //   buyer_id:1222,
  //   money:1.00
  // },function(r){
  //   console.log(r)
  // },function(r){
  //   console.log(r)
  // });
}





$scope.paly =  function(){

}

$scope.catshowtakepint  = function () {
  seeshopPint.datalist  = [
    {
      name:'我是自提点',
      lat:28.188874,
      lng:112.991093,
      link:13517437502,
      business:'早上7点到晚上12点1111',
      opsition:'xxx小学校，距离xxx多少米'
    },
     {
      name:'我是自提点',
      lat:28.188464,
      lng:112.991093,
      link:13517437502,
      business:'早上7点到晚上12点',
      opsition:'xxx小学校，距离xxx多少米'
    }
  ];

fromStateServ.stateChange('r.SeeshopPint',{name:'测试的店铺'});


}

  //打开一个浏览器
  $scope.openinboower  =function () {
  }

  $scope.aouthc =  function () {
    $scope.goModular('r.selectAuth');
  }
  //慈善

  $scope.charitable =  function () {

   // native.task('该活动暂未开放，敬请期待');
   // return false;
   // $scope.goModular('r.HomeCharitable');


    if(storage.getObject('UserInfo').user_id){
      $scope.goModular('r.stretchOne');
    }else{
      native.confirm('该操作需要登录','您还未登录',['登录','取消'],function(c){
        if(c  == 1){
          $scope.goModular('r.login');
        }
      });
    }

  }

  //体验

  $scope.tastetable =  function () {

    $scope.goModular('r.HomTaste');
  }

//查看物流
$scope.showlogistics  =  function () {
      //160719000024
      //160715000053
    $scope.goModular('r.Logistics',{id:'160719000024'});
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
       }else  if(item.request_type  == '4'){

         fromStateServ.stateChange('r.stretchOne',{id:item.request_id});
       }
       else{
         native.task('活动暂未开始');
       }
    }





  // $scope.judge =selectArr.selectarrs;
  // $scope.select = ModuleArr


  $scope.jindian  =  function () {

        native.Barcode(function (rr) {


          if(!rr.cancelled){

                if(rr.text){



                    if(rr.text.length  == 12){

                      Tools.showlogin();
                      Tools.getData({
                          "interface_number": "020605",
                          "post_content": {
                          "orderId": rr.text,
                          "r_token": "sanReceive",
                          "receive":1
                          }
                      },function (r) {
                        if(r){
                          native.task('自提订单验证成功',4000);
                        }
                      })
                    }else if( rr.text.length  == 10 ){



                      Tools.showlogin();
                      Tools.getData({
                       "interface_number": "020708",
                        "client_type": "ios",
                        "post_content": {
                          key:rr.text
                        }
                      },function (r) {
                        if(r){
                        native.confirm(r.resp_data.real_name+'正在向你支付:￥'+r.resp_data.payMoney,'提示',['收款','取消'],function(c){
                        if(c  == 1){
                            Tools.showlogin();
                            Tools.getData({
                            "interface_number": "020709",
                              "post_content": {
                                ensureCharge:'1',
                                key:rr.text
                              }
                            },function (ff) {
                              if(ff){

                                  native.task('收款成功');
                              }

                            })


                          }
                      });



                        }
                      })


                    }
                    else{
                        $scope.goModular('r.Shophome',{id:rr.text});
                    }




                }
          }


        })
  };

  $scope.xiaoshouorder = function (r) {

      fromStateServ.stateChange('r.HomSales');

  }
  $scope.searchBody=function () {
    fromStateServ.stateChange('r.HomeSearch');
  }


  $scope.caigoudindan1  =function () {

     if(storage.getObject('UserInfo').user_id){
      $scope.gosales('r.HomPurchase');
      }else{
        native.confirm('该操作需要登录','您还未登录',['登录','取消'],function(c){
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
        native.confirm('该操作需要登录','您还未登录',['登录','取消'],function(c){
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
      newsList();

       window.androdzerofun  =  function(r,b){
         window.extapp()
       }
       window.androdzerofun_parms  ='ffffff';
       window.androdzerofun_clback  = 'xxxx';
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

        native.confirm('该操作需要登录','您还未登录',['登录','取消'],function(c){
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

        native.confirm('该操作需要登录','您还未登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });


    }
    }

    $scope.goModular  =    function(r,p){
        fromStateServ.stateChange(r,p);
    };




  function newsList() {
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


    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){

      if(r){

        angular.forEach(r.resp_data.data,function(c){
          c.shop.img_shop  =  window.qiniuimgHost+c.shop.img_shop+'?imageView2/2/w/200/h/200/q/100';

        });
        $scope.company = (r.resp_data.data)

      }
    });
  }





  //最新动态
  $scope.Newnews = function (r) {


    fromStateServ.stateChange(r);
  };

  $scope.flow=function (r) {

    fromStateServ.stateChange(r);
  }


  //诚信企业
  $scope.moreCompany = function (r) {

    fromStateServ.stateChange(r);
  };
}]);
