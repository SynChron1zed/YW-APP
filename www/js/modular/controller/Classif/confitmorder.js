/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {

  var bascId = $stateParams.basicID;
  var shopId = $stateParams.shopID;
  var Num = $stateParams.Num;
  $scope.shopNum=Num
  var cartId = [];

  console.log(bascId)
  console.log(shopId)

  $scope.addressList=[];

  $ionicModal.fromTemplateUrl('templates/addressmodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addressmodal = modal;
    $scope.addressmodal.show();
  });



  Tools.getData({
    "interface_number": "020205",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "goods_basic_id":bascId

    }
  },function(r){
    if(r){

      r.resp_data.data.img_url  =  window.qiniuimgHost+r.resp_data.data.img_url+'?imageView2/1/w/200/h/200';
      r.resp_data.data.ctr  = false;

      $scope.ClassifDetailsList = (r.resp_data.data);
      console.log($scope.ClassifDetailsList)
      var total = $scope.ClassifDetailsList.total_in_price * $scope.shopNum
      $scope.TotalNum = total
      console.log(total)
    }
  });



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
      for(var i = 0;i<$scope.addressList.length;i++){
        if($scope.addressList[i].is_default=="1"){
          $scope.addressListone = $scope.addressList[i]
        }
      }

    }
  });

  $scope.gainAdress = function (gain) {

   $scope.adressid = gain;
    console.log($scope.adressid)
    for(var i = 0;i<$scope.addressList.length;i++){
      if($scope.addressList[i].addr_id==$scope.adressid){
        $scope.addressListone = $scope.addressList[i]
      }
    }

  }



  $scope.data = {
    clientSide: "1"
  };


  //加入购物车
  Tools.getData({
    "interface_number": "020401",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "shop_id": shopId,
      "sku_id": "1",
      "goods_basic_id": bascId ,
      "number": "1"
    }
  },function(r){
    if(r){

      cartId= (r.resp_data.cart_id)


    }
  });



  //确认订单
  $scope.orderquery = function () {

    Tools.getData({
      "interface_number": "020607",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "addr_id": $scope.addressListone.addr_id ,
        "remark": "",
        "cartIds": cartId
      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'确认成功!',
          okText:'确认'
        })


      }
    });
  }
  $ionicModal.fromTemplateUrl('templates/AddresModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.AddAdressemodal = modal;
  });

/*  $scope.AddAdress=function () {
    $scope.addressmodal.hide();
    $scope.AddAdressemodal.show()
  }*/

  $scope.addArddss=function (r) {

   /* fromStateServ.stateChange(r);
    $scope.addressmodal.hide();*/
    $state.go('r.addAddress',{dataAdd:1});
    $scope.addressmodal.hide();;
  }


  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
 /* $scope.$on('$stateChangeSuccess',function(){
    debugger;
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.confirmOrder').title;
  });*/

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };


  function handtat  (){


  }


  window.stateChangeListen['r.tab.Classif']  = handtat;

  handtat()
}]);
