var  Ctr = angular.module('starter.controllers', []);

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state',function($scope,native,$state) {


}]);


/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('tabCtr',[function(){

}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','$ionicPopup',function($scope,native,$state,fromStateServ,$ionicPopup) {
    $scope.a1 = function (){
      alert('1');
    }
    
    $scope.login  =    function(r){
        fromStateServ.stateChange(r);
    }


}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','$state','$ionicHistory',function($scope,$state,$ionicHistory) {
    
  $scope.back  =  function (){
      $ionicHistory.goBack();
  }

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$rootScope','$ionicModal','$state',function($scope,$rootScope,$ionicModal,$state){




  //选择认证方式
  $scope.next =  function (){
    $state.go('r.selectAuth');
  }
  


  
  
}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher){

  
}]);
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('grAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher){


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout){

  //处理登录
  $scope.loginboj  = {};
  $scope.loginhan  = function (){
      if(!$scope.loginboj.userName){
         $ionicPopup.alert({
           title:'请输入用户名!',
           okText:'确认'
         });
        return false;
      }
      if(!$scope.loginboj.Pwd){
        $ionicPopup.alert({
          title:'请输入密码!',
          okText:'确认'
        });
        return false;
      }
      $scope.ing  = true;
      var devinfo  =   storage.getObject('device');
      Tools.getData({
        "interface_number": "000001",
        "client_type": window.platform,
        "post_content": {
          "phone":$scope.loginboj.userName,
          "push_registration_id" : storage.getObject('jPush').RegistrationID,
          "password":window.md5($scope.loginboj.Pwd),
          "uuid":devinfo.uuid
        }
      },function(r){
        if(r){
              window.Token  = r.resp_data.token;
              r.resp_data.user_info.token  = window.Token;
              storage.setObject('UserInfo',r.resp_data.user_info);
                $timeout(function(){
                  $scope.ing  = false;
                  $timeout(function(){
                    $scope.backtoprevView('r.login');
                    $timeout(function(){
                      $ionicPopup.alert({
                        title:'登录成功!',
                        okText:'确认'
                      })
                    },400);
                  },1000);
                },800)



        }
      },function(){
        $timeout(function(){
          $scope.ing  = false;
        },600)

      })



  };






  //保存历史记录的方法  调用  上一次1 title  和返回方法
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
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  $scope.register  =  function (){
      if(!$scope.ing){
            $state.go('r.register');
      }
  }

}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){

  
  $scope.registbasinfo  = {};
  







  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  //输入密码
  $scope.next =  function (){
    $state.go('r.registercfpwd')
  }

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){

  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $state.go('r.entAuthentication');
  }
  
  
}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
  .controller('noticeDetailCtr', function($scope, $stateParams, Chats,$ionicHistory) {
    $scope.chat = Chats.get($stateParams.chatId);

    $scope.$on('$stateChangeSuccess',function(){
      
    })

  });

Ctr.controller("OtherCtrl", function($scope, $state, fromStateServ) {
    $scope.backNav = function() {
        var fromState = fromStateServ.getState("other");
        if (fromState.fromState !== undefined) {
            $state.go(fromState.fromState.name, fromState.fromParams);
        } else {
            //设置没有历史的时候，默认的跳转
            $state.go("app.xxx");
        }
    };
})
/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('rootCtr',[function(){
  
}])

/**
 * Created by Administrator on 2016/7/5.
 */
Ctr.controller('SettingsAddAddressCtr',function($scope) {
  $scope.a1 = function (){
    alert('1');
  }

});

/**
 * Created by Administrator on 2016/7/5.
 */

Ctr.controller('SettingsAddressCtr',function($scope) {
  $scope.a1 = function (){
    alert('1');
  }

});

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout',function($scope,$ionicPopover, $ionicPopup,$timeout) {


  $scope.settings = {
    enableFriends: true
  };
  $scope.showPopup = function() {
    $scope.data = {}
    // 自定义弹窗
    var myPopup = $ionicPopup.show({
      templateUrl: 'my-friend',
      scope: $scope,
    });
    $scope.closePopup = function() {
      myPopup.close();
    };
   /* $scope.(".popup").addClass(".twoimage1")*/
  };
}])

  .controller('SettingsUserCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsRechargeCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsUpdateCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateUsernameCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateSexCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateQQCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdatePasswordCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsFriendsCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  });

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ',function($scope,fromStateServ){

      $scope.login  =  function(r){
            fromStateServ.stateChange(r);
      }


}])
