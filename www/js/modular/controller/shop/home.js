

Ctr.controller('shophomeCtr',['$scope','$timeout','Tools','$stateParams','$state','fromStateServ','$ionicScrollDelegate','$rootScope',function($scope,$timeout,Tools,$stateParams,$state,fromStateServ,$ionicScrollDelegate,$rootScope){


    $scope.gogoodsdetial  = function   (r){
            $state.go('r.Productdetails',{id:r.goods_basic_id,inside:'dsadsa'})
    }


   $scope.title  ='店铺';
   $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){

            if(fromStateServ.getState('r.Shophome')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Shophome').title;
            }else{
                $scope.showtitle  = false;
            }
            $timeout(function(){

                if($scope.goodlistdata.length  &&  $stateParams.ref){

                }else{
                        inlit();
                }

                        

            },400)
    });    

    var   inlit  = function (){
                Tools.getData({ "interface_number": "030201",
                "post_content": {shop_id:$stateParams.id}         
                },function(r){
                        if(r){
                            $scope.shopclasslist = r.resp_data.cate_info;
                            $scope.shopclasslist.unshift({
                                cate_id:"",
                                cate_name:"最新商品",
                                num:"0"
                            })
                            $scope.shopclasslist[0].select  =true;                            
                            $scope.shop_info = r.resp_data.shop_info;                            
                            $scope.shop_info.img_header  = window.qiniuimgHost+$scope.shop_info.img_header+'?imageView2/2/w/800';
                            $scope.shop_info.img_shop  =  window.qiniuimgHost+$scope.shop_info.img_shop+'?imageView2/2/w/200';
                            $ionicScrollDelegate.$getByHandle('goodslistshop').scrollTop();
                            $scope.goodlistdata = [];
                            $scope.pagnumber = 1;
                            $scope.loadermoer = true;                  
                        }else{
                                    if(fromStateServ.getState('r.Shophome')){
                                        fromStateServ.backView('r.Shophome') 
                                        }else{

                                                $rootScope.$ionicGoBack();

                                         }




                        }
                })
    };



        //切换分类
        $scope.swatchclass = function (item){
                if(!item.select){
                    angular.forEach($scope.shopclasslist,function(s){
                        s.select  = false;
                    })
                           $ionicScrollDelegate.$getByHandle('goodslistshop').scrollTop();
                           item.select  = true; 
                           $scope.goodlistdata = [];
                            $scope.pagnumber = 1;
                            $scope.loadermoer = true;     
                }
        }

        $scope.goodslisthe =  {};
        function getgoodslisthe  (){
                    $scope.goodslisthe   ={
                        height:(window.innerHeight-(window.document.querySelector('ion-header-bar').offsetHeight+window.document.querySelector('.shopclaslist').offsetHeight))+'px'
                    }
        };
        $timeout(function(){
                getgoodslisthe();
        },500);
        //加载商品列表
        $scope.pagnumber = 1;
        $scope.goodlistdata = [];
        $scope.loadermoer = false;

        $scope.customcucdownlisloadMore  = function(parm){

                    if(parm){
                            $scope.pagnumber   = 1;       
                            $scope.goodlistdata = [];                     
                    }
                    
                    var nowid = undefined;                    
                    angular.forEach($scope.shopclasslist,function(v) {
                            if(v.select){
                                nowid = v.cate_id;
                            }
                    });

                    var senpo  = {
                         "interface_number": "030104",
                         "post_content": {
                            "searchParam": {
                                "is_sales": 1,
                                "company_id":$scope.shop_info.company_id,
                                "shop_cate_id":nowid,
                            }
                        }
                    };

                    senpo.post_content.page_num  = $scope.pagnumber;

                    Tools.getData(senpo,function(r){
                        if(r){

                            angular.forEach(r.resp_data.data,function(s){
                                s.img_url  = window.qiniuimgHost+s.img_url+'?imageView2/2/w/300/h/300';
                                $scope.goodlistdata.push(s)
                            });

                            if(r.resp_data.nextPage  == 0){
                            $scope.pagnumber = 1;
                            $scope.loadermoer = false;
                            }else{
                            $scope.pagnumber = r.resp_data.nextPage;
                            $scope.loadermoer = true;
                            }
                        }else{
                            $scope.loadermoer = false;
                            
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');

                    });


        }
        





    


}])