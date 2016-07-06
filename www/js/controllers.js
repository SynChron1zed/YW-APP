var  Ctr = angular.module('starter.controllers', []);

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
    $scope.login  = fromStateServ.stateChange;

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
Ctr.controller('loginCtr',['$ionicHistory','$scope','$state','fromStateServ','$ionicPlatform',function($ionicHistory,$scope,$state,fromStateServ,$ionicPlatform){


  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;
  
  //安卓返回键  对公共模块的返回
  $ionicPlatform.registerBackButtonAction(function (e) {
     e.preventDefault();
     $scope.backtoprevView('r.login');
     return false;
   }, 101);

  $scope.$on('$stateChangeSuccess',function(){
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  })


  $scope.backView  = function(){
    $scope.$ionicGoBack();
  }
  $scope.register  =  function (){
    $state.go('r.register');
  }

}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$ionicHistory','$scope','$rootScope',function($ionicHistory,$scope,$rootScope){
  
  $scope.$on('$stateChangeSuccess',function(){
  });
  $scope.backView  = function(){
    $scope.$ionicGoBack();
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

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state',function($scope,native,$state) {


}]);


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

      $scope.login  = fromStateServ.stateChange;

}])
