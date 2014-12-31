/**
 * Created by alvise on 30/12/14.
 */

/*
 Angular module for EventBus of agora (All are publisher)
 */
(function(){
    "use strict";

    function AgoraEvent(source, target, action){
        this.source = source; //Dom element (only agora root widget)
        this.target = target; //Dom element (only agora root widget)
        this.action = action; //To execute
    }

    angular.module('agora.event', ['agora.data']).factory('eventFactory', function($log){

        var eventFactory = {};

        return eventFactory;

    }).factory('eventBus', function(storage, $log){
        var eventBus = {},
            subscriberCounter = 1,
            subscriber = {};

        eventBus.register = function(elem){ //add a subscriber (any dom object)
            $log.debug('Add subscriber: ' + elem);

            var subscriberId = subscriberCounter++;

            subscriber[subscriberId] = elem;
            storage.getData(elem).subscriberId = subscriberId;
        };

        eventBus.isRegister = function(elem){
            if(storage.getData().subscriberId){
                return true;
            }

            return false;
        };

        eventBus.unregister = function(elem){
            if(this.isRegister(elem)){
                var elemData = storage.getData(elem);
                var subscriberId = elemData.subscriberId;

                $log.debug('Unregister subscriber: ' + subscriberId);

                subscriber[subscriberId] = null;
                elemData.subscriberId = null;
            }
        };

        eventBus.post = function (event) {
            $log.debug('');
        };

        return eventBus;
    });
})();