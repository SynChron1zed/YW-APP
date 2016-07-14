/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  Tools.getData({
    "interface_number": "020101",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.Citysd = (r.resp_data)
      $scope.selectedItem = $scope.Citysd[0];

    }
  });

  Tools.getData({
    "interface_number": "020103",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": 1
      },
      "page_num": "1"
    }
  },function(r){
    if(r){
      $scope.ShoppingList = (r.resp_data.data.data)
    }
  });



  $scope.shoppingsList=function (item) {

    $scope.selectedItem = item;
    var cateId= item.cate_id;

    Tools.getData({
      "interface_number": "020103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "searchParam": {
          "shop_cate_id": cateId
        },
        "page_num": "1"
      }
    },function(r){
      if(r){
        $scope.ShoppingList = (r.resp_data.data.data)

      }
    });

  }




}]);

