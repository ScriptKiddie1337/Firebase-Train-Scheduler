  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5FFf-lSm-qqOSHJSI2ZbgKiumbZFkJ9c",
    authDomain: "train-scheduler-now.firebaseapp.com",
    databaseURL: "https://train-scheduler-now.firebaseio.com",
    projectId: "train-scheduler-now",
    storageBucket: "train-scheduler-now.appspot.com",
    messagingSenderId: "667512288625"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = [];
  var destination = [];
  var frequencyMins = [];
  var nextArrival = [];
  var minutesAway = 0;//minutesCalculated;

  database.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored, update our client-side variables
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("frequencyMins")) {
      // Set the variables for highBidder/highPrice equal to the stored values.
      trainName = snapshot.val().trainName;
      destination = snapshot.val().destination;
      frequencyMins = parseInt(snapshot.val().frequencyMins);
    }
  
    // If Firebase does not have highPrice and highBidder values stored, they remain the same as the
    // values we set when we initialized the variables.
    // In either case, we want to log the values to console and display them on the page.
    console.log(trainName);
    console.log(destination);
    console.log(frequencyMins);
    $("#train-name").text(trainName);
    $("#destination").text(destination);
    $("#frequency").text(frequencyMins); 
    // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  $("#train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name").val().trim();
      console.log(trainName);
      var destination = $("#destination").val().trim();
      console.log(destination);
      var frequencyMins = $("#frequency").val().trim();
      console.log(frequencyMins)
      var nextArrival = $("#firstTrainTime").val().trim();
      console.log(nextArrival);
      var minutesAway = 0;//minutesCalculated; - Running of minutes calculated. Run the function outside of the on.click event, then insert it into here
  });

 