app.factory('Authentication', ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {

  var ref = firebase.database().ref();
  var auth = $firebaseAuth();
  var obj;


  auth.$onAuthStateChanged(function(authUser) {
    if(authUser) {
      var userRef = ref.child(firebase.auth().currentUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  obj = {

    login: function(user) {
      auth.$signInWithEmailAndPassword(
        user.email,
        user.password
      ).then(function(user) {
        $rootScope.currentUser = '';
        $location.path('/event');
      }).catch(function(err) {
        $rootScope.message = err.message;
      });
    },

    logout: function() {
      $rootScope.currentUser = '';
      return auth.$signOut();
    },

    requireAuth: function() {
      return auth.$requireSignIn();
    },

    register: function(user) {
      auth.$createUserWithEmailAndPassword(user.email, user.password).
        then(function(regUser) {

          var info = ref.child(firebase.auth().currentUser.uid).set({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            date: firebase.database.ServerValue.TIMESTAMP
          });

          obj.login(user);
        }).catch(function(err) {
          $rootScope.message = err.message;
        })
    }
  };


  return obj;

}])
