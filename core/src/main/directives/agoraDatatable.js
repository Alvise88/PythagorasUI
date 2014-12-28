/**
 * Created by alvise on 28/12/14.
 */

(function(){
    "use strict";

    angular.module('agora.widgets', []).factory('datatableUtils', function(){
        var datatableUtils = {};

        datatableUtils.determineOptions = function (scope, element, attrs) { // Only in link function
            var _options = scope.$eval(attrs.binding) || {},
                id = attrs.id,
                tableData = scope.value; // Also inside isolation scope  //scope.$eval(attrs.value);

            if (angular.isArray(tableData)) {
                _options = {
                    id: id,
                    tableData : tableData,
                    functionBasedData : false
                };
            }
            if (angular.isFunction(tableData)) {
                _options = {
                    id: id,
                    tableData : tableData,
                    functionBasedData : true
                };
            }
            return _options;
        };

        return datatableUtils;
    }).directive('agoraDatatable', function($log, datatableUtils){
        //Utility

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                value: '=value'
            },
            template: "<div ></div>",
            compile: function(tElement, tAttrs, transclude){ //Called before column

                function link(scope, element, attrs, ctrl, transclude){ // closure
                    var options = datatableUtils.determineOptions(scope, element, attrs);

                    element.attr('id', options.id);

                    $log.debug('AgoraDatatable');

                    //Before remove all child of agora table
                    /*(function(){
                        var myNode = element.get();
                        while (myNode.firstChild) {
                            myNode.removeChild(myNode.firstChild);
                        }
                    })(element);*/
                    scope.columns = [];
                    transclude(scope, function(clone, scope) { //Override standard transclude
                        //element.append(clone);
                        //$log.debug(scope.value);
                    });


                    $log.debug(scope.columns);

                    /*
                     columns: [
                     {field:'vin', headerText: 'Vin', sortable:true},
                     {field:'brand', headerText: 'Brand', sortable:true},
                     {field:'year', headerText: 'Year', sortable:true},
                     {field:'color', headerText: 'Color', sortable:true}
                     ]
                     */

                    $('#'+options.id).puidatatable({
                        caption: 'Local Datasource',
                        paginator: {
                            rows: 5
                        },
                        columns: scope.columns,
                        datasource: options.tableData
                    });
                }

                return link; // Return link function
            }
        };
    }).directive('agoraColumn', function($log){
        //Utility

        return {
            restrict: 'E',
            replace: true,
            template: "<div></div>",
            compile: function(tElement, tAttrs, transclude){

                function link(scope, element, attrs){ //I have ovverride standard transclude
                    scope.columns.push({field:'vin', headerText: 'Vin', sortable:true});

                    $log.debug('AgoraColumn');
                };

                return link;
            }

        }

    });
})();
