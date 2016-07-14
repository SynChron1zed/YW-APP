//hidden  tabs  directive
App.directive('hideTabs',function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = true;
                });
            });
            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = true;
            });
        }
    };
});

//drag  left right box   directive
App.directive('draggable', function($document, $timeout) {
    return {
        restrict :  'A',
        link:function(scope, element, attr) {
            var now = 0 ;
            ionic.onGesture('dragstart',function(e){
                element[0].style.transitionDuration='0ms';
                var position   = element[0].style.transform.replace('translateX(','').replace('px)','');
                if(position !==  ''){
                    now  = parseInt(position);
                }else{
                    now  =0;
                }
            },element[0])
            ionic.onGesture('drag',function(e){
                element[0].style.transform='translateX('+(parseInt(e.gesture.deltaX)+now)+'px)';
            },element[0])

            ionic.onGesture('dragend',function(e){
                element[0].style.transitionDuration='200ms';
                var  allleft  = element[0].offsetWidth - window.innerWidth;
                var  endoption  =element[0].style.transform.replace('translateX(','').replace('px)','');
                if(endoption > 0){
                    element[0].style.transform = 'translateX(0px)';
                }
                else  if( Math.abs(endoption) >= allleft){
                    if(element[0].offsetWidth< window.innerWidth ){
                        element[0].style.transform = 'translateX(0px)';
                    } else{
                        element[0].style.transform = 'translateX('+(-allleft)+'px)';
                    }
                }
            },element[0])
        }
    }
})

App.directive('jfocus',function($rootScope,$parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            setTimeout(function(){
                element[0].focus()

                if(ionic.Platform.isAndroid()){
                    window.cordova.plugins.Keyboard.show();
                }

            },800)

        }


    };
});
