/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout) {


  $scope.SalesList = [];
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
      }
      $scope.SalesList = (r.resp_data.data)
       console.log($scope.SalesList)
   ;
      $scope.post_status=[];

    }
  });



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
        }
        $scope.SalesList = (r.resp_data.data)
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
        }
        $scope.SalesList = (r.resp_data.data)
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
        }
        $scope.SalesList = (r.resp_data.data)
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
        }
        $scope.SalesList = (r.resp_data.data)
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

}]);


