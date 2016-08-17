/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage','fromStateServ','selectArr',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage,fromStateServ,selectArr){
  
//物流消息
$scope.goinstinfo  = function (params) {
   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Tradelogistics){
                    if(noti.userlist[usid].Tradelogistics.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Tradelogistics,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })

                      storage.setObject('Notice',noti);
                      Handlenotice()
                      
                      if(window.platform  == 'ios'){
                        window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function (s) {

                            var nowbe  =  parseInt(s)  -  Badgenumber;
                            if(nowbe <=  0){
                              nowbe  = 0;
                            }
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(nowbe);
                        })
                      }
                    }
                }
              }
          }
    }

  var     noti   =   storage.getObject('Notice');


  fromStateServ.stateChange('r.LogisticsInformation');
};
//系统消息
$scope.goinstinfosystem  = function (params) {



   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Systemmessage){
                    if(noti.userlist[usid].Systemmessage.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Systemmessage,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })
                      storage.setObject('Notice',noti);
                      Handlenotice()
                      if(window.platform  == 'ios'){
                        window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function (s) {

                            var nowbe  =  parseInt(s)  -  Badgenumber;
                            if(nowbe <=  0){
                              nowbe  = 0;
                            }
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(nowbe);
                        })
                      }
                    }
                }
              }
          }
    }


  fromStateServ.stateChange('r.Systemessagenotice')
};

//公司消息
$scope.goinstinfoCompoen  = function (params) {




   var  usid  =   storage.getObject('UserInfo').user_id;
    if(usid){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[usid]){
                if(noti.userlist[usid].Companynotice){
                    if(noti.userlist[usid].Companynotice.length){
                      $scope.nomsg    = false;
                      var   Badgenumber  = 0;
                      angular.forEach(noti.userlist[usid].Companynotice,function(s){
                        if(!s.See){
                            Badgenumber++;
                        }
                        s.See  = true
                      })
                      storage.setObject('Notice',noti);
                      Handlenotice()
                      if(window.platform  == 'ios'){
                        window.plugins.jPushPlugin.getApplicationIconBadgeNumber(function (s) {

                            var nowbe  =  parseInt(s)  -  Badgenumber;
                            if(nowbe <=  0){
                              nowbe  = 0;
                            }
                            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(nowbe);
                        })
                      }
                    }
                }
              }
          }
    }

  fromStateServ.stateChange('r.Companynotice')
};
  $scope.mathData = true;
  function select() {
    $scope.adminer = selectArr.selectarrs.isadmin();
    $scope.expression = true;
    $scope.mathData = true;
    if($scope.adminer == "1"){
      $scope.expression = true
      $scope.doRefresh();

    }else {
      $scope.expression= false
    }
  }

   $rootScope.$watch('newnotice', function() {
      Handlenotice();
    });

$scope.notice = {
  Tradelogistics:undefined,
  Systemmessage:undefined
};


