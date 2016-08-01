/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {


  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];


  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020202",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "searchParam": {
          "sys_cate_id": "2"         //代表只搜索 此分类下的商品
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
debugger;
        if(r.resp_data.nextPage  == 0 ){
          $scope.expression  = false;
          $scope.page_number  =1;
        }else{
          $scope.expression  = true;
          $scope.page_number  =r.resp_data.nextPage;
        }
        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

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

 /* Tools.getData({
    "interface_number": "020202",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){

    if(r){
      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

      });

      $scope.Taste = (r.resp_data.data)


    }
  });
*/

  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+166)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+166)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


}]);
