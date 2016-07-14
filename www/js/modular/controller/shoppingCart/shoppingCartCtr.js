/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ','storage','Tools',function($scope,fromStateServ,storage,Tools){
      $scope.login  =  function(r){
            fromStateServ.stateChange(r);
      };
      $scope.shopcartdata  =[];
      //请求购物数据  整体刷新
      $scope.doRefresh  =  function (){
           Tools.getData({
             "interface_number": "020402",
             "post_content": {}
           },function(r){
             if(r){
                    $scope.shopcartdata  = r.resp_data.cart;
                    if(Object.keys($scope.shopcartdata).length  == 0){
                      $scope.noitem  = true;
                    }else{
                      $scope.noitem  = false;
                    }
                    $scope.$broadcast('scroll.refreshComplete');

             }
           })
      };

      function handtat  (){
        if(storage.getObject('UserInfo').user_id){
            $scope.isShow = false;
            $scope.doRefresh();
        }else{
          $scope.isShow = true;
        }
      }

      $scope.$on('$stateChangeSuccess',function(){
      handtat();
      });






}])
