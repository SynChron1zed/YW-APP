/**
 * Created by Administrator on 2016/8/17.
 */
/**
 * Created by Why on 16/6/8.
 */

Ctr.controller('Classif',['$scope','native','$state','fromStateServ','Tools','$ionicPopup','$timeout','$ionicHistory','$ionicScrollDelegate','$ionicBackdrop',function($scope,native,$state,fromStateServ,Tools,$ionicPopup,$timeout,$ionicHistory,$ionicScrollDelegate,$ionicBackdrop) {
  
  function  inlit   (){
    if($scope.guankao){ return false; }
    Tools.getData({
      "interface_number": "050401",
      "post_content": {
        "type": "2",
      }
    },function(r){
      if(r){
        angular.forEach(r.resp_data,function(fff){
          fff.qiniu_key  =  window.qiniuimgHost+fff.qiniu_key+'?imageView2/2/w/828/h/362';
        })
        $scope.guankao   =   r.resp_data;
      }
    })
    $scope.gogunal  =  function(item){
      if(item.request_type  == '1'){
        fromStateServ.stateChange('r.homeNewsContent',{postID:item.request_id});
      }else  if(item.request_type  == '2'){
        fromStateServ.stateChange('r.Shophome',{id:item.request_id});
      }else  if(item.request_type  == '3'){
        fromStateServ.stateChange('r.Productdetails',{id:item.request_id});
      }else{
        native.task('活动暂未开始');
      }
    }

  }



  //对安卓返回键的  特殊处理  tabs
  $scope.$on('$ionicView.beforeEnter',function(){
    if ($ionicHistory.backView()) {

      window.androdzerofun  = function(parm1,parm2){
        window.extapp()
      }
      window.androdzerofun_parms  ='tabswtathing';
      window.androdzerofun_clback  = 'nothing';
    }

    inlit();
  });

//alert();

$scope.newclass = function (value,name) {

  fromStateServ.stateChange('r.classContent',{id:value,Name:name});
}







}]);

