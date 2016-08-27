
Ctr.controller('StoremanagementCtr',['$scope','Tools','native','StoredataEdit','$state',function($scope,Tools,native,StoredataEdit,$state) {

$scope.delthis  = function(r,item){
    //console.log(item.take_id);
    Tools.showlogin();
    Tools.getData({
         "interface_number": "020803",
         "post_content": {
             takeAddrId:item.take_id
         }         
    },function(r){
            if(r){
                $scope.storelist.splice(r, 1);
                native.task('删除成功',1000);
            }
    })
}
//新增  门店
$scope.addnewmendian   = function(){
    StoredataEdit.Ref  =  true;
    $state.go('r.StoremanagementEdit');
}

//编辑门店
$scope.edithmenid  = function(r){ 
       StoredataEdit.Ref  =  true;
       StoredataEdit.name  = r.name;
       StoredataEdit.link  =  r.link;
       StoredataEdit.address  = r.address;
       StoredataEdit.take_id  = r.take_id;
       StoredataEdit.gps_lat  =  r.gps_lat;
       StoredataEdit.gps_long  = r.gps_long;
       StoredataEdit.take_time   =  r.take_time;
        $state.go('r.StoremanagementEdit');

}





$scope.delstate =  function(){
    $scope.shouldShowDelete  = !$scope.shouldShowDelete; 
}

$scope.loadDatae  =  function(){

    if(StoredataEdit.take_id){

        angular.forEach($scope.storelist,function(ff){
                    if(ff.take_id  == StoredataEdit.take_id){
                        ff.name =  StoredataEdit.name;
                        ff.link   = StoredataEdit.link;
                        ff.address  = StoredataEdit.address;
                        ff.take_id  = StoredataEdit.take_id ;
                        ff.gps_lat  =  StoredataEdit.gps_lat ;
                        ff.gps_long  = StoredataEdit.gps_long ;
                        ff.take_time =  StoredataEdit.take_time ;
                        StoredataEdit.take_id =  undefined;  
                    }
        })
    }

    if(StoredataEdit.Ref) {StoredataEdit.Ref = false;   return  false;}
    
    Tools.showlogin();
    Tools.getData({
         "interface_number": "000408",
         "post_content": {}
    },function(r){
            if(r){
                $scope.storelist  = r.resp_data;
            }
    })
};
$scope.$on('$ionicView.beforeEnter',function(){
    $scope.loadDatae();
})
$scope.sendSms =   function(r) {
        window.sms.send(r.link, '', {
            replaceLineBreaks: false, 
            android: {
                intent: 'INTENT' 
            }
        }, function () {  }, function (e) {});
    }

$scope.callphone  =  function (r){
    window.plugins.CallNumber.callNumber(function(){}, function(){},r.link, true);
}

}])
.controller('StoremanagementEditCtr',['$scope','Tools','native','StoredataEdit','$rootScope',function($scope,Tools,native,StoredataEdit,$rootScope){

        $scope.stroe  = {};
        if(StoredataEdit.take_id){
            $scope.title  =  StoredataEdit.name;
            $scope.stroe.name  =  StoredataEdit.name;
            $scope.stroe.phone  =  StoredataEdit.link;
            $scope.stroe.position  =  StoredataEdit.address;
            $scope.stroe.take_id  =  StoredataEdit.take_id;
            $scope.stroe.gps_lat  =  StoredataEdit.gps_lat;
            $scope.stroe.gps_long  =  StoredataEdit.gps_long;
            $scope.stroe.businessHours  = StoredataEdit.take_time;
        }else{
            $scope.title  =  '添加门店';
        }

        $scope.keepaddress =  function(){
                if(!$scope.stroe.name){
                    native.task('请填写门店名称');
                    return  false;
                }
                if(!$scope.stroe.phone){
                    native.task('请填写联系方式');
                    return  false;
                }
                if(!$scope.stroe.position){
                    native.task('请填写位置信息');
                    return  false;
                }
                if(!$scope.stroe.businessHours){
                    native.task('请填写营业时间');
                    return  false;
                }
                Tools.showlogin();
                Tools.getData({
                       "interface_number": "020802",
                        "post_content": {
                            "goods_id": "",
                            "take_id": $scope.stroe.take_id?$scope.stroe.take_id:"",
                            "name": $scope.stroe.name,
                            "address": $scope.stroe.position,
                            "gps_lat":$scope.stroe.gps_lat?$scope.stroe.gps_lat:'',
                            "gps_long": $scope.stroe.gps_long?$scope.stroe.gps_long:'',
                            "take_time":$scope.stroe.businessHours,
                            "link": $scope.stroe.phone,
                        }
                },function(r){
                    if(r){

                        if(!StoredataEdit.take_id){
                            StoredataEdit.Ref  = false;
                        }
                        $rootScope.$ionicGoBack();
                        native.task('保存成功');
                    }
                })






        }


}])
