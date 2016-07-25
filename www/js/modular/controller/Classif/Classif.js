/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory) {



 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();
       }
       window.androdzerofun_parms  ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    });





  var pageNum = 0;
  var cateId = [];
  $scope.imageshow=true;
  $scope.imagehide =false;


  //商城分类
  $scope.ShoppingList=[];
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
      "page_num": 1,
      "page_per":12
    }
  },function(r){
    if(r){
      if(r.resp_data.data.data.length==12){
        $scope.expression=true
      }else{
        $scope.expression=false
      }
      $scope.ShoppingList = (r.resp_data.data.data)

    }
  });


  //点击分类
  $scope.shoppingsList=function (item) {
    $scope.expression = true;
    pageNum = 0
    $scope.selectedItem = item;
     cateId= item.cate_id;

    Tools.getData({
      "interface_number": "020103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "searchParam": {
          "shop_cate_id": cateId
        },
        "page_num": 1,
        "page_per":12
      }
    },function(r){
      if(r){
        $scope.ShoppingList = (r.resp_data.data.data)

      }
    });
  };

  $scope.proDetail = function (r,Classitem) {
    fromStateServ.stateChange(r,{Classitem: Classitem});
  };



  //翻页加载
   $scope.loadOlderStories=function (ddd) {
         pageNum +=1;
        if(cateId==""){
         cateId=1
     }
       Tools.getData({
         "interface_number": "020103",
         "client_type": window.platform,
         "post_content": {
           "token": "",
           "token_phone": "",
           "searchParam": {
             "shop_cate_id":cateId
           },
           "page_num": pageNum,
           "page_per": 12
         }
       }, function (r) {
         if (r) {
           if (r.resp_data.data.data.length == 0) {
             $scope.expression = false
           } else {
              if(pageNum==1){
                r.resp_data.data.data=[];
              }
             for(var i=0;i<r.resp_data.data.data.length;i++){
               $scope.ShoppingList.push(r.resp_data.data.data[i])
             }
           }
           $scope.$broadcast('scroll.infiniteScrollComplete');
         }

       });



   };

  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };




}]);

