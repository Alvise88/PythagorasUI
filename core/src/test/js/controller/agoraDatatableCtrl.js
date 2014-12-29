/**
 * Created by alvise on 28/12/14.
 */

(function(){
    "use strict";

    angular.module('AgoraTableTest',['agora.widgets']).controller('AgoraCtrl', function($scope){
        $scope.cliccable = function(){
            console.info("Click");
        };

        $scope.localData =  [
            {'brand':'Volkswagen','year': 2012, 'color':'White', 'vin':'dsad231ff'},
            {'brand':'Audi','year': 2011, 'color':'Black', 'vin':'gwregre345'},
            {'brand':'Renault','year': 2005, 'color':'Gray', 'vin':'h354htr'},
            {'brand':'Bmw','year': 2003, 'color':'Blue', 'vin':'j6w54qgh'},
            {'brand':'Mercedes','year': 1995, 'color':'White', 'vin':'hrtwy34'},
            {'brand':'Opel','year': 2005, 'color':'Black', 'vin':'jejtyj'},
            {'brand':'Honda','year': 2012, 'color':'Yellow', 'vin':'g43gr'},
            {'brand':'Chevrolet','year': 2013, 'color':'White', 'vin':'greg34'},
            {'brand':'Opel','year': 2000, 'color':'Black', 'vin':'h54hw5'},
            {'brand':'Mazda','year': 2013, 'color':'Red', 'vin':'245t2s'}
        ];

        $scope.dataTableExample = function(){
            return {"Hello": "World"};
        }


        $scope.showInfo = function (event, data) {
            $('#messages').puigrowl('show', [{severity: 'info', summary: 'Message Summary', detail: 'Message Detail'}]);
        }
    });
})();
