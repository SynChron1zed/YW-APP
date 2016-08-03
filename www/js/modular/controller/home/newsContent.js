/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('newsContentCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup','loginregisterstate','native','$timeout','$stateParams','$sanitize',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup,loginregisterstate,native,$timeout,$stateParams,$sanitize){

 $scope.Postid = $stateParams.postID;


  Tools.getData({
    "interface_number": "020004",
    "post_content": {
      "token":"",
      "token_phone": "",
      "articleId": $scope.Postid
    }

  },function(r){


    if(r.msg== "success"){

      r.resp_data.qiniu_key  =  window.qiniuimgHost+r.resp_data.qiniu_key +'?imageView2/2/w/200/h/200';
      $scope.newsList = r.resp_data

      $scope.myHtml=r.resp_data.content


    /*  $scope.myHtml = '<p style="color:blue">an html\n' +
        '<em onclick="this.textContent=\'code_bunny\'">click here</em>\n' +
        'snippet</p>';*/


    }else{

      return false

    }


  });





}]);

