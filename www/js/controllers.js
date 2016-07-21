var  Ctr = angular.module('starter.controllers', []);

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout) {
  var pageNum = 0;
  var cateId = [];

  //商城分类
  $scope.ShoppingList=[];
    Tools.getData({
      "interface_number": "020101",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.Citysd = (r.resp_data)
        $scope.selectedItem = $scope.Citysd[0];

      }
    });



  Tools.getData({
    "interface_number": "020103",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": 1
      },
      "page_num": 1,
      "page_per":12
    }
  },function(r){
    if(r){
      if(r.resp_data.data.data.length==12){
        $scope.expression=true
      }else{
        $scope.expression=false
      }
      $scope.ShoppingList = (r.resp_data.data.data)

    }
  });


  //点击分类
  $scope.shoppingsList=function (item) {
    $scope.expression = true;
    pageNum = 0
    $scope.selectedItem = item;
     cateId= item.cate_id;

    Tools.getData({
      "interface_number": "020103",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": "",
        "searchParam": {
          "shop_cate_id": cateId
        },
        "page_num": 1,
        "page_per":12
      }
    },function(r){
      if(r){
        $scope.ShoppingList = (r.resp_data.data.data)

      }
    });
  };

  $scope.proDetail = function (Classitem) {

    $state.go('r.tab.ClassifDetails', {Classitem: Classitem});
  };



  //翻页加载
   $scope.loadOlderStories=function (ddd) {
         pageNum +=1;
        if(cateId==""){
         cateId=1
     }
       Tools.getData({
         "interface_number": "020103",
         "client_type": window.platform,
         "post_content": {
           "token": "",
           "token_phone": "",
           "searchParam": {
             "shop_cate_id":cateId
           },
           "page_num": pageNum,
           "page_per": 12
         }
       }, function (r) {
         if (r) {
           if (r.resp_data.data.data.length == 0) {
             $scope.expression = false
           } else {
              if(pageNum==1){
                r.resp_data.data.data=[];
              }
             for(var i=0;i<r.resp_data.data.data.length;i++){
               $scope.ShoppingList.push(r.resp_data.data.data[i])
             }
           }
           $scope.$broadcast('scroll.infiniteScrollComplete');
         }

       });



   };

  $scope.calssifloadMore = function (xxx) {
    $timeout(function () {
      $scope.$broadcast('scroll.refreshComplete');
    }, 600);

  };




}]);


/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ClassifDetailsCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {
  var Classitem = $stateParams.Classitem;

  Tools.getData({
    "interface_number": "020205",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": "",
      "goods_basic_id": Classitem

    }
  },function(r){
    if(r){

      $scope.ClassifDetailsList = (r.resp_data.data);
console.log($scope.ClassifDetailsList.shop_id)

    }
  });



  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.ClassifConfirm=function (basic,shop) {
   
    $scope.modal.hide();
    $state.go('r.tab.confirmOrder',{basicID:basic,shopID:shop});

  };
  $scope.isCone=true;
   $scope.Detailsone=function () {
       $scope.isCone=true;
     $scope.isCtwo=false;
     $scope.isCtree=false;
 };
  $scope.Detailstwo=function () {
    $scope.isCone=false;
    $scope.isCtwo=true;
    $scope.isCtree=false;
  };
  $scope.Detailstree=function () {

    $scope.isCone=false;
    $scope.isCtwo=false;
    $scope.isCtree=true;
  };


  //加入购物车
  $scope.addcart=function () {
    Tools.getData({
      "interface_number": "020401",
      "client_type": window.platform,
      "post_content": {
        "token": "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
        "token_phone": "",
        "shop_id": "9",
        "sku_id": "1",
        "goods_basic_id": Classitem,
        "number": "1"

      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'添加成功!',
          okText:'确认'
        })


      }
    });
  }

}]);

/**
 * Created by Administrator on 2016/7/18.
 */
/**
 * Created by Administrator on 2016/7/18.
 */
