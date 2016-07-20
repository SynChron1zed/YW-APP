/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsEditCtr',['$scope','$timeout','$state','$stateParams','native','Tools','$ionicPopup','$ionicModal',function($scope,$timeout,$state,$stateParams,native,Tools,$ionicPopup,$ionicModal){

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
  $scope.goods.systemSelect  = 'ff';
  $scope.goods.systemchidSelct  =undefined;
  $scope.goods.systemchidlist  = undefined;
  $scope.goods.cateSelctItem  = '请选择分类';
  $scope.goods.systemClass = [
    {
      key:'啥呀dsadsadsadsadsadasdsadsadsa',
      value:'ss'
    },
    {
      key:'啥呀',
      value:'ff'
    }
  ];

  $scope.goods.catelist =  [
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    },
    {
      key:'哈哈',
       value:'1'
    }
  ];


  $scope.shouldShowDelete = true;
  $scope.shouldShowReorder = false;

  //父类
  $scope.systemparnslec =   function (targe){
    console.log($scope.goods.systemSelect);
  }
  //子类
  $scope.chidselect   = function(){
      console.log($scope.goods.systemchidSelct)
  }


  //$scope.goods.

  //title
  //is_virtual
  //barcode
  //goodsDesc
  $scope.$watch('goods.Market_price',function(newValue,oldValue, scope){
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

    Tools.getdata({
      "interface_number": "030101",
      "post_content": {
       "goods_title": $scope.goods.title,
       "sys_cate_id": "1",
       "barcode": $scope.goods.barcode,
       "express_fee": $scope.goods.freight_price?$scope.goods.freight_price:0,
       "is_virtual": $scope.goods.is_virtual?'1':'0',
       "retail_price": $scope.goods.Market_price,
       "activity_price":  $scope.goods.Platform_price,
       "img_url": fenmiangtuimg,
       "total_in_number": $scope.goods.Stock_number?$scope.goods.Stock_number:0,
       "arr_img":imglist,
       "cateIds": "",
       "desc": $scope.goodsDesc
        }
    },function(r){
      if(r){



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
