/**
 * Created by Administrator on 2016/7/5.
 */

Ctr.controller('SettingsAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$ionicHistory) {





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







  native.confirm('确定要删除选中地址吗？','删除地址',['确定','取消'],function(c){
        if(c  == 1){



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

//商品详情模块
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  $scope.$on('$ionicView.beforeEnter',function(){    
    $scope.loginboj = {};
    $scope.ing  = false;

      if(fromStateServ.getState('r.ClassifDetails')){
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.ClassifDetails').title;
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.ClassifDetails';
                window.androdzerofun_clback  = function(){};
            }



  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };


  //add
  $scope.addArddss=function () {

    $state.go('r.addAddress')
  }




}]);
