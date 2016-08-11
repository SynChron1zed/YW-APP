/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {

  $scope.back  =  function (){
      $rootScope.$ionicGoBack();
  };
  $scope.ShoppingList=[];

  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomeSearch').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.msg={};
  $scope.clear  = function(){
    $scope.msg.key   =undefined;
  }

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020204",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "searchParam": {
          "keyword": $scope.msg.key         //代表只搜索 此分类下的商品
        },
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
          c.img_url  =  window.qiniuimgHost+c.img_url +'?imageView2/1/w/200/h/200';


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

$scope.handleinputkey = function () {

  $scope.ShoppingList = [];
  $scope.expression = true

}


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(44)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(24)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)
}]);
