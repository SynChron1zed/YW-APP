/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('NewnewsCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,fromStateServ){



  

  $scope.newsList =[]
  //$scope.expression=true


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020003",
      "client_type": window.platform,
      "post_content": {
        "token":"",
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
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/2/w/200/h/200/q/100';

        });

        if(type){
          $scope.newsList  = r.resp_data.data;
        }else{
          angular.forEach(r.resp_data.data,function(c){
            $scope.newsList.push(c);
          });
        }




      }
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });


  };


  //最新动态详情'',

  $scope.newsContent = function (value) {

    $state.go('r.homeNewsContent',{postID:value});
  };

  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {


    if($scope.newsList.length==0){

      $scope.loadOlderStories();
    }
    if (fromStateServ.getState('r.homeNews')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.homeNews').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.homeNews';
      window.androdzerofun_clback = function () {
      };


    }
  });

  $scope.caklateheight  = {};

  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+44+30-95)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+44+30-95)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

}]);
