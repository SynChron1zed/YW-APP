Ctr.controller('AddresslistCtr',['$scope','fromStateServ','Tools','native','$state','adderupdatastat','$ionicScrollDelegate',function($scope,fromStateServ,Tools,native,$state,adderupdatastat,$ionicScrollDelegate){


  $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            if(adderupdatastat.id){
                if(adderupdatastat.is_default  == '1'){
                     angular.forEach($scope.datalist,function(s){
                         s.is_default  = false;
                        if(s.addr_id  == adderupdatastat.id){
                         s.addr_id  =  adderupdatastat.id  ;
                         s.link_man  = adderupdatastat.linkname ;
                         s.link_phone  = adderupdatastat.phone  ;
                         s.city  = adderupdatastat.city  ;
                         s.province  =  adderupdatastat.province  ;
                         s.region  = adderupdatastat.region   ;
                         s.street  = adderupdatastat.street  ;
                         s.is_default  =  true;
                            }
                        });
                }else{
                     angular.forEach($scope.datalist,function(s){
                        if(s.addr_id  == adderupdatastat.id){
                         s.addr_id  =  adderupdatastat.id  ;
                         s.link_man  = adderupdatastat.linkname ;
                         s.link_phone  = adderupdatastat.phone  ;
                         s.city  = adderupdatastat.city  ;
                         s.province  =  adderupdatastat.province  ;
                         s.region  = adderupdatastat.region   ;
                         s.street  = adderupdatastat.street  ;
                         s.is_default  =  false;                         
                            }
                        })
                    }

                          adderupdatastat.id   = undefined;
                          adderupdatastat.linkname  = undefined;
                          adderupdatastat.phone  = undefined ;
                          adderupdatastat.city  = undefined ;
                          adderupdatastat.province  = undefined ;
                          adderupdatastat.region   = undefined ;
                          adderupdatastat.street  = undefined ;
                          adderupdatastat.is_default = undefined ;
            }else{
                    inlite();
            }

            if(fromStateServ.getState('r.Addresslist')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Addresslist').title;
            }else{
                $scope.showtitle  = false;
            }

    });


    function   inlite  (){
           $ionicScrollDelegate.scrollTop();
        Tools.getData({
                        "interface_number": "020505",
                        "post_content": {
                        }
        },function(r){
                if(r){
                        $scope.datalist = [];
                        angular.forEach(r.resp_data.data,function(s){
                                s.select  =false;  
                                if(s.is_default  == '1'){
                                        s.is_default  = true
                                }else{
                                    s.is_default =  false;  
                                } 
                                
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
                    var index  = [];
                    angular.forEach($scope.datalist,function(s,lineind){
                                if(s.select){
                                  relf.push(s.addr_id);  
                                  index.push(lineind)
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

                                angular.forEach(index,function(s){
                                        console.log(parseInt(s));
                                        Tools.rmArrin($scope.datalist,parseInt(s))   
                                })

                                

                                native.task('删除成功!');

                                }
                            })
                        }

        }
        $scope.showdelt  = !$scope.showdelt; 
        $scope.edith   =  !$scope.edith;  
    }

//编辑  
$scope.adderedit  = function(tar){
   $state.go('r.AddressEdith',{id:tar.addr_id}); 
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

.controller('AddressEdithCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){



  


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

            //020506
                Tools.getData({
                     "interface_number": "020506",
                    "client_type": "ios",
                    "post_content": {
                        addrId : $stateParams.id 
                    }
                },function(r){

                    $scope.addrs.name  = r.resp_data.link_man;
                    $scope.addrs.phone  = r.resp_data.link_phone;

                    if(r.resp_data.is_default  =='1'){
                            $scope.addrs.is_virtual  = true;
                    }else{
                        $scope.addrs.is_virtual  = false;
                    }
                    $scope.addrs.zipcode  = r.resp_data.zcode;
                    $scope.addrs.detailmsg   =  r.resp_data.street;

                    $scope.addrs.province =  r.resp_data.province;
                    $scope.addrs.city =   r.resp_data.city;

                if(!r.resp_data.region){
                    $scope.addrs.region = '';
                }else{
                    $scope.addrs.region =  r.resp_data.region;
                }
                $scope.opitionmsg.text =     $scope.addrs.province+' '+$scope.addrs.city+' '+$scope.addrs.region;
                })



            }else{
                $scope.title = '添加地址';
            }
        // 保存        
        $scope.savechil   =  function(){

            if(!$scope.addrs.name){
                native.task('请填写收货人姓名');
                return false;
            }
            if(!$scope.addrs.phone){
                native.task('请填写联系方式');
                return false;
            }
              if(!$scope.opitionmsg.text){
                native.task('请选择省市区');
                return false;
            }
             if(!$scope.addrs.detailmsg){
                native.task('请填写详细地址');
                return false;
            }


            if(!$stateParams.id){
                  Tools.getData({
                  "interface_number": "020501",
                    "post_content": {
                        "province": $scope.addrs.province,
                        "city": $scope.addrs.city ,
                        "region":  $scope.addrs.region ,
                        "street":  $scope.addrs.detailmsg,
                        "zcode":   $scope.addrs.zipcode,
                        "link_man": $scope.addrs.name,
                        "link_phone":$scope.addrs.phone,
                        "is_default": $scope.addrs.is_virtual?1:0
                    }
            },function(r){
                    if(r){

                        $rootScope.$ionicGoBack();
                        native.task('保存成功');       
                    }
            })
            }else{
                  Tools.getData({
                  "interface_number": "020502",
                    "post_content": {
                        "province": $scope.addrs.province,
                        "city": $scope.addrs.city ,
                        "region":  $scope.addrs.region ,
                        "street":  $scope.addrs.detailmsg,
                        "zcode":   $scope.addrs.zipcode,
                        "link_man": $scope.addrs.name,
                        "link_phone":$scope.addrs.phone,
                        "is_default": $scope.addrs.is_virtual?1:0,
                        "addr_id": $stateParams.id
                    }
            },function(r){
                    if(r){

                         adderupdatastat.id  =  $stateParams.id;
                         adderupdatastat.linkname  = $scope.addrs.name;
                         adderupdatastat.phone   =   $scope.addrs.phone;
                         adderupdatastat.city   =   $scope.addrs.city ;
                         adderupdatastat.province   =$scope.addrs.province;
                         adderupdatastat.region   =$scope.addrs.region;
                         adderupdatastat.street  = $scope.addrs.detailmsg,
                         adderupdatastat.is_default   = $scope.addrs.is_virtual?'1':'0';
 

                        $rootScope.$ionicGoBack();
                        native.task('保存成功');       
                    }
            })




            }

          



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
                            $timeout(function(){
                                    $scope.chomfadder(); 
                                    Tools.hidelogin();
                                    $scope.city.hide();

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
                     $timeout(function(){
                            Tools.hidelogin();
                            $scope.chomfadder(); 
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

            if(!$scope.areatext){
                $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext;
                $scope.addrs.province = $scope.shenfengtext;
                $scope.addrs.city = $scope.Citytext;
                $scope.addrs.region = '';
            }else{

                $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext+' '+$scope.areatext;
                $scope.addrs.province = $scope.shenfengtext;
                $scope.addrs.city =   $scope.Citytext;
                $scope.addrs.region =  $scope.areatext;
            }

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
            $scope.area.remove();


        });

        $ionicModal.fromTemplateUrl('sheng.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.sheng = modal;
        });


      $ionicModal.fromTemplateUrl('city.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.city = modal;
        });

        $ionicModal.fromTemplateUrl('area.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.area = modal;
        });
        


        









    

}])