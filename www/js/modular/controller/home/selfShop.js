/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selfShopCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal','seeshopPint',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal,seeshopPint) {




  $scope.goodID = $stateParams.goodsId;
  $scope.companyID = $stateParams.company_id


  Tools.getData({
    "interface_number": "020804",
    "post_content": {
      "token":"",
      "token_phone": "",
      "goods_id": $scope.goodID,
      "company_id": $scope.companyID


    }

  },function(r){

    if(r.msg== "success"){
      $scope.selfList =r.resp_data
      

    }else{

      return false

    }


  });


  $scope.newMap = function (val) {

     seeshopPint.datalist  =[];
    $scope.mapList = val;
    
    seeshopPint.datalist  = [
      {
        name:$scope.mapList.name,
        lat:$scope.mapList.gps_lat,
        lng:$scope.mapList.gps_long,
        link:$scope.mapList.link,
        business:$scope.mapList.take_time,
        opsition:$scope.mapList.address
      }
    ];
    $state.go('r.SeeshopPint',{name:$scope.mapList.name});


    }



  /*for(var i = 0 ;i<$scope.selfList.length;i++){
    seeshopPint.datalist.push({}[i])
    for(var j = 0 ; j<$scope.selfList[i].length;j++){
      if($scope.selfList[i].take_time){
        seeshopPint.datalist[i].business = $scope.selfList[i].take_time
      }
      if($scope.selfList[i].gps_lat){
        seeshopPint.datalist[i].lat = $scope.selfList[i].gps_lat
      }
      if($scope.selfList[i].link){
        seeshopPint.datalist[i].link = $scope.selfList[i].link
      }
    }

  }*/



}]);

