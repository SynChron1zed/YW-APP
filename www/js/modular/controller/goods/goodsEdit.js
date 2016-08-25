/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal','$rootScope','goodsState','$ionicScrollDelegate','$ionicActionSheet','storage',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal,$rootScope,goodsState,$ionicScrollDelegate,$ionicActionSheet,storage){

if(window.$cordovaGeolocation){

 var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
    var lat  = position.coords.latitude;
      var long = position.coords.longitude;
        storage.setObject('location',{
          lat:lat,
          long:long
        });
    }, function(err) {
      //error
    });


}








 if(window.platform   == 'ios'){
   $scope.plfisios  = true;
 }else{
   $scope.plfisios  = false;
 }


$scope.selectthi  = function(tar){
    tar.select   = !tar.select;
}

$scope.chekselectpintlist = function(){
    $scope.shouldShowDelete  =  !$scope.shouldShowDelete;
}
$scope.chekselectpintlistdel = function(){
    $scope.shouldShowReorder  =  !$scope.shouldShowReorder;
}


    $scope.Sincesome =  [];

    $scope.opensincesetiing  = function(){
      if($scope.goods.Since){
          $scope.Since.show();

          $timeout(function(){


                   if($scope.Sincesome.length  == 0){
            Tools.showlogin();
            Tools.getData({
              "interface_number": "020801",
              "post_content": {
                  "goods_id":$scope.goods.edit?$scope.goods.id:'',
              }
            },function(r){
                if(r){

                  $scope.Sincesome  = r.resp_data;

                }
            })
          }
          },420)
      }
    }

    $scope.savePintthi =  function (){
        if(!$scope.mapTagging.title){
          $scope.setmendianmsg();
          native.task('请填写自提点名称');
        }else  if($scope.mapTagging.position  == '获取中....'){
            native.task('请点击地图,选择自提点位置');
        }else{
          Tools.showlogin();
          Tools.getData({
              "interface_number": "020802",
              "post_content": {
                "goods_id":$scope.goods.edit?$scope.goods.id:'',
                "take_id": $scope.mapTagging.take_id?$scope.mapTagging.take_id:'',
                "name": $scope.mapTagging.title,
                "address": $scope.mapTagging.position,
                "gps_lat": $scope.mapTagging.lat+'',
                "gps_long": $scope.mapTagging.long+'',
                "take_time": $scope.mapTagging.business?$scope.mapTagging.business:'',
                "link": $scope.mapTagging.tel?$scope.mapTagging.tel:''
              }
          },function(r){
            if(r){

                $scope.Sincesome.unshift({
                   "select": false,
                   "link": $scope.mapTagging.tel?$scope.mapTagging.tel:'',
                   "name":$scope.mapTagging.title,
                   "long": $scope.mapTagging.long,
                   "lat": $scope.mapTagging.lat,
                   "take_id": $scope.mapTagging.take_id?$scope.mapTagging.take_id:'',
                   "address":$scope.mapTagging.position
                });


                $scope.closetallcationvalue();
                $timeout(function(){
                      $scope.map.hide();
                },400)



            }
          })
        }

        //console.log($scope.mapTagging);

    }

  $scope.comfpintbasemsg  = function (){

      //$scope.closetallcationvalue();
      $scope.savePintthi();

      if(marker){
          infoWindow.setContent(setcontext());
          openinfo();
      }
  }

    $scope.stopporp  = function(e){e.stopPropagation();}

    $scope.closetallcationvalue  =   function(){
      $scope.setallcationstate  =  false;
      var  c   =   document.querySelector('#setmapid');
      c.className = "action-sheet-backdrop";
      $timeout(function(){
        c.className  ="action-sheet-backdrop cutom-sheet"

      },500);

      $scope.shopcartnumber = 0;
      angular.forEach($scope.shopcart,function(key){
        $scope.shopcartnumber  =  ($scope.shopcartnumber+key.number);
      })
    };
  $scope.setmendianmsg  = function(){
      $scope.setallcationstate  = true;
  }







