/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('informationCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,fromStateServ){

  $scope.newsList =[]
  //$scope.expression=true;





  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.$on('$ionicView.beforeEnter',function() {


    if($scope.newsList.length==0){
      $scope.loadOlderStories();
    }
    if (fromStateServ.getState('r.information')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.information').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.information';
      window.androdzerofun_clback = function () {
      };


    }
  });



  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "000400",
      "client_type": window.platform,
      "post_content": {
        "token":"",
        "token_phone": "",
        "count": "0"
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

  $scope.agreeSize = function(value,index) {

    $ionicPopup.show({

      title: '同意申请人加入公司?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "000401",
              "post_content": {
                "token":"",
                "token_phone": "",
                "userId": value,
                "isPass": "1"
              }

            },function(r){



              if(r.msg== "success"){
                Tools.rmArrin($scope.newsList,index);
                native.task('成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });

  };



  $scope.refuseOne = function(value,index) {


    $ionicPopup.show({

      title: '拒绝申请人加入公司?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
              "interface_number": "000401",
              "post_content": {
                "token":"",
                "token_phone": "",
                "userId": value,
                "isPass": "0"
              }

            },function(r){


              if(r.msg== "success"){
                Tools.rmArrin($scope.newsList,index);
                native.task('成功');

              }else{

                return false

              }


            });


          }


        },
      ]
    });


  };




  }]);

