/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ',function($scope,fromStateServ){

      $scope.login  = fromStateServ.stateChange;

}])
