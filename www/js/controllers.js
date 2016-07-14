var  Ctr = angular.module('starter.controllers', []);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('tabCtr',[function(){

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  Tools.getData({
    "interface_number": "020101",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.Citysd = (r.resp_data)
      $scope.selectedItem = $scope.Citysd[0];

    }
  });

  Tools.getData({
    "interface_number": "020103",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": 1
      },
      "page_num": "1"
    }
  },function(r){
    if(r){
      $scope.ShoppingList = (r.resp_data.data.data)
    }
  });



  $scope.shoppingsList=function (item) {

    $scope.selectedItem = item;
    var cateId= item.cate_id;

    Tools.getData({
      "interface_number": "020103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "searchParam": {
          "shop_cate_id": cateId
        },
        "page_num": "1"
      }
    },function(r){
      if(r){
        $scope.ShoppingList = (r.resp_data.data.data)

      }
    });

  }


}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('Classif',['$scope','native','$state',function($scope,native,$state) {


}]);


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
    window.noNavtionsback(window.noNavtionsbackRootuer);
  }



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$state','Tools','$stateParams','$ionicPopup','storage',function($scope,$state,Tools,$stateParams,$ionicPopup,storage){



  $scope.password  = {};
  //选择认证方式

  console.log($stateParams.phone)
  $scope.next =  function (){

  if(!$scope.password.Original || !$scope.password.Repeat)  {
    $ionicPopup.alert({
      title:'请填写密码!',
      okText:'确认'
    });
    return false;
  }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      $ionicPopup.alert({
        title:'密码不一致!',
        okText:'确认'
      });
      return false;
    };

    Tools.getData({
      "interface_number": "000103",
         "post_content": {
             "phone":$stateParams.phone,
             "password":window.md5($scope.password.Original),
             "repassword":window.md5($scope.password.Repeat),
             uuid:storage.getObject('device').uuid,
             "push_registration_id" : storage.getObject('jPush').RegistrationID,
         }
    },function(r){
      if(r){
        window.Token  = r.resp_data.token;
        r.resp_data.user_info.token  = window.Token;
        storage.setObject('UserInfo',r.resp_data.user_info);
        
        $state.go('r.selectAuth');
      }
    })
    return  false;
  }





}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','Tools','$ionicPopup',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,Tools,$ionicPopup){


  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  }
  
  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };
  
  //基本表单信息
  $scope.from   = {};
  
  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive || !$scope.identity.inverse){
      $ionicPopup.alert({
        title:'请上传审核照片',
        okText:'确认'
      });
      return false;
    }
    if(!$scope.from.compname   ||  !$scope.from.License  || !$scope.from.mechanism ){
      $ionicPopup.alert({
        title:'请填写完整基本信息',
        okText:'确认'
      });
      return false;
    }
    //发送请求

    



  }









}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('grAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','native','$ionicActionSheet','Tools','$ionicPopup','storage','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,native,$ionicActionSheet,Tools,$ionicPopup,storage,$state){


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  
  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  };

  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };

  $scope.form = {};

  //提交审核
  $scope.Submitaudit  =  function (){




    if(!$scope.identity.Positive || !$scope.identity.inverse){
      $ionicPopup.alert({
        title:'请上传审核照片',
        okText:'确认'
      });
      return false;
    }
    if(!$scope.form.id ||  !$scope.form.name ){
      $ionicPopup.alert({
        title:'请填写完审核信息',
        okText:'确认'
      });
      return false;
    }

    //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){
      //发送请求
      Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"1",
          "card_no":$scope.form.id+"",
          name:$scope.form.name,
          "card_front_img":f[0].hash,
          "card_back_img":f[1].hash
        }
      },function(r){
        if(r){

          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页
            window.backtoinroot(window.backtoinroot_parms);
          }



        }
      });
    },'auth_'+(storage.getObject('UserInfo').company_id)+'_');


  }
  console.log(  JSON.stringify(storage.getObject('UserInfo')))

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
Ctr.controller('registerCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup){





  $scope.registbasinfo  = {};
  $scope.nextvercode =  60;
  $scope.vercodeing  = false;
  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  //获取验证码
  var sctolthi  = true;
  $scope.GetverCode =  function (){
    if(sctolthi){

          sctolthi  = false;
          if(!$scope.registbasinfo.phone){
            $ionicPopup.alert({
              title:'请填写手机号码!',
              okText:'确认'
            });
            sctolthi  = true;
            return false;
          };
          Tools.getData({
            "interface_number": "000101",
            "post_content": {
              "phone":$scope.registbasinfo.phone
            }
          },function(r){
            if(r){
              $scope.vercodeing  = true;
              $scope.nextvercode =  60;
              var   time  = setInterval(function(){
                $scope.nextvercode--;
                if($scope.nextvercode <= 0){
                  sctolthi  = true;
                  $scope.vercodeing  =  false;
                  clearInterval(time);
                }
                $scope.$apply();
              },1000)

            }
          },function(){
            sctolthi  = true;
          });


    }
  }

  //下一步
  $scope.next =  function (){

    if(!$scope.registbasinfo.phone){
      $ionicPopup.alert({
          title:'请输入手机号码!',
          okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
      $ionicPopup.alert({
        title:'请输入正确的手机号码!',
        okText:'确认'
      });
      return  false;
    }
    if(!$scope.registbasinfo.Vercode){
      $ionicPopup.alert({
        title:'请输入验证码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.negative($scope.registbasinfo.Vercode)) {
      $ionicPopup.alert({
        title:'请输入正确的验证码!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.registbasinfo.CorporateName){
      $ionicPopup.alert({
        title:'请输入公司名称!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.registbasinfo.userName){
      $ionicPopup.alert({
        title:'请输入姓名!',
        okText:'确认'
      });
      return  false;
    }
    //交互
    Tools.getData({
      "interface_number": "000102",
      "post_content": {
          "phone":$scope.registbasinfo.phone,
          "register_code":$scope.registbasinfo.Vercode,
          "company_name":$scope.registbasinfo.CorporateName,
          "real_name":$scope.registbasinfo.userName,
          "invite_code":$scope.registbasinfo.InvitationCode?$scope.registbasinfo.InvitationCode:''
      }
    },function(r){
    if(r){

        $state.go('r.registercfpwd',{phone:r.resp_data.phone})
    }
    });
    return  false;



  }

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$scope','$state','Tools',function($scope,$state,Tools){

        console.log('xxxx');
        $scope.skip  =  function (){
          window.backtoinroot(window.backtoinroot_parms);
        }
  
}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){


  window.androdzerofun  =window.backtoinroot;
  window.androdzerofun_parms  = window.backtoinroot_parms;
  
  $scope.$ionicGoBack  =  function(){
       window.backtoinroot(window.backtoinroot_parms);
  };


  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }


}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('tabCtr',[function(){

}])

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

Ctr.controller('rootCtr',[function(){
  
}])

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('chariCtr',function($scope) {
  $scope.a1 = function (){
    alert('1');
  }

});

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
    $scope.a1 = function (){
      alert('1');
    };
    $scope.login  =    function(r){
        fromStateServ.stateChange(r);
    };
    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.company = (r.resp_data.data)

      }
    });

  Tools.getData({
    "interface_number": "020002",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.news = (r.resp_data.data)

    }
  });


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
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',function($scope) {
  $scope.a1 = function (){


    alert('1');
  }

});

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
 * Created by Administrator on 2016/7/7.
 */
Ctr.controller('SettingsUpdateCtr',function($scope) {


});

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ',function($scope,fromStateServ){

      $scope.login  =  function(r){
            fromStateServ.stateChange(r);
      }


}])
