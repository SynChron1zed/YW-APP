/**
 * Created by Why on 16/6/8.
 */
Ctr.controller('homeCtr',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','storage','$ionicHistory','selectArr','ModuleArr',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,storage,$ionicHistory,selectArr,ModuleArr) {

  $scope.judge =selectArr.selectarrs;
  $scope.select = ModuleArr


  $scope.jindian  =  function () {

        native.Barcode(function (rr) {
          if(!rr.cancelled){
                if(rr.text){
                    $scope.goModular('r.Shophome',{id:rr});
                }
          }


        })
  };

  $scope.xiaoshouorder = function () {

 

    
     if(storage.getObject('UserInfo').user_id){

        if($scope.select.home[0].xiaoshou[4]=="1"){
          if(!$scope.judge[2]){
            $ionicPopup.alert({
              title:"请先申请加入公司！",
              okText:'确定'
            });
          }

          if($scope.select.home[0].xiaoshou[1]=="1"){
            if ($scope.judge[1]!="1"){
              $ionicPopup.alert({
                title:"您还不是管理员！",
                okText:'确定'

              });
            }
            if($scope.select.home[0].xiaoshou[2]=="1"){
              if($scope.judge[3]=="0"){
                $ionicPopup.alert({
                  title:"您未认证，请前往认证！",
                  okText:'确定'

                });
              }else if ($scope.judge[3]=="1"){
                $ionicPopup.alert({
                  title:"正在认证审核中！",
                  okText:'确定'

                });
              }else if($scope.judge[3]=="3"){
                $ionicPopup.alert({
                  title:"认证审核失败，请重新认证！",
                  okText:'确定'

                });
              }


              if($scope.select.home[0].xiaoshou[3]=="1"){
                if($scope.judge[4]==true){
                  $ionicPopup.alert({
                    title:"请先缴纳诚信金！",
                    okText:'确定'

                  });
                }

              }else{
                $state.go('r.tab.HomSales');
              }

            };

          };

        };


      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }

  }

  $scope.caigoudindan1  =function () {

     if(storage.getObject('UserInfo').user_id){
      $scope.gosales('r.HomPurchase');
      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  $scope.shomsge  =function (value) {




     if(storage.getObject('UserInfo').user_id){


       if($scope.select.home[6].dianpuguanli[4]=="1"){
         if(!$scope.judge[2]){
           $ionicPopup.alert({
             title:"请先申请加入公司！",
             okText:'确定'
           });
         }

         if($scope.select.home[6].dianpuguanli[1]=="1"){
           if ($scope.judge[1]!="1"){
             $ionicPopup.alert({
               title:"您还不是管理员！",
               okText:'确定'

             });
           }
           if($scope.select.home[6].dianpuguanli[2]=="1"){
             if($scope.judge[3]=="0"){
               $ionicPopup.alert({
                 title:"您未认证，请前往认证！",
                 okText:'确定'

               });
             }else if ($scope.judge[3]=="1"){
               $ionicPopup.alert({
                 title:"正在认证审核中！",
                 okText:'确定'

               });
             }else if($scope.judge[3]=="3"){
               $ionicPopup.alert({
                 title:"认证审核失败，请重新认证！",
                 okText:'确定'

               });
             }


             if($scope.select.home[6].dianpuguanli[3]=="1"){
               if($scope.judge[4]==true){
                 $ionicPopup.alert({
                   title:"请先缴纳诚信金！",
                   okText:'确定'

                 });
               }

             }else{
               $scope.gosales('r.HomShopadmin');
             }

           };

         };

       };

      }else{
        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });
      }
  }


  //商品详情
  $scope.goodsdetila  =  function () {
    $scope.goModular('r.Productdetails',{id:192});
  }


 //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
       window.androdzerofun  =  undefined
       window.androdzerofun_parms  =undefined;
       window.androdzerofun_clback  = undefined;
    });

$scope.gosales=function (r) {
  fromStateServ.stateChange(r);
}


    $scope.a1 = function (){

      $scope.goModular('r.Shophome',{id:'4'});

    };


    //商品分类
    $scope.goodsClass  = function (){

      if(storage.getObject('UserInfo').user_id){
        if($scope.select.home[8].shangpingfenlei[4]=="1"){
          if(!$scope.judge[2]){
            $ionicPopup.alert({
              title:"请先申请加入公司！",
              okText:'确定'
            });
          }

          if($scope.select.home[8].shangpingfenlei[1]=="1"){
            if ($scope.judge[1]!="1"){
              $ionicPopup.alert({
                title:"您还不是管理员！",
                okText:'确定'

              });
            }
            if($scope.select.home[8].shangpingfenlei[2]=="1"){
              if($scope.judge[3]=="0"){
                $ionicPopup.alert({
                  title:"您未认证，请前往认证！",
                  okText:'确定'

                });
              }else if ($scope.judge[3]=="1"){
                $ionicPopup.alert({
                  title:"正在认证审核中！",
                  okText:'确定'

                });
              }else if($scope.judge[3]=="3"){
                $ionicPopup.alert({
                  title:"认证审核失败，请重新认证！",
                  okText:'确定'

                });
              }


              if($scope.select.home[8].shangpingfenlei[3]=="1"){
                if($scope.judge[4]==true){
                  $ionicPopup.alert({
                    title:"请先缴纳诚信金！",
                    okText:'确定'

                  });
                }

              }else{
                $scope.goModular('r.goodsclasslist')
              }

            };

          };

        };





      }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });

      }

    }

    //商品管理
    $scope.goodmsg =  function (){

    if(storage.getObject('UserInfo').user_id){
      if($scope.select.home[7].shangpingunali[4]=="1"){
        if(!$scope.judge[2]){
          $ionicPopup.alert({
            title:"请先申请加入公司！",
            okText:'确定'
          });
        }

        if($scope.select.home[7].shangpingunali[1]=="1"){
          if ($scope.judge[1]!="1"){
            $ionicPopup.alert({
              title:"您还不是管理员！",
              okText:'确定'

            });
          }
          if($scope.select.home[7].shangpingunali[2]=="1"){
            if($scope.judge[3]=="0"){
              $ionicPopup.alert({
                title:"您未认证，请前往认证！",
                okText:'确定'

              });
            }else if ($scope.judge[3]=="1"){
              $ionicPopup.alert({
                title:"正在认证审核中！",
                okText:'确定'

              });
            }else if($scope.judge[3]=="3"){
              $ionicPopup.alert({
                title:"认证审核失败，请重新认证！",
                okText:'确定'

              });
            }


            if($scope.select.home[7].shangpingunali[3]=="1"){
              if($scope.judge[4]==true){
                $ionicPopup.alert({
                  title:"请先缴纳诚信金！",
                  okText:'确定'

                });
              }

            }else{
              $scope.goModular('r.listofgoods')
            }

          };

        };

      };




    }else{

        native.confirm('该操作需要登录','您还没有登录',['登录','取消'],function(c){
          if(c  == 1){
            $scope.goModular('r.login');
          }
        });


    }
    }

    $scope.goModular  =    function(r,p){
        fromStateServ.stateChange(r,p);
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



  //最新动态
  $scope.Newnews = function (r) {


    fromStateServ.stateChange(r);
  };



}]);
