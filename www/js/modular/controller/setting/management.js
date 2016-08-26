
Ctr.controller('managementCtr',['$scope','Tools','native','EmployeeObjdata','$state','$ionicNativeTransitions',function($scope,Tools,native,EmployeeObjdata,$state,$ionicNativeTransitions){

//充值  
$scope.Recharge  = function(item){ 
      native.prompt('正在为'+item.user.real_name+'分配积分,该员工积分余额:'+item.user.integral,'提示',['确认','取消'],'',function(c){
                    if(c.buttonIndex == 1){
                          console.log(parseInt(c.input1))
                          var mony = 0;
                          if(!isNaN(parseInt(c.input1)))  {
                            mony =   parseInt(c.input1);
                          }
                            var  userlist =  [];
                            userlist.push(item.user_id);

                             native.confirm('积分:'+mony,'确认分配?',['确定','取消'],function(c){
                                if(c  == 1){
                                    Tools.showlogin();
                                    Tools.getData({
                                        "interface_number": "000404",
                                        "post_content": {
                                            "staffId": userlist,
                                            "integral": mony
                                        },
                                        "client_type": "android"
                                    },function(r){
                                        if(r){
                                            $timeout(function(){
                                              item.user.integral+=  mony;
                                            })
                                              native.task('分配成功');
                                        }
                                    })
                             }})                          
                    }
            })
}






  $scope.$on('$ionicView.beforeEnter',function(){
    if(!EmployeeObjdata.user_id){
      $scope.listdata = []
      $scope.loadstat = true;
      $scope.pag_number  = 1;
    }else{

    if(EmployeeObjdata.leave){
        //解雇了员工
        EmployeeObjdata.leave =  false;
        var  index  =  undefined;
        angular.forEach($scope.listdata,function(xxx,indxxxx){
            if(xxx.user_id   ==   EmployeeObjdata.user_id){
              index  =  indxxxx
            }
        })
        $timeout(function(){
          $scope.listdata.splice(index, 1);
        },400)
    }
    //跟新  门店信息
    if(EmployeeObjdata.take_name){

             angular.forEach($scope.listdata,function(xxx,indxxxx){
            if(xxx.user_id   ==   EmployeeObjdata.user_id){
              xxx.takeAddr  = {};
              xxx.takeAddr.name   =   EmployeeObjdata.take_name;
              EmployeeObjdata.take_name  = undefined;
              
            }
        })
        
    }
    

    EmployeeObjdata.user_id  = false;

    }
  })

$scope.sendSms =   function(r) {    
        window.sms.send(r.user.phone, '', {
            replaceLineBreaks: false, 
            android: {
                intent: 'INTENT' 
            }
        }, function () {  }, function (e) {});
    }

$scope.callphone  =  function (r){
    window.plugins.CallNumber.callNumber(function(){}, function(){},r.user.phone, true);
}

$scope.edithmenid =  function(item){

        EmployeeObjdata.user_id     =   item.user_id;
        $ionicNativeTransitions.stateGo('r.Employeedetails',{}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -250, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -500, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });




}

  $scope.listdata = []
  $scope.loadstat = false;
  $scope.pag_number  = 1;
  $scope.loadmoreData =  function (ff){
    var sendopition  =  {
    "interface_number": "000406",
    "post_content": {}
    };

    if(ff){
      $scope.pag_number  = 1;
      sendopition.post_content.page_num   = $scope.pag_number;
    }else{
      sendopition.post_content.page_num   = $scope.pag_number;
    }

    Tools.getData(sendopition,function(r){
      if(r){

          if(ff){
               angular.forEach(r.resp_data.data,function(itme){
                        itme.user.avatar  =  window.qiniuimgHost+itme.user.avatar+'?imageView2/2/w/150/h/150';
               })
              $scope.listdata =  r.resp_data.data;
          }else{
            angular.forEach(r.resp_data.data,function(itme){
              itme.user.avatar  =  window.qiniuimgHost+itme.user.avatar+'?imageView2/2/w/150/h/150';
              $scope.listdata.push(itme);

            })
          }

          if(r.resp_data.nextPage  == 0){
              $scope.loadstat = false;
              $scope.pag_number  = 1;

          }else{
            $scope.loadstat = true;
            $scope.pag_number  = r.resp_data.nextPage;
          }


      }
    })

  }
}])

