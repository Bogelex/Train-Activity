// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCyx97RmGZ2LblhNVTSD9CX0SdIaxf49yI",
    authDomain: "ucb-tester-project.firebaseapp.com",
    databaseURL: "https://ucb-tester-project.firebaseio.com",
    projectId: "ucb-tester-project",
    storageBucket: "ucb-tester-project.appspot.com",
    messagingSenderId: "328576780622"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding TRAIN
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  


  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
    // time: currentTime,
    // differences: diffTime,
    // remainder:  tRemainder,
    // minutes: tMinutesTillTrain,
    // next: nextTrain
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);
//   console.log(newTrain.time);
//   console.log(newTrain.differences);
//   console.log(newTrain.remainder);
  console.log(newTrain.minutes);
  console.log(newTrain.next);

  alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFrequency);

 // Calculate first time converted
  var firstTimeConverted = moment(trainFirst, "HH:mm").subtract(1, "years");
  
  var currentTime = moment();

   // Calculate time differences
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   // Calculate remaining minutes
  var tRemainder = diffTime % trainFrequency;

  var tMinutesTillTrain = trainFrequency - tRemainder;

    // Calculate next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");




  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutesTillTrain)
  );

//   Append the new row to the table
  $("#train-table > tbody").append(newRow);
});