/**
 * Created by alvise on 30/12/14.
 */

/**
 * Angular module for data storage of agora
 */
(function(){
    "use strict";
    angular.module('agora.data', []).factory('storage', function(){

        var storage = {};

        var cache = {},
            guidCounter = 1,
            expando = "data" + (new Date).getTime();

        storage.getData = function(elem){
            var guid = elem[expando];

            if(!guid){
                guid = elem[expando] = guidCounter++;
                cache[guid] = {};
            }
            
            return cache[guid];
        };

        storage.removeData = function (elem) {
            var guid = elem[expando];

            if(!guid)
                return;

            delete cache[guid];

            delete elem[expando];
        };

        return storage;
    });






})();
