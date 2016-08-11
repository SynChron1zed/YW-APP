/**
 * Created by Administrator on 2016/8/11.
 */
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('searchPurchaseCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$stateParams','$ionicScrollDelegate','$ionicHistory','$ionicNativeTransitions','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$stateParams,$ionicScrollDelegate,$ionicHistory,$ionicNativeTransitions,$ionicModal) {

  $scope.back  =  function (){
    $rootScope.$ionicGoBack();
  };
  $scope.ShoppingList=[];



  $scope.msg={};
  $scope.clear  = function(){
    $scope.msg.key   = undefined;
  }


  $scope.myKeyup = function (e) {
    var keycode = window.event?e.keyCode:e.which;
    if(keycode==13){
      
       $state.go('r.HomPurchase',{keyValue:$scope.msg.key,newData:"1"})

    }

  }




}]);
