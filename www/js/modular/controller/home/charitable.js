/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('chariCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop','selectArr',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop,selectArr) {



  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];

var a = selectArr.selectarrs;

  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020201",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",

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
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';

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


  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+151)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+151)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)

//广告位接口
  Tools.getData({
    "interface_number": "050401",
    "post_content": {
      "token":"",
      "token_phone": "",
      "type": "1"
    }

  },function(r){



    if(r.msg== "success"){
      angular.forEach(r.resp_data,function(c){
        c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/2/w/828/h/362';
      })
      $scope.guankao   =   r.resp_data;

    }else{

      return false

    }


  });

  $scope.gogunal  =  function(item){
    if(item.request_type  == '1'){
      $state.go('r.homeNewsContent',{postID:item.request_id});
    }else  if(item.request_type  == '2'){
      $state.go('r.Shophome',{id:item.request_id});
    }else  if(item.request_type  == '3'){
      $state.go('r.Productdetails',{id:item.request_id});
    }else{
      native.task('活动暂未开始');
    }
  }


  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.HomeCharitable').title;
  });


  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };



  $scope.goodsdetail  = function(r){

    $state.go('r.Productdetails',{id:r.goods_basic_id})
   // fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }

}]);