function  creatpint   (e){


        Tools.getData({},function(r){
        },function(){},'GET','http://api.map.baidu.com/geocoder/v2/?ak=RRcZDvEYvUVZXVXRbipOwytFrXflZlNg&callback=renderReverse&location='+e.point.lat+','+e.point.lng+'&output=json&pois=1',true)

        infoWindow = new BMap.InfoWindow(setcontext(),{
          height:0,
          width:200
        });






          map.clearOverlays(marker);
          var icon = new BMap.Icon('./img/pint.png', new BMap.Size(20, 32), {
              anchor: new BMap.Size(10, 30),
              infoWindowAnchor: new BMap.Size(20,5),
              raiseOnDrag: true
            });



          marker = new BMap.Marker(e.point,{icon:icon});  // 创建标注
          map.addOverlay(marker);               // 将标注添加到地图中
          //marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          //console.log(marker.getShadow());

          openinfo = function(){
            marker.openInfoWindow(infoWindow,e.point);
          }

          marker.enableMassClear(true);



}





  function  setcontext  (){

      return "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>"+$scope.mapTagging.title+"</h5>" +
	      "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 地 址 :  <span style='color:#4a4a4a'>"+$scope.mapTagging.position+"</span>  </p>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 联 系 方 式 : <span style='color:#4a4a4a'>"+$scope.mapTagging.tel+"</span> </p>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;margin-bottom: 2px;max-height: 40px;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;word-wrap: break-word;'> 营 业 时 间 : <span style='color:#4a4a4a'>"+$scope.mapTagging.business+"</span> </p>" +
	      "</div>";
  }

    var openinfo  = undefined;
    var marker  = undefined;
    var infoWindow   =  undefined;
    var map  =  undefined;



  $scope.xuanzheopition  = function (tage){






 $scope.map.show();
      $scope.mapTagging   ={};
      $scope.mapTagging.title  = '';
      $scope.mapTagging.tel  = '';
      $scope.mapTagging.business  = '';
      //$scope.mapTagging.position  = '获取中....';
      $scope.mapTagging.position  = undefined;
      $scope.mapTagging.long   =  '';
      $scope.mapTagging.lat   =  '';


    $scope.map.show();

    $timeout(function(){

      $scope.setmendianmsg();

    },600)
    return false;

        if(!tage){
                if(marker){
                  map.clearOverlays(marker);
                }

           $timeout(function(){

                $scope.setmendianmsg();
           },700)
        }


      //$scope.mapTagging.take_id


      if(map){

        if(tage){
              creatpint(tage);
        }
      }else{
      $timeout(function(){
      var ss  = storage.getObject('location');


      map = new BMap.Map("container");          // 创建地图实例
      var point = new BMap.Point(ss.long, ss.lat);  // 创建点坐标
      map.centerAndZoom(point, 25);

      window.renderReverse  = function(r){
          $scope.mapTagging.position  = r.result.formatted_address+','+r.result.sematic_description;
          infoWindow.setContent(setcontext());
          openinfo();
      }

      //map.setZoom()
      map.addEventListener("click", function(e){
        $scope.mapTagging.lat  =e.point.lat;
        $scope.mapTagging.long  =e.point.lng ;
        creatpint(e)
      });
      },400)


      }






  }









    //删除规格属性的方法
    $scope.delattritem  = function(obj,index){
      //维护skulist
      //记录该条sku是否没有依赖则完全删除

      if($scope.goods.edit){
        //编辑状态下最少要保留一个
        if(obj.length==1){
          native.task('编辑状态下最少要保留一条属性规格!');
          return  false;
        }
      }

    native.confirm('删除是不可撤销的操作是否继续？','删除属性规格',['删除','取消'],function(c){
                  if(c  == 1){

                  if($scope.attrsprices.length == 1){
                    $scope.attrsprices = [];
                    $scope.goodsexpandc  =false;
                  }else{
                    $scope.goodsexpandc  =true;
                  }
                        var destroylist  = [];
                        angular.forEach(obj,function(key,inz){
                          if(index == inz){
                            angular.forEach(key.sku,function(skuitem,skuindex){
                              var  nwobj  = {};
                              nwobj.name =  skuitem;
                              nwobj.repeat = 0;
                              angular.forEach(obj,function(kl,i){
                                angular.forEach(kl.sku,function(sub_sku,lin){
                                  if(sub_sku.goods_prop_id  ==  skuitem.goods_prop_id ){
                                    //哈哈
                                    if( sub_sku.prop_value == skuitem.prop_value ){
                                      //蛋筒
                                      nwobj.repeat++;
                                    }
                                  }
                                })
                              });
                              destroylist.push(nwobj)
                            })
                          }
                        });
                        angular.forEach(destroylist,function(key){
                          if(key.repeat ==1){
                            var parentID =   key.name.goods_prop_id;
                            var  sku_value =  key.name.prop_value;
                            angular.forEach($scope.attslist,function(attslist){
                              if(attslist.goods_prop_id  == parentID ){
                                var  parentisselet = false;
                                angular.forEach(attslist.propValue,function(sub_attslist,indx){
                                  if(sub_attslist.prop_value  == sku_value ){
                                    sub_attslist.select = false;
                                  }
                                  if(sub_attslist.select){
                                    parentisselet = true;
                                  }
                                });
                                if(parentisselet){
                                  attslist.select = true;
                                }else{
                                  attslist.select = false;
                                }
                              }
                            })
                          }
                        });
                        Tools.rmArrin(obj,index);
                        //更新索引
                        angular.forEach(obj,function(l,inz){
                          l.index=inz;
                        });
                           if($scope.attrsprices.length){
                                $scope.hassku  = true;
                            }else{
                              $scope.hassku  = false;

                            }





                  }
              })




    };





    //批量设置价格
    $scope.openlistset  = function (){
      if($scope.attrsprices.length>0){
        // 显示操作表
        var  funlist   =  [
            { text: '市场价' },
            { text: '平台价' },
            { text: '库存' },
          ];
        $ionicActionSheet.show({
          buttons:funlist,
          titleText: '选择需要批量设置的属性',
          cancelText: '取消',
          buttonClicked: function(index) {

            if(index != 4 && index != 5 ){


            var defulattext  = '请输入价格';
            if(window.platform  ==  'ios'){
              var defulattext ='';
            }
            var subtext  =  '';
            if(index  == 0){
              subtext   ='请输入市场价';
            }

            if(index  == 1){
              subtext   ='请输入平台价';
            }
            if(index  == 2){
              subtext   ='请输入库存数';
            }


              native.prompt(subtext,'提示',['确认','取消'],defulattext,function(ss){
                if(ss.buttonIndex  ==1){
                  if(ss.input1  !== "请输入价格"){

                              var resulf =null;
                              if(index==0){
                                //进货价
                                resulf = 'retail_price';
                              }
                              if(index ==1){
                                //零售价
                                resulf = 'activity_price';
                              }
                              if(index ==2){
                                //批发价
                                resulf = 'number';
                              }
                              angular.forEach($scope.attrsprices,function(key){
                                 if(Math.abs(ss.input1)  >= 999999){
                                    ss.input1  = 999999;
                                  }
                                key.msg[resulf] = Math.abs(parseInt(ss.input1));


                              });

                  }
                }
              })







            };

            return true;
          }
        });
      }else{

        native.task('请添加至少一个,商品的规格属性!');


      }
    };


        $scope.attrsprices  = [];
        $scope.savesku  = function(){
          $scope.attrsprices  = [];
          var   cheklist   = [];
          angular.forEach($scope.goods.skuSpe,function(ff){
              if(ff.select){
                    var  chillist  = [];
                    angular.forEach(ff.child,function(ssz){

                      if(ssz.select){
                         chillist.push({
                                        goods_prop_id:ff.goods_prop_id,
                                        prop_name:ff.prop_name,
                                        prop_value:ssz.prop_value,
                                        prop_value_id:ssz.prop_value_id,
                                        start:false
                         });
                      }
                    });
                    cheklist.push(chillist);
              }
          });

            var   msgint  ={
              retail_price:undefined,
              activity_price:undefined,
              number:undefined,
            };

          var   c  = Tools.descartes(cheklist);
          var  ref = [];
          for(var o = 0; o< c.length;o++){
            var newobj = {};
            newobj.sku = c[o];
            newobj.index = ref.length;
            ref.push(newobj)
          }

      angular.forEach($scope.attrsprices,function(kin){
        angular.forEach(ref,function(ls){
          if( kin.sku[0].goods_prop_id  ==  ls.sku[0].goods_prop_id  &&  kin.sku[0].prop_value_id  ==   ls.sku[0].prop_value_id  ){
            ls.msg = kin.msg;
            if(kin.local_sku_id){
              ls.msg.local_sku_id = kin.local_sku_id;
            }

          }
        })
      });

      if($scope.attrsprices.length==0){
        $scope.attrsprices = Tools.clone(ref);
      }else{
        //length不对直接对比条数进行删除
        if(ref.length != $scope.attrsprices.length){
          if(ref.length>$scope.attrsprices.length){
            //这里是生成的数据大于源有的
            angular.forEach(ref,function(key,index){
              if($scope.attrsprices[index] == undefined){

                key.msg =Tools.clone(msgint);
                key.index = $scope.attrsprices.length;
              }else{

                key.msg = Tools.clone($scope.attrsprices[index].msg);
                if($scope.attrsprices[index].local_sku_id){
                  key.msg.local_sku_id  =  $scope.attrsprices[index].local_sku_id;
                }
              }
            });
            $scope.attrsprices  =Tools.clone(ref);
          }else if(ref.length<$scope.attrsprices.length){
            angular.forEach($scope.attrsprices,function(key,inc){
              if(ref[inc] == undefined){
                delete  $scope.attrsprices[inc];
                $scope.attrsprices.length = $scope.attrsprices.length-1;
              }else{
                key.sku = Tools.clone(ref[inc].sku);
              }
            })
          }
        }else{
          angular.forEach($scope.attrsprices,function(key,inc){
            key.sku  = Tools.clone(ref[inc].sku);
          })
        }
      }
      if($scope.attrsprices.length!=0){
        $scope.goodsexpandc  =true;
      }else  if($scope.attrsprices.length==0){
        $scope.goodsexpandc  =false;
      }

      angular.forEach($scope.attrsprices,function(kin){
        if(kin.msg){
        }else{
          kin.msg = Tools.clone(msgint);
        }
      });

        if($scope.attrsprices.length){
              $scope.hassku  = true;
        }else{
          $scope.hassku  = false;

        }






        $scope.sku.hide();


        };





        $scope.sublistaddnew  = {};
        $scope.appenattributobj  =   function(){
        if($scope.sublistaddnew.prop_value){

         var  poid  = undefined;
          angular.forEach($scope.goods.skuSpe,function(ss,kyein){
                 if(ss.chekd){
                   poid =  ss.goods_prop_id
                 }
               })

          Tools.getData({
            "interface_number":"030305",
            "post_content":{
              "goods_prop_id":poid,
              "prop_value":$scope.sublistaddnew.prop_value
            }
        },function(r){
            if(r){

               r.resp_data.select  = false;

               //$scope.subattrslist.unshift(r.resp_data);

               var   inde  = undefined;
               angular.forEach($scope.goods.skuSpe,function(ss,kyein){
                 if(ss.chekd){
                   inde = kyein;
                 }
               })

              $scope.goods.skuSpe[inde].child.unshift(r.resp_data);
            }


            $scope.sublistaddnew.prop_value   = undefined;



          })


        }else{
          native.task('请输入属性名');
        }
    }


    $scope.addnewskukey  =  function(){
          native.prompt('','添加新规格',['添加','取消'],'',function(result){
                if(result.buttonIndex  == 1){
                      if(result.input1 ==''  ||  result.input1 == undefined){
                        native.task('请填写规格名');
                        return false;
                      }else{
                        Tools.getData({
                           "interface_number": "030304",
                              "post_content": {
                              "prop_name":result.input1,
                            }
                        },function(r){
                                  r.resp_data.chekd  = false;
                                  r.resp_data.select  = false;
                                   $scope.goods.skuSpe.unshift(r.resp_data);
                        })

                      }

                }

          })

    }


  $scope.canlshowright  = function(){
      $scope.showchildnode  = false;
  }

  $scope.sublistchekselect   = function(s,ll){
        var  ff   = true;
        angular.forEach(s,function(f){
              if(f.select){
                   ff  = false;
              }
        })

        if($scope.goods.edit){
          if(ff){
            ll.select   = true;
            native.task('编辑状态下必须至少选中一个属性!')
            return  false;
          }
        }else{
          if(ff){
                angular.forEach($scope.goods.skuSpe,function(ff){
                        if(ff.chekd){
                            ff.select  = false;
                        }
                })
          }else{
             angular.forEach($scope.goods.skuSpe,function(ff){
                        if(ff.chekd){
                            ff.select  = true;
                        }
                })
          }
        }




  }

  $scope.subattrslist  = [];


  $scope.showmichild   =  function (targe){

            angular.forEach($scope.goods.skuSpe,function(ha){
                      ha.chekd  = false;
              });
              targe.chekd  = true;
              $scope.showchildnode  = true;
              if(targe.child){
                $scope.subattrslist  = targe.child;
              }else{
              Tools.showlogin();
              Tools.getData({
                "interface_number": "030303",
                "post_content": {
                    "goods_id": $scope.goods.edit?$scope.goods.id:'',
                    "goods_prop_id": targe.goods_prop_id,
                  }
              },function(r){
                $ionicScrollDelegate.$getByHandle('childlistsku').scrollTop();
                if(r){

                   targe.child   = r.resp_data;
                   $scope.subattrslist  = r.resp_data;

                }
              })


              }




  }






  //规格属性编辑
  $scope.openattslist  = function(){
      $scope.sku.show();
  }

    //添加分类
    $scope.newclass  = {};
    $scope.addnewclass  = function(){
      if(!$scope.newclass.name){
        native.task('请填写分类名称');
        return false;
      }
      Tools.showlogin();
      Tools.getData({
            "interface_number": "030204",
          "post_content": {
          "cate_name":$scope.newclass.name,
          "goodsIds":[]
        }
      },function(r){
        if(r){
              $scope.goods.catelist.push(r.resp_data)
              $scope.newclass.name  = undefined;
              native.task('分类添加成功');
        }


      })

    }


    goodsState.Refresh = true;

    $scope.$ionicGoBack  = function (){
    }
    //商城分类对象
    $scope.$on('$destroy', function() {
      $scope.goodclass.remove();
      $scope.sku.remove();
      $scope.map.remove();
      $scope.Since.remove();

    });

    $ionicModal.fromTemplateUrl('Since.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.Since = modal;
    });

  $ionicModal.fromTemplateUrl('map.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.map = modal;
    });

    $ionicModal.fromTemplateUrl('goodclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.goodclass = modal;
    });



    $ionicModal.fromTemplateUrl('sku.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.sku = modal;
    });





  //构建商品对象  基本信息
  $scope.goods = {};
  $scope.goods.post = true;



  $scope.goods.edit  =  false;  //商品编辑状态
  $scope.goods.Stock_number = 1;
  $scope.goods.systemSelect  = undefined;
  $scope.goods.systemchidSelct  =undefined;
  $scope.goods.systemchidlist  = undefined;
  $scope.goods.cateSelctItem  = '请选择分类';
  $scope.goods.catelist =  [];

  function inlint(){

    Tools.showlogin();
    Tools.getData({
      "interface_number": "030102",
          "post_content": {
            "goods_id": $stateParams.id?$stateParams.id:'',
         }
    },function(r){
         if(r){

              $scope.goods.systemClass   = r.resp_data.sys_cate;
              $scope.goods.catelist  = r.resp_data.shop_cate;

              //$scope.goods.Stock_number  =
              $scope.hassku  = false;
              angular.forEach(r.resp_data.prop,function(ha){
                      ha.chekd  = false;
                      if(ha.select){
                            $scope.hassku =  true;
                      }
              });
              $scope.goods.skuSpe  =  r.resp_data.prop;
              $scope.chengselect();
              $scope.goods.skuinfo  = [];

              $timeout(function(){
                $scope.systemparnslec();

              },10)


              if($scope.goods.edit){
                $scope.goods.barcode =   r.resp_data.goodsInfo.barcode;
                $scope.goods.freight_price =   parseFloat(r.resp_data.goodsInfo.express_fee);
                $scope.goods.is_virtual  =     r.resp_data.goodsInfo.is_virtual?true:false;
                $scope.goods.title =     r.resp_data.goodsInfo.goods_title;

                if(r.resp_data.goodsInfo.buyer_take == '1'){
                  $scope.goods.Since  = true;
                }

                $scope.goods.id  = r.resp_data.goodsInfo.goods_basic_id;
                $scope.goods.goodsDesc     =  r.resp_data.goodsInfo.desc;
                $scope.goods.skuinfo  =  r.resp_data.skuInfo;
                angular.forEach(r.resp_data.goodsInfo.arr_img,function (v){
                  var   c = undefined;
                  if(v  == r.resp_data.goodsInfo.img_url){
                    c   = {
                      fengmian:true,
                      img:window.qiniuimgHost+v+'?imageView2/2/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }else{
                    c   = {
                      fengmian:false,
                      img:window.qiniuimgHost+v+'?imageView2/2/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }
                  $scope.goodspice.push(c);
                })

                if($scope.hassku){
                  //还原sku
                  angular.forEach($scope.goods.skuinfo,function(ff){

                          var skuin   = [];
                          var skuid  =  ff.properties.split(";");
                          var skuname  =  ff.properties_name.split(";");
                             skuname.length  =  skuname.length-1;
                             skuid.length  =  skuid.length-1;

                            angular.forEach(skuid,function(skulitem,skuinde){
                            var   idhan  =  skulitem.split(':');
                            var   namhan   = skuname[skuinde].split(':');



                            skuin.push({
                              goods_prop_id:idhan[0],
                              prop_value_id:idhan[1],
                              prop_name:namhan[0],
                              prop_value:namhan[1],
                            })

                          })


                        $scope.attrsprices.push({
                          index:$scope.attrsprices.length,
                          msg:{
                            activity_price:ff.activity_price,
                            number:ff.quantity,
                            retail_price:ff.retail_price,
                            local_sku_id:ff.local_sku_id
                          },
                          sku:skuin
                        })
                  })







                }else{
                  $scope.goods.Market_price    =      parseFloat($scope.goods.skuinfo[0].retail_price);
                  $scope.goods.Platform_price  =    parseFloat($scope.goods.skuinfo[0].activity_price);
                  $scope.goods.Stock_number    =     parseFloat($scope.goods.skuinfo[0].quantity);
                }






                //$scope.
              }


         }
    })
  }
//初始化 goods 对象
$scope.$on('$ionicView.beforeEnter',function(){
  inlint();
})





  $scope.showdetail = false;
  $scope.swatchdetial  = function (){
        $scope.showdetail = !$scope.showdetail;
  }



  $scope.chengselect = function (r){

    if(r){
    r.select  = !r.select;
    }


    var selectleng  = 0;
    var sselctname  =  undefined;
     angular.forEach($scope.goods.catelist,function(k){

          if(k.select){
            selectleng++;
            sselctname = k.cate_name;
          }
     });



     if(selectleng == 0 ){
          $scope.goods.cateSelctItem    ='请选择分类';
     }else if(selectleng == 1){
       $scope.goods.cateSelctItem  = sselctname;
     }else{
       $scope.goods.cateSelctItem  = selectleng+' 个';
     }
  }


  //父类
  $scope.systemparnslec =   function (){

    if($scope.goods.systemSelect){
        angular.forEach($scope.goods.systemClass,function(c){
                if(c.cate_id   ==  $scope.goods.systemSelect){
                  c.select  =true;
                }else{
                  c.select  = false;
                }
        })
    }

    var hanparnselect = true;

    angular.forEach($scope.goods.systemClass,function(c){

          if(c.select){
            $scope.goods.systemSelect   =  c.cate_id;
            hanparnselect  = false;
          }

          if(c.cate_id  == $scope.goods.systemSelect  && c.children.length !=0){

                //计算那个   默认选中
                $timeout(function(){



                         $scope.goods.systemchidlist  =  c.children;
                var hasslect = true;
                angular.forEach($scope.goods.systemchidlist,function(xx){
                        if(xx.select){
                          hasslect = false;;
                            $scope.goods.systemchidSelct   = xx.cate_id;
                        }
                });

                if(hasslect){
                    $scope.goods.systemchidSelct   =  $scope.goods.systemchidlist[0].cate_id;
                  }


                })



          }else{
            $scope.goods.systemchidlist  =  undefined;
            $scope.goods.systemchidSelct  =  undefined;
          }
    })



    if(hanparnselect){
    $scope.goods.systemClass[0].select = true;
    $scope.goods.systemSelect  = $scope.goods.systemClass[0].cate_id;
    }


  };




  //子类
  $scope.chidselect   = function(){

  }

  //$scope.goods.

  //title
  //is_virtual
  //barcode
  //goodsDesc
$scope.bilfthivla = function(r){
     if(Math.abs(r.msg.retail_price)  >= 999999){
        r.msg.retail_price  = 999999;
      }
}
$scope.bilfthivlabr   = function(r){
      r.msg.retail_price   = Math.abs(r.msg.retail_price);
}


$scope.bilfthivlapre = function(r){
     if(Math.abs(r.msg.activity_price)  >= 999999){
        r.msg.activity_price  = 999999;
      }
}
$scope.bilfthivlabrpre   = function(r){
      r.msg.activity_price   = Math.abs(r.msg.activity_price);
}


$scope.bilfthivlanumber = function(r){
     if(Math.abs(r.msg.number)  >= 999999){
        r.msg.number  = 999999;
      }
}

$scope.bilfthivlanumberbr   = function(r){
      r.msg.number   = Math.abs(r.msg.number);
}






$scope.matthisvalu   = function(s){
  s.Market_price = Math.abs(s.Market_price);
}
$scope.matthisvaluplaform   = function(s){
  s.Platform_price = Math.abs(s.Platform_price);
}
$scope.matthisvalstok   = function(s){
  s.Stock_number = Math.abs(s.Stock_number);
}
$scope.matthisvalfrprice   = function(s){
  s.freight_price = Math.abs(s.freight_price);
}








  $scope.$watch('goods.Market_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Market_price  = 999999;
            }
           ///$scope.goods.Market_price  = Math.abs($scope.goods.Market_price)
   });

   $scope.$watch('goods.Platform_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Platform_price  = 999999;
            }
            //$scope.goods.Platform_price  = Math.abs($scope.goods.Platform_price)
    });
    $scope.$watch('goods.Stock_number',function(newValue,oldValue, scope){
             if(Math.abs(newValue)  >= 999999){
               $scope.goods.Stock_number  = 999999;
             }
             //$scope.goods.Stock_number  = Math.abs($scope.goods.Stock_number)
     });

     $scope.$watch('goods.freight_price',function(newValue,oldValue, scope){
              if(Math.abs(newValue)  >= 999999){
                $scope.goods.freight_price  = 999999;
              }
          //$scope.goods.freight_price  = Math.abs($scope.goods.freight_price)
      });

  ///扫码
  $scope.Barcode =  function(){
    native.Barcode(function(r){
          $scope.goods.barcode   =  r.text;
          $scope.$apply();
    });
  }


