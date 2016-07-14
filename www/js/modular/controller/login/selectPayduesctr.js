/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$scope','$state','Tools',function($scope,$state,Tools){

        console.log('xxxx');
        $scope.skip  =  function (){
          window.backtoinroot(window.backtoinroot_parms);
        }
  
}]);
