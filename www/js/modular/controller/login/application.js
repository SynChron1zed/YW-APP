/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('applicationCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$stateParams','$ionicModal','$ionicNativeTransitions','$timeout','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$stateParams,$ionicModal,$ionicNativeTransitions,$timeout,$ionicHistory){

  $scope.Id = $stateParams.companyID;


//name
  $scope.newshopname = function (value) {

    $scope.name = value;
    console.log($scope.name)
  };

//phone
  $scope.phoneshopname = function (value) {

    $scope.phone = value;
    console.log($scope.phone)
  };

  $ionicModal.fromTemplateUrl('templates/my-modal.html', {
    scope: $scope,

  }).then(function(modal) {
    $scope.modalapp = modal;
  });



  function init() {
    Tools.showlogin();
    Tools.getData({
      "interface_number": "000105",
      "post_content": {
        "token": "",
        "company_id": $scope.Id,
        "real_name":$scope.name ,
        "phone": $scope.phone,
        "token_phone": ""
      }

    },function(r){


      if(r.msg== "success"){

        $scope.modalapp.show();

        //$state.go('r.login',{title:''});


      }else{
        $ionicPopup.alert({
          title:"加入公司失败！",
          okText:'请重新输入'

        });
      }


    })
  }


  $scope.next  = function (){

    init();


  }

  $scope.shenhe=function () {

    $scope.modalapp.hide();
    $ionicHistory.goBack(-2);
    //$rootScope.$ionicGoBack();
    /*  window.androdzerofun  =  function(ba,com){

        $ionicViewSwitcher.nextDirection('back');
        $ionicNativeTransitions.stateGo(ba,{},{
          "type": "slide",
          "direction": "right", // 'left|right|up|down', default 'left' (which is like 'next')
          "duration": 400, // in milliseconds (ms), default 400
        });
        $timeout(function(){
          com();
          window.androdzerofun  =   undefined;
          window.androdzerofun_parms  =   undefined;
          window.androdzerofun_clback  =   undefined;
        },200)
      };

      window.androdzerofun(window.androdzerofun_parms,window.androdzerofun_clback);*/
  }

$scope.title = "提交申请信息"

}]);
