/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('shoppingCartCtr',['$scope','fromStateServ','storage','Tools','$rootScope','$ionicPopup','$ionicHistory','native','buyConfirmorde','$stateParams','shopcartbactitle',function($scope,fromStateServ,storage,Tools,$rootScope,$ionicPopup,$ionicHistory,native,buyConfirmorde,$stateParams,shopcartbactitle){


 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    //页面的状态变化  请求
      handtat();
     if ($ionicHistory.backView()) {
       window.androdzerofun  = function(parm1,parm2){
         $ionicHistory.goBack();

       }
       window.androdzerofun_parms   ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';
     }
    
     if(shopcartbactitle.state){
       $scope.showtitle  = true;
       $scope.backv    =function (){
         $rootScope.$ionicGoBack();
       }

        window.androdzerofun  = function(parm1,parm2){
         $rootScope.$ionicGoBack();
       }
       window.androdzerofun_parms   ='tabswtathing';
       window.androdzerofun_clback  = 'nothing';


     }else{
        $scope.showtitle  = false;
     }

    });

    $scope.$on('$ionicView.beforeLeave',function(){
      window.androdzerofun  = undefined;
      $scope.showtitle  = false;
      shopcartbactitle.state  =  false;

    })







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
          $scope.TotalPrice += parseFloat(value.activity_price)*parseInt(value.number);
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
            $scope.Total();
        }else{
          $scope.isShow = true;
        }
      $scope.TotalPrice  = '0.00';
        
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
            native.task('请选择结算的商品');
            return false;
          }
            //选中的商品
            shopcartOrder  = shopcartOrder.substring(0,shopcartOrder.length-1);
            buyConfirmorde.cart   =shopcartOrder;
            fromStateServ.stateChange('r.ConfirmorderZf');
            //这里去 确认订单
        };






}])
