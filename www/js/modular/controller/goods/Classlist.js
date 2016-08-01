Ctr.controller('goodsclasslist',['$scope','fromStateServ','$timeout','Tools','native','$ionicModal','$state',function($scope,fromStateServ,$timeout,Tools,native,$ionicModal,$state){









 $scope.godetial  = function (r){

   $state.go('r.goodsclassDetail',{title:r.cate_name,id:r.cate_id})
 }
  $scope.newc =  {};
  $scope.newc.classname = undefined;

  $scope.Add = function (){
       $scope.newc.classname = undefined;
       $scope.goodsClasadd.show();
  };

  $scope.addnew =  function (){
     if($scope.newc.classname){
       Tools.getData({
         "interface_number": "030204",
         "post_content": {
         "cate_name": $scope.newc.classname,
         "goodsIds": [],
        }
       },function(r){
         if(r){

           
           if(!r.resp_data.num){
             r.resp_data.num  = 0;
           }
           $scope.data.unshift(r.resp_data);
           $timeout(function () {
             $scope.goodsClasadd.hide();
           },100);
           native.task('添加成功');
           //$scope.goodsClasadd.hiden
         }
       })


     }else{
        native.task('请输入分类名称');
     }
  }


  $scope.$on('$destroy', function() {
    $scope.goodsClasadd.remove();
  });

  $ionicModal.fromTemplateUrl('goodsClasadd.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.goodsClasadd = modal;
  });




$scope.backtoprevView  = fromStateServ.backView;
$scope.parenttitle     =   fromStateServ.getState('r.goodsclasslist').title;
  $scope.$on('$ionicView.beforeEnter',function(){
    $timeout(function () {
      Tools.getData({"interface_number": "030201","post_content": {}},function(r){
        if(r){
          $scope.data  = r.resp_data;
          
        }
      })
    }, 200);
  });



  //删除
  $scope.del  = function(s,ins){
        

        
      Tools.getData({
        "interface_number": "030203",
        "post_content": {
          "cateId":s.cate_id,
          }
      },function(r){
        if(r){
            Tools.rmArrin($scope.data,ins);
            native.task('删除成功');
        }
      })
  }
}])

.controller('ProductdetailsCtr',['$scope','$stateParams','fromStateServ','$ionicHistory','Tools','$ionicModal','$timeout',function($scope,$stateParams,fromStateServ,$ionicHistory,Tools,$ionicModal,$timeout){





  

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
                  Tools.Arrayremove(back,0);
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

            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  false;
  }



  $scope.lijibuy  = function () {
            $scope.setallcationstate = true;
             $scope.selectsku.number  =1;
             $scope.selectsku.state  =  true;
  }



    $scope.stopporp  = function (e) {
        e.stopPropagation();
    }


  $scope.$on('$ionicView.beforeEnter',function(){
            if(fromStateServ.getState('r.Productdetails')){
                $scope.showtitle  = true;
                $scope.backtoprevView  =   fromStateServ.backView; 
                $scope.parenttitle     =   fromStateServ.getState('r.Productdetails').title;
            }else{
                $scope.showtitle  = false;
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
                  r.resp_data.goodsInfo.img[0]  =    window.qiniuimgHost+r.resp_data.goodsInfo.img_url+'?imageView2/1/w/'+width+'/h/'+width; ;
              }

              console.log(r.resp_data.goodsInfo.img)
              angular.forEach(r.resp_data.goodsInfo.img,function (fff) {
                   var   width  =  window.innerWidth*2;
                   fff  =    window.qiniuimgHost+fff+'?imageView2/1/w/'+width+'/h/'+width;
              });

              $scope.goods  = r.resp_data;
              console.log($scope.goods);
              $scope.goods.goodsInfo.img_url  =  window.qiniuimgHost+$scope.goods.goodsInfo.img_url+ '?imageView2/1/w/150/h/150';

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
