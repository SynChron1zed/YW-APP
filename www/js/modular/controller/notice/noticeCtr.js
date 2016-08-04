/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage','fromStateServ','selectArr',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage,fromStateServ,selectArr){


$scope.mathData = true;





  function select() {

    $scope.adminer = selectArr.selectarrs.isadmin();
    $scope.expression = true;
    $scope.mathData = true;
    if($scope.adminer == "1"){
      $scope.expression = true
    }else {
      $scope.expression= false
    }
  }




  $scope.$on('$ionicView.beforeEnter',function(){

    //页面的状态变化  请求


  if ($ionicHistory.backView()) {


      window.androdzerofun  = function(parm1,parm2){
        $ionicHistory.goBack();
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }
    
    if(storage.getObject('UserInfo').user_id){
    }else{
      return false;
    }





    select()
    handtat();
    $scope.doRefresh();

  


  });


  //对安卓返回键的  特殊处理  tabs

 /* if($scope.adminer == undefined){

  }else{
    $scope.$on('$ionicView.beforeEnter',function(){

      Initial ();


    });
  }*/




  $scope.application = function () {
    $state.go('r.tab.information')
  }


 /* function  Initial  () {

    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }


      } else {
        return false

      }

    });
  }
*/


  $scope.login  =  function(r){
    fromStateServ.stateChange(r);
  };

  function handtat  (){
    if(storage.getObject('UserInfo').user_id){
      $scope.isShow = false;

      $scope.doRefresh();
    }else{
      $scope.isShow = true;
    }
  }

  $scope.doRefresh  = function () {
    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }
        if($scope.newsList==0){
          $scope.mathData = false
        }


      } else {
        return false

      }

    });
  }



}])



  .controller('noticeDetailCtr', ['$scope',function($scope) {

  }]);
