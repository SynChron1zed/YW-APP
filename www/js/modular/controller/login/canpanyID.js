/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('canpanyCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout){


//收货人
  $scope.newshopname = function (value) {

   $scope.id = value;
    console.log($scope.id)
  };






  $scope.next  = function (){
    Tools.getData({
      "interface_number": "000104",
      "post_content": {
        "token":"",
        "token_phone": "",
        "company_id": $scope.id,
      }

    },function(r){


        if(r.msg== "success"){
   /*    var popup =   $ionicPopup.alert({
            title:"验证成功",
            okText:'确认'

          });
          $timeout(function() {
            popup.close(); // 3秒后关闭弹窗
          }, 800);*/


          $state.go('r.application',{companyID:$scope.id});
          native.task('验证成功！')
        }else{
          $ionicPopup.alert({
            title:"验证公司ID失败！",
            okText:'请重新输入'


          });

        }


    });



    return  false;


  }



}]);