Ctr.controller('ConfirmOrderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams','$ionicModal',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams,$ionicModal) {

  var bascId = $stateParams.basicID;
  var shopId = $stateParams.shopID;
  var cartId = [];

  console.log(bascId)
  console.log(shopId)

  $scope.addressList=[]
  //获取收货地址
  Tools.getData({
    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.addressList= (r.resp_data.data)
      for(var i = 0;i<$scope.addressList.length;i++){
        if($scope.addressList[i].is_default=="1"){
          $scope.addressListone = $scope.addressList[i]
        }
      }

    }
  });


  //加入购物车
  Tools.getData({
    "interface_number": "020401",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": "",
      "shop_id": shopId,
      "sku_id": "1",
      "goods_basic_id": bascId ,
      "number": "1"
    }
  },function(r){
    if(r){

      cartId= (r.resp_data.cart_id)


    }
  });

  //确认订单
  $scope.orderquery = function () {

    Tools.getData({
      "interface_number": "020601",
      "client_type": window.platform,
      "post_content": {
        "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
        "token_phone": "",
        "cartIds": cartId,
        "addr_id": $scope.addressListone.addr_id ,
        "remark": ""
      }
    },function(r){
      if(r!= 'error'){
        $ionicPopup.alert({
          title:'确认成功!',
          okText:'确认'
        })


      }
    });
  }



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('tabCtr',[function(){

}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal','$rootScope','$timeout',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal,$rootScope,$timeout){


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
           console.log(r)
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
          console.log(k);
          if(k.select){
            selectleng++;
            sselctname = k.cate_name;
          }
     });

    console.log(selectleng);

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

    if($scope.goodspice.lenght >= 5){

      return false;
    }

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
  };

  //图片上传
  function  uploadimg (claback){
    //待上传图片
    var   imguplist = [];
    //保存索引
    var   imgindex = [];


    if($scope.goodspice.length==0){

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
      console.log(JSON.stringify(r))
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

     console.log($scope.goods)

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
    native.loading();



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

        if($scope.goods.edit){
          native.task('保存成功!',3000)
        }else{
          native.task('发布成功!',3000)
        }
        cordova.plugins.Keyboard.close();
        $timeout(function(){
            $rootScope.$ionicGoBack();
        },300)




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

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('listofgoodsCtr',['$scope','fromStateServ','$timeout','$state','$ionicModal','native',function($scope,fromStateServ,$timeout,$state,$ionicModal,native){




  //编辑
  $scope.edith  = function (){
    $state.go('r.goodsEdit',{state:'edit',id:'77'});
  }


  //构建搜索功能
  $scope.searchobj  = {};
    $scope.scar =  function(){
      native.Barcode(function(r){
          console.log(JSON.stringify(r))
      });
    }

$scope.selectsearchstat  = function (r,e){
  $scope.searchobj.swatch  = true;
  $scope.searchobj.state  = r;
}

$scope.swatchtstate  = function (){
  $scope.searchobj.swatch   = !$scope.searchobj.swatch;
}






  $scope.$on('$destroy', function() {
    $scope.listsearch.remove();
  });

  $ionicModal.fromTemplateUrl('listsearch.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.listsearch = modal;
  });









  $scope.Add  = function(){
    $state.go('r.goodsEdit')
  };
  $scope.backtoprevView  =   fromStateServ.backView;
  $scope.$on('$stateChangeSuccess',function(){
    $scope.loginboj = {};
    $scope.ing  = false;
    $scope.parenttitle     =   fromStateServ.getState('r.listofgoods').title;
  });
  $scope.caklateheight  = {};
  function   caklatehe  (){
       if(window.platform  == 'ios'){
         $scope.caklateheight  = {
           height:window.innerHeight-(64+44+44)+'px'
         }
       }else{
         $scope.caklateheight  = {
           height:window.innerHeight-(44+44+44)+'px'
         }
       }
  };
  caklatehe();
  $timeout(function(){
  caklatehe();
  },600)






}])

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('chariCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  Tools.getData({
    "interface_number": "020201",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){
    if(r){
      $scope.Charitable = (r.resp_data.data)


    }
  });

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage) {

    $scope.a1 = function (){
      alert('1');
    };

    //商品管理
    $scope.goodmsg =  function (){

    if(storage.getObject('UserInfo').user_id){
    $scope.goModular('r.listofgoods')
    }else{
      $ionicPopup.confirm({
        title:'您还没有登录！',
        cancelText:'取消',
        okText:'登陆'
      }).then(function(r){
            if(r){
              $scope.goModular('r.login');
            }
      })
    }
    }

    $scope.goModular  =    function(r){
        fromStateServ.stateChange(r);
    };


    Tools.getData({
      "interface_number": "020001",
      "client_type": window.platform,
      "post_content": {
        "token" : "",
        "token_phone": ""
      }
    },function(r){
      if(r){
        $scope.company = (r.resp_data.data)

      }
    });

  Tools.getData({
    "interface_number": "020002",
    "client_type": window.platform,
    "post_content": {
      "token" : "",
      "token_phone": ""
    }
  },function(r){
    if(r){

      $scope.news = (r.resp_data.data)

    }
  });


}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('purchaseorderCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  
}]);

