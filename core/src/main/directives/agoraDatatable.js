/**
 * Created by alvise on 28/12/14.
 */

(function(){
    "use strict";

    // Module initialization
    angular.module('agora.widgets', []).factory('datatableUtils', function(){
        var datatableUtils = {};

        datatableUtils.determineOptions = function (scope, element, attrs) { // Only in link function
            var _options = scope.$eval(attrs.binding) || {},
                id = attrs.id,
                selectionMode = attrs.selectionmode || null,
                caption = attrs.name || "",
                rows = attrs.rows || 10, //Dafault value
                tableData = scope.value; // Also inside isolation scope  //scope.$eval(attrs.value);


            var paginator = {
                rows: rows
            }

            if (angular.isArray(tableData)) {
                _options = {
                    id: id,
                    caption: caption,
                    tableData : tableData,
                    paginator: paginator,
                    selectionMode: selectionMode, // null Default
                    functionBasedData : false
                }; //Must have
            }
            if (angular.isFunction(tableData)) {
                _options = {
                    id: id,
                    caption: caption,
                    tableData : tableData,
                    paginator: paginator,
                    selectionMode: selectionMode, // null Default
                    functionBasedData : true
                }; //Must have
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
                value: '=',
                rowSelect: '='
            },
            template: "<div ></div>",
            compile: function(tElement, tAttrs, transclude){ //Called before column

                function link(scope, element, attrs, ctrl, transclude){ // closure
                    var options = datatableUtils.determineOptions(scope, element, attrs);

                    element.attr('id', options.id);

                    $log.debug('AgoraDatatable');

                    scope.columns = [];
                    transclude(scope, function(clone, scope) { //Override standard transclude
                        //element.append(clone);
                        $log.debug("DataTable transclusion");
                    });

                    $log.debug(scope.columns);

                    $('#'+options.id).puidatatable({
                        caption: options.caption,
                        paginator: options.paginator,
                        columns: scope.columns,
                        datasource: options.tableData,
                        selectionMode: options.selectionMode,
                        rowSelect: scope.rowSelect
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


                function determineOptionsColumn(attrs){
                    var field = attrs.field;
                    var headerText = attrs.headerText;
                    var sortable = attrs.sortable || false; // False defalt value


                    return {
                        field: field,
                        headerText: headerText,
                        sortable: sortable
                    }
                }


                function link(scope, element, attrs){ //I have ovverride standard transclude

                    var metaColumn = determineOptionsColumn(attrs);

                    scope.columns.push(metaColumn);

                    $log.debug('AgoraColumn');
                };

                return link;
            }

        }

    });
})();
