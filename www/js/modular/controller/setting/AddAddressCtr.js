/**
 * Created by Administrator on 2016/7/5.
 */
Ctr.controller('SettingsAddAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$timeout) {
  var Address =[],Name=[],Number=[],Email=[],Checked=1;
  $scope.pushNotification = { checked: true};
  var dataadd = $stateParams.dataAdd
    console.log(dataadd);
  //默认




  $scope.pushNotificationChange = function() {

    if($scope.pushNotification.checked==false){
      Checked=0;
    }else{
      Checked=1;
    }
  };

  //详细地址
    $scope.Addaddress = function (newaddress) {
      Address = newaddress
};

  //收货人
  $scope.newname = function (name) {
      Name = name;
  };

  //电话
  $scope.newnumber = function (number) {
    Number=number;
  };

  //邮编
  $scope.newemail = function (email) {
    Email=email;
  };

  // 保存地址
  $scope.keepaddress = function () {


  native.confirm('确定要保存该地址吗？','保存地址',['确定','取消'],function(c){
          if(c  == 1){
            

        
        Tools.getData({
          "interface_number": "020501",
          "client_type": window.platform,
          "post_content": {
            "token": "",
            "token_phone": "",
            "province": "湖南省",
            "city": "长沙市",
            "region": "天心区",
            "street": Address,
            "zcode": Email,
            "link_man": Name,
            "link_phone":Number,
            "is_default": Checked
          }
        },function(r){
          $state.go('r.addAddress')
        });


  }          
        });
  }


  /*//保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;
  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.addAddress').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };*/

}]);
