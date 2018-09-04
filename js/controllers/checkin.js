app.controller('CheckInController',
  ['$scope', '$rootScope', '$location', '$routeParams', '$firebaseObject', '$firebaseArray',
  function($scope, $rootScope, $location, $routeParams, $firebaseObject, $firebaseArray) {



    var ref = firebase.database().ref().child($routeParams.uid)
      .child('events').child($routeParams.eid).child('checkins');

    $scope.order = 'date';
    $scope.direction = null;
    $scope.query = '';

    $scope.checkins = $firebaseArray(ref);

    $scope.allowedUser = ($rootScope.currentUser && $rootScope.currentUser.$id == $routeParams.uid);

    $scope.addNote = function(checkin) {
      checkin.show = !checkin.show;

      if(checkin.expand == 'expanded') {
        checkin.expand = '';
      } else {
       checkin.expand = 'expanded';
      }

    }

    $scope.publishNote = function(checkin) {
      var note = ref.child(checkin.$id).child('notes');
      $firebaseArray(note).$add( {
        content: checkin.content,
        date: firebase.database.ServerValue.TIMESTAMP
      })
    }

    $scope.deleteNote = function(checkin, id) {

      var note = ref.child(checkin.$id).child('notes').child(id);
      $firebaseObject(note).$remove();
    }


    $scope.addCheckIn = function() {
      $firebaseArray(ref).$add({
        firstname: $scope.user.firstname,
        lastname: $scope.user.lastname,
        email: $scope.user.email,
        date: firebase.database.ServerValue.TIMESTAMP
      }).then(function(){
        $location.path('/checkin/' + $routeParams.uid + '/' +
        $routeParams.eid + '/checkinlist')
      })};

    $scope.deleteCheckIn = function(id) {
      $firebaseObject(ref.child(id)).$remove();
    }

}]);
