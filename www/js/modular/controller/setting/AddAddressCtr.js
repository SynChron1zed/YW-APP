/**
 * Created by Administrator on 2016/7/5.
 */
Ctr.controller('SettingsAddAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  var Address =[],Name=[],Number=[],Email=[],Checked=[];
  $scope.pushNotification = { checked: true};

  //默认
  $scope.pushNotificationChange = function() {

    console.log('Push Notification Change', $scope.pushNotification.checked);
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

    var confirmPopup = $ionicPopup.confirm({
      title: '确定要保存该地址吗？',
      template: '',
      okText:'确定',
      cancelText:'取消'
    });

    confirmPopup.then(function(res) {
      if(res) {
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
            "is_default": 0
          }
        },function(r){
          if(r){
            $ionicPopup.alert({
              title: '添加成功!',
              okText: '确认'
            });
            $state.go('r.tab.Settingsaddress');
          }
        });

      } else {
        console.log('You are not sure');
      }
    });


  }


  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;

  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){
    debugger;
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.addAddress').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };

}]);
