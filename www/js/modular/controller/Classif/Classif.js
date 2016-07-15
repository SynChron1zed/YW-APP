/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  var pageNum = 1;
  //商城分类
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
      "page_num": pageNum
    }
  },function(r){
    if(r){
      $scope.ShoppingList = (r.resp_data.data.data)
    }
  });


  //点击分类
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
        "page_num": pageNum
      }
    },function(r){
      if(r){
        $scope.ShoppingList = (r.resp_data.data.data)

      }
    });


    //翻页加载
    $scope.loadMore = function() {
      alert(1)
      
      pageNum = pageNum+1;
      Tools.getData({
        "interface_number": "020103",
        "client_type": window.platform,
        "post_content": {
          "token" : "",
          "token_phone": "",
          "searchParam": {
            "shop_cate_id": cateId
          },
          "page_num": pageNum
        }
      },function(r){
        if(r){
          $scope.ShoppingList = (r.resp_data.data.data);
          $scope.$broadcast('scroll.infiniteScrollComplete');

        }
      });

    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });

  }




}]);