/**
 * Created by Administrator on 2016/7/19.
 */
/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('salesCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {


  $scope.SalesList = [];
  Tools.getData({
    "interface_number": "020701",
    "client_type": window.platform,
    "post_content": {
      "token" : "{611FF161-F539-A956-5B4F-2FFB04F7AAC8}",
      "token_phone": "",
      "status": "",
      "page_num": 1,
      "page_per":10
    }
  },function(r){
    if(r){
      if(r.resp_data.data.data.length==10){
        $scope.expression=true
      }else{
        $scope.expression=false
      }
      $scope.SalesList = (r.resp_data.data.data)

    }
  });



  $scope.all = true;
  $scope.dfk = false;
  $scope.dfh = false;

  //全部
  $scope.alls = function  (){
    $scope.all = true;
    $scope.dfk = false;
    $scope.dfh = false;

  };
  //待付款
  $scope.dfks =  function  (){
    $scope.all = false;
    $scope.dfk = true;
    $scope.dfh = false;

  };
  //待收货
  $scope.dfns = function  (){
    $scope.all = false;
    $scope.dfk = false;
    $scope.dfh = true;

  };
}]);



/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homesearchCtr',['$scope','$state','$ionicHistory',function($scope,$state,$ionicHistory) {
    
  $scope.back  =  function (){
      $ionicHistory.goBack();
  }

}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopadminCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  $scope.shopadmindata=[];
  Tools.getData({
    "interface_number": "010101",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)


    }
  });


  $scope.shopName = function (Classitem) {

    $state.go('r.tab.HomShopadminname', {Classitem: Classitem});
  };


}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopbriefingCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {

  var Name = [];
  $scope.querybriefing = function () {
    Tools.getData({
      "interface_number": "010104",
      "client_type": window.platform,
      "post_content": {
        "token" : "{35CAD486-424C-E3B9-CD41-4BC41A1CC156}",
        "token_phone": "",
        "name": Name
      }
    },function(r){
      if(r){
        $scope.shopadmindata = (r.resp_data)


      }
    });
  }

  //收货人
  $scope.newshopBname = function (shopBname) {
    Name = shopBname;
  };


}]);

/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopnameCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
var Name=[]
$scope.queryname = function () {
  Tools.getData({
    "interface_number": "010103",
    "client_type": window.platform,
    "post_content": {
      "token" : "{166EA93B-964B-9D39-0EE2-3A991BC364E0}",
      "token_phone": "",
      "name": "Name"
    }
  },function(r){
    if(r){
      $scope.shopadmindata = (r.resp_data)


    }
  });
}

//收货人
  $scope.newshopname = function (shopname) {
    Name = shopname;
  };


}]);

/**
 * Created by Administrator on 2016/7/13.
 */
