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

  $scope.$on('$ionicView.beforeEnter',function(){

    $scope.loginboj = {};
    

            if(fromStateServ.getState('r.HomeSearch')){
              
                $scope.parenttitle     =   fromStateServ.getState('r.HomeSearch').title;
                $scope.ing  = false;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.HomeSearch';
                window.androdzerofun_clback  = function(){};




            }



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

$scope.myKeyup = function (e) {


  var keycode = window.event?e.keyCode:e.which;
  if(keycode==13){

    $scope.ShoppingList = [];
    if($scope.expression==true){
      $scope.expression =false;
      $ionicScrollDelegate.scrollTop();
    }
    $scope.expression = true;

    $scope.page_number  = 1
  }



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

  $scope.goodsdetail  = function(r){

    $state.go('r.Productdetails',{id:r.goods_basic_id})
    // fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }

  $scope.leftHide =function () {
    $ionicHistory.goBack()
  }

  $scope.homeSearch = function () {
    $ionicHistory.goBack()
  }


}]);
