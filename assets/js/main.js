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

  var trainData = database.ref();

  var trainName = [];
  var destination = [];
  var frequency = [];
  var nextArrival = [];
  var minutesAway = 0;//minutesCalculated;

  database.ref().on("child_added", function(childSnapshot) {
    let data = childSnapshot.val();
    //gives local current time
  let currentTime = moment().format("hh:mm A");
  console.log("currentTime:", currentTime);
    // To calculate the arrival time, add the tMinutes to the currrent time
/*          let tFrequency = childchildSnapshot.val().frequency;
         let tArrival = moment().add(tMinutes, "m").format("hh:mm A");
         let tMinutes = tFrequency - tRemainder;
         let tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;  */

         console.log(data);
         console.log(data.name);


    /* if (childSnapshot.child("trainName").exists() && childSnapshot.child("destination").exists() && childSnapshot.child("frequency")) {

      trainName = data.trainName;
      destination = data.destination;
      frequency = parseInt(data.frequency);
      console.log(trainName);
      console.log(destination);
      console.log(frequency);
    }
   */
  trainName = data.name;
  destination = data.destination;
  frequency = parseInt(data.frequency);
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  
    $("#train-name").text(trainName);
    $("#destination").text(destination);
    $("#frequency").text(frequency); 

  //sets the new variable to a moment that subtracts (.diff()) the moment that the first train in minutes from the train frequency
  let tRemainder = moment().diff(moment.unix(data.firstTrainUnix), "minutes") % frequency;
  //now we subtract trainFrequency (ex. train comes every 30 minutes) from the tRemainder - how long is the remainder from when the first train arrived (ex. 10 min, giving us 20 mins until next train comes)
  let minutesAway = frequency - tRemainder;

  // To calculate the arrival time, add the tMinutes to the currrent time
  let nextArrival = moment().add(minutesAway, "m").format("hh:mm A");

  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
    // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  $("#train-btn").on("click", function(event) {
    //stops it from refreshing
      event.preventDefault();

      // Grabs user input
      var trainName = $("#train-name").val().trim();
      console.log("Train Name:" + trainName);
      var destination = $("#destination").val().trim();
      console.log("Destination:", destination);
      var firstTrainUnix = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
      console.log("First Train Time (unix):", firstTrainUnix);
      var frequency = $("#frequency").val().trim();
      console.log("Frequency:", frequency);

        var newTrain = {
        name:  trainName,
        destination: destination,
        firstTrain: firstTrainUnix,
        frequency: frequency
      }

      trainData.push(newTrain);

  });
  
