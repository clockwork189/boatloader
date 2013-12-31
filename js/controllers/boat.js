angular.module('boatloader').controller('BoatController', ['$scope', '$firebase', '$location', '$routeParams',
    function($scope, $firebase, $location, $routeParams) {
        $scope.user = {};
        $scope.paddlers = [];
        $scope.loginFacebook = function () {
            var ref = new Firebase('https://boatloader.firebaseio.com/');
            var auth = new FirebaseSimpleLogin(ref, function(error, user) {
                if (error) {
                    // an error occurred while attempting login
                    alert("Error: ", error);
                } else if (user) {
                    // user authenticated with Firebase
                    console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
                    $scope.user = user;
                    $location.path("/dashboard/" + user.id);
                } else {
                    // user is logged out
                    console.log('User logged out');
                    auth.login('facebook');
                }
            });
        };
        $scope.savePaddler = function () {
            var userId  = $routeParams.userId;
            if(userId) {
                var ref = new Firebase('https://boatloader.firebaseio.com/users/' + $routeParams.userId + '/paddlers');
                var paddler = {};
                paddler.name = this.paddler.name;
                paddler.weight = this.paddler.weight;
                paddler.experience = this.paddler.experience;
                paddler.age = this.paddler.age;
                paddler.gender = this.paddler.gender;
                paddler.side = this.paddler.side;
                $scope.paddlers.push(paddler);
                ref.push(paddler);
                
                this.paddler.name = "";
                this.paddler.weight = "";
                this.paddler.experience = "";
                this.paddler.age = "";
                this.paddler.gender = "";
                this.paddler.side = "";
            } else {
                alert("Error: You seem to not be logged in");
            }
        };

        $scope.loadAllPaddlers = function () {
            var ref = new Firebase('https://boatloader.firebaseio.com/users/' + $routeParams.userId + '/paddlers');
            $scope.paddlers = [];
            ref.once('value', function (dataSnapshot) {
                var paddlers = dataSnapshot.val();
                for(var i in paddlers) {
                    $scope.paddlers.push(paddlers[i]);
                }
                $scope.$apply() 
            });
        };
    }
]);