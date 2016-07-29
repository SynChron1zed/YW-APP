/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('NewnewsCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,fromStateServ){

  var pageNum = 0;
  $scope.newexpression=false
  $scope.newsList =[]
  $scope.expression=true


  $scope.loadOlderStories=function (type) {

    if(type==true){
      pageNum=0;
      $scope.newexpression=false
      $scope.newsList =[]
      $scope.expression=true

    }

    pageNum +=1;
    Tools.getData({
      "interface_number": "020003",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "page_num":pageNum,
        "page_per": 10

      }
    }, function (r) {
      if (r) {


        angular.forEach(r.resp_data.data,function(c){
          c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/1/w/200/h/200';

        });

        if (r.resp_data.data.length == 0  ) {
          $scope.expression = false
          $scope.newexpression=true
          $scope.newsList = $scope.newsList;

        } else {
          $scope.newexpression=false
          for(var i=0;i<r.resp_data.data.length;i++){
            $scope.newsList.push(r.resp_data.data[i])
          }

       /*   if(r.resp_data.nextPage==0){
            $scope.expression = false
            $scope.newexpression=true
          }*/
        }
        $timeout(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.$broadcast('scroll.refreshComplete');
        }, 600);
      }
    });
  };


  //最新动态详情'',

  $scope.newsContent = function (value) {

    $state.go('r.homeNewsContent',{postID:value});
  };

  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.homeNews').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };


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