$scope.delimg  = function(r,kye){
  Tools.rmArrin(r,kye)
}

$scope.chkefengmian  = function (c){
  angular.forEach($scope.goodspice,function(r){
    r.fengmian   =false;
  })
  c.fengmian  = true;
}

//商品图片list
 $scope.goodspice  = [];

 // $scope.goodspice.push({
 //   fengmian:true,
 //   img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1027673320,1338089337&fm=116&gp=0.jpg'
 // })

  //选择图片
  $scope.selectpirce  = function (){
    var ss  = $scope.goodspice;
    if( Object.keys(ss).length >= 5 ){
      native.task('最大上传5张图片');
      return false;
    }else{

          Tools.chekpirc({
                targetWidth:1500,
              },function(r){
                  $scope.goodspice.push({
                    fengmian:false,
                    img:r,
                    news:true,
                    key:undefined
                  })
              })
    }


  };

  //图片上传
  function  uploadimg (claback){
    //待上传图片
    var   imguplist = [];
    //保存索引
    var   imgindex = [];


    if($scope.goodspice.length == 0){

      claback();
      return  false;
    }


    angular.forEach($scope.goodspice,function(v,key){
      if(v.news){
        imguplist.push(v.img)
        imgindex.push(key);
      }
    })
  Tools.sendqiniu_queue(imguplist,function(r){
    angular.forEach(imgindex,function(v,key){

      $scope.goodspice[v].key  = r[key].key
    });
    claback()
  },'goods')
  }
