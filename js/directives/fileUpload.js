'use strict';

angular.module('boatloader').directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    var file = changeEvent.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(theFile) {
                        var text = theFile.target.result;
                        var objs = $.csv.toObjects(text);
                        console.log(objs);
                    };
                    reader.readAsText(file);
                });
            });
        }
    }
}]);