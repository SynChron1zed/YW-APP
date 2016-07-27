/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal','$rootScope','goodsState',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal,$rootScope,goodsState){



    //添加分类
    $scope.newclass  = {};
    $scope.addnewclass  = function(){

      console.log($scope.newclass)
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
    });

    $ionicModal.fromTemplateUrl('goodclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.goodclass = modal;
    });

  //构建商品对象  基本信息
  $scope.goods = {};
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
              $scope.systemparnslec();
              //$scope.goods.Stock_number  =
              $scope.chengselect();
              if($scope.goods.edit){
                $scope.goods.barcode =   r.resp_data.goodsInfo.barcode;
                $scope.goods.freight_price =   parseFloat(r.resp_data.goodsInfo.express_fee);
                $scope.goods.is_virtual  =     r.resp_data.goodsInfo.is_virtual?true:false;
                $scope.goods.title =     r.resp_data.goodsInfo.goods_title;
                $scope.goods.Market_price =    parseFloat(r.resp_data.goodsInfo.retail_price);
                $scope.goods.Platform_price =    parseFloat(r.resp_data.goodsInfo.activity_price);
                $scope.goods.id  = r.resp_data.goodsInfo.goods_basic_id;
                $scope.goods.Stock_number  =   r.resp_data.goodsInfo.total_in_number;
                angular.forEach(r.resp_data.goodsInfo.arr_img,function (v){
                  var   c = undefined;
                  if(v  == r.resp_data.goodsInfo.img_url){
                    c   = {
                      fengmian:true,
                      img:window.qiniuimgHost+v+'?imageView2/1/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }else{
                    c   = {
                      fengmian:false,
                      img:window.qiniuimgHost+v+'?imageView2/1/w/200/h/200',
                      news:false,
                      key:v
                    };
                  }
                  $scope.goodspice.push(c);
                })




                //$scope.
              }


         }
    })
  }
 //初始化 goods 对象


$timeout(function(){
  inlint();
},400)




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

          if(c.cate_id  == $scope.goods.systemSelect  &&  c.children.length !=0){

                //计算那个   默认选中
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
      //console.log($scope.goods.systemchidSelct)
  }

  //$scope.goods.

  //title
  //is_virtual
  //barcode
  //goodsDesc
  $scope.$watch('goods.retail_price',function(newValue,oldValue, scope){
           if(Math.abs(newValue)  >= 999999){
             $scope.goods.Market_price  = 999999;
           }
   });

   $scope.$watch('goods.Platform_price',function(newValue,oldValue, scope){
            if(Math.abs(newValue)  >= 999999){
              $scope.goods.Platform_price  = 999999;
            }
    });
    $scope.$watch('goods.Stock_number',function(newValue,oldValue, scope){
             if(Math.abs(newValue)  >= 999999){
               $scope.goods.Stock_number  = 999999;
             }
     });
     $scope.$watch('goods.freight_price',function(newValue,oldValue, scope){
              if(Math.abs(newValue)  >= 999999){
                $scope.goods.freight_price  = 999999;
              }
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
  if(!$scope.goods.Market_price){
    native.task('请填写市场价!')
    return  false;
  }
  if(!$scope.goods.Platform_price){
    native.task('请填写平台价!')
    return  false;
  }

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




    var sendoption  =  {
        "interface_number": '030101',
        "post_content": {
         "goods_title": $scope.goods.title,
         "sys_cate_id":sys_catId,
         "barcode": $scope.goods.barcode,
         "express_fee": $scope.goods.freight_price?$scope.goods.freight_price:0,
         "is_virtual": $scope.goods.is_virtual?'1':'0',
         "retail_price": $scope.goods.Market_price,
         "activity_price":  $scope.goods.Platform_price,
         "img_url": fenmiangtuimg?fenmiangtuimg:'',
         "total_in_number": $scope.goods.Stock_number?$scope.goods.Stock_number:0,
         "arr_img":imglist.length?imglist:[],
         "cateIds": cartlist.length?cartlist:'',
         "desc": $scope.goodsDesc?$scope.goodsDesc:''
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
            goodsState.img_url  = window.qiniuimgHost+r.resp_data.img_url+'?imageView2/1/w/200/h/200';
            goodsState.activity_price  = r.resp_data.total_in_price;
            goodsState.total_in_number   = r.resp_data.total_in_number;



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





}]);
