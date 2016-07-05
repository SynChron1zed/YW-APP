/**
 * Created by Why on 16/6/10.
 */
//推送的方法类封装
Server.factory('native',['$window',function($window){
  return{
    //存储单个属性
    set :function(key,value){
      $window.localStorage[key]=value;
    },
  }

}]);
