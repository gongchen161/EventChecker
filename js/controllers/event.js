app.controller('EventController',
  ['$scope', '$rootScope','$firebaseAuth', '$firebaseArray',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray) {

    var ref = firebase.database().ref();
    var auth = $firebaseAuth();


    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var eventRef = ref.child(firebase.auth().currentUser.uid).child('events');
        var eventInfo = $firebaseArray(eventRef);

        $scope.events = eventInfo;

        eventInfo.$loaded().then(function(data) {
          $rootScope.numEvents = eventInfo.length;
        });

        eventInfo.$watch(function(data) {
          $rootScope.numEvents = eventInfo.length;
        });

        $scope.addEvent = function() {
          eventInfo.$add({
            name: $scope.eventname,
            date: firebase.database.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.eventname='';
          });
        }

        $scope.deleteEvent = function(key) {
          eventInfo.$remove(key);
        }
      }
    });
}]);
