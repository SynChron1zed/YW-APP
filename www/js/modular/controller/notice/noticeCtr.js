/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr',['$scope','$ionicHistory',function($scope,$ionicHistory) {


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





}])

  .controller('noticeDetailCtr', ['$scope',function($scope) {
    
  }]);
