// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs

'use strict';

angular.module('boatloader', ['ngSanitize', 'ngResource', 'ngRoute', 'ui.route', 'ui.date', 'angularFileUpload', 'ngCsv', 'firebase']);
angular.module('boatloader').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});
// $(document).foundation();