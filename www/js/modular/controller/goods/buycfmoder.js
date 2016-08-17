Ctr.controller('ConfirmorderZfctr',['$scope','buyConfirmorde','Tools','$timeout','$state','comforderlistadder','native','fromStateServ','$ionicScrollDelegate','comfrombackresitl',function ($scope,buyConfirmorde,Tools,$timeout,$state,comforderlistadder,native,fromStateServ,$ionicScrollDelegate,comfrombackresitl){




$scope.showgoodmappintthi  = function (params) {

    comfrombackresitl.ref  =true;
    $state.go('r.selfShop',{goodsId:'',company_id:params.goods_info[0].company_id});
}


$scope.seltwuiluthi  = function (it) {
        angular.forEach($scope.wuliuseleclist,function (ss) {
                ss.select   = false;
        })

        it.select  =  true;

        angular.forEach($scope.ctrnowobj.goods_info,function (ss) {
                if(it.value){
                    ss.express_fee_back  =  ss.express_fee;
                    ss.express_fee  ='0.00';
                    $scope.info.total_pricy   =   parseFloat($scope.info.total_pricy)- parseFloat(ss.express_fee_back) ;
                    $scope.info.total_pricy  =  $scope.info.total_pricy.toFixed(2); 

                }else{
                    if(ss.express_fee_back){
                        
                        ss.express_fee    =  parseFloat(ss.express_fee_back);
                        ss.express_fee =  ss.express_fee.toFixed(2);
                        $scope.info.total_pricy   =   parseFloat($scope.info.total_pricy)+ parseFloat(ss.express_fee_back);
                        $scope.info.total_pricy  =  $scope.info.total_pricy.toFixed(2);
                    }
                }    
        })

        if(it.value){
            $scope.ctrnowobj.showcatmapint   = true;
        }else{
            $scope.ctrnowobj.showcatmapint   = false;
        }
        $ionicScrollDelegate.resize();
        $scope.closetallcationvalue();

}

$scope.selecthiswuliufun  =   function(r){

        if(r.buyer_take){

            if(r.showcatmapint){}
            $scope.wuliuseleclist  = [
                        {
                            name:'快递物流',
                            value:0,
                            select:r.showcatmapint?false:true
                        },
                        {
                            name:'门店自提',
                            value:1,
                            select:r.showcatmapint?true:false
                        }
                    ];



            $scope.ctrnowobj  = r;

            $scope.addjoinshopcart(true);

        }else{
            native.task('部分商品支持在快递物流,不可选择其他配送方式');
        }

};


$scope.comorder  =function () {

    if(!$scope.info.address.addr_id){
        native.task('请选择收货地址');
        return  false;
    }    

    var  carids  = '';
    
    angular.forEach($scope.info.goods,function (sff) {
        angular.forEach(sff.goods_info,function (aaa) {
           carids+= aaa.cart_id+',';
        })
    })

     carids  =    carids.substring(carids.lastIndexOf(','),'')
     var shopin  ={};
     var  takeBy   = {};
     angular.forEach($scope.info.goods,function(aaa){
            var inde  =  parseInt(aaa.shop_id);
            shopin[inde]  = aaa.make?aaa.make:'';
            takeBy[inde]   = aaa.showcatmapint?'1':'0'

     })


    Tools.getData({
         "interface_number": "020607",
         "post_content": {
            "addr_id": $scope.info.address.addr_id,
            "remark": shopin,
            "cartIds":carids,
            takeBySelf:takeBy
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

  $scope.addjoinshopcart  = function (r) {

                if(r){

                    $timeout(function () {
                                      $scope.selectstat  = true;
                                      $scope.setallcationstate = true;
                    },200)
                    return false;
                }
                
            Tools.showlogin();
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

                        $timeout(function () {
                                $scope.selectstat  = false;
                                $scope.setallcationstate = true;
                        },200)                
                    
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


       if(comfrombackresitl.ref){
           
           comfrombackresitl.ref  = false;
           return  false;
       }
       $ionicScrollDelegate.scrollTop();
            if(comforderlistadder.no){
                comforderlistadder.no  = false
                return false;
            }

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

            $scope.showpanl = true;
            if(fromStateServ.getState('r.ConfirmorderZf')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.ConfirmorderZf').title;
            }else{
                $scope.showtitle  = false;
            }
            inlit();    
})


$scope.$on('$ionicView.beforeLeave',function(){

           $timeout(function(){
            $scope.showpanl = false;
           },300)
         })



}])
