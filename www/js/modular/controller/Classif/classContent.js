/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('classContentCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop,$stateParams) {

  $scope.bascId = $stateParams.id;
 $scope.title = $stateParams.Name;
  $scope.dataList = true;
  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.classContent').title;


  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };



  function  inlit   (){

    if($scope.guankao){ return false; }
    $scope.goodsdetail  = function(r){
     $state.go('r.Productdetails',{id:r.goods_basic_id});
    }



    $scope.scorllheader  =  {};
    var  gescoheight   =   function () {
      if(window.platform  == 'ios'){
        $scope.scorllheader  =  {
          height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight+6-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
        }
      }else{
        $scope.scorllheader  =  {
          height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight+26-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
        }
      }
    }
    gescoheight();
    $timeout(function() {
      gescoheight();
    },500)

    $scope.swatch   =  function(ff){

      if(!ff.select){
        angular.forEach($scope.claslist,function(zf){
          zf.select   = false;
        })
        ff.select  = true;
        $ionicScrollDelegate.$getByHandle('small').scrollTop(true);
        $timeout(function(){
          $scope.customcucdownlisloadMore(true)
        },200)
      }
    }
    Tools.getData({
      "interface_number": "020101",
      "post_content": {
        "sys_cate_id":$scope.bascId
      },

    },function (r) {

      if(r){

        if( r.resp_data==""){


        }else{
        angular.forEach(r.resp_data,function(ss) {
          ss.select  = false;
        });
        $scope.claslist  = r.resp_data;
        $scope.claslist[1].select  =  true;
        $scope.loadermoer  = true;

      }
      }
    })

    $scope.goodlist  = [];
    $scope.loadermoer  = false;
    $scope.pagenumber  = 1;
    $scope.customcucdownlisloadMore = function (ss) {

      if(ss){
        $scope.pagenumber  = 1;
      }
      var   parmsss  = undefined;
      angular.forEach($scope.claslist,function (sss) {
        if(sss.select){
          parmsss  =  sss.cate_id;
        }
      })
      if(!parmsss){
        return  false;
      }
      var pang  = $scope.pagenumber;
      Tools.getData({
        "interface_number": "020104",
        "post_content": {
          "cateId": parmsss,
          page_num:pang
        }
      },function (r) {

        $timeout(function(){
          $ionicScrollDelegate.$getByHandle('small').resize();
          $scope.$broadcast('scroll.infiniteScrollComplete');
        },200)
        if(r){
          if(r.resp_data.nextPage  ==  0 ){
            $scope.loadermoer  = false;
            $scope.pagenumber  = 1;
          }else  {
            $scope.loadermoer  = true;
            $scope.pagenumber  = r.resp_data.nextPage;
          }
          if(ss){
            $scope.goodlist = [];
            angular.forEach(r.resp_data.data,function(ff){
              ff.img_url   = window.qiniuimgHost+ff.img_url+'?imageView2/2/w/300/h/300';
              $scope.goodlist.push(ff);
            })
          }else{
            angular.forEach(r.resp_data.data,function(ff){
              ff.img_url   = window.qiniuimgHost+ff.img_url+'?imageView2/2/w/300/h/300';
              $scope.goodlist.push(ff);
            })
          }
        }
      })
    }





  }



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    if( $scope.loadermoer  != undefined){
      $scope.pagenumber  = 1;
      $scope.goodlist = [];
      $ionicScrollDelegate.$getByHandle('small').resize();
      $scope.loadermoer = true;
    }

    inlit();





  });




}]);

