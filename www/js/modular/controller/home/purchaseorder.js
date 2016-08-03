/**
 * Created by Administrator on 2016 /21.
 */
Ctr.controller('purchaseorderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions) {





  $scope.$on('$ionicView.beforeEnter',function(){

            if(fromStateServ.getState('r.HomPurchase')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.HomPurchase').title;
            }else{
                $scope.showtitle  = false;

                  $scope.backv    =function (){

                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });

                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
                    }

                window.androdzerofun  = function(parm1,parm2){
                          $ionicNativeTransitions.stateGo('r.tab.Home',{}, {
                              "type": "slide",
                              "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
                              "duration": 400, // in milliseconds (ms), default 400
                            });

                            $timeout(function(){
                              $ionicHistory.clearHistory();
                            },100)
                }
                  window.androdzerofun_parms   ='tabswtathing';
                  window.androdzerofun_clback  = 'nothing';

            }
    });    

     $scope.$on('$ionicView.beforeLeave',function(){
            window.androdzerofun   =undefined;
    })



    



  $scope.datacaigou=true

  var bascId = $stateParams.datacaigou;
  $scope.ShoppingList = [];
  $scope.newexpression=false

  $scope.expression=true

  var pageNum = 0;
if(bascId==1){

  $scope.datacaigou=false

}

  $scope.statusData = ""
  $scope.expression=true;
  $scope.dataNew = false

  $scope.ShoppingList = [];

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020702",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "status": $scope.statusData
      }
    };

    if(type){
      sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }


    Tools.getData(sendoption,function(r){
      if(r){


        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }


          angular.forEach(r.resp_data.data,function(c){
            c.pic_path  =  window.qiniuimgHost+c.pic_path +'?imageView2/1/w/200/h/200';
            if(c.post_status=="2"){
              $scope.dataNew = true
            }

          });


        if(type){
          $scope.ShoppingList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.ShoppingList.push(c);
          });
        }

      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };







  $scope.all = true;
  $scope.dfk = false;
  $scope.dfc = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.ShoppingList=[];
    $scope.statusData = "";
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();


  };
  //待发货
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.statusData = "1";
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();

  };

  //待收货
  $scope.dfcs = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;
    $scope.statusData = '2'
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();


  };


  //已完成
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;
    $scope.statusData = '3'
    $scope.ShoppingList=[];
    $scope.expression  = true;
    $ionicScrollDelegate.scrollTop();

  };

  $scope.purchaseorde=function (value) {
    $state.go('r.tab.HomPurordersbody',{basicID:value});
  }


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+41)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+41)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


  /*//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomPurchase').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };*/


  $scope.dataLeft =function (value,id,index) {

    $ionicPopup.show({

      title: '确认收货?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "020605",
              "post_content": {
                "token":"",
                "token_phone": "",
                "orderId":value,
                "orderBasicId": id,
                "receive":1

              }

            },function(r){

              if(r.msg== "success"){


                Tools.rmArrin($scope.ShoppingList,index);
                native.task('成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });

  }

}]);
