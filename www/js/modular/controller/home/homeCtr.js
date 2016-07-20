/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage) {

    $scope.a1 = function (){
      alert('1');
    };

    //商品管理
    $scope.goodmsg =  function (){

    if(storage.getObject('UserInfo').user_id){
    $scope.goModular('r.listofgoods')
    }else{
      $ionicPopup.confirm({
        title:'您还没有登录！',
        cancelText:'取消',
        okText:'登陆'
      }).then(function(r){
            if(r){
              $scope.goModular('r.login');
            }
      })
    }
    }

    $scope.goModular  =    function(r){
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
