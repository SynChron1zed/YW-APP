

Ctr.controller('shophomeCtr',['$scope','$timeout','Tools','$stateParams','$state','fromStateServ','$ionicScrollDelegate','$rootScope',function($scope,$timeout,Tools,$stateParams,$state,fromStateServ,$ionicScrollDelegate,$rootScope){


    $scope.gogoodsdetial  = function   (r){
            $state.go('r.Productdetails',{id:r.goods_basic_id,inside:'dsadsa'})
    }

   $scope.title  ='店铺';
   $scope.showtitle   = false;
  //对安卓返回键的  特殊处理  tabs
  
  $scope.$on('$ionicView.beforeEnter',function(){

            if($stateParams.inside){
                $scope.showtitle  = false;
            }else  if(fromStateServ.getState('r.Shophome')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;

                $scope.parenttitle     =   fromStateServ.getState('r.Shophome').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.Shophome';
                window.androdzerofun_clback  = function(){};



            }else{
                $scope.showtitle  = false;
            }
            $timeout(function(){
                if($scope.goodlistdata.length){
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
                            //$scope.loadermoer = true;
                            $scope.customcucdownlisloadMore(true);





                        }else{
                                    if(fromStateServ.getState('r.Shophome')){
                                        fromStateServ.backView('r.Shophome')
                                        }else{
                                            $timeout(function(){
                                                $rootScope.$ionicGoBack();
                                            },400)


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
                            $scope.customcucdownlisloadMore(true);
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








}]).controller('SeeshopPintCtr',['$scope','seeshopPint','$stateParams','$timeout','fromStateServ','native',function($scope,seeshopPint,$stateParams,$timeout,fromStateServ,native){


          $scope.title  = $stateParams.name;
          $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.SeeshopPint')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.SeeshopPint').title;
                
                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.SeeshopPint';
                window.androdzerofun_clback  = function(){};




            }else{
                $scope.showtitle  = false;
            }

            $timeout(function(){
                console.log(seeshopPint);
                inli();
            },400)
    });

    function  inli (){
        if(!seeshopPint.datalist.length){
            native.task('数据为空');
            return false;
        }

        //获取第一个点
        var Firstpoint    =  seeshopPint.datalist[0];

        map = new BMap.Map("showshopint");          // 创建地图实例
        var point = new BMap.Point(Firstpoint.lng, Firstpoint.lat);  // 创建点坐标
        map.centerAndZoom(point, 25);
        //初始化图标
        var icon = new BMap.Icon('./img/pint.png', new BMap.Size(20, 32), {
              anchor: new BMap.Size(10, 30),
              infoWindowAnchor: new BMap.Size(20,5),
              raiseOnDrag: true
            });
        //开始循环插入make
        //make  对象列表

        var makelist  = [];
        angular.forEach(seeshopPint.datalist,function(element,index) {
               makelist[makelist.length]   =  marker = new BMap.Marker({lng:element.lng,lat:element.lat},{icon:icon});  // 创建标注
               map.addOverlay(marker);


                        (function(element,marker,index){

  function  setcontext  (){
                                return "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>"+element.name+"</h5>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 地 址 :  <span style='color:#4a4a4a'>"+element.opsition+"</span>  </p>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 联 系 方 式 : <span style='color:#4a4a4a'>"+element.link+"</span> </p>" +
                                "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 营 业 时 间 : <span style='color:#4a4a4a'>"+element.business+"</span> </p>" +
                                "</div>";
                        }

                    var infoWindow = new BMap.InfoWindow(setcontext(),{
                            height:0,
                            width:200
                            });
                    marker.addEventListener('click',function(){



                            marker.openInfoWindow(infoWindow,{lng:element.lng,lat:element.lat});
                           })

                           if(index  == 0){
                               marker.openInfoWindow(infoWindow,{lng:element.lng,lat:element.lat});
                           }




                    })(element,marker,index);//调用时参数


        });

















    }




}])
