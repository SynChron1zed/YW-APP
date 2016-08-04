/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','$ionicScrollDelegate','$ionicModal','$ionicHistory','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,$ionicScrollDelegate,$ionicModal,$ionicHistory,fromStateServ){


  $scope.expression=true;
   $scope.dataNew = false
$scope.dataList = false
  $scope.SalesList = [];
  $scope.statusData = ""
  $scope.datanum =  $stateParams.dataNum;
  $scope.$on('$ionicView.beforeEnter',function(){

    //页面的状态变化  请求


    if ($ionicHistory.backView().forwardViewId) {
      window.androdzerofun  = function(parm1,parm2){
        $ionicHistory.goBack();
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }
  });

  $scope.dataLeft = function (value,num,index) {

    $scope.Odid = value;
    $scope.Num = num
    $scope.index = index

    $scope.newmodal.show();


  }

  //加载
  $scope.loadOlderStories=function (type) {

   /* if(type=="2"){
      return false
    }*/
    var sendoption  = {
      "interface_number": "020701",
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
         /* if(c.post_status=="1"){
            $scope.dataNew = true;
          }else{
            $scope.dataNew = false
          }*/
        });


        if(type){
          $scope.SalesList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.SalesList.push(c);
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
    $scope.dataNew = false
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.statusData = "";
    $scope.SalesList = [];
    $ionicScrollDelegate.scrollTop();
    $scope.page_number=1;
    $scope.expression = true



  };
  //待发货
  $scope.dfks =  function  (){

    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;
    $scope.statusData = "1";
    $scope.SalesList = [];
    $ionicScrollDelegate.scrollTop();
    $scope.page_number=1;
    $scope.expression = true


  };

  //待收货
  $scope.dfcs = function  (){
    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;
    $scope.statusData = '2';
    $scope.SalesList = [];
    $scope.expression = true
    $ionicScrollDelegate.scrollTop();

  };


  //已完成
  $scope.dfns = function  (){
    $scope.dataNew = false
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;
    $scope.statusData = "3";
    $scope.SalesList = [];
    $scope.page_number=1;
    $scope.expression = true
    $ionicScrollDelegate.scrollTop();


  };

  $scope.ordersbody= function (value) {

    $state.go('r.tab.Homordersbody',{basicID:value});
  }
  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };


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


  $ionicModal.fromTemplateUrl('templates/newModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.newmodal = modal;
  });


  $scope.newQuery= function () {


    $scope.modal.hide()
    $scope.newmodal.show();
  }
  $scope.queryTwo =function () {
    $scope.newmodal.hide();
    $scope.dfks();
  }

  //物流单号

  $scope.deliveryList = function () {

    $scope.modal.show();
    $scope.expressionList = true;
    $scope.loadOlderStoriesList=function (type) {
debugger;
      var sendoption  = {
        "interface_number": "020704",
        "client_type": window.platform,
        "post_content": {
          "token":"",
          "token_phone": "",
          "token_phone": ""
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
            $scope.expressionList  = false;
            $scope.page_number  =1;
          }else{
            $scope.expressionList = true;
            $scope.page_number  =r.resp_data.nextPage;
          }


          angular.forEach(r.resp_data.data,function(c){

            c.pic_path  =  window.qiniuimgHost+c.pic_path +'?imageView2/1/w/200/h/200';
            /* if(c.post_status=="1"){
             $scope.dataNew = true;
             }else{
             $scope.dataNew = false
             }*/
          });


          if(type){
            $scope.SalesList  = r.resp_data.data;
          }else{
            angular.forEach(r.resp_data.data,function(c){
              $scope.SalesList.push(c);
            });
          }




        }
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });


    };



  };


  $scope.myKeyup = function(e){

    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){

      Tools.getData({
        "interface_number": "020704",
        "post_content": {
          "token":"",
          "token_phone": "",
          "keyword": $scope.data.companyname


        }

      },function(r){

        if(r.msg== "success"){
          $scope.dataList = true
          $scope.SalesList  = r.resp_data.data;

        }else{

          return false

        }


      });



    }
  };


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

$scope.query =function () {
  $scope.modal.hide();
  $scope.newmodal.show();
}

  $scope.goods = []
  $scope.SalesList=[]
  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
      $scope.goods.barcode   =  r.text;
      $scope.$apply();
    });
  }


  $scope.data = [];

  $scope.data.clientSide




  $scope.deliveryNew=function () {

    if(!$scope.data.clientSide){
      native.task('请选择物流!')
      return  false;
    }
    if(!$scope.goods.barcode){
      native.task('请填写单号!')
      return  false;
    }


    Tools.getData({
      "interface_number": "020706",
      "post_content": {
        "token":"",
        "token_phone": "",
        "orderId":$scope.Odid,
        "logistCompanyId": $scope.data.clientSide.logistics_company_id,
        "logistCompanyName": $scope.data.clientSide.logistics_company_name,
        "mailNo": $scope.goods.barcode

      }

    },function(r){

      if(r.msg== "success"){

        $scope.newmodal.hide();
        $scope.dfks();

      }else{

        return false

      }


    });

  }


  $scope.caklateheightList  = {};
  function   caklateheList  (){
    if(window.platform  == 'ios'){
      $scope.caklateheightList  = {
        height:window.innerHeight-(64+41)+'px'
      }
    }else{
      $scope.caklateheightList  = {
        height:window.innerHeight-(44+41)+'px'
      }
    }
  };
  caklateheList();
  $timeout(function(){
    caklateheList();
  },600)




  $scope.backtoprevView  =   fromStateServ.backView;
  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomSales').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };

  $scope.dataRight =function (value) {

    $state.go('r.Logistics',{id:value})
  }


}]);


