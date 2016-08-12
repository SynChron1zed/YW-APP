/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {





function  inlit   (){


  if($scope.guankao){ return false; }
  $scope.goodsdetail  = function(r){
        fromStateServ.stateChange('r.Productdetails',{id:r.goods_basic_id});
  }
  
    Tools.getData({
        "interface_number": "050401",
        "post_content": {
        "type": "2",
        }
    },function(r){
      if(r){
            angular.forEach(r.resp_data,function(fff){
                fff.qiniu_key  =  window.qiniuimgHost+fff.qiniu_key+'?imageView2/2/w/828/h/362';
            })
            $scope.guankao   =   r.resp_data;
      }
    })  
    $scope.gogunal  =  function(item){
       if(item.request_type  == '1'){
          fromStateServ.stateChange('r.homeNewsContent',{postID:item.request_id});
       }else  if(item.request_type  == '2'){
         fromStateServ.stateChange('r.Shophome',{id:item.request_id});
       }else  if(item.request_type  == '3'){
          fromStateServ.stateChange('r.Productdetails',{id:item.request_id});
       }else{
         native.task('活动暂未开始');
       }
    }






    $scope.scorllheader  =  {};
    var  gescoheight   =   function () {
          if(window.platform  == 'ios'){
              $scope.scorllheader  =  {
                height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight-64-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
              } 
          }else{
        $scope.scorllheader  =  {
            height:( window.innerHeight-window.document.querySelector('.tab-nav').offsetHeight-44-window.document.querySelector('.casdawwwwww').offsetHeight)+'px'
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
    "post_content": {}
    },function (r) {
       if(r){
         angular.forEach(r.resp_data,function(ss) {
            ss.select  = false;
         });
         $scope.claslist  = r.resp_data;
         $scope.claslist[0].select  =  true;
          $scope.loadermoer  = true;

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
     if ($ionicHistory.backView()) {

       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }

      inlit();
    });




}]);

