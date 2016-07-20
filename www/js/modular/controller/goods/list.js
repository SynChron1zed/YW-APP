/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('listofgoodsCtr',['$scope','fromStateServ','$timeout','$state','$ionicModal','native',function($scope,fromStateServ,$timeout,$state,$ionicModal,native){

  //构建搜索功能
  $scope.searchobj  = {};
    $scope.scar =  function(){
      native.Barcode(function(r){
          console.log(JSON.stringify(r))
      });
    }

$scope.selectsearchstat  = function (r,e){
  $scope.searchobj.swatch  = true;
  $scope.searchobj.state  = r;
}



$scope.swatchtstate  = function (){
  $scope.searchobj.swatch   = !$scope.searchobj.swatch;
}






  $scope.$on('$destroy', function() {
    $scope.listsearch.remove();
  });

  $ionicModal.fromTemplateUrl('listsearch.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.listsearch = modal;
  });









  $scope.Add  = function(){
    $state.go('r.goodsEdit')
  };
  $scope.backtoprevView  =   fromStateServ.backView;
  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.listofgoods').title;
  });
  $scope.caklateheight  = {};
  function   caklatehe  (){
       if(window.platform  == 'ios'){
         $scope.caklateheight  = {
           height:window.innerHeight-(64+44+44)+'px'
         }
       }else{
         $scope.caklateheight  = {
           height:window.innerHeight-(44+44+44)+'px'
         }
       }
  };
  caklatehe();
  $timeout(function(){
  caklatehe();
  },600)






}])
