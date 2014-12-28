/**
 * Created by alvise on 28/12/14.
 */

(function(){
    angular.module('AgoraTableTest',['agora.widgets']).controller('AgoraCtrl', function($scope){
        $scope.cliccable = function(){
            console.info("Click");
        };
    });
})();
