Ctr.controller('ProductdetailsCtr',['$scope','$stateParams','fromStateServ','$ionicHistory','Tools','$ionicModal','$timeout','native','buyConfirmorde','$state','$rootScope','$ionicNativeTransitions','storage','shopcartbactitle',function($scope,$stateParams,fromStateServ,$ionicHistory,Tools,$ionicModal,$timeout,native,buyConfirmorde,$state,$rootScope,$ionicNativeTransitions,storage,shopcartbactitle){


  $scope.gouwuche  = function (){

    if(storage.getObject('UserInfo').user_id){

                  shopcartbactitle.state   =  true;
                 $ionicNativeTransitions.stateGo('r.tab.Shopping_Cart',{}, {
                    "type": "slide",
                    "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
                    "duration": 400,  // in milliseconds (ms), default 400
                  });
      }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $state.go('r.login');

          }
        });


      }







  }


  $scope.toback  = function () {
            $rootScope.$ionicGoBack();
  }



  $scope.goshop  = function () {
    $state.go('r.Shophome',{id:$scope.goods.shopInfo.shop_id,ref:'yes'})
  }

  $scope.addoactionlistimte  = function (pr) {
        if($scope.showstockprice){
          if($scope.selectsku.state){
                Tools.showlogin();
                $scope.closetallcationvalue();
                $timeout(function () {
                  //去确认订单

                  buyConfirmorde.shop_id  = $scope.goods.shopInfo.shop_id;
                  buyConfirmorde.sku_id  =  $scope.selectsku.skuid;


                  buyConfirmorde.goods_basic_id  =  $scope.goods.goodsInfo.goods_basic_id;
                  buyConfirmorde.number  =  $scope.selectsku.number;

                  console.log($scope.selectsku,'沙龙的拉升的萨克的萨克拉的卡拉上课了')

                  Tools.hidelogin();
                  $state.go('r.ConfirmorderZf')

                },300)

                //   //立即购买
                //   Tools.showlogin();
                //   Tools.getData({
                //    "interface_number": "020600",
                //     "post_content": {
                //         "shop_id": $scope.goods.shopInfo.shop_id,
                //         "sku_id": $scope.selectsku.skuid,
                //         "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                //         "number": $scope.selectsku.number
                //     }
                // },function (r) {
                //     if(r){


                //     }
                // })







          }else{
          //加入购物车
          Tools.showlogin();







          Tools.getData({
             "interface_number": "020401",
              "post_content": {
                  "shop_id": $scope.goods.shopInfo.shop_id,
                  "sku_id": $scope.selectsku.skuid,
                  "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                  "number": $scope.selectsku.number
              }
          },function (r) {
              if(r){


                  $scope.closetallcationvalue();
                  native.task('加入购物成功');



              }
          })






          }




        }else{
          native.task('请选择一条完整的规格属性!')

        }



  }


    $scope.selectsku  ={};
    $scope.selectsku.number  =1;
    $scope.selectsku.state  =  false;


    $scope.addnumber  = function () {
      $scope.selectsku.number ++;
    }
    $scope.removeumber  = function () {
      $scope.selectsku.number--;
      if($scope.selectsku.number  >= 0){
        $scope.selectsku.number  =1;
      }

    }



    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      var  c   =   document.querySelector('#cutom_sheet');
      c.className = "action-sheet-backdrop";
      $timeout(function(){
        c.className  ="action-sheet-backdrop cutom-sheet"
      },400);
      $scope.shopcartnumber = 0;
      angular.forEach($scope.shopcart,function(key){
        $scope.shopcartnumber  =  ($scope.shopcartnumber+key.number);
      })


    };



   $scope.goodskumsg  ={};



   $scope.chekdskucombination  = function (parentobj,nowobj){


      // this  state  is
      $scope.showstockprice = false;
      if(!nowobj.disable){
        if(nowobj.active){
          //close this    state  active
          nowobj.active = false;
        }else {
          angular.forEach(parentobj.attrbute,function(mad){
            mad.active = false;
          });
          //open this    state  active
          nowobj.active  =true;
        }



        //Only one
        if($scope.skugroup.length == 1 &&  $scope.skugroup[0].sku_strand.length == 1){
          angular.forEach($scope.skugroup,function(key) {
            if (nowobj.active) {
              $scope.showstockprice = true;
            } else {
              $scope.showstockprice = false;
            }
            $scope.goodskuimte_attrbutsmsg = {};
            var char = '';
            angular.forEach(key.sku_strand,function(kin){
              char+=kin[0]+':'+kin[1]+';';
            });
            angular.forEach($scope.goodskustockinfo,function(valure,key){
              if(key == char){
                $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
              }
            });
            $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
            $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
            $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
            $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
            $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;



            $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
            $scope.selectsku.price =   key.baseinfo.activity_price;





            $scope.goodskuimte_attrbutsmsg.price =key.baseinfo.activity_price;
            $scope.goodskumsg.price   =   key.baseinfo.activity_price



            $scope.skuimteinfo = key;
          });

          return  false;
        }
        var  isonegood = 0;
        var  cc =  $scope.skugroup[0].sku_strand[0][0];
        angular.forEach($scope.skugroup,function(xxin){
          angular.forEach(xxin.sku_strand,function(zz){
            if(cc  == zz[0]){
              isonegood++;
            }
          })
        });

        if(isonegood == $scope.skugroup.length  &&  $scope.keyslist.length  ==1){
          angular.forEach($scope.skugroup,function(key){
            if(key.sku_strand[0][1] ==  nowobj.subid){
              if(nowobj.active){
                $scope.showstockprice = true;
              }else{
                $scope.showstockprice = false;
              }
              $scope.goodskuimte_attrbutsmsg = {};
              var char = '';
              angular.forEach(key.sku_strand,function(kin){
                char+=kin[0]+':'+kin[1]+';';
              });
              angular.forEach($scope.goodskustockinfo,function(valure,key){
                if(key == char){
                  $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                }
              });
              $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
              $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
              $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
              $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
              $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;



              $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
              $scope.selectsku.price =   key.baseinfo.activity_price;

              //零售价统一
              $scope.goodskuimte_attrbutsmsg.price =key.baseinfo.activity_price;
              $scope.goodskumsg.price   =   key.baseinfo.activity_price




              $scope.skuimteinfo = key;
            }

          });
          return false;
        }
        //是所有属性只有一个

        if(Object.keys($scope.goods.basicData).length  == 1){

          var  activelistxx  =[];
          angular.forEach($scope.showskudata,function(key){
            angular.forEach(key.attrbute,function(subkey){
              if(subkey.disable == false  &&  subkey.active){
                var  nowactiveimte = {};
                nowactiveimte.parentId =  key.parentId;
                nowactiveimte.attrsbute  = subkey.subid;
                activelistxx.push(nowactiveimte);
              }
            })
          });
          if($scope.showskudata.length   ==  activelistxx.length){

                  $scope.goodskuimte_attrbutsmsg = {};
                 angular.forEach($scope.goods.basicData,function(key){

                  $scope.showstockprice = true;

                  $scope.goodskuimte_attrbutsmsg.skuname = key.name;

                  $scope.goodskuimte_attrbutsmsg.local_sku_id =key.local_sku_id;
                  $scope.goodskumsg.stock_num  = key.stockNum;




                  $scope.selectsku.skuid =   key.local_sku_id;
                  $scope.selectsku.price =   key.activity_price;

                  $scope.goodskuimte_attrbutsmsg.price =  key.activity_price;
                  $scope.goodskumsg.price   =   key.activity_price;


                 });








          }







          return  false;
        }












        if($scope.keyslist.length == 2){

          var  activelistxx  =[];
          angular.forEach($scope.showskudata,function(key){
            angular.forEach(key.attrbute,function(subkey){
              if(subkey.disable == false  &&  subkey.active){
                var  nowactiveimte = {};
                nowactiveimte.parentId =  key.parentId;
                nowactiveimte.attrsbute  = subkey.subid;
                activelistxx.push(nowactiveimte);
              }
            })
          });


          var  isover  =false;
          angular.forEach($scope.showskudata,function(kkk){
            angular.forEach(kkk.attrbute,function(kksub){
              var  ishasactive  = false;
              ///exclude  existence
              angular.forEach(activelistxx,function(haskey){
                if(kksub.subid ==haskey.attrsbute  && kkk.parentId  == haskey.parentId ){
                  ishasactive  =true;
                }
              });

              ///ishasactive   = false;

              if(!ishasactive){
                var  relyon  =false;
                angular.forEach($scope.skugroup,function(key){
                  //if(kksub.subid  == subkey[1] &&  kkk.parentId  ==  subkey[0]){
                  //    relyon  = true;
                  //}
                  var   Long  = 0;
                  ///exclude  existence
                  angular.forEach(activelistxx,function(haskey){
                    angular.forEach(key.sku_strand,function(subkey){
                      if(subkey[1] ==haskey.attrsbute  && subkey[0] == haskey.parentId ){
                        Long++;
                      }
                    })
                  });
                  if(Long == activelistxx.length){
                    angular.forEach(key.sku_strand,function(subkey){
                      if(subkey[1] ==kksub.subid && subkey[0] == kkk.parentId ){
                        relyon  =true;
                      }
                    });
                  }
                });




                if(!relyon){

                  if(activelistxx.length==2){

                    isover  =  true;
                  }
                  kksub.active  = false;
                  kksub.disable  =true;
                }else{
                  kksub.active  = false;
                  kksub.disable  =false;
                }
              }
            })
          });



          if(isover){
            if(nowobj.active){
              $scope.showstockprice = true;
            }else{
              $scope.showstockprice = false;
            }
            var xxdata =  [];
            angular.forEach(activelistxx,function(xx){
              xxdata.push([
                xx.parentId,
                xx.attrsbute
              ]);
            });
            angular.forEach($scope.skugroup,function(key){
              if(activelistxx.length  == key.sku_strand.length){
                var  compare = [];
                angular.forEach(activelistxx,function(kin){
                  var  arr = [];
                  arr[0]  = kin.parentId;
                  arr[1]  = kin.attrsbute;
                  compare.unshift(kin)
                })
                var  len = 0;
                angular.forEach(compare,function(mbd,index){
                  if(mbd.parentId  == key.sku_strand[index][0]  &&  mbd.attrsbute  == key.sku_strand[index][1] ){
                    len++;
                  }
                });
                $scope.showstockprice = true;
                if(len == activelistxx.length ){
                  $scope.goodskuimte_attrbutsmsg = {};
                  var char = '';
                  angular.forEach(key.sku_strand,function(kin){
                    char+=kin[0]+':'+kin[1]+';';
                  });
                  angular.forEach($scope.goodskustockinfo,function(valure,key){
                    if(key == char){
                      $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                    }
                  });

                  $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
                  $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
                  $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
                  $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;



                  $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
                  $scope.selectsku.price =   key.baseinfo.activity_price;





                  $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;
                  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.activity_price;
                  $scope.goodskumsg.price   =   key.baseinfo.activity_price;






                  $scope.skuimteinfo = key;
                }
              }
            })
          }



          return false;
        }













        //filter   Already existing  Connected data
        //storage   now  active attrbute
        var  activelist  =[];
        angular.forEach($scope.showskudata,function(key){
          angular.forEach(key.attrbute,function(subkey){
            if(subkey.disable == false  &&  subkey.active){
              var  nowactiveimte = {};
              nowactiveimte.parentId =  key.parentId;
              nowactiveimte.attrsbute  = subkey.subid;
              activelist.push(nowactiveimte);
            }
          })
        });
        angular.forEach($scope.showskudata,function(kkk){
          angular.forEach(kkk.attrbute,function(kksub){
            var  ishasactive  = false;
            ///exclude  existence
            angular.forEach(activelist,function(haskey){
              if(kksub.subid ==haskey.attrsbute  && kkk.parentId  == haskey.parentId ){
                ishasactive  =true;
              }
            });
            if(!ishasactive){
              var  relyon  =false;
              angular.forEach($scope.skugroup,function(key){
                //if(kksub.subid  == subkey[1] &&  kkk.parentId  ==  subkey[0]){
                //    relyon  = true;
                //}
                var   Long  = 0;
                var   back  =  Tools.clone(activelist);
                if(back.length  == 1){
                  $scope.showstockprice = false;
                  back =[]
                }if(back.length  == key.sku_strand.length-1) {
                  //closed  path
                  $scope.showstockprice = false;
                }else{
                  $scope.showstockprice = false;
                  Tools.rmArrin(back,0);
                  if(back.length  == key.sku_strand.length-1){
                    if(activelist.length  == key.sku_strand.length){
                      var  compare = [];
                      angular.forEach(activelist,function(kin){
                        var  arr = [];
                        arr[0]  = kin.parentId;
                        arr[1]  = kin.attrsbute;
                        compare.unshift(kin)
                      });

                      var  len = 0;
                      angular.forEach(compare,function(mbd,index){
                        if(mbd.parentId  == key.sku_strand[index][0]  &&  mbd.attrsbute  == key.sku_strand[index][1] ){
                          len++;
                        }
                      });
                      $scope.showstockprice = true;
                      if(len == activelist.length ){
                        $scope.goodskuimte_attrbutsmsg = {};
                        var char = '';
                        angular.forEach(key.sku_strand,function(kin){
                          char+=kin[0]+':'+kin[1]+';';
                        });

                        angular.forEach($scope.goodskustockinfo,function(valure,key){
                          if(key == char){
                            $scope.goodskuimte_attrbutsmsg.skustockinfo = valure;
                          }
                        });

                        $scope.goodskuimte_attrbutsmsg.skuname = key.baseinfo.name;
                        $scope.goodskuimte_attrbutsmsg.goods_title = $scope.goodskubaseinfo.goods_title;
                        $scope.goodskuimte_attrbutsmsg.local_sku_id =key.baseinfo.local_sku_id;
                        $scope.goodskumsg.stock_num  = key.baseinfo.stockNum;
                        $scope.goodskuimte_attrbutsmsg.expar  = $scope.expar;

                        //if($scope.clientobject.type  =='1'){
                        //  //这里去销售价格
                        //  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.trade_price;
                        //  $scope.goodskumsg.price  =   key.baseinfo.trade_price;
                        //}else {
                        //  //这里去零售价
                        //  $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.retail_price;
                        //  $scope.goodskumsg.price   =   key.baseinfo.retail_price
                        //}

                        $scope.selectsku.skuid =   key.baseinfo.local_sku_id;
                        $scope.selectsku.price =   key.baseinfo.activity_price;
                        //零售价
                        $scope.goodskuimte_attrbutsmsg.price =  key.baseinfo.retail_price;
                        $scope.goodskumsg.price   =   key.baseinfo.retail_price



                        $scope.skuimteinfo = key;
                      }
                    }
                  }
                }
                ///exclude  existence
                angular.forEach(back,function(haskey){
                  angular.forEach(key.sku_strand,function(subkey){
                    if(subkey[1] ==haskey.attrsbute  && subkey[0] == haskey.parentId ){
                      Long++;
                    }
                  })
                });
                if( Long == back.length){
                  angular.forEach(key.sku_strand,function(subkey){
                    if(subkey[1] ==kksub.subid && subkey[0] == kkk.parentId ){
                      relyon  = true;
                    }
                  });
                }else{
                }
              });
              if(!relyon){
                kksub.active  = false;
                kksub.disable  =true;
              }else{
                kksub.active  = false;
                kksub.disable  =false;
              }
            }
          })
        });

        //$scope.skugroup;
      }
    };






   $scope.$on('$destroy', function() {

   });

  $scope.addjoinshopcart  = function () {




    if(storage.getObject('UserInfo').user_id){
    }else{
      native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
        if(c  == 1){
          $state.go('r.login');

        }
      });

      return false;
    }





    if(Object.keys($scope.goods.basicData).length  == 1){
                      Tools.showlogin();
                      var  skuid =  undefined;
                      angular.forEach($scope.goods.basicData,function(xxx){
                          skuid  = xxx.local_sku_id;
                      })
                      Tools.getData({
                        "interface_number": "020401",
                          "post_content": {
                              "shop_id": $scope.goods.shopInfo.shop_id,
                              "sku_id": skuid,
                              "goods_basic_id":$scope.goods.goodsInfo.goods_basic_id,
                              "number":1
                          }
                      },function (r){
                          if(r){
                              native.task('加入购物成功');
                          }
                      })
            return false;
            }


            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  false;
  }
  
  $scope.lijibuy  = function () {

              if(storage.getObject('UserInfo').user_id){
              }else{
                native.confirm('该操作需要登录','提示',['登录','取消'],function(c){
                  if(c  == 1){
                    $state.go('r.login');

                  }
                });

                return false;
              }
              $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  true;
  }
    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }

  $scope.$on('$ionicView.beforeEnter',function(event, data){

            if(fromStateServ.getState('r.Productdetails')   &&  !$stateParams.inside ){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView;
                $scope.parenttitle     =   fromStateServ.getState('r.Productdetails').title;


            }else{
                $scope.showtitle  = false;
            }

              if(!$scope.parenttitle){
                $scope.parenttitle  = '返回';
                }

                inlit();












    });

    function  inlit  (){
      Tools.showlogin();
      Tools.getData({
        "interface_number": "020205",
         "post_content": {
        "goods_basic_id":$stateParams.id
        }
      },function(r){

          if(r){

              if(!r.resp_data.goodsInfo.img.length){
                  var   width  =  window.innerWidth*2;
                  r.resp_data.goodsInfo.img[0]  =    window.qiniuimgHost+r.resp_data.goodsInfo.img_url+'?imageView2/2/w/'+width+'/h/'+width; ;
              }else{

                  angular.forEach(r.resp_data.goodsInfo.img,function (fff,index) {
                        var   width  =  window.innerWidth*2;
                        r.resp_data.goodsInfo.img[index]     =  window.qiniuimgHost+fff+'?imageView2/2/w/'+width+'/h/'+width;
                    });
              }

              r.resp_data.goodsInfo.img_url =  window.qiniuimgHost+ r.resp_data.goodsInfo.img_url + '?imageView2/2/w/150/h/150';



              $scope.goods  = r.resp_data;


                //this  is show sku data  list
            $scope.showskudata = [];
            angular.forEach(r.resp_data.normsInfo,function(value,key){
              var  skuitme =  {};
              skuitme.parentname =value.name;
              skuitme.parentId =key;
              skuitme.attrbute =[];
              angular.forEach(value.list,function(subvalue,subkey){
                var  attrbteitme  = [];
                attrbteitme.subid = subkey;
                attrbteitme.subname = subvalue;
                attrbteitme.active = false;
                attrbteitme.disable = false;
                skuitme.attrbute.push(attrbteitme);
              });
              $scope.showskudata.push(skuitme);
              $scope.goodskubaseinfo  = r.resp_data.goodsInfo;
              $scope.goodskustockinfo = r.resp_data.stockInfo;
            });

            //this is handle sku  rey on  sku group
            $scope.skugroup = [];
            angular.forEach(r.resp_data.basicData,function(value,key){
              var  skugroupitme  = {};
              skugroupitme.baseinfo  =value;
              skugroupitme.sku_strand  =[];
              var skukey =   key.split(';');
              angular.forEach(skukey,function(subvlaue){
                if(subvlaue!=''){
                  var  this_strand  = subvlaue.split(':');
                  skugroupitme.sku_strand.push(this_strand)
                }
              });
              $scope.skugroup.push(skugroupitme);
            });

            angular.forEach($scope.localprice,function (keyxx){
              angular.forEach($scope.skugroup,function(groupitme){
                if(groupitme.baseinfo.local_sku_id  == keyxx.local_sku_id){
                  groupitme.baseinfo.retail_price  = keyxx.retail_price;
                }
              })
            });
            $scope.expar  = r.resp_data.goodsInfo.express_fee;
            $scope.keyslist =   r.resp_data.keys;
            //$scope.allocationbumer.number  =1;


            console.log($scope.showskudata);


            // $timeout(function(){
            //   $scope.chekdskucombination($scope.showskudata[0],$scope.showskudata[0].attrbute[0]);
            // },400)











          }else{
            if($scope.showtitle){
                $scope.backtoprevView('r.Productdetails');
            }else{
              $ionicHistory.goBack();
            }


          }
      });


    }




}])
