/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$rootScope','$ionicModal','$state',function($scope,$rootScope,$ionicModal,$state){




  //选择认证方式
  $scope.next =  function (){
    $state.go('r.selectAuth');
  }
  


  
  
}]);
