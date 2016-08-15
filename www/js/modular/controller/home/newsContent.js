/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('newsContentCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,fromStateServ){

 $scope.Postid = $stateParams.postID;


  $scope.$on('$ionicView.beforeEnter',function(event, data){
 

    if(fromStateServ.getState('r.homeNewsContent')   &&  !$stateParams.inside ){
      $scope.showtitle  = true;
      $scope.backtoprevView  =   fromStateServ.backView;
      $scope.parenttitle     =   fromStateServ.getState('r.homeNewsContent').title;
    }else{
      $scope.showtitle  = false;
    }
    if(!$scope.parenttitle){
      $scope.parenttitle  = '返回';
    }
    init();
  });

 function  init() {

   Tools.getData({
     "interface_number": "020004",
     "post_content": {
       "token":"",
       "token_phone": "",
       "articleId": $scope.Postid
     }

   },function(r){


     if(r.msg== "success"){

       r.resp_data.qiniu_key  =  window.qiniuimgHost+r.resp_data.qiniu_key +'?imageView2/2/w/200/h/200';
       $scope.newsList = r.resp_data

       $scope.myHtml=r.resp_data.content




     }else{
       $timeout(function(){

         if($scope.showtitle){
           $scope.backtoprevView('r.homeNewsContent');
         }else{
           $ionicHistory.goBack();
         }


       },420)

     }


   });




 }









}]);

