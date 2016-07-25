/**
/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('goodsclassDetail',['$scope','$timeout','native','Tools','$ionicModal','$stateParams','$ionicScrollDelegate','$state','goodsState','$ionicPopup',function($scope,$timeout,native,Tools,$ionicModal,$stateParams,$ionicScrollDelegate,$state,goodsState,$ionicPopup){







    


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


         //confirm

   $ionicPopup.confirm({
            title:'确定删除',
            okText:'确定',
            cancelText:'取消'
          }).then(function(s){
              if(s){
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
                native.task('删除成功');
              }
            }
          );


              }

          })


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
          "goods_id": $scope.nowgoodid,
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






    



  $scope.swatchselctthis =  function (xx){
  xx.select  = !xx.select;
  }

  $scope.doSomething  = function (r){
      $scope.selectgoodslit  = [];
      $scope.selectgoods.show();
      $scope.selectgoodslitloadmoer  =  false;
      $ionicScrollDelegate.$getByHandle('selectgoods').scrollTop();
      $timeout(function () {
          $scope.selectgoodsloadmoer();
      },500);

  }


  $scope.saveSelectgoods  = function (){
    Tools.showlogin();
    var sendlist = [];
    angular.forEach($scope.selectgoodslit,function (c){
          sendlist.push({
            "id": c.goods_basic_id,
            "select": c.select
          })
    })

    Tools.getData({
      "interface_number": "030206",
      "post_content": {
        'cateId':$stateParams.id,
        "goodsIds": sendlist,

     }
    },function (r){
      if(r){
        $scope.selectitemin;
        var iemin  = 0;
          angular.forEach($scope.selectgoodslit,function(c){
                if(c.select){
                    iemin ++;
                }
          })

          if(iemin !=  $scope.selectitemin){
            $scope.customcucdownlisloadMore(true)
          }

          $scope.selectitemin  = 0;
          native.task('保存成功');

      }
    })


    $timeout(function () {
      $scope.selectgoodslit  = [];
      $scope.selectgoodslitpag  =1;
      $scope.selectgoodslitloadmoer  =  false;

      $scope.selectgoods.hide();
    }, 300);


  }





  //选择商品的select 搜搜没有做
  
  //选择列表的数据
  $scope.selectgoodslit  =[];
  $scope.selectgoodslitpag  =1;
  $scope.selectgoodslitloadmoer  =  false;
  $scope.selectitemin  = 0;



  $scope.selectgoodsloadmoer = function (){
      Tools.getData({
        "interface_number": "030106",
        "post_content": {
          "shop_cate_id": $stateParams.id,
          page_num:$scope.selectgoodslitpag

        }
      },function (r){
        $scope.$broadcast('scroll.infiniteScrollComplete');
           if(r){

                if(r.resp_data.nextPage  == 0){
                  $scope.selectgoodslitloadmoer  =  false;
                  $scope.selectgoodslitpag   =1;
                }else{
                  $scope.selectgoodslitloadmoer  =  true;
                  $scope.selectgoodslitpag   =r.resp_data.nextPage;
                }

                angular.forEach(r.resp_data.data,function(c){

                  if(c.select){ $scope.selectitemin ++; }
                  c.img_url   =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200',
                  $scope.selectgoodslit.push(c);

                })


           }
      })

  }











  $scope.xiugaimima  = function(){
      $scope.goodsfenle.show();
  }


  //编辑
  $scope.edith  = function (r){

    goodsState.goods_basic_id  = r.goods_basic_id;
    goodsState.goods_title  = r.goods_title;
    goodsState.img_url  = r.img_url;
    goodsState.activity_price  = r.activity_price;
    goodsState.total_in_number  = r.total_in_number;




    $state.go('r.goodsEdit',{state:'edit',id:r.goods_basic_id});
  };
  $scope.classinfo  = {};
  $scope.classinfo.title =   $stateParams.title;
  $scope.title  = $stateParams.title;
    //构建搜索功能
    $scope.searchobj  = {};
      $scope.scar =  function(){
        native.Barcode(function(r){
            $scope.searchobj.tiaomiao  =   r.text;
            
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
      $scope.selectgoods.remove();
      $scope.edithgoodsclass.remove();

    });



    $ionicModal.fromTemplateUrl('edithgoodsclass.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.edithgoodsclass = modal;
    });


    $ionicModal.fromTemplateUrl('selectgoods.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.selectgoods = modal;
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
                    r.activity_price  = goodsState.activity_price;
                    r.total_in_number  = goodsState.total_in_number;                    
                  }
            })
      } 


      if(goodsState.Refresh){
          goodsState.Refresh   =false;
          return  false;
      };

      $timeout(function(){
        $ionicScrollDelegate.$getByHandle('list').scrollTop();
        $scope.downlistloadmor  = true;
        $scope.page_number  = 1;
        $scope.datalist  = [];

        Tools.getData({
         "interface_number": "030105",
         "post_content": {
            "cate_id":$stateParams.id,
         }
        },function(r){
         if(r){
             $scope.salestotin.up  = r.resp_data.on_sale;
             $scope.salestotin.down  = r.resp_data.un_sale;
         }
        })
        //获取分类列表


      },500)
    };





   //保存分类名称
   $scope.saveClassName =  function(){
        if(!$scope.classinfo.title){
          native.task('请输入')
          return  false;
        }

        if($scope.classinfo.title  == $scope.title){
          $scope.goodsfenle.hide();
          return  false;
        }

        Tools.getData({
          "interface_number": "030202",
          "post_content": {
            "cate_name":$scope.classinfo.title,
            "cate_id": $stateParams.id,
   }
        },function(r){
          if(r){
            $scope.title  = $scope.classinfo.title;
                $scope.goodsfenle.hide();
          }
        })

   }



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
        $event.stopPropagation();  
        r.ctr   = !r.ctr;
        
    }




   $scope.searchresult  = function (){
          $scope.listsearch.hide();
          $timeout(function(){
              $scope.customcucdownlisloadMore(true);
          },300)
   }

    $scope.customcucdownlisloadMore  =  function (type){
        var sendoption  = {
          "interface_number": "030104",
         "post_content": {
         "searchParam": {
             "is_sales": 1,
             "shop_cate_id":$stateParams.id
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
        sendoption.post_content.searchParam.keyword  = '';
      }

      if($scope.searchobj.state  == '上架' ){
        sendoption.post_content.searchParam.is_sales  = 1;
        $scope.liststate  = true;

      }else if($scope.searchobj.state  == '下架' ){
        $scope.liststate  = false;
        sendoption.post_content.searchParam.is_sales  = 0;
      }



      Tools.getData(sendoption,function(r){
            if(r){

                  if(r.resp_data.nextPage  == 0 ){
                  $scope.downlistloadmor  = false;
                  $scope.page_number  =1;
                  }else{
                    $scope.downlistloadmor  = true;
                    $scope.page_number  =r.resp_data.nextPage;
                  }
                   angular.forEach(r.resp_data.data,function(c){
                       c.img_url  =  window.qiniuimgHost+c.img_url+'?imageView2/1/w/200/h/200';
                       c.ctr  = false;
                   });

                   if(type){
                      $scope.datalist  = r.resp_data.data;
                   }else{
                     angular.forEach(r.resp_data.data,function(c){
                         $scope.datalist.push(c);
                     });
                   }




            }
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }

    $scope.Add  = function(){
      $state.go('r.goodsEdit')
    };






    $scope.$on('$stateChangeSuccess',function(){
      $scope.loginboj = {};
      $scope.ing  = false;
    });


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