Ctr.controller('tasteCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup){
  Tools.getData({
    "interface_number": "020202",
    "client_type": window.platform,
    "post_content": {
      "token": "",
      "token_phone": "",
      "searchParam": {
        "shop_cate_id": "0"         //代表只搜索 此分类下的商品
      },
      "page_num": "1"
    }
  },function(r){
    if(r){
      $scope.Taste = (r.resp_data.data)

    }
  });



}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registercfpwdCtr',['$scope','$state','Tools','$stateParams','$ionicPopup','storage',function($scope,$state,Tools,$stateParams,$ionicPopup,storage){



  $scope.password  = {};
  //选择认证方式

  console.log($stateParams.phone)
  $scope.next =  function (){

  if(!$scope.password.Original || !$scope.password.Repeat)  {
    $ionicPopup.alert({
      title:'请填写密码!',
      okText:'确认'
    });
    return false;
  }
    if(!Tools.reg.equal($scope.password.Original,$scope.password.Repeat) ){
      $ionicPopup.alert({
        title:'密码不一致!',
        okText:'确认'
      });
      return false;
    };

    Tools.getData({
      "interface_number": "000103",
         "post_content": {
             "phone":$stateParams.phone,
             "password":window.md5($scope.password.Original),
             "repassword":window.md5($scope.password.Repeat),
             uuid:storage.getObject('device').uuid,
             "push_registration_id" : storage.getObject('jPush').RegistrationID,
         }
    },function(r){
      if(r){
        window.Token  = r.resp_data.token;
        r.resp_data.user_info.token  = window.Token;
        storage.setObject('UserInfo',r.resp_data.user_info);
        
        $state.go('r.selectAuth');
      }
    })
    return  false;
  }





}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('entAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','Tools','$ionicPopup',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,Tools,$ionicPopup){


  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  }
  
  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };
  
  //基本表单信息
  $scope.from   = {};
  
  $scope.Submitaudit  = function (){

    if(!$scope.identity.Positive || !$scope.identity.inverse){
      $ionicPopup.alert({
        title:'请上传审核照片',
        okText:'确认'
      });
      return false;
    }
    if(!$scope.from.compname   ||  !$scope.from.License  || !$scope.from.mechanism ){
      $ionicPopup.alert({
        title:'请填写完整基本信息',
        okText:'确认'
      });
      return false;
    }
    //发送请求

    



  }









}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('grAuthenticationctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','native','$ionicActionSheet','Tools','$ionicPopup','storage','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,native,$ionicActionSheet,Tools,$ionicPopup,storage,$state){


  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  
  //身份证  图片对象
  $scope.identity  = {};
  $scope.rmPositive   = function () {
    $scope.identity.Positive   =  undefined;
  };

  $scope.xuanzpirce  = function(){
    Tools.chekpirc({},function(r){
      $scope.identity.Positive  = r;
    });
    // Tools.sendqiniu_single($scope.c,function(r){
    //   if(r){
    //     console.log(JSON.stringify(r))
    //   }
    // })
  };

  $scope.xuanzpirceinverse   =  function (){
    Tools.chekpirc({},function(r){
      $scope.identity.inverse  = r;
    });
  };

  $scope.rminverse  = function (){
    $scope.identity.inverse  = undefined;
  };

  $scope.form = {};

  //提交审核
  $scope.Submitaudit  =  function (){




    if(!$scope.identity.Positive || !$scope.identity.inverse){
      $ionicPopup.alert({
        title:'请上传审核照片',
        okText:'确认'
      });
      return false;
    }
    if(!$scope.form.id ||  !$scope.form.name ){
      $ionicPopup.alert({
        title:'请填写完审核信息',
        okText:'确认'
      });
      return false;
    }

    //发送图片到期牛
    Tools.sendqiniu_queue([
      $scope.identity.Positive,
      $scope.identity.inverse
    ],function(f){
      //发送请求
      Tools.getData({
        "interface_number": "000301",
        "post_content": {
          "company_type":"1",
          "card_no":$scope.form.id+"",
          name:$scope.form.name,
          "card_front_img":f[0].hash,
          "card_back_img":f[1].hash
        }
      },function(r){
        if(r){

          //需要支付会费
          if(r.resp_data.need_paid){
            $state.go('r.selectPaydues');
          }else{
            //返回原始入口页
            window.backtoinroot(window.backtoinroot_parms);
          }



        }
      });
    },'auth_'+(storage.getObject('UserInfo').company_id)+'_');


  }
  console.log(  JSON.stringify(storage.getObject('UserInfo')))

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('loginCtr',['$ionicHistory','$scope','fromStateServ','$ionicPlatform','$state','Tools','$ionicPopup','storage','$timeout',function($ionicHistory,$scope,fromStateServ,$ionicPlatform,$state,Tools,$ionicPopup,storage,$timeout){

  //处理登录
  $scope.loginboj  = {};
  
  $scope.loginhan  = function (){
      if(!$scope.loginboj.userName){
         $ionicPopup.alert({
           title:'请输入用户名!',
           okText:'确认'
         });
        return false;
      }
      if(!$scope.loginboj.Pwd){
        $ionicPopup.alert({
          title:'请输入密码!',
          okText:'确认'
        });
        return false;
      }
      $scope.ing  = true;
      var devinfo  =   storage.getObject('device');
      Tools.getData({
        "interface_number": "000001",
        "client_type": window.platform,
        "post_content": {
          "phone":$scope.loginboj.userName,
          "push_registration_id" : storage.getObject('jPush').RegistrationID,
          "password":window.md5($scope.loginboj.Pwd),
          "uuid":devinfo.uuid
        }
      },function(r){
        if(r){
              window.Token  = r.resp_data.token;
              r.resp_data.user_info.token  = window.Token;
              storage.setObject('UserInfo',r.resp_data.user_info);
                $timeout(function(){
                  $scope.ing  = false;
                  $timeout(function(){
                    $scope.backtoprevView('r.login');
                    $timeout(function(){
                      $ionicPopup.alert({
                        title:'登录成功!',
                        okText:'确认'
                      })
                    },400);
                  },1000);
                },800)



        }
      },function(){
        $timeout(function(){
          $scope.ing  = false;
        },600)

      })
  };

  
  //保存历史记录的方法  调用  上一次1 title  和返回方法
  $scope.backtoprevView  =   fromStateServ.backView;
  
  // //安卓返回键  对公共模块的返回
  // $ionicPlatform.registerBackButtonAction(function (e) {
  //    e.preventDefault();
  //    $scope.backtoprevView('r.login');
  //    return false;
  //  }, 101);
  $scope.$on('$stateChangeSuccess',function(){
      $scope.loginboj = {};
      $scope.ing  = false;
      $scope.parenttitle     =   fromStateServ.getState('r.login').title;
  });

  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  
  
  $scope.register  =  function (){
      if(!$scope.ing){
            $state.go('r.register');
      }
  }

}])

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('registerCtr',['$scope','$rootScope','$ionicViewSwitcher','$state','Tools','$ionicPopup',function($scope,$rootScope,$ionicViewSwitcher,$state,Tools,$ionicPopup){





  $scope.registbasinfo  = {};
  $scope.nextvercode =  60;
  $scope.vercodeing  = false;
  $scope.$on('$stateChangeSuccess',function(){});
  $scope.backView  = function(){
    $scope.$ionicGoBack();
  };
  //获取验证码
  var sctolthi  = true;
  $scope.GetverCode =  function (){
    if(sctolthi){

          sctolthi  = false;
          if(!$scope.registbasinfo.phone){
            $ionicPopup.alert({
              title:'请填写手机号码!',
              okText:'确认'
            });
            sctolthi  = true;
            return false;
          };
          Tools.getData({
            "interface_number": "000101",
            "post_content": {
              "phone":$scope.registbasinfo.phone
            }
          },function(r){
            if(r){
              $scope.vercodeing  = true;
              $scope.nextvercode =  60;
              var   time  = setInterval(function(){
                $scope.nextvercode--;
                if($scope.nextvercode <= 0){
                  sctolthi  = true;
                  $scope.vercodeing  =  false;
                  clearInterval(time);
                }
                $scope.$apply();
              },1000)

            }
          },function(){
            sctolthi  = true;
          });


    }
  }

  //下一步
  $scope.next =  function (){

    if(!$scope.registbasinfo.phone){
      $ionicPopup.alert({
          title:'请输入手机号码!',
          okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.USPhone($scope.registbasinfo.phone)) {
      $ionicPopup.alert({
        title:'请输入正确的手机号码!',
        okText:'确认'
      });
      return  false;
    }
    if(!$scope.registbasinfo.Vercode){
      $ionicPopup.alert({
        title:'请输入验证码!',
        okText:'确认'
      })
      return  false;
    }else  if(!Tools.reg.negative($scope.registbasinfo.Vercode)) {
      $ionicPopup.alert({
        title:'请输入正确的验证码!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.registbasinfo.CorporateName){
      $ionicPopup.alert({
        title:'请输入公司名称!',
        okText:'确认'
      })
      return  false;
    }
    if(!$scope.registbasinfo.userName){
      $ionicPopup.alert({
        title:'请输入姓名!',
        okText:'确认'
      });
      return  false;
    }
    //交互
    Tools.getData({
      "interface_number": "000102",
      "post_content": {
          "phone":$scope.registbasinfo.phone,
          "register_code":$scope.registbasinfo.Vercode,
          "company_name":$scope.registbasinfo.CorporateName,
          "real_name":$scope.registbasinfo.userName,
          "invite_code":$scope.registbasinfo.InvitationCode?$scope.registbasinfo.InvitationCode:''
      }
    },function(r){
    if(r){

        $state.go('r.registercfpwd',{phone:r.resp_data.phone})
    }
    });
    return  false;



  }

}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectPayduesctr',['$scope','$state','Tools',function($scope,$state,Tools){

        console.log('xxxx');
        $scope.skip  =  function (){
          window.backtoinroot(window.backtoinroot_parms);
        }
  
}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('selectAuthctr',['$ionicHistory','$scope','$rootScope','$ionicViewSwitcher','$state',function($ionicHistory,$scope,$rootScope,$ionicViewSwitcher,$state){


  window.androdzerofun  =window.backtoinroot;
  window.androdzerofun_parms  = window.backtoinroot_parms;
  
  $scope.$ionicGoBack  =  function(){
       window.backtoinroot(window.backtoinroot_parms);
  };


  //个人认证
  $scope.gren  =  function (){
    $state.go('r.grAuthentication');
  }
  //企业认证
  $scope.qiye  =  function (){
    $state.go('r.entAuthentication');
  }
  //跳过
  $scope.skip  = function(){
  $state.go('r.selectPaydues')
  }


}]);

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('noticeCtr', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})
  .controller('noticeDetailCtr', function($scope, $stateParams, Chats,$ionicHistory) {
    $scope.chat = Chats.get($stateParams.chatId);

    $scope.$on('$stateChangeSuccess',function(){
      
    })

  });

Ctr.controller("tabCtr",['$scope','$ionicHistory',function($scope,$ionicHistory){
}])

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('rootCtr',[function(){
  
}])

/**
 * Created by Administrator on 2016/7/5.
 */
Ctr.controller('SettingsAddAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  var Address =[],Name=[],Number=[],Email=[],Checked=[];
  $scope.pushNotification = { checked: true};

  //默认
  $scope.pushNotificationChange = function() {

    console.log('Push Notification Change', $scope.pushNotification.checked);
    if($scope.pushNotification.checked==false){
      Checked=0;
    }else{
      Checked=1;
    }
  };

  //详细地址
    $scope.Addaddress = function (newaddress) {
      Address = newaddress
};

  //收货人
  $scope.newname = function (name) {
      Name = name;
  };

  //电话
  $scope.newnumber = function (number) {
    Number=number;
  };

  //邮编
  $scope.newemail = function (email) {
    Email=email;
  };

  // 保存地址
  $scope.keepaddress = function () {

    var confirmPopup = $ionicPopup.confirm({
      title: '确定要保存该地址吗？',
      template: '',
      okText:'确定',
      cancelText:'取消'
    });

    confirmPopup.then(function(res) {
      if(res) {
        Tools.getData({
          "interface_number": "020501",
          "client_type": window.platform,
          "post_content": {
            "token": "{EB5E2D45-AC28-1573-A39E-9F17DDE732BE}",
            "token_phone": "",
            "province": "湖南省",
            "city": "长沙市",
            "region": "天心区",
            "street": Address,
            "zcode": Email,
            "link_man": Name,
            "link_phone":Number,
            "is_default": 0
          }
        },function(r){
          if(r){


          }
        });

      } else {
        console.log('You are not sure');
      }
    });


  }

}]);

/**
 * Created by Administrator on 2016/7/5.
 */

Ctr.controller('SettingsAddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {
  var arrs = [];
  $scope.addressList=[]
  //获取收货地址
  Tools.getData({
    "interface_number": "020505",
    "client_type": window.platform,
    "post_content": {
      "token" : "{EB5E2D45-AC28-1573-A39E-9F17DDE732BE}",
      "token_phone": ""
    }
  },function(r){
    if(r){
      $scope.addressList= (r.resp_data.data)

    }
  });

  $scope.expressionA = true;

  $scope.deleteAdress=function (item) {
    if($scope.expression==true){

      var confirmPopup = $ionicPopup.confirm({
        title: '确定要删除选中地址吗？',
        template: '',
        okText:'确定',
        cancelText:'取消'
      });
      confirmPopup.then(function(res) {
        if(res) {

          Tools.getData({
          "interface_number": "020504",
          "client_type": window.platform,
          "post_content": {
            "token" : "{EB5E2D45-AC28-1573-A39E-9F17DDE732BE}",
            "token_phone": "",
            "addr_id": arrs
          }
        },function(r){
          if(r){
          }
        });
          Tools.getData({
            "interface_number": "020505",
            "client_type": window.platform,
            "post_content": {
              "token" : "{EB5E2D45-AC28-1573-A39E-9F17DDE732BE}",
              "token_phone": ""
            }
          },function(r){
            if(r){
              $scope.newaddressList= (r.resp_data.data)

            }
          });

          setTimeout(function () {
            $scope.$apply(function () {
              $scope.addressList = $scope.newaddressList
            });
          }, 1);

        } else {
          console.log('You are not sure');
        }
      });

    }else{
      $scope.expressionA = false;
      $scope.expression=true
    }


  };

  $scope.gainAdress = function (gain) {
   if(arrs.indexOf(gain) == -1){
     arrs.push(gain)
   }else{
     for(var i = 0;i<arrs.length;i++){
       var pageId =  arrs[i];
       if(pageId==gain){
         Tools.rmArrin(arrs,i);
       }

     }
     console.log(arrs)
   }
  }

  //修改地址获取值
  $scope.gainAdress= function (item) {

    
  console.log(item);
    $state.go('r.tab.SettingsUpdateAdress', {item:item});

  }


}]);

/**
 * Created by Administrator on 2016/7/15.
 */
Ctr.controller('SettingsSelectCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup',function($scope,native,$state,fromStateServ,Tools,$ionicPopup) {




}]);