.controller('EmployeedetailsCtr',['$scope','Tools','native','EmployeeObjdata','$ionicModal','$timeout','storage','$rootScope',function($scope,Tools,native,EmployeeObjdata,$ionicModal,$timeout,storage,$rootScope){

//  =
$scope.changethisuerinfo =  function(r){

    if(!r.select){
          angular.forEach($scope.Identity,function(xx){
            xx.select  =  false;
          })
        r.select  =  true;
        if(r.name  == '管理员'){
          $scope.info.company_relation.is_admin  = '1'
          $scope.info.company_relation.is_sales  = '0'                 
        }else{
              $scope.info.company_relation.is_admin  = '0'
              $scope.info.company_relation.is_sales  = '1'  
        }
    }




}

$scope.save  = function(){
  
  Tools.showlogin();

  var  statin  =  0;
  

    angular.forEach($scope.Identity,function(xx){
        if(xx.select){
          if(xx.name  =='管理员'){
              statin  = 1
          }else{
            statin  = 2
          }
        }
    })

    if(statin  = 1){
      if($scope.info.company_relation.is_admin   ==  $scope.nowuserinfostat){
          statin  = undefined
      }

    }

  Tools.getData({
    "interface_number": "000407",
    "post_content": {
        "staff": $scope.info.company_relation.user_id,
        "take_id": $scope.info.company_relation.take_id,
        "role": statin,
    },
  },function(r){
      if(r){

        if($scope.info.company_relation.is_admin   ==  $scope.nowuserinfostat){
          //没有移交管理员
          $rootScope.$ionicGoBack();
          native.task('设置收银员成功')
        }else{
            window.outlogin(function(){
                          $timeout(function(){
                                  $state.go('r.tab.Settings');
                                  $timeout(function(){
                                    $ionicHistory.clearHistory();
                                  },30)
                          },30)
                })
          native.task('移交管理员成功')  
        }

        EmployeeObjdata.take_name  =   $scope.info.company_relation.take_name;

          

          

      }
  })

}


  $scope.edithmenid  =  function(item){

    angular.forEach($scope.storelist,function(xxx){
        if(xxx.take_id   == item.take_id){
          xxx.select  = true;
          $scope.info.company_relation.take_name  =  xxx.name;
          $scope.info.company_relation.take_id   =   xxx.take_id;
        }else{
          xxx.select  =false
        }
    })

    $timeout(function(){
      $scope.Since.hide();
    },200)
    


  }
  $scope.$on('$destroy', function() {
      $scope.Since.remove();
    });
    $ionicModal.fromTemplateUrl('Since.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.Since = modal;
    });
    $scope.storelist  = [];
    $scope.openstorelist  = function(){
          $scope.Since.show();
    }

$scope.shohwchange   = false;
      $scope.choice =   true;
      $scope.Identity  = [
        {
          name:'管理员',
          desc:'公司的管理员',
          select:true
        },
        {
           name:'收银员',
           desc:'收银人员',
           select:false
        }
      ];

      $scope.lizhi  = function(){
          //自己离职自己
          if(storage.getObject('UserInfo').user_id   == $scope.info.company_relation.user_id){
            native.confirm('你确定离开该公司?','提示',['确定','取消'],function(c){
              if(c  == 1){

                Tools.showlogin();
                Tools.getData({
                    "interface_number": "000402",
                    "post_content": {
                        "userId":$scope.info.company_relation.user_id,
                        "isSelf": "1",
                    }
                },function(r){
                    if(r){
                       window.outlogin(function(){
                          $timeout(function(){
                                  $state.go('r.tab.Settings');
                                  $timeout(function(){
                                    $ionicHistory.clearHistory();
                                  },30)
                          },30)
                      })
                      native.task('解散公司,成功');
                    }
                })
            }})
          }else{
            native.confirm('你确定解雇该员工','提示',['确定','取消'],function(c){
                if(c  == 1){
                Tools.showlogin();
                Tools.getData({
                    "interface_number": "000402",
                    "post_content": {
                        "userId":$scope.info.company_relation.user_id,
                        "isSelf": "0",
                    }
                },function(r){
                    if(r){
                      EmployeeObjdata.leave  =  true;
                      $rootScope.$ionicGoBack();
                      native.task('解雇成功!')
                    }
                })
                }
            })
          }
      }

      $scope.$on('$ionicView.beforeEnter',function(){
      Tools.showlogin();
      Tools.getData({
            "interface_number": "000409",
            "post_content": {
              staff:EmployeeObjdata.user_id
            }
      },function(r){
          if(r){
                $scope.info  =r.resp_data;   
                $scope.nowuserinfostat  =$scope.info.company_relation.is_admin;                 
                $scope.info.company_relation.take_name  = '加载中...';
                if(r.resp_data.company_relation.is_admin  =='1'){
                  $scope.shohwchange   = false;
                }else{
                  $scope.shohwchange   = true;
                }
                    Tools.getData({
                    "interface_number":"000408",
                    "post_content":{}
                  },function(r){
                    if(r){
                      $timeout(function(){
                        $scope.info.company_relation.take_name  = '暂未设置';
                        angular.forEach(r.resp_data,function(xxx){
                          if($scope.info.company_relation.take_id  == xxx.take_id){
                              $scope.info.company_relation.take_name  = xxx.name;
                              xxx.select  = true;
                          }else{
                              xxx.select  = false;
                          }                          
                        })
                       $scope.storelist    = r.resp_data;
                      })
                    }
                  })
          }
      })
    })


}])
