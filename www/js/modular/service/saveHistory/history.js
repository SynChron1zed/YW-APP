Server.factory("fromStateServ",['$state','$ionicViewSwitcher','$ionicHistory','$timeout',function($state,$ionicViewSwitcher,$ionicHistory,$timeout){
  var box  = {
      data: {},
      savestate:false,
      backView:function(tartg){

        $ionicViewSwitcher.nextDirection('back');
        $state.go(box.getState(tartg).fromState,box.getState(tartg).fromParams);

        $timeout(function(){
            // var inc  = false;
            // var overflow  = [];
            // angular.forEach($ionicHistory.viewHistory().views,function(v,k){
            //   if(inc){  overflow.push(k); }
            //   if(v.stateName  == tartg){ inc=true;  }} )
            // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});
            console.log($ionicHistory.viewHistory())
        },500)



      },
      setState: function(module, fromState, fromParams,title,viewid) {
          this.data[module] = {
              "fromState": fromState,
              "fromParams": fromParams,
              title:title,
              viewId:viewid

          };
      },
      getState: function(module) {
          return this.data[module];
      },
      stateChange: function(stateName,parms,animation){
                  box.savestate = true;
                  $ionicViewSwitcher.nextDirection(animation?animation:'forward');
                  $state.go(stateName,parms)
      },
       removebackregistevent:function(){
         window.androdzerofun   =  undefined;
       },
      saveHisty:function ($histy,stateNa){
        var hostiy  = $histy.currentView();

        //注册安卓返回监听
        window.androdzerofun  =  box.backView;
        window.androdzerofun_parms  = stateNa;

        // var inc  = false;
        // var overflow  = [];
        // angular.forEach($ionicHistory.viewHistory().views,function(v,k){if(inc){overflow.push(k);}if(v.stateName  == stateNa){inc=true;}})
        // angular.forEach(overflow,function (v){delete $ionicHistory.viewHistory().views[v];});

        $timeout(function(){
          $ionicHistory.clearHistory();
        },500)


        if(this.savestate){
          this.savestate  = false;
          this.setState(stateNa,hostiy.stateName,hostiy.stateParams,hostiy.title,hostiy.viewId);
        }

      }

  };

    return box;
}])
