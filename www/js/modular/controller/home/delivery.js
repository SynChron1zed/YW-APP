/**
 * Created by Administrator on 2016/8/2.
 */
/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('deliveryCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicModal','$stateParams','$ionicHistory',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicModal,$stateParams,$ionicHistory){

  $scope.id = $stateParams.odId
  $scope.number = $stateParams.Num
  $scope.goods = []
  $scope.SalesList=[]
  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
      $scope.goods.barcode   =  r.text;
      $scope.$apply();
    });
  }


  $scope.deliveryList = function () {

    Tools.getData({
      "interface_number": "020704",
      "post_content": {
        "token":"",
        "token_phone": "",

      }

    },function(r){


      if(r.msg== "success"){

        $scope.SalesList  = r.resp_data;

      }else{

        return false

      }


    });


    $scope.modal.show();



  }


  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

/*  $scope.clientSideList = [
    { text: "Backbone", value: "bb" },
    { text: "Angular", value: "ng" },
    { text: "Ember", value: "em" },
    { text: "Knockout", value: "ko" }
  ];*/


  $scope.data = [];

  $scope.data.clientSide




  $scope.deliveryNew=function () {

    if(!$scope.data.clientSide){
      native.task('请选择物流!')
      return  false;
    }
    if(!$scope.goods.barcode){
      native.task('请填写单号!')
      return  false;
    }
    /*call ($scope.goods.barcode );*/

    Tools.getData({
      "interface_number": "020706",
      "post_content": {
        "token":"",
        "token_phone": "",
        "orderId":$scope.id,
        "logistCompanyId": $scope.data.clientSide.logistics_company_id,
        "logistCompanyName": $scope.data.clientSide.logistics_company_name,
        "mailNo": $scope.goods.barcode

      }

    },function(r){



      if(r.msg== "success"){

        $ionicHistory.goBack(-1);

      }else{

        return false

      }


    });

  }




}]);
