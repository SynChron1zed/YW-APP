Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])

.controller('LogisticsCtr',['$scope','Tools','fromStateServ','$stateParams',function($scope,Tools,fromStateServ,$stateParams){
  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Shophome')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Shophome').title;
            }else{
                $scope.showtitle  = false;
            }

            console.log($stateParams);
    });








}])