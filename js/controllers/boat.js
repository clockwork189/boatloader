angular.module('boatloader').controller('BoatController', ['$scope', '$firebase', '$location', '$routeParams',
    function($scope, $firebase, $location, $routeParams) {
        $scope.user = {};
        $scope.boatOrder = {};
        $scope.paddlers = [];
        $scope.roster = [];
        $scope.frontHeavy = false;
        $scope.backHeavy = false;
        $scope.rightHeavy = false;
        $scope.leftHeavy = false;

        $scope.showRoster = function() {
            console.log($scope.roster);
        };
        $scope.finishUpload = function () {
            var participants = this.roster;
            if(participants) {
                var ref = new Firebase('https://boatloader.firebaseio.com/users/' + $routeParams.userId + '/paddlers');
                for(var i = 0; i < participants.length; i++) {
                    var paddler = participants[i];
                    ref.push(paddler);
                    $scope.paddlers.push(paddler);
                }
            }
        };
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
        $scope.checkBoat = function () {
            var boatOrder = this.boatOrder || {};
            boatOrder = setWeights(boatOrder);
            var leftWeight = totalWeights(boatOrder.left);
            var rightWeight = totalWeights(boatOrder.right);
            var frontWeight = getFrontWeight(boatOrder);
            var backWeight = getBackWeight(boatOrder);
            var boatWeight = leftWeight + rightWeight;

            $scope.frontHeavy = false;
            $scope.backHeavy = false;
            $scope.rightHeavy = false;
            $scope.leftHeavy = false;
            
            if(frontWeight > backWeight) {
                $scope.frontHeavy = true;
            } else if (frontWeight < backWeight) {
                $scope.backHeavy = true;
            }

            if(rightWeight > leftWeight) {
                $scope.rightWeight = true;
            } else if(rightWeight < leftWeight) {
                $scope.leftWeight = true;
            }
            $scope.weights = {};
            $scope.weights.boat = boatWeight;
            $scope.weights.left = leftWeight;
            $scope.weights.right = rightWeight;
            $scope.weights.front = frontWeight;
            $scope.weights.back = backWeight;

        };
        var setWeights = function (boat) {
            boat = boat || {};
            boat.left = boat.left || {};
            boat.left.left1 = boat.left.left1 || {};
            boat.left.left1.weight = parseInt(boat.left.left1.weight, 10) || 0;
            boat.left.left2 = boat.left.left2 || {};
            boat.left.left2.weight = parseInt(boat.left.left2.weight, 10) || 0;
            boat.left.left3 = boat.left.left3 || {};
            boat.left.left3.weight = parseInt(boat.left.left3.weight, 10) || 0;
            boat.left.left4 = boat.left.left4 || {};
            boat.left.left4.weight = parseInt(boat.left.left4.weight, 10) || 0;
            boat.left.left5 = boat.left.left5 || {};
            boat.left.left5.weight = parseInt(boat.left.left5.weight, 10) || 0;
            boat.left.left6 = boat.left.left6 || {};
            boat.left.left6.weight = parseInt(boat.left.left6.weight, 10) || 0;
            boat.left.left7 = boat.left.left7 || {};
            boat.left.left7.weight = parseInt(boat.left.left7.weight, 10) || 0;
            boat.left.left8 = boat.left.left8 || {};
            boat.left.left8.weight = parseInt(boat.left.left8.weight, 10) || 0;
            boat.left.left9 = boat.left.left9 || {};
            boat.left.left9.weight = parseInt(boat.left.left9.weight, 10) || 0;
            boat.left.left10 = boat.left.left10 || {};
            boat.left.left10.weight = parseInt(boat.left.left10.weight, 10) || 0;

            boat.right = boat.right || {};
            boat.right.right1 = boat.right.right1 || {};
            boat.right.right1.weight = parseInt(boat.right.right1.weight, 10) || 0;
            boat.right.right2 = boat.right.right2 || {};
            boat.right.right2.weight = parseInt(boat.right.right2.weight, 10) || 0;
            boat.right.right3 = boat.right.right3 || {};
            boat.right.right3.weight = parseInt(boat.right.right3.weight, 10) || 0;
            boat.right.right4 = boat.right.right4 || {};
            boat.right.right4.weight = parseInt(boat.right.right4.weight, 10) || 0;
            boat.right.right5 = boat.right.right5 || {};
            boat.right.right5.weight = parseInt(boat.right.right5.weight, 10) || 0;
            boat.right.right6 = boat.right.right6 || {};
            boat.right.right6.weight = parseInt(boat.right.right6.weight, 10) || 0;
            boat.right.right7 = boat.right.right7 || {};
            boat.right.right7.weight = parseInt(boat.right.right7.weight, 10) || 0;
            boat.right.right8 = boat.right.right8 || {};
            boat.right.right8.weight = parseInt(boat.right.right8.weight, 10) || 0;
            boat.right.right9 = boat.right.right9 || {};
            boat.right.right9.weight = parseInt(boat.right.right9.weight, 10) || 0;
            boat.right.right10 = boat.right.right10 || {};
            boat.right.right10.weight = parseInt(boat.right.right10.weight, 10) || 0;

            return boat;
        };
        var getFrontWeight = function (boat) {
            var sum = 0;
            sum = parseInt(boat.left.left1.weight, 10) + parseInt(boat.left.left2.weight, 10) + parseInt(boat.left.left3.weight, 10) + parseInt(boat.left.left4.weight, 10) + parseInt(boat.right.right1.weight, 10) + parseInt(boat.right.right2.weight, 10) + parseInt(boat.right.right3.weight, 10) + parseInt(boat.right.right4.weight, 10);
            return sum;
        }
        var getBackWeight = function (boat) {
            var sum = 0;
            sum = parseInt(boat.left.left7.weight, 10) + parseInt(boat.left.left8.weight, 10) + parseInt(boat.left.left9.weight, 10) + parseInt(boat.left.left10.weight, 10) + parseInt(boat.right.right7.weight, 10) + parseInt(boat.right.right8.weight, 10) + parseInt(boat.right.right9.weight, 10) + parseInt(boat.right.right10.weight, 10);
            return sum;
        }
        var totalWeights = function (side) {
            var sum = 0;
            for(var i in side) {
                sum += parseInt(side[i].weight, 10);
            }
            return sum;
        }
    }
]);