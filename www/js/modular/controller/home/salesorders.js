/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicScrollDelegate',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicScrollDelegate) {







  $scope.SalesList = [];
  var pageNum = 0;
  $scope.newexpression=false
  $scope.expression=true



  //翻页加载
  $scope.loadOlderStories=function (type) {

    pageNum +=1;


    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": pageNum,
        "page_per":10
      }
    }, function (r) {
      if (r) {

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });

        if (r.resp_data.data.length == 0) {
          $scope.expression = false
          $scope.newexpression=true
          $scope.SalesList=$scope.SalesList

        } else {
          $scope.newexpression=false

          for(var i=0;i<r.resp_data.data.length;i++){
            $scope.SalesList.push(r.resp_data.data[i])
          }
        }
        $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 600);

      }


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

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)


        $scope.post_status=[];

      }
    });

  };
  //待发货
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfc = false;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "1",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });
  };

  //待收货
  $scope.dfcs = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = true;
    $scope.dfh = false;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "2",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

  };


  //已完成
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfc = false;
    $scope.dfh = true;

    Tools.getData({
      "interface_number": "020701",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "status": "4",
        "page_num": 1,
        "page_per":10
      }
    },function(r){
      if(r){
        if(r.resp_data.data.length==10){
          $scope.expression=true
        }else{
          $scope.expression=false
          $scope.newexpression=true
        }
        $scope.SalesList = (r.resp_data.data)
        $ionicScrollDelegate.scrollTop();
        console.log($scope.SalesList)

        $scope.post_status=[];

      }
    });

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

  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);
  };








}]);


