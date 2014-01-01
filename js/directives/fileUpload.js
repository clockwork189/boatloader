'use strict';

/* Directives */

angular.module('boatloader').directive('fileread', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            file: '='
        },
        link: function (scope, element, attrs) {
            // element.bind("change", function (changeEvent) {
            //     var file = changeEvent.target.files[0];
            //     var reader = new FileReader();
            //     reader.onload = function(theFile) {
            //         scope.$apply(function () {
            //             scope.file = $.csv.toObjects(theFile.target.result);
            //         });
            //     };
            //     reader.readAsText(file);
            // });
            element.bind("change", function (changeEvent) {
                var file = changeEvent.target.files[0];
                var reader = new FileReader();
                reader.onload = function(theFile) {
                    scope.$apply(function () {
                        scope.file = $.csv.toObjects(theFile.target.result);
                    });
                };
                reader.readAsText(file);
            });
        }
    };
});