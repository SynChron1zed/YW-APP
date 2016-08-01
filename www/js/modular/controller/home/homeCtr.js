/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory) {
  $scope.jindian  =  function () {

        native.Barcode(function (rr) {
          
          console.log(rr);

          $scope.goModular('r.Shophome',{id:rr});
        })
  };

  $scope.xiaoshouorder = function () {  
     if(storage.getObject('UserInfo').user_id){
      $state.go('r.tab.HomSales');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }

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


  $scope.shomsge  =function () {
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
