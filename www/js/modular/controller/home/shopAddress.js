/**
 * Created by Administrator on 2016/8/25.
 */
/**
 * Created by Administrator on 2016/7/21.
 */
Ctr.controller('shopAddressCtr',['$scope','Tools','$stateParams','fromStateServ','$ionicModal','$timeout','native','$rootScope','adderupdatastat',function($scope,Tools,$stateParams,fromStateServ,$ionicModal,$timeout,native,$rootScope,adderupdatastat){


  $scope.opitionmsg={}
  $scope.$on('$ionicView.beforeEnter',function(){
    $scope.addrs={}
    $scope.addrs.province=$stateParams.province;
    $scope.addrs.city=$stateParams.city;
    $scope.addrs.region=$stateParams.region;
    $scope.addrs.detailmsg= $stateParams.detailmsg;
    $scope.opitionmsg.text =     $scope.addrs.province+' '+$scope.addrs.city+' '+$scope.addrs.region;

  });




  $scope.cityall  = window.city;
  $scope.openselectprovince  =  function(){

    Tools.showlogin();
    $scope.shenfeng  = [];
    angular.forEach($scope.cityall,function(sheng){
      sheng.select   = false;
      $scope.shenfeng.push(sheng);
    })

    $timeout(function(){
      Tools.hidelogin();
      $scope.sheng.show();
    },300)
  };

  $scope.selectshengf  =  function(shenfeng,aa){
    angular.forEach(shenfeng,function(sheng){
      sheng.select   = false;
    });

    aa.select  = true;
    if(aa.child.length){
      $scope.childCity = [];
      Tools.showlogin();
      angular.forEach(aa.child,function(chidlist){
        $scope.childCity.push(chidlist);
      });
      $timeout(function(){
        Tools.hidelogin();
        $scope.city.show();
      },300)

    }else{
      $scope.sheng.hide();
    }
  };


  $scope.selectCity  =  function(ss,ff){

    angular.forEach(ss,function(sheng){
      sheng.select   = false;
    });
    ff.select  = true;
    if(ff.child.length){
      //选择市区
      $scope.childarea = [];
      Tools.showlogin();
      angular.forEach(ff.child,function(chidlist){
        $scope.childarea.push(chidlist);
      });

      $timeout(function(){
        Tools.hidelogin();
        $scope.area.show();
      },300)

    }else{

      Tools.showlogin();
      $scope.sheng.hide();
      $timeout(function(){
        $scope.chomfadder();
        Tools.hidelogin();
        $scope.city.hide();

      },300)

    }
  };

  $scope.selectArea  = function(ss,ff){

    angular.forEach(ss,function(sheng){
      sheng.select   = false;
    });

    ff.select  = true;
    Tools.showlogin();
    $scope.sheng.hide();
    $scope.city.hide();
    $timeout(function(){
      Tools.hidelogin();
      $scope.chomfadder();
      $scope.area.hide();

    },300)
  };



  $scope.chomfadder  =   function () {

    //获取  身份
    angular.forEach($scope.shenfeng,function(r){
      if(r.select){
        $scope.shenfengtext   =r.cityName;
      }
    })
    //获取城市
    angular.forEach($scope.childCity,function(r){
      if(r.select){
        $scope.Citytext   =r.cityName;
      }
    });

    if($scope.childarea){
      angular.forEach($scope.childarea,function(r){
        if(r.select){
          $scope.areatext   =r.cityName;
        }
      });
    };
    $scope.shenfeng  = [];
    $scope.childCity  = [];
    $scope.childarea  = [];

    if(!$scope.areatext){
      $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext;
      $scope.addrs.province = $scope.shenfengtext;
      $scope.addrs.city = $scope.Citytext;
      $scope.addrs.region = '';
    }else{

      $scope.opitionmsg.text =     $scope.shenfengtext+' '+$scope.Citytext+' '+$scope.areatext;
      $scope.addrs.province = $scope.shenfengtext;
      $scope.addrs.city =   $scope.Citytext;
      $scope.addrs.region =  $scope.areatext;
      console.log($scope.addrs)
    }

    console.log($scope.addrs.detailmsg)

    $scope.shenfengtext  = undefined;
    $scope.Citytext  = undefined;
    $scope.areatext  = undefined;

  };

  $scope.opitionmsg   = {};
  $scope.opitionmsg.text   =  undefined;


  $scope.shenfengtext  = undefined;
  $scope.Citytext  = undefined;
  $scope.areatext  = undefined;

  $scope.$on('$destroy', function() {

    $scope.sheng.remove();
    $scope.city.remove();
    $scope.area.remove();


  });

  $ionicModal.fromTemplateUrl('sheng.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.sheng = modal;
  });


  $ionicModal.fromTemplateUrl('city.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.city = modal;
  });

  $ionicModal.fromTemplateUrl('area.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.area = modal;
  });



$scope.queryAddress= function () {
  
  if(!$scope.opitionmsg.text){
    native.task('请选择省市区');
    return false;
  }
  if(!$scope.addrs.detailmsg){
    native.task('请填写详细地址');
    return false;
  }
  Tools.showlogin();
  Tools.getData({
    "interface_number": "010108",
    "post_content": {
      "province": $scope.addrs.province,
      "city": $scope.addrs.city ,
      "region":  $scope.addrs.region ,
      "shop_addr":  $scope.addrs.detailmsg,
    }
  },function(r){
    if(r){

      $rootScope.$ionicGoBack();
      native.task('保存成功');
    }

  });



  console.log($scope.addrs.detailmsg)
}



}]);
