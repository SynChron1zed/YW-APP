Ctr.controller('ConfirmorderZfctr',['$scope','buyConfirmorde','Tools','$timeout','$state','comforderlistadder','native','fromStateServ',function ($scope,buyConfirmorde,Tools,$timeout,$state,comforderlistadder,native,fromStateServ) {



$scope.comorder  =function () {

    if(!$scope.info.address.addr_id){
        native.task('请选择收货地址');
        return  false;
    }    
    Tools.showlogin();
    var  carids  = '';
    angular.forEach($scope.info.goods,function (sff) {
        angular.forEach(sff.goods_info,function (aaa) {
           carids+= aaa.cart_id+',';
        })
    })
     carids  =    carids.substring(carids.lastIndexOf(','),'')
     
     var shopin  ={};
     angular.forEach($scope.info.goods,function(aaa){
            var inde  =  parseInt(aaa.shop_id);
            shopin[inde]  = aaa.make?aaa.make:'';

     })
    Tools.getData({
         "interface_number": "020607",
         "post_content": {
            "addr_id": $scope.info.address.addr_id,
            "remark": shopin,
            "cartIds":carids


        }
    },function (r) {
        if(r){
        
        
            $state.go('r.HomPurchase');
            native.task('确认订单成功');

        }

    })


}
    $scope.chikethi  =function (r) {
        
        

        if(r.active){
            $scope.closetallcationvalue()
        }else{
            angular.forEach($scope.addlist,function (ww) {
                ww.active   =false;
            })
            r.active  =  true;
        

            $scope.info.address   = r;
            $scope.closetallcationvalue();



            

        }

    }
    $scope.editadder  = function(r){

        comforderlistadder.no    =  true;
        $state.go('r.AddressEdith',{id:r.addr_id});
        $scope.closetallcationvalue();
    }
    $scope.addadder  =  function(){
                comforderlistadder.no    =  true;
            $state.go('r.AddressEdith');
            $scope.closetallcationvalue();
    }

    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }

  $scope.addjoinshopcart  = function () {
            Tools.getData({
                 "interface_number": "020505",
                "post_content": {}
            },function(r){
                if(r){

                        $scope.addlist  = r.resp_data.data;
                        
                        angular.forEach($scope.addlist,function(s) {
                            if(s.addr_id  == $scope.info.address.addr_id){
                                s.active  =true;
                            }else{
                                s.active  =false;
                            }

                        });
                        
                        $scope.setallcationstate = true;

                    }
            })
        }        
        $scope.closetallcationvalue  =   function(){
            $scope.setallcationstate  =  false;
            var  c   =   document.querySelector('#cutom_sheet');
            c.className = "action-sheet-backdrop";
            $timeout(function(){
                c.className  ="action-sheet-backdrop cutom-sheet"
            },400);
            };

   function  inlit  (){
            if(comforderlistadder.no){
                comforderlistadder.no  = false
                return false;
            }
                Tools.showlogin();
                if(buyConfirmorde.cart){
                    //购物车过来的 接口    
                    Tools.getData({
                   "interface_number": "020601",
                    "post_content": {
                        "cartIds": buyConfirmorde.cart
                        }
                    },function(r){
                    buyConfirmorde.cart  = undefined;
                                if(r){
                                    $scope.info = r.resp_data;
                                    $scope.info.total_pricy  = $scope.info.total_pricy.toFixed(2);
                                    //$scope.info.goods  =  $scope.info.goodsInfo;
                                    
                                     
                                    angular.forEach($scope.info.goods,function(ssz){
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/2/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/2/w/200/h/200';
                                          })
                                    })

                                    console.log($scope.info)
                                    $scope.addjoinshopcart();
                                    
                                }
                    })



                    


                }else{

                    Tools.getData({
                   "interface_number": "020600",
                    "post_content": {
                        "shop_id": buyConfirmorde.shop_id,
                        "sku_id":buyConfirmorde.sku_id ,
                        "goods_basic_id":buyConfirmorde.goods_basic_id,
                        "number": buyConfirmorde.number
                        }
                    },function(r){
                                if(r){
                                    $scope.info = r.resp_data;
                                    $scope.info.total_pricy  = $scope.info.total_pricy.toFixed(2);

                                    angular.forEach($scope.info.goods,function(ssz){
                                        ssz.shop_img   = window.qiniuimgHost+ssz.shop_img+'?imageView2/2/w/50/h/50';
                                        angular.forEach(ssz.goods_info,function(gooitem){
                                            gooitem.img_url   =   window.qiniuimgHost+gooitem.img_url+'?imageView2/2/w/200/h/200';
                                          })
                                    })

                                    $scope.addjoinshopcart();
                                }
                    })
                }
   }

$scope.$on('$ionicView.beforeEnter',function(){
            
            if(fromStateServ.getState('r.ConfirmorderZf')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.ConfirmorderZf').title;
            }else{
                $scope.showtitle  = false;
            }

            inlit();    
})



}])
