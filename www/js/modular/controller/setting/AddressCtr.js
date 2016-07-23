/**
 * Created by Administrator on 2016/7/5.
 */

Ctr.controller('SettingsAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  var arrs = [];
  $scope.addressList=[]

  //获取收货地址

  Tools.getData({

    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){
     
      $scope.addressList= (r.resp_data.data)

    }
  });




  $scope.expressionA = true;

  $scope.deleteAdress=function (item) {

    if($scope.expression==true){

      console.log(arrs)

      if(arrs==""||arrs== undefined){
        $scope.expression = false;
        $scope.expressionA = true;
      }else{
      var confirmPopup = $ionicPopup.confirm({
        title: '确定要删除选中地址吗？',
        template: '',
        okText:'确定',
        cancelText:'取消'
      });
      confirmPopup.then(function(res) {
        if(res) {

          Tools.getData({
          "interface_number": "020504",
          "client_type": window.platform,
          "post_content": {
            "token" : "",
            "token_phone": "",
            "addr_id": arrs
          }
        },function(r){
          if(r){
          }
        });
          Tools.getData({
            "interface_number": "020505",
            "client_type": window.platform,
            "post_content": {
              "token" : "",
              "token_phone": ""
            }
          },function(r){
            if(r){
              $scope.expression = false;
              $scope.expressionA = true;
              $scope.addressList= (r.resp_data.data)

            }
          });

          setTimeout(function () {
            $scope.$apply(function () {
              $scope.addressList = $scope.addressList
            });
          }, 1000);

        } else {
          console.log('You are not sure');
        }
      });

      }

    }else{
      $scope.expressionA = false;
      $scope.expression=true
    }


  };

  $scope.gainAdress = function (gain) {

   if(arrs.indexOf(gain) == -1){
     arrs.push(gain)
   }else{
     for(var i = 0;i<arrs.length;i++){
       var pageId =  arrs[i];
       if(pageId==gain){
         Tools.rmArrin(arrs,i);
       }

     }
     console.log(arrs)
   }
  }

 /* //修改地址获取值
  $scope.gainAdress= function (item) {


  console.log(item);
    $state.go('r.tab.SettingsUpdateAdress', {item:item});

  }*/


}]);