//sendqiniu_queue


//商品的发布保存
$scope.save  = function (){
  if(!$scope.goods.title){
    native.task('请填写标题!')
    return  false;
  }
  if(!$scope.goods.barcode){
    native.task('请填写条码!')
    return  false;
  }

      // if(!$scope.goods.Market_price){
      //     native.task('请填写市场价!')
      //     native.hidloading();
      //     return  false;
      //   }
      //   if(!$scope.goods.Platform_price){
      //     native.task('请填写平台价!')
      //     native.hidloading();
      //     return  false;
      //   }
      // if(!Tools.reg.negative($scope.goods.Market_price)){
      //   native.task('请填写正确的市场价!');
      //   return  false;
      // }

      // if(!Tools.reg.negative($scope.goods.Platform_price)){
      //   native.task('请填写正确的平台价!');
      //   return  false;
      // }






  native.loading();
  uploadimg(function(){
      // console.log(JSON.stringify($scope.goodspice))
      var hasfengmiang   = true;
      var fenmiangtuimg   = undefined;
      var imglist = [];

      if($scope.goodspice.length){
        angular.forEach($scope.goodspice,function(v){
          if(v.fengmian){
            hasfengmiang    = false;
            fenmiangtuimg  = v.key;
          }
          imglist.push(v.key);
        });
        if(hasfengmiang){
            fenmiangtuimg = $scope.goodspice[0].key;
        }
      }

     var sys_catId  ='';
     if($scope.goods.systemSelect){
        sys_catId   = $scope.goods.systemSelect
     }

    if($scope.goods.systemchidSelct){
        sys_catId   = $scope.goods.systemchidSelct
    }

    var cartlist  = [];
    angular.forEach($scope.goods.catelist,function(c){
      if(c.select){
        cartlist.push(c.cate_id);
      }
    })

    var sku = [];
    if($scope.attrsprices.length == 0){

        var loid  =undefined;
        if($scope.goods.skuinfo.length){
              loid =   $scope.goods.skuinfo[0].local_sku_id;
        }

        sku.push({
          activity_price:Math.abs($scope.goods.Platform_price),
          retail_price:Math.abs($scope.goods.Market_price),
          properties:'',
          quantity:$scope.goods.Stock_number?Math.abs($scope.goods.Stock_number):'0',
          local_sku_id:loid,
        })
    }else{

      var  bitian  = true;
      angular.forEach($scope.attrsprices,function(fff){
          if(!fff.msg.activity_price   || !fff.msg.retail_price){
             bitian  = false;
          }
          var skuid  = '';
          angular.forEach(fff.sku,function(xxx){
                skuid+=xxx.goods_prop_id+':'+xxx.prop_value_id+';';
          })
          sku.push({
          activity_price:Math.abs(fff.msg.activity_price),
          retail_price:Math.abs(fff.msg.retail_price),
          properties:skuid,
          quantity:fff.msg.number?Math.abs(fff.msg.number):'0',
          local_sku_id:fff.msg.local_sku_id?fff.msg.local_sku_id:''

        })
      })

      if(!bitian){
        native.task('请填写完整价格信息!');
        native.hidloading();
        return false;
      }
    }

    var  takelist =  [];
    angular.forEach($scope.Sincesome,function(ss){
      if(ss.select){
          takelist.push(ss.take_id);
      }
    })

    var sendoption  =  {
        "interface_number": '030101',
        "post_content": {
         "goods_title": $scope.goods.title,
         "sys_cate_id":sys_catId,
         "barcode": $scope.goods.barcode,
         "express_fee": $scope.goods.freight_price?$scope.goods.freight_price:0,
         "img_url": fenmiangtuimg?fenmiangtuimg:'',
         "arr_img":imglist.length?imglist:[],
         "cateIds": cartlist.length?cartlist:'',
         "desc": $scope.goods.goodsDesc?$scope.goods.goodsDesc:'',
          total_in_number:'',
          total_in_price:'',
          skuInfo:sku,
          buyer_take:$scope.goods.Since?'1':'0',
          take_ids:takelist
          }
    };

    if($scope.goods.edit){
      sendoption.interface_number   = "030103";
      sendoption.post_content.goods_basic_id  = $scope.goods.id;
    }

    Tools.getData(sendoption,function(r){
      if(r){
        if(window.cordova){
            window.cordova.plugins.Keyboard.close();
        }
        if($scope.goods.edit){

            goodsState.goods_basic_id  = r.resp_data.goods_basic_Id;
            goodsState.goods_title  = r.resp_data.goods_title;
            goodsState.img_url  = window.qiniuimgHost+r.resp_data.img_url+'?imageView2/2/w/200/h/200';
            goodsState.total_in_price  = r.resp_data.total_in_price;
            goodsState.total_in_number   = r.resp_data.total_in_number;
            //console.log(goodsState)

          native.task('保存成功!',3000)
          $timeout(function(){
              $rootScope.$ionicGoBack();
          },300)

        }else{
          native.task('发布成功!',3000)
          $timeout(function(){
              goodsState.Refresh  = false;
              $rootScope.$ionicGoBack();
          },300)
        }








      }
    })
  })
}

  if($stateParams.state){
    $scope.title  = '商品编辑';
    $scope.state  = '保存';
    $scope.goods.edit  = true;

  }else{
    $scope.title  = '商品添加';
    $scope.state  = '发布';
  }

  $scope.scoptopheihgt  = {};
  function gehiehgt (){
      if(window.platform  == 'ios'){
            $scope.scoptopheihgt  ={
              height:(window.innerHeight-64-80)+'px'
            }
      }else{
           $scope.scoptopheihgt = {
              height:(window.innerHeight-44-80)+'px'
            }
      }
  }
  gehiehgt();
  $timeout(function(){
    gehiehgt();
  },500)

}]);
