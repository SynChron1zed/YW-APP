/**
 * Created by Administrator on 2016/7/28.
 */
Ctr.controller('SettinginviteCtr',['$scope','storage','Tools','native','$state',function($scope,storage,Tools,native,$state){
  $scope.Hight={}

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

