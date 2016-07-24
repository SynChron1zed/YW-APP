/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  $scope.shopadmindata=[];
  Tools.getData({
    "interface_number": "010101",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)




    }
  });


  $scope.shopName = function (Classitem) {
    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };
  $scope.shopBrief = function (Classitem) {

    $state.go('r.tab.HomShopadminbrief', {Classitem: Classitem});
  };


  $scope.goodspice  = [];

  $scope.selectpir  = function (){

    if($scope.goodspice.lenght >= 5){

      return false;
    }

    Tools.chekpirc({
      targetWidth:1500,
    },function(r){
      $scope.goodspice.push({
        fengmian:false,
        img:r,
        news:true,
        key:undefined
      })
    })
  };

  //图片上传
  function  uploadimg (claback){
    //待上传图片
    var   imguplist = [];
    //保存索引
    var   imgindex = [];


    if($scope.goodspice.length==0){

      claback();
      return  false;
    }


    angular.forEach($scope.goodspice,function(v,key){
      if(v.news){
        imguplist.push(v.img)
        imgindex.push(key);
      }
    })
    Tools.sendqiniu_queue(imguplist,function(r){
      angular.forEach(imgindex,function(v,key){
        console.log(JSON.stringify(r))
        $scope.goodspice[v].key  = r[key].key
      });
      claback()
    },'goods')
  }



}]);
