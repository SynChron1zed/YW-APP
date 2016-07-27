Ctr.controller('AddresslistCtr',['$scope','fromStateServ','Tools','native','$state',function($scope,fromStateServ,Tools,native,$state){

  $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            if(fromStateServ.getState('r.Addresslist')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Addresslist').title;
            }else{
                $scope.showtitle  = false;
            }
        
        inlite();

    });


    function   inlite  (){
        Tools.getData({
                        "interface_number": "020505",
                        "post_content": {
                        }
        },function(r){
                if(r){
                        $scope.datalist = [];
                        angular.forEach(r.resp_data.data,function(s){
                                s.select  =false;
                                $scope.datalist.push(s);     
                        })
                }
        })
    }

    $scope.showdelt  = false;
    $scope.edith  =false;


    $scope.swatch  = function(){
        if($scope.edith){
                //删除
                    var relf  = [];
                    angular.forEach($scope.datalist,function(s){
                                if(s.select){
                                  relf.push(s.addr_id);  
                                }     
                        })
                        if(relf.length){
                            Tools.getData({
                            "interface_number": "020504",
                                "post_content": {
                                    "addr_id":relf                                    
                                }
                            },function(r){
                                if(r){
                                angular.forEach(relf,function(s){
                                        Tools.rmArrin($scope.datalist,parseInt(s))
                                }) 

                                            native.task('删除成功!')
                                }  
                            })
                        } 
        }
        $scope.showdelt  = !$scope.showdelt; 
        $scope.edith   =  !$scope.edith;  
    }

//编辑  
$scope.adderedit  = function(tar){
}
//选中 
$scope.selectthi  = function(tar){
    tar.select   = !tar.select; 
}


//添加地址
$scope.addreder   =  function(){
    $state.go('r.AddressEdith')
}

}])
.controller('AddressEdithCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout){


 $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            console.log(fromStateServ.getState('r.AddressEdith'))
            if(fromStateServ.getState('r.AddressEdith')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.AddressEdith').title;
            }else{
                $scope.showtitle  = false;
            }
    });

            $scope.addrs  = {};
            if($stateParams.id){
                $scope.title = '编辑地址';
            }else{
                $scope.title = '添加地址';
            }

        $scope.cityall  = window.city;


        $scope.openselectprovince  =  function(){

            Tools.showlogin();
            $scope.shenfeng  = [];
            angular.forEach($scope.cityall,function(sheng){
                    sheng.select   = false;                    
                    $scope.shenfeng.push(sheng);
            })   

            $timeout(function(){
                Tools.hidelogin();
                $scope.sheng.show();
            },300)            
        };

        $scope.selectshengf  =  function(shenfeng,aa){
                     angular.forEach(shenfeng,function(sheng){
                                sheng.select   = false;                                    
                     });

                     aa.select  = true;
                     if(aa.child.length){
                            $scope.childCity = [];   
                            Tools.showlogin();
                            angular.forEach(aa.child,function(chidlist){
                                $scope.childCity.push(chidlist);
                            });                            
                         $timeout(function(){
                                Tools.hidelogin();
                                $scope.city.show();
                            },300)   

                     }else{
                        $scope.sheng.hide();
                     }
        };


        $scope.selectCity  =  function(ss,ff){

             angular.forEach(ss,function(sheng){
                                sheng.select   = false;                                    
                     });
                     ff.select  = true;
                     if(ff.child.length){
                         //选择市区
                             $scope.childarea = [];   
                            Tools.showlogin();
                            angular.forEach(ff.child,function(chidlist){
                                $scope.childarea.push(chidlist);
                            });       
                         $timeout(function(){
                                Tools.hidelogin();
                                $scope.area.show();
                            },300)
                     }else{
                         
                            Tools.showlogin();
                            $scope.sheng.hide();
                            $scope.city.hide();
                            $scope.chomfadder();
                            $timeout(function(){

                                    Tools.hidelogin();
                                    $scope.area.hide();

                            },300)

                     }
        };

        $scope.selectArea  = function(ss,ff){

                angular.forEach(ss,function(sheng){
                        sheng.select   = false;

                     });

                     ff.select  = true;
                     Tools.showlogin();
                     $scope.sheng.hide();
                     $scope.city.hide();
                     $scope.chomfadder()
                     $timeout(function(){

                            Tools.hidelogin();
                            $scope.area.hide();

                     },300)




        };



        $scope.chomfadder  =   function () {
            //获取  身份
            angular.forEach($scope.shenfeng,function(r){
                if(r.select){
                            $scope.shenfengtext   =r.cityName;                            
                }   
            })
            //获取城市
             angular.forEach($scope.childCity,function(r){
                if(r.select){
                            $scope.Citytext   =r.cityName;                            
                }   
            });

            if($scope.childarea){
                    angular.forEach($scope.childarea,function(r){
                        if(r.select){
                            $scope.areatext   =r.cityName;                            
                        }
                    });
            };
            $scope.shenfeng  = [];
            $scope.childCity  = [];
            $scope.childarea  = [];
            $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext+' '+$scope.areatext;

            $scope.shenfengtext  = undefined;
            $scope.Citytext  = undefined;
            $scope.areatext  = undefined;
                    

        };

        $scope.opitionmsg   = {};
        $scope.opitionmsg.text   =  undefined;




        $scope.shenfengtext  = undefined;
        $scope.Citytext  = undefined;
        $scope.areatext  = undefined;



        $scope.$on('$destroy', function() {

            $scope.sheng.remove();
            $scope.city.remove();
            $scope.area,remove();

        });

        $ionicModal.fromTemplateUrl('sheng.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.sheng = modal;
        });


      $ionicModal.fromTemplateUrl('area.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.city = modal;
        });

        $ionicModal.fromTemplateUrl('area.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.city = modal;
        });
        


        









    

}])