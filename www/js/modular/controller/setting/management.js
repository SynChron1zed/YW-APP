/**
 * Created by Administrator on 2016/7/30.
 */


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('managementCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize','storage','fromStateServ',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize,storage,fromStateServ){

  $scope.newsList =[]
  $scope.expression=true;
  $scope.userid = storage.getObject('UserInfo').user_id;
  $scope.integralnew = $stateParams.integral;

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


    $ionicPopup.show({

      title: '确定对员工离职?',

      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

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


          }


        },
      ]
    });


  };


$scope.recharge = function (value) {

  $scope.data={}

  $ionicPopup.show({
    template: '<input type="text" ng-model="data.integral">',
    title: '充值积分',
    subTitle: '请输入充值积分数量<br>（余额：'+$scope.integralnew+'）',
    scope: $scope,
    buttons: [
      { text: '取消' },
      {
        text: '<b>确认</b>',
        type: 'button-positive',
        onTap: function(e) {


          if (!$scope.data.integral) {
            // 不允许用户关闭，除非输入 wifi 密码
            e.preventDefault();
          } else {
            console.log($scope.data.integral)
           $scope.integrals =  $scope.data.integral;
            Tools.getData({
              "interface_number": "000404",
              "post_content": {
                "token":"",
                "token_phone": "",
                "staffId":value,
                "integral":$scope.integrals

              }

            },function(r){


              if(r.msg== "success"){
                $scope.integralnew =   parseInt($scope.integralnew) - parseInt($scope.integrals)
                native.task('充值成功');
              }



            });

          }

          console.log(e)
        }
      },
    ]
  });





}


  $scope.handed = function (value) {
    $scope.data={}

    $ionicPopup.show({

      title: '移交管理员',
      subTitle: '移交权限需要重新登录，且本次操作不可逆，请确认是否移交?',
      scope: $scope,
      buttons: [
        { text: '取消' },
        {
          text: '<b>确认</b>',
          type: 'button-positive',
          onTap: function(e) {
            console.log(1)

            Tools.getData({
             "interface_number": "000403",
             "post_content": {
             "token":"",
             "token_phone": "",
             "userId":value

             }

             },function(r){

             if(r.msg== "success"){

             window.outlogin(function(){
             $timeout(function(){
             Initial();
             },30)
             })

               $state.go('r.tab.Settings');

             }



             });





          }


        },
      ]
    });

  }

//初始  信息
  function  Initial  (){

    var   user = storage.getObject('UserInfo');
    if(user.user_id){
      //登录了
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  =  window.qiniuimgHost+user.avatar+'?imageView2/2/w/300/h/300';
      //哈哈哈
      if(user.sex  =='0'){
        $scope.Userinfo.sex  =  './img/icon_man@3x.png';
      }else{
        $scope.Userinfo.sex  =  './img/icon_women.png';

      }
      $scope.Userinfo.login  = true;
      $scope.Userinfo.name  = user.real_name;
      Tools.getData({
        "interface_number": "050300",
        "post_content": {}
      },function(r) {
        if(r){
          $scope.Userinfo.integral   =     r.resp_data.integral;
        }
      })
    }else{
      //没有登录
      $scope.Userinfo = {};
      $scope.Userinfo.imgheader  = user.avatar  ;
      $scope.Userinfo.sex  =     user.sex;
      $scope.Userinfo.login  = false;
      $scope.Userinfo.integral    = user.integral
    }
  };




}]);

