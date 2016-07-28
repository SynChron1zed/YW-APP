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

                      var reif = storage.getObject('UserInfo');
                      reif.avatar  =f[0].key;
                      storage.setObject('UserInfo',reif);
                      $scope.header =r;
                      //$scope.$apply();
                      native.task('修改头像成功');
                      
              }
            })
          },'user_img')
        })
  };




  //修改qqdsadsa
  $scope.qqc  = function (){
    $state.go('r.tab.SettingsQQ')
  }


  //修改性别
  $scope.sexgo  = function(){
    $state.go('r.tab.SettingsSexUsername');
  }
  //修改  秘密
  $scope.resetPwd  =  function(){
      $state.go('r.tab.SettingsPassword');
  }
  //收货地址




}])
.controller('SettingsUpdateSexCtr',['$scope','Tools','storage','$rootScope','native',function($scope,Tools,storage,$rootScope,native){

  $scope.$on('$ionicView.beforeEnter',function(){
    var userin  =  storage.getObject('UserInfo');    
    if(userin.sex  == '0'){
      $scope.sex  = true;
    }else{
      $scope.sex  = false;
    }
  })

$scope.swatch   = function (){
  $scope.sex  =  true;   
}
$scope.swatch1   = function (){
  $scope.sex  =  false;   
}

$scope.save  = function (){
  Tools.getData({
     "interface_number": "050301",
    "post_content": {
        "sex": $scope.sex?0:1
    }
  },function(r){
      if(r){

                    var reif = storage.getObject('UserInfo');
                      reif.sex  = $scope.sex?'0':'1';
                      storage.setObject('UserInfo',reif);
                      $rootScope.$ionicGoBack();      
                      native.task('保存成功');
        
      }

  })


}
}])

 .controller('SettingsUpdateQQCtr',['$scope','Tools','storage','native','$rootScope',function($scope,Tools,storage,native,$rootScope){
    
  $scope.$on('$ionicView.beforeEnter',function(){
          var userin  =  storage.getObject('UserInfo');
          $scope.msg  = {};
          $scope.msg.qq  =   userin.qq;          
  });

  $scope.clear  = function(){
    $scope.msg.qq   =undefined;
  }




$scope.save  = function (){
  Tools.getData({
   "interface_number": "050307",
    "post_content": {
        "qq": $scope.msg.qq,
    }

  },function(r){
      if(r){
                    var reif = storage.getObject('UserInfo');
                      reif.qq  =  $scope.msg.qq;
                      storage.setObject('UserInfo',reif);
                      $rootScope.$ionicGoBack();      
                      native.task('保存成功');
        
      }

  })






}    
 }])
.controller('SettingsUpdatePasswordCtr',['$scope','Tools','storage','native','$rootScope',function($scope,Tools,storage,native,$rootScope){

 $scope.$on('$ionicView.beforeEnter',function(){
          $scope.msg  = {};          
  });

  $scope.save  = function(){
    if(!$scope.msg.jiumimi ||  !$scope.msg.newmima  ||  !$scope.msg.chormima  ){
      native.task('请填写完整信息')
      return  false;
    }
    
    Tools.getData({
       "interface_number": "050303",
       "post_content": {
        "old_password": window.md5($scope.msg.jiumimi),
        "new_password": window.md5($scope.msg.newmima) ,
        "confirm_password": window.md5($scope.msg.chormima),
    }
    },function(r){
          if(r){      
                      $rootScope.$ionicGoBack();      
                      native.task('修改密码成功');
          }
    })

  }




   




}])