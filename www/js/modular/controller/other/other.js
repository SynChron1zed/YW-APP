Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])

.controller('LogisticsCtr',['$scope','Tools','fromStateServ','$stateParams','native','$rootScope','$timeout',function($scope,Tools,fromStateServ,$stateParams,native,$rootScope,$timeout){




  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Logistics')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Logistics').title;
                

                

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Logistics';
                window.androdzerofun_clback  = function(){};

                
                


            }else{                
                $scope.showtitle  = false;
            }
            inlit();
            
    });
    $scope.state  = true;
    




    var inlit  =   function   (){


        
         Tools.getData({
              "interface_number": "020609",
                "post_content": {
                "order_basic_id": $stateParams.id,
                }
         },function(r){
                if(r){



                    console.log(r);
                    $scope.postiobasinfo  = r.resp_data;
                    




            Tools.getData({
              "interface_number": "020608",
                "post_content": {
                "order_basic_id": $stateParams.id,
                }
         },function(r){
                    
                    if(r){

                    
                      if(r.resp_data.length){
                        //渲染数据
                        $scope.other  = true;
                        $scope.state =  false;
                        $scope.logiaclist  = r.resp_data;
                        $scope.logiaclist[0].now  = true;
                        }else {
                        $scope.other  = true;
                        $scope.state  = true;
                        $scope.openruil =  function(){

                            cordova.InAppBrowser.open(r.resp_data.url, '_blank', 'location=yes');
                        }



                      }
                }else{



                }

         })



                }else{


                    $timeout(function(){

                        if($scope.backtoprevView){
                            $scope.backtoprevView('r.Logistics');
                      }else{
                          $rootScope.$ionicGoBack();
                      }

                    },400)

                   
                    
                }

         })




    }

   








}])