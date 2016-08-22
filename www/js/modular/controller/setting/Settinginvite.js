/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state','fromStateServ',function($scope,storage,Tools,native,$state,fromStateServ){
  $scope.Hight={}


  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingOne')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingOne').title;
            }else{
                $scope.showtitle  = false;
            }

  })
  


  $scope.Hight =window.innerHeight+"px";
  console.log($scope.Hight)
  Tools.getData({
    "interface_number": "050203",
    "post_content": {
      "token":"",
      "token_phone": ""

    }

  },function(r){


    if(r.msg== "success"){
        $scope.one = r.resp_data.one;
       $scope.count = r.resp_data.total_count;
       $scope.rebate = r.resp_data.total_rebate

    }else{

      return false

    }


  });





}])

