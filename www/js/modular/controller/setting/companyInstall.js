/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('companyInstallCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','storage','fromStateServ','selectaouthfunl','selectArr','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,storage,fromStateServ,selectaouthfunl,selectArr,$ionicHistory){



  $scope.chongzhi1  =function(){

         native.confirm('充值积分','提示',['充值','取消'],function(c){
          if(c  == 1){
             $state.go('r.Inputamount',{type:3});
          }
        });


  }

  $scope.goselectaouth  =  function  (){
      selectaouthfunl.state=true;
      $state.go('r.selectAuth');
  }

  $scope.Storemage   = function(r){
     $state.go('r.Storemanagement');
  }

  $scope.expression = true;
  $scope.newexpression =true;

  /*$scope.companyName = storage.getObject('UserInfo').company_name;
  $scope.adminer = storage.getObject('UserInfo').is_admin;
  $scope.userid = storage.getObject('UserInfo').user_id;
*/




  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

    Initial ();
    select()


      if(fromStateServ.getState('r.companyInstall')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.companyInstall').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.companyInstall';
                window.androdzerofun_clback  = function(){};



            }






  });

  function select() {
    $scope.userid = selectArr.selectarrs.id();
    $scope.companyID =  selectArr.selectarrs.companyid();
    $scope.companyName =  selectArr.selectarrs.companyname();
    $scope.adminer = selectArr.selectarrs.isadmin();
    $scope.expression = true;

    if($scope.adminer == "1"){
      $scope.newexpression = true
    }else {
      $scope.newexpression= false
    }
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
        $scope.expression = false;
        $scope.autName="审核失败"
      }


      $scope.integral =r.resp_data.integral

    }else{

      return false

    }


  });

}





$scope.goManagement = function () {


  $state.go('r.management')
}

  //解除绑定
$scope.deleteCompany=function () {

  

    native.confirm('你确定解除公司绑定?','提示',['确定','取消'],function(c){
      if(c  == 1){

        Tools.showlogin();
        Tools.getData({
          "interface_number": "000402",
          "post_content": {
            "token": "",
            "token_phone": "",
            "userId": $scope.userid,
            "isSelf": "1"
          }
        },function(r){
          if(r){
            window.outlogin(function(){
              $timeout(function(){
                $state.go('r.tab.Settings');
                $timeout(function(){
                  $ionicHistory.clearHistory();
                },30)
              },30)
            })
            native.task('解除公司绑定,成功');
          }
        })
      }})









   /* $ionicPopup.alert({
      title: "您确定解除公司绑定！",
      okText: '确定'

    });
    return false;
  } else {

    Tools.getData({
      "interface_number": "000402",
      "post_content": {
        "token": "",
        "token_phone": "",
        "userId": $scope.userid,
        "isSelf": "1"
      }

    }, function (r) {

      if (r.msg == "success") {

        native.task('解绑成功');
        window.outlogin(function () {
          $timeout(function () {
            newInitial();
          }, 30)
        })

        $state.go('r.tab.Settings');
      } else {

        return false

      }


    });


  }
*/
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

  $scope.$on('$ionicView.beforeEnter',function() {
    if (fromStateServ.getState('r.companyInstall')) {
      $scope.showtitle = true;
      $scope.ing = false;


      $scope.parenttitle = fromStateServ.getState('r.companyInstall').title;
      $scope.backtoprevView = fromStateServ.backView;
      window.androdzerofun = fromStateServ.backView;
      window.androdzerofun_parms = 'r.companyInstall';
      window.androdzerofun_clback = function () {
      };


    }
  });


}]);