function Handlenotice() {

  var  id   = storage.getObject('UserInfo').user_id;
    if(id){
        if(storage.getObject('UserInfo').company_id !=''){
          $scope.hasCompay  = true;
        }
        //多去当前用户消息  
        var notilength   = undefined;          
         notilength  =  storage.getObject('Notice');
         if(!notilength.userlist){
           return false;
         }         
          var nowuser  =   notilength.userlist[id];
          if(!nowuser)  return  false;
          if(nowuser.Tradelogistics){
               if(nowuser.Tradelogistics.length){
                var badgenumber =  0;
                var fistnoseemsg  = undefined;
                angular.forEach(nowuser.Tradelogistics,function (params) {
                    if(!params.See){
                      badgenumber++;               
                      if(!fistnoseemsg){
                        fistnoseemsg  = params.title;
                      }        
                    }
                })

                 
                 $scope.notice.Tradelogistics   =  badgenumber;
                 $scope.notice.Tradelogisticsdesc   =   fistnoseemsg;
               }
          }else{
            $scope.notice.Tradelogistics  = undefined
          }


          if(nowuser.Systemmessage){
               if(nowuser.Systemmessage.length){

                   var badgenumber =  0;
                   var firsetnoseemasg  = undefined;
                angular.forEach(nowuser.Systemmessage,function (params) {
                    if(!params.See){
                      badgenumber++;
                      if(!firsetnoseemasg){
                        firsetnoseemasg  = params.title
                      }
                    }
                })
                 $scope.notice.Systemmessage   =  badgenumber;
                 $scope.notice.Systemmessagedesc   =   firsetnoseemasg;

               }
          }else{
            $scope.notice.Systemmessage  = undefined
          }


            if(nowuser.Companynotice){
               if(nowuser.Companynotice.length){

                   var badgenumber =  0;
                   var firsetnoseemasg  = undefined;
                angular.forEach(nowuser.Companynotice,function (params) {
                    if(!params.See){
                      badgenumber++;
                      if(!firsetnoseemasg){
                        firsetnoseemasg  = params.title
                      }
                    }
                })
                 $scope.notice.Companynotice   =  badgenumber;
                 $scope.notice.Companynoticedesc   =   firsetnoseemasg;

               }
          }else{
            $scope.notice.Systemmessage  = undefined
          }




    }
}


  $scope.$on('$ionicView.beforeEnter',function(){

    //处理通知
    Handlenotice();



    //页面的状态变化  请求
    select()
    handtat();

    if ($ionicHistory.backView()) {
      window.androdzerofun  = function(parm1,parm2){
        $ionicHistory.goBack();
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }

  });





  $scope.application = function () {
    $state.go('r.tab.information')
  }


 /* function  Initial  () {

    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }


      } else {
        return false

      }

    });
  }
*/


  $scope.login  =  function(r){
    fromStateServ.stateChange(r);
  };

  function handtat  (){

    if(storage.getObject('UserInfo').user_id){
      $scope.isShow = false;

    }else{
      $scope.isShow = true;
    }

  }

  $scope.doRefresh  = function () {
    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }



      } else {
        return false

      }

    });
  }
  
}])
  .controller('noticeDetailCtr', ['$scope',function($scope) {
  }])

  .controller('LogisticsInformationCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){



     $scope.actionTy =  function (params) {
      Tools.Notificationjump(params)
     }
     $scope.back  = function () {
      $scope.backtoprevView('r.LogisticsInformation')  
     }
     
     $scope.title  =  '交易物流';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){
     $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');   
     },300)
      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var     noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Tradelogistics){
                    if(noti.userlist[userin.user_id].Tradelogistics.length){

                      $scope.nomsg    = false;
                      $scope.notilist = noti.userlist[userin.user_id].Tradelogistics;










                    }
                }
              }
          }
       }
     }
      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.LogisticsInformation')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.LogisticsInformation').title;
            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });
  }])
  .controller('SystemessagenoticeCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){

     $scope.actionTy =  function (params) {
       
      console.log(params,'执行动作')
      Tools.Notificationjump(params)
     }

     $scope.back  = function () {
      $scope.backtoprevView('r.Systemessagenotice')  
     }
     
     $scope.title  =  '系统消息';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){
      
       $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');   
       },300)

      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var   noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Systemmessage){
                    if(noti.userlist[userin.user_id].Systemmessage.length){
                      $scope.nomsg =  false;
                      $scope.notilist  = noti.userlist[userin.user_id].Systemmessage;
                    }
                }
              }
          }
       }
     }
      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.Systemessagenotice')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Systemessagenotice').title;
            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });
  }])
 .controller('CompanynoticeCtr',['$scope','storage','fromStateServ','$timeout','Tools',function($scope,storage,fromStateServ,$timeout,Tools){
     $scope.actionTy =  function (params) {    
      
      Tools.Notificationjump(params)
     }
     $scope.back  = function () {
      $scope.backtoprevView('r.Companynotice')  
     }

     $scope.title  =  '公司消息';
     $scope.nomsg =  true;
     $scope.notilist  = []
     $scope.init  =  function (params){
      
       $timeout(function (params) {
          $scope.$broadcast('scroll.refreshComplete');   
       },300)

      var userin  =  storage.getObject('UserInfo')
       if(userin.user_id){
          var   noti   =   storage.getObject('Notice');
          if(noti.userlist){
              if(noti.userlist[userin.user_id]){
                if(noti.userlist[userin.user_id].Companynotice){
                    if(noti.userlist[userin.user_id].Companynotice.length){
                      $scope.nomsg =  false;
                      $scope.notilist  = noti.userlist[userin.user_id].Companynotice;
                    }
                }
              }
          }
       }
     }

      $scope.$on('$ionicView.beforeEnter',function(){
          if(fromStateServ.getState('r.Companynotice')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Companynotice').title;
            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });



  }])




