/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('listofgoodsCtr',['$scope','fromStateServ','$timeout','$state','$ionicModal','native','Tools','$ionicScrollDelegate','goodsState','$ionicPopup','$ionicNativeTransitions',function($scope,fromStateServ,$timeout,$state,$ionicModal,native,Tools,$ionicScrollDelegate,goodsState,$ionicPopup,$ionicNativeTransitions){



 $scope.searchresult  = function (){
          $scope.listsearch.hide();
          $timeout(function(){
              $scope.customcucdownlisloadMore(true);
          },300)
   }
    $scope.chengselect =  function(i){
        i.select  = !i.select;
    }
    //编辑goods分类      Edit product categories
    $scope.edithgoodsclassopen  = function (xx){
      $scope.nowgoodid  = xx.goods_basic_id;

      $scope.edithgoodsclass.show();
      $timeout(function(){
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030109",
            "post_content": {
              "goods_id": xx.goods_basic_id,
          }
        },function(r){
              if(r){

                $scope.goodsClasda  = r.resp_data.shop_cate;
              }
        })
      },400)
    };

    //edit goods class data
    $scope.goodsClasda  = [];
    $scope.newgoodsclass = {};
    $scope.newgoodsclass.name =undefined;

    $scope.addgoodsClass = function(){
        if(!$scope.newgoodsclass.name){
          native.task('请填写分类名称');
          return false;
        };
        Tools.showlogin();
        Tools.getData({
           "interface_number": "030204",
          "post_content": {
          "cate_name":$scope.newgoodsclass.name,
          "goodsIds":[]
        }
        },function(r){
              if(r){
                $scope.goodsClasda.unshift(r.resp_data);
                native.task('添加成功');
              }
        })
        $scope.newgoodsclass.name =undefined;
    }

    $scope.savegoodsClass  = function(){
        Tools.showlogin();
        var sendoption  =[];
        angular.forEach($scope.goodsClasda,function(c){
            if(c.select){
                sendoption.push(c.cate_id)
            }

        })

        Tools.getData({
           "interface_number": "030205",
          "post_content": {
          "goods_id":$scope.nowgoodid,
          "cateIds":sendoption,
          }
        },function(r){
              $timeout(function(){
               $scope.goodsClasda = [];
               $scope.newgoodsclass.name =undefined;
              },300)
              if(r){
                $scope.edithgoodsclass.hide();
                native.task('保存成功');
              }
        })
    }

    //商品上架
    $scope.goodsup = function (b,index){

        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
        $scope.salestotin.up  =  parseInt($scope.salestotin.up)+1;
            $scope.salestotin.down   = parseInt($scope.salestotin.down)-1;
            native.task('上架成功');
        })
    }
    //商品下架
    $scope.goodsdown = function (b,index){

        goodsuprodow(b.goods_basic_id,function(r){
            Tools.rmArrin($scope.datalist,index)
            $scope.salestotin.up  = parseInt($scope.salestotin.up)-1;
            $scope.salestotin.down   =  parseInt($scope.salestotin.down)+1;
            native.task('下架成功');
        })
    }
    function goodsuprodow(par,calback){
          Tools.showlogin();
          Tools.getData({
            "interface_number": "030107",
            "post_content": {
            "goodsId": par,
            "status":$scope.liststate?0:1
            }
          },function(r){
              if(r){
                    calback(r);
              }
          })
    };

    //删除商品
    $scope.delgoods =  function (targe,index){


         native.confirm('你确定删除该商品?','删除商品?',['确定','取消'],function(c){
            if(c  == 1){

                Tools.showlogin();
                Tools.getData({
                  "interface_number": "030108",
                  "post_content": {
                    "goodsId":targe.goods_basic_id
                  }
                },function(r){
                    if(r){
                      if(!$scope.liststate){
                        $scope.salestotin.down =  parseInt($scope.salestotin.down) -1;
                      }else{
                        $scope.salestotin.up =  parseInt($scope.salestotin.up) -1;
                      }
                      Tools.rmArrin($scope.datalist,index);
                      $ionicScrollDelegate.$getByHandle('list').resize();
                      native.task('删除成功');
                    }
                  }
                );
                  }
              });
    }

  //编辑
  $scope.edith  = function (r){
    goodsState.goods_basic_id  = r.goods_basic_id;
    goodsState.goods_title  = r.goods_title;
    goodsState.img_url  = r.img_url;
    goodsState.total_in_price  = r.total_in_price;
    goodsState.total_in_number  = r.total_in_number ;


    
        if(window.lockingJump) return  false;
        window.lockingJump  =  true;
             $timeout(function(){
              window.lockingJump  =  false;
            },400)

        $ionicNativeTransitions.stateGo('r.goodsEdit',{state:'edit',id:r.goods_basic_id}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -500, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1
              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });

       


  };


  //构建搜索功能
  $scope.searchobj  = {};
    $scope.scar =  function(){
      native.Barcode(function(r){
          $scope.searchobj.tiaomiao  =   r.text;
          $scope.$apply();
      });
    };
