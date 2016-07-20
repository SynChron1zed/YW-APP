/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {



  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


}]);
