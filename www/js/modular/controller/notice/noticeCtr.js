/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$ionicHistory','storage','fromStateServ','selectArr',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$ionicHistory,storage,fromStateServ,selectArr){

//物流消息
$scope.goinstinfo  = function (params) {
   var  usid  =   storage.getObject('UserInfo').user_id;

   alert(usid)
    if(usid){
          var     noti   =   storage.getObject('Notice');

          alert(noti.userlist[usid])
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
                      if(window.platform  == 'ios'){

                       var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);
                      }
                    }
                }
              }else{

                   if(window.platform  == 'ios'){
                       var c   =0;
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);
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
                           var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);
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
                        var c   =$scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
                        var  nule = {};
                          nule.number  = c;
                          storage.setObject('badge',nule);

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



$scope.notice = {
  Tradelogistics:0,
  Systemmessage:0,
  Companynotice:0
};



$rootScope.$watch('newnotice', function() {
        $timeout(function () {
          Handlenotice()
        })
    });

function Handlenotice() {

  var  id   = storage.getObject('UserInfo').user_id;
    if(id){

        if(storage.getObject('UserInfo').company_id !=''){
          $scope.hasCompay  = true;
        }
        //多去当前用户消息
        var notilength   = 0;
         notilength  =  storage.getObject('Notice');
         if(!notilength.userlist){
           return false;
         }
          var nowuser  =   notilength.userlist[id];
          if(!nowuser)  return  false;
          if(nowuser.Tradelogistics){
               if(nowuser.Tradelogistics.length){
                var badgenumber =  0;
                var fistnoseemsg  = 0;
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
            $scope.notice.Tradelogistics  = 0
          }

          if(nowuser.Systemmessage){
               if(nowuser.Systemmessage.length){
                   var badgenumber =  0;
                   var firsetnoseemasg  = 0;
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
            $scope.notice.Systemmessage  = 0
          }

            if(nowuser.Companynotice){
               if(nowuser.Companynotice.length){

                   var badgenumber =  0;
                   var firsetnoseemasg  = 0;
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
            $scope.notice.Systemmessage  = 0
          }

          if(window.platform  == 'ios'){
            var c  = $scope.notice.Tradelogistics+$scope.notice.Systemmessage+$scope.notice.Companynotice;
            window.plugins.jPushPlugin.setApplicationIconBadgeNumber(c);
              var  nule = {};
              nule.number  = c;
              storage.setObject('badge',nule);


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

        window.extapp()
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }

  });





  $scope.application = function () {
    fromStateServ.stateChange('r.information');
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
  $scope.all = false;

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
    //Tools.showlogin();
    Tools.getData({
      "interface_number": "000400",
      "post_content": {
        "token": "",
        "token_phone": "",
        "count": "1"
      }

    }, function (r) {
      if (r.msg == "success") {
        $scope.newsList = r.resp_data.count;
        if ($scope.newsList > 99) {
          $scope.newsList = "99+"
        }

        if($scope.newsList!= 0 ){
          $scope.all=true;

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

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.LogisticsInformation';
                window.androdzerofun_clback  = function(){};


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

                        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Systemessagenotice';
                window.androdzerofun_clback  = function(){};

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


                        
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Companynotice';
                window.androdzerofun_clback  = function(){};

                
            }else{
                $scope.showtitle  = false;
            }
            $scope.init()
    });



  }])