$scope.selectsearchstat  = function (r,e){
  $scope.searchobj.swatch  = true;
  $scope.searchobj.state  = r;
}

$scope.swatchtstate  = function (){
  $scope.searchobj.swatch   = !$scope.searchobj.swatch;
}

  $scope.$on('$destroy', function() {
    $scope.listsearch.remove();
    $scope.goodsfenle.remove();
     $scope.edithgoodsclass.remove();
  });

      $ionicModal.fromTemplateUrl('edithgoodsclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.edithgoodsclass = modal;
    });



  $ionicModal.fromTemplateUrl('listsearch.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.listsearch = modal;
  });

  $ionicModal.fromTemplateUrl('goodsfenle.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.goodsfenle = modal;
  });


  //上下架数量统计
  $scope.salestotin  = {};
  $scope.salestotin.up  =0;
  $scope.salestotin.down  =0;

  function  inlit (){

   if(goodsState.goods_basic_id){
            angular.forEach($scope.datalist,function(r){
                  if(r.goods_basic_id  == goodsState.goods_basic_id){
                    r.goods_title  = goodsState.goods_title;
                       r.img_url  = goodsState.img_url;
                      r.total_in_price  = parseFloat(goodsState.total_in_price).toFixed(2);
                      r.total_in_number  = goodsState.total_in_number;

                  }
            })
      }

      if(goodsState.Refresh){
          goodsState.Refresh   =false;
        
          return  false;
      };

    $scope.datalist  = [];
    $scope.page_number  = 1;
    $ionicScrollDelegate.scrollTop();
    $scope.downlistloadmor  = true;
    $scope.loginboj = {};
    $scope.ing  = false;


    $scope.parenttitle     =   fromStateServ.getState('r.listofgoods').title;

                window.androdzerofun  =   fromStateServ.backView;
                window.androdzerofun_parms  = 'r.listofgoods';
                window.androdzerofun_clback  = function(){};






    $timeout(function(){

    },500)


  };



      //$ionicScrollDelegate.$getByHandle('list').scrollTop();
      $scope.downlistloadmor  = true;
      $scope.page_number  = 1;
      $scope.datalist  = [];
      Tools.getData({
       "interface_number": "030105",
       "post_content": {}
      },function(r){
       if(r){
           $scope.salestotin.up  = r.resp_data.on_sale;
           $scope.salestotin.down  = r.resp_data.un_sale;
       }
      })
      //获取分类列表
      Tools.getData({
        "interface_number": "030201",
         "post_content": {}
      },function(r){
       if(r){
           $scope.fenliedata  = r.resp_data;
           angular.forEach($scope.fenliedata,function(s){
             s.select   = false;
           })
       }
      })


  $scope.searchclarall = function (){
    $scope.searchobj.fel  = undefined;
    $scope.searchobj.id  = undefined;
    $scope.searchobj.tiaomiao  = undefined;
    $scope.searchobj.state  = undefined;
  }

  $scope.searchselctme =  function (r){
    if(!r.select){
      angular.forEach($scope.fenliedata,function(s){
        s.select   = false;
      })
      r.select=  true;
      $scope.searchobj.fel =  r.cate_name;
      $scope.searchobj.id  =   r.cate_id;
      $scope.goodsfenle.hide();
    }
  }

  $scope.$on('$ionicView.beforeEnter',function(){
    inlit()

  });



  //切换上线 状态
  $scope.liststate  =  true;
  $scope.left =  function (){
    if(!$scope.liststate){

          $ionicScrollDelegate.$getByHandle('list').scrollTop();
          $scope.liststate  =  true;
          $scope.downlistloadmor  = true;
          $scope.page_number  = 1;
          $scope.datalist  = [];
    }
  }

  $scope.right =  function (){

    if($scope.liststate){
      $ionicScrollDelegate.$getByHandle('list').scrollTop();
      $scope.liststate  =  false;
      $scope.downlistloadmor  = true;
      $scope.page_number  = 1;
      $scope.datalist  = [];
    }
  }

  $scope.closectr  =   function (){
      angular.forEach($scope.datalist,function(c){
        c.ctr  = false;
      })
  };

  $scope.swatchctr =  function (r,$event){
      $scope.closectr();
      $event.stopPropagation();
      r.ctr   = !r.ctr;
  }



  $scope.customcucdownlisloadMore  =  function (type){

      var sendoption  = {
        "interface_number": "030104",
       "post_content": {
       "searchParam": {
           "is_sales": 1
         }
      }
    };

    if($scope.liststate){
      sendoption.post_content.searchParam.is_sales  = 1;
    }else{
      sendoption.post_content.searchParam.is_sales  = 0;
    }

    if(type){
        sendoption.post_content.page_num  = $scope.page_number  = 1;
    }else{
      sendoption.post_content.page_num  = $scope.page_number;
    }
    //搜索的处理

    if($scope.searchobj.tiaomiao){
        sendoption.post_content.searchParam.keyword  =  $scope.searchobj.tiaomiao;
      }else{
        sendoption.post_content.searchParam.keyword  = ''
      }

      if($scope.searchobj.state  == '上架' ){
        sendoption.post_content.searchParam.is_sales  = 1;
        $scope.liststate  = true;

      }else if($scope.searchobj.state  == '下架' ){
        $scope.liststate  = false;
        sendoption.post_content.searchParam.is_sales  = 0;
      }

      if($scope.searchobj.id){
          sendoption.post_content.searchParam.shop_cate_id  = $scope.searchobj.id;
      }else{
        sendoption.post_content.searchParam.shop_cate_id  = ''
      }




    Tools.getData(sendoption,function(r){

          $timeout(function(){
            $ionicScrollDelegate.$getByHandle('list').resize();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
          },200)

          if(r){
               if($scope.liststate){
                $scope.salestotin.up   =  r.resp_data.totalCount
                }else{
                $scope.salestotin.down   =  r.resp_data.totalCount
                }
                if(r.resp_data.nextPage  == 0 ){
                $scope.downlistloadmor  = false;
                $scope.page_number  =1;
                }else{
                  $scope.downlistloadmor  = true;
                  $scope.page_number  =r.resp_data.nextPage;
                }
                 angular.forEach(r.resp_data.data,function(c){
                     c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/2/w/200/h/200';
                     c.ctr  = false;
                 });

                 if(type){
                    $scope.datalist  = r.resp_data.data;
                 }else{
                   angular.forEach(r.resp_data.data,function(c){
                       $scope.datalist.push(c);
                   });
                 }
          }else{

            $scope.downlistloadmor  = false;


          }


    })
  }

  $scope.Add  = function(){


        if(window.lockingJump) return  false;
        window.lockingJump  =  true;

               $timeout(function(){
              window.lockingJump  =  false;
            },400)

        $ionicNativeTransitions.stateGo('r.goodsEdit',{}, {
            "type": "slide",
             "direction": "left", // 'left|right|up|down', default 'left' (which is like 'next')
             "duration":550, // in milliseconds (ms), default 400
              slowdownfactor: 1,
              iosdelay: -500, // ms to wait for the iOS webview to update before animation kicks in, default -1
              androiddelay: -1000, // same as above but for Android, default -1

              fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS and Android)
              fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
              triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
            });




  };

  $scope.backtoprevView  =     function (r){
     window.androdzerofun_clback =  function (){
       $scope.page_number  = 1;
       $scope.datalist  = [];
     }

    fromStateServ.backView(r,window.androdzerofun_clback);

  }






  $scope.caklateheight  = {};
  function   caklatehe  (){
       if(window.platform  == 'ios'){
         $scope.caklateheight  = {
           height:window.innerHeight-(64+44+20)+'px'
         }
       }else{
         $scope.caklateheight  = {
           height:window.innerHeight-(44+44+20)+'px'
         }
       }
  };
  caklatehe();
  $timeout(function(){
  caklatehe();
  },600)






}])
