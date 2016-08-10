Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])



.controller('LogisticsCtr',['$scope','Tools','fromStateServ','$stateParams','native',function($scope,Tools,fromStateServ,$stateParams,native){
  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Logistics')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Logistics').title;
            }else{                
                $scope.showtitle  = false;
            }

            inlit();
            console.log($stateParams);
    });
    $scope.state  = true;

    var inlit  =   function   (){
        Tools.showlogin();

         Tools.getData({
              "interface_number": "020608",
                "post_content": {
                "order_basic_id": $stateParams.id,
                }
         },function(r){
                if(r){

                      if(r.resp_data.length){
                        //渲染数据
                        $scope.state =  false;
                        $scope.logiaclist  = r.resp_data;
                        $scope.logiaclist[0].now  = true;
                        
                      }else{

                            $scope.backtoprevView('r.Logistics');
                            cordova.InAppBrowser.open(r.resp_data.url, '_blank', 'location=no');
                            
                      }
                }else{
                    $scope.backtoprevView('r.Logistics');
                }

         })




    }

   








}])