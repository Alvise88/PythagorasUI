/**
 * Created by alvise on 30/12/14.
 */

/*
 Angular module for EventBus of agora (All are publisher)
 */
(function(){
    "use strict";

    function AgoraEvent(source, target, action){
        this.source = source; //Dom element or jquery (only agora root widget)
        this.target = target; //Dom element or jquery (only agora root widget)
        this.action = action; //To execute
    }

    AgoraEvent.prototype.print = function () {
        return 'source: ' + this.source + " target: " + this.target + " action: " + this.action;
    };

    angular.module('agora.event', ['agora.data']).factory('eventFactory', function($log){

        var eventFactory = {};

        eventFactory.generateEvent = function (source, target, action) {
            var agoraEvent = new AgoraEvent(source, target, action);

            $log.debug('Generate event,' + agoraEvent.print() );

            return agoraEvent;
        };

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
            if(storage.getData(elem).subscriberId){
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
            $log.debug('Post event' + event);

            var target = event.target;

            if(target !=null && this.isRegister(target)){
                $log.debug('Subscriber found');

                var elemData = storage.getData(target);
                var handlers = elemData.handlers;

                handlers.forEach(function(handler) {
                    $log.debug("Executing handler: " + handler);

                    handler(event);
                });

            }
        };

        return eventBus;
    });
})();