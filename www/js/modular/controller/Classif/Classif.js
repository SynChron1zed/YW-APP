/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {




    $scope.goodsdetail  = function(r){
        fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
    }

 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });






  var cateId = 1;
  $scope.imageshow=true;
  $scope.imagehide =false;
  $scope.newexpression=false

  $scope.expression=true
  //商城分类
  $scope.ShoppingList=[];
    Tools.getData({
      "interface_number": "020101",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.Citysddd = (r.resp_data)
        $scope.selectedItem = $scope.Citysddd[0];

      }
    });


  //广告位

  Tools.getData({
    "interface_number": "050401",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "type": "2", //分类
    }
  },function(r){
    if(r){

      angular.forEach(r.resp_data,function(c){
        c.qiniu_key  =  window.qiniuimgHost+c.qiniu_key+'?imageView2/1/w/200/h/200';

      });
      $scope.Citysd = (r.resp_data[0])


    }
  });

  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "020104",
      "client_type": window.platform,
      "post_content": {
        "token": "",
        "token_phone": "",
        "cateId": cateId,
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
    "interface_number": "020104",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "cateId":1,
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

      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
        c.ctr  = false;
      });

      $scope.ShoppingList = (r.resp_data.data)

    }
  });*/


  //点击分类
  $scope.shoppingsList=function (item) {
    $scope.expression = true;
    pageNum = 0
    $scope.ShoppingList=[];
    $scope.selectedItem = item;
     cateId= item.cate_id;
    $ionicScrollDelegate.scrollTop();

/*    Tools.getData({
      "interface_number": "020104",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "cateId":cateId,
        "page_num": 1,
        "page_per":10
      }
    },function(r){
debugger;
      if(r){

        angular.forEach(r.resp_data.data,function(c){
          c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
          c.ctr  = false;
        });

        $scope.ShoppingList = (r.resp_data.data)

      }
    });*/
  };



  $scope.proDetail = function (r,Classitem) {

    fromStateServ.stateChange(r,{Classitem: Classitem});
  };


/*  //翻页加载
   $scope.loadOlderStories=function (type) {

         pageNum +=1;
        if(cateId==""){
         cateId=1
     }




       Tools.getData({
         "interface_number": "020104",
         "client_type": window.platform,
         "post_content": {
           "token": "",
           "token_phone": "",
           "cateId":cateId,
           "page_num": pageNum,
           "page_per": 10
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
             $scope.ShoppingList=$scope.ShoppingList

           } else {
             $scope.newexpression=false
              if(pageNum==1){
                r.resp_data.data=[];
              }
             for(var i=0;i<r.resp_data.data.length;i++){
               $scope.ShoppingList.push(r.resp_data.data[i])
             }
           }
           $timeout(function () {
             $scope.$broadcast('scroll.infiniteScrollComplete');
           }, 600);

         }


       });



   };*/




  //阴影层
  $scope.action = function() {
    $ionicBackdrop.retain();
    $timeout(function() {    //默认让它1秒后消失
      $ionicBackdrop.release();
    }, 1000);
  };



  $scope.caklateheight  = {};
  function   caklatehe  (){
    if(window.platform  == 'ios'){
      $scope.caklateheight  = {
        height:window.innerHeight-(64+216)+'px'
      }
    }else{
      $scope.caklateheight  = {
        height:window.innerHeight-(44+216)+'px'
      }
    }
  };
  caklatehe();
  $timeout(function(){
    caklatehe();
  },600)


  $scope.newcaklateheight  = {};
  function   newcaklatehe  (){

    if(window.platform  == 'ios'){
      $scope.newcaklateheight  = {
        width:window.innerWidth+'px'
      }
    }else{
      $scope.newcaklateheight  = {
        width:window.innerWidth+'px'
      }
    }
  };
  newcaklatehe();
  $timeout(function(){
    newcaklatehe();
  },600)



}]);

