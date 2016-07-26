/**
 * Created by Administrator on 2016/7/7.
 */
Ctr.controller('SettingsUpdateCtr',['$scope','storage','Tools','native','$state',function($scope,storage,Tools,native,$state){
  

  $scope.$on('$ionicView.beforeEnter',function(){
          var userin  =  storage.getObject('UserInfo');
          $scope.header  =    window.qiniuimgHost+userin.avatar+'?imageView2/1/w/130/h/130';
          $scope.real_name  =    userin.real_name;
          if(userin.sex  == '0'){
            $scope.sex     =  '男';
          }else{
            $scope.sex     =  '女';
          }
          $scope.qq  =   userin.qq;          
  });



  $scope.Headportrait   =  function(){
        Tools.chekpirc({
          allowEdit:true
        },function(r){
          Tools.sendqiniu_queue([r],function(f){
            Tools.showlogin();
            Tools.getData({
                "interface_number": "050306",
                "post_content": {
                      "avatar":f[0].key,
                  }
            },function(s){
              if(s){
                      storage.getObject('UserInfo').avatar  =f[0].key;
                      $scope.header =r;
                      $scope.$apply();
                      native.task('修改头像成功');
              }
            })
          },'user_img')
        })
  };

  //修改性别
  $scope.sexgo  = function(){
    $state.go('r.tab.SettingsSexUsername');
  }









}]);
