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





}]);
