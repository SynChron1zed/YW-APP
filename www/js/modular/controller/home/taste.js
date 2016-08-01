/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup){
  Tools.getData({
    "interface_number": "020202",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){
  
    if(r){
      angular.forEach(r.resp_data.data,function(c){
        c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';

      });

      $scope.Taste = (r.resp_data.data)


    }
  });



}]);
