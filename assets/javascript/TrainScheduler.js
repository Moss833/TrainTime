$(document).ready(function(){


  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5jot-eAl5efAz-31xiy9GdJ93ILLavgM",
    authDomain: "trainscheduler-cd0d8.firebaseapp.com",
    databaseURL: "https://trainscheduler-cd0d8.firebaseio.com",
    projectId: "trainscheduler-cd0d8",
    storageBucket: "",
    messagingSenderId: "598731276696"
  };
  firebase.initializeApp(config);

 // Variables
    // ================================================================================
    // Get a reference to the database service
    var database = firebase.database();

// 2. Button for adding Employees
$("#run-search").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-Name").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  };
  // Uploads employee data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-Name").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFirst = childSnapshot.val().first;
  var trainFrequency = childSnapshot.val().frequency;
  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirst);
  console.log(trainFrequency);



  var diffTime = moment().diff(moment(trainFirst), "minutes");
  var tRemainder = diffTime % trainFrequency;
  var tMinutesTillTrain = trainFrequency - tRemainder;
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    




  $("tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" +  tMinutesTillTrain + "</td></tr>");
});




// function to empty out the articles
function clear() {
  $("#well-section").empty();
}
//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);




});