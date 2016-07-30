/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('managementCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','storage',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,storage){

  $scope.newsList =[]
  $scope.expression=true;
  $scope.userid = storage.getObject('UserInfo').user_id;

  //加载
  $scope.loadOlderStories=function (type) {

    var sendoption  = {
      "interface_number": "000406",
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
  },600);


  $scope.deleteCompany=function (value,index) {

    $scope.userID = value;


    if($scope.userID==$scope.userid){
      $ionicPopup.alert({
        title:"不能对自己离职！",
        okText:'请重新操作'

      });
      return false;
    }

    var confirmPopup = $ionicPopup.confirm({

    title: '确定对员工离职?',


  });
    confirmPopup.then(function(res) {

      if(res) {
        Tools.getData({
          "interface_number": "000402",
          "post_content": {
            "token":"",
            "token_phone": "",
            "userId": value,
            "isSelf":"2"
          }

        },function(r){



          if(r.msg== "success"){
            Tools.rmArrin($scope.newsList,index);
            native.task('操作成功');

          }else{

            return false

          }


        });

        console.log('You are sure');
      } else {

        console.log('You are not sure');
      }
    });

  }


$scope.recharge = function (value) {

  $ionicPopup.show({
    template: '<input type="text" ng-model="data.wifi">',
    title: '充值积分',
    subTitle: '请输入充值积分数量<br>（余额：1000）',
    scope: $scope,
    buttons: [
      { text: '取消' },
      {
        text: '<b>确认</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            // 不允许用户关闭，除非输入 wifi 密码
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      },
    ]
  });

}




/*

  $scope.agreeSize = function(value,index) {

    var confirmPopup = $ionicPopup.confirm({
      /!*   buttons:[{text:"取消"},{text:"确认"}],*!/
      title: '同意申请人加入公司?',
      oktext:"确认",
      canltext:"取消"

    });
    confirmPopup.then(function(res) {

      if(res) {
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

        console.log('You are sure');
      } else {

        console.log('You are not sure');
      }
    });
  };



  $scope.refuseOne = function(value,index) {

    var confirmPopup = $ionicPopup.confirm({
      /!* buttons:[{text:"取消"},{text:"确认"}],*!/
      template: '拒绝申请人加入公司?'
    });
    confirmPopup.then(function(res) {

      if(res) {

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

        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
*/




}]);