/**
 * Created by Administrator on 2016/7/15.
 */
Ctr.controller('UpdateaddressCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$stateParams',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$stateParams) {

  
  var item = $stateParams.item;
  console.log(item)

}]);

/**
 * Created by Administrator on 2016/7/7.
 */
Ctr.controller('SettingsUpdateCtr',function($scope) {
  
  $scope.back  =  function (){
    window.noNavtionsback(window.noNavtionsbackRootuer);
  }





});

/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('settingsCtr',['$scope','$ionicPopover', '$ionicPopup','$timeout',function($scope,$ionicPopover, $ionicPopup,$timeout) {


  $scope.settings = {
    enableFriends: true
  };
  $scope.showPopup = function() {
    $scope.data = {}
    // 自定义弹窗
    var myPopup = $ionicPopup.show({
      templateUrl: 'my-friend',
      scope: $scope,
    });
    $scope.closePopup = function() {
      myPopup.close();
    };
   /* $scope.(".popup").addClass(".twoimage1")*/
  };
}])

  .controller('SettingsUserCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsRechargeCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsUpdateCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateUsernameCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateSexCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdateQQCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })
  .controller('SettingsUpdatePasswordCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  })

  .controller('SettingsFriendsCtr',function($scope) {
    $scope.a1 = function (){
      alert('1');
    }

  });

/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ','storage','Tools','$rootScope','$ionicPopup','$ionicHistory',function($scope,fromStateServ,storage,Tools,$rootScope,$ionicPopup,$ionicHistory){



      $scope.login  =  function(r){
            fromStateServ.stateChange(r);
      };
      $scope.shopcartdata  =[];
      $scope.TotalPrice  = '0.00';

  //统计总价
  $scope.Total  =function (){
    $scope.TotalPrice  = 0;
    angular.forEach($scope.shopcartdata,function(v){
      angular.forEach(v.goods_info,function(value){
        if(value.select){
          $scope.TotalPrice += parseFloat(value.total_in_price)*parseInt(value.number);
        }
      })
    });
    $scope.TotalPrice   = $scope.TotalPrice.toFixed(2);
  };


      //请求购物数据  整体刷新
      $scope.doRefresh  =  function (){
           Tools.getData({
             "interface_number": "020402",
             "post_content": {}
           },function(r){
             $scope.$broadcast('scroll.refreshComplete');
             $scope.selectall   = false;
             if(r){
                      if(r.resp_data.cart == []){
                        $scope.noitem  = true;
                        return  false;
                      }else{
                        $scope.noitem  = false;
                      }

                    $scope.shopcartdata  = r.resp_data.cart;

                    if(Object.keys($scope.shopcartdata).length  == 0){
                      $scope.noitem  = true;
                    }else{
                      $scope.noitem  = false;
                      angular.forEach($scope.shopcartdata,function(value){
                          angular.forEach(value.goods_info,function(subvalue){
                              subvalue.edit  =false;
                          })
                      })
                    }
             }

           })
      };

      function handtat  (){
        if(storage.getObject('UserInfo').user_id){
            $scope.isShow = false;

            $scope.doRefresh();
        }else{
          $scope.isShow = true;
        }
      }

      //编辑
      $scope.edit  =function (e){
        if(!e.edit){
            e.edit  = true;
        }else{
            e.edit  = false;

          var changedatat =  [];
          angular.forEach(e.goods_info,function(v){
            changedatat.push({
              number:v.number,
              cart_id:v.cart_id
            });

          });
          //完成的交互
          Tools.showlogin();
          Tools.getData({
            "interface_number": "020404",
            "post_content": {
              "cart_data": changedatat
            }
          },function(r){
            if(r){
              Tools.hidelogin();

                console.log(r)
            }
          })



        }
      };

  //选中自身
  $scope.chekthis  = function (r){

       if(!r.select){
         r.select  =true;
       }else{
         r.select  =false;
       }

    $scope.Total();
  };


  //选中所以
  $scope.selctall   = function (){


      if(!$scope.selectall){
        $scope.selectall   = true;
        angular.forEach($scope.shopcartdata,function(v){
          angular.forEach(v.goods_info,function(value){
            value.select  = true;
          })
        })

      }else {
        $scope.selectall   = false;
        angular.forEach($scope.shopcartdata,function(v){
          angular.forEach(v.goods_info,function(value){
            value.select  = false;
          })
        })

      }

    $scope.Total()

  }



   //自  --
        $scope.Subtractme  = function (r){
            r.number    = (parseInt(r.number) -1);
            if(r.number  <=1){
              r.number  = 1;
            }
        }
   //增加  ++
        $scope.Increase  = function (r){

            r.number    = (parseInt(r.number)+1);
            if(r.number  >=  parseInt(r.max_buy_num)){
              r.number  = parseInt(r.max_buy_num);
            }
        }

        //del    Myself
        $scope.delmyseif  = function (c,key,parnt,parntkey,root){

          Tools.getData({
              "interface_number": "020403",
              "post_content": {
              "cart_id": [c.cart_id]
              }
          },function(r){
            if(r){
               Tools.rmArrin(parnt.goods_info,key)
               if(parnt.goods_info.length  ==0 ){
                    delete  root[parntkey];
               }
            }
          });
          $scope.Total();
        };


        //去结算
        $scope.Settlement  = function (){

          //用于结算的  订单的 商品存储对象
          var   shopcartOrder  = '';
          var   nogoods  = true;

          angular.forEach($scope.shopcartdata,function(v){
            angular.forEach(v.goods_info,function(value){
              if(value.select){
                nogoods   = false;
                shopcartOrder += value.cart_id+','
              }
            })
          });

          if(nogoods){
            $ionicPopup.alert({
              title:'请选择结算的商品',
              okText:'确定'
            });

            return false;
          }
          //选中的商品
          shopcartOrder  = shopcartOrder.substring(0,shopcartOrder.length-1);
          Tools.getData({
            "interface_number": "020601",
            "post_content": {
              cartIds:shopcartOrder
            }
          },function(r){

            console.log(r)

          })






        };





     window.stateChangeListen['r.tab.Shopping_Cart']  = handtat;
     handtat()

}])
