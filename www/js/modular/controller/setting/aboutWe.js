/**
 * Created by Administrator on 2016/8/5.
 */
/**
 * Created by Administrator on 2016/7/29.
 */

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('aboutWeCtr',['$scope','fromStateServ',function($scope,fromStateServ){

  $scope.$on('$ionicView.beforeEnter',function(){
         if(fromStateServ.getState('r.SettingWe')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SettingWe').title;


                                             
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SettingWe';
                window.androdzerofun_clback  = function(){};



                
            }else{
                $scope.showtitle  = false;
            }
  })

}]);

