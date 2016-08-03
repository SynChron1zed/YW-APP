/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('companyInstallCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','storage','fromStateServ','selectaouthfunl',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,storage,fromStateServ,selectaouthfunl){



  $scope.goselectaouth  =  function  (){
      selectaouthfunl.state=true;
      $state.go('r.selectAuth');
  }




  $scope.expression = true;
  $scope.newexpression =true;
  $scope.companyID = storage.getObject('UserInfo').company_id;
  $scope.companyName = storage.getObject('UserInfo').company_name;
  $scope.adminer = storage.getObject('UserInfo').is_admin;
  $scope.userid = storage.getObject('UserInfo').user_id;

  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    Initial ();
  });
  
  if($scope.adminer == "1"){
    $scope.newexpression = true
  }else {
    $scope.newexpression = false
  }


function Initial() {

  Tools.getData({
    "interface_number": "000405",
    "post_content": {
      "token":"",
      "token_phone": "",

    }

  },function(r){

    if(r.msg== "success"){
      $scope.auth =r.resp_data.is_auth;
      if($scope.auth=="0"){
        $scope.autName="未认证"
        $scope.expression = false;
      }else if($scope.auth=="1"){
        $scope.autName="审核中"
      }else if($scope.auth=="2"){
        $scope.autName="审核通过";
      }else if($scope.auth=="3"){
        $scope.autName="审核失败"
      }


      $scope.integral =r.resp_data.integral

    }else{

      return false

    }


  });

}






$scope.Unauthorized=function () {
  alert('前往认证页面')
}

$scope.goManagement = function (value) {
  $state.go('r.tab.management',{integral:value})
}

  //解除绑定
$scope.deleteCompany=function () {

if($scope.adminer == "0"){

  $ionicPopup.alert({
    title:"请先移交管理员！",
    okText:'确定'

  });
  return false;
}else {

  Tools.getData({
    "interface_number": "000402",
    "post_content": {
      "token":"",
      "token_phone": "",
      "userId": $scope.userid,
      "isSelf":"1"
    }

  },function(r){

    if(r.msg== "success"){

      native.task('解绑成功');
      window.outlogin(function(){
        $timeout(function(){
          newInitial();
        },30)
      })

      $state.go('r.tab.Settings');
    }else{

      return false

    }


  });


}


}

  //初始  信息
  function  newInitial  (){

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



  //商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$stateChangeSuccess',function(){

    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.companyInstall').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };



}]);
