/**
 * Created by alvise on 29/12/14.
 */


(function(){
    "use strict";


    angular.module('agora.widgets').directive('agoraGrowl', function($log){


        return {
            restrict: 'E',
            template: "<div></div>",
            replace: true,
            compile: function(tElement, tAttrs){
                $log.debug("Compiling Growl");

                function link(scope, element, attrs){
                    var id = attrs.id;

                    element.attr('id', id);
                    $('#' + id).puigrowl();

                    $log.debug("Linking Growl");
                }

                return link;
            }
        };
    });
})();