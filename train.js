//=============Initialize Firebase====================
  // Initialize Firebase
 
  var config = {
    apiKey: "AIzaSyDWWRhi0Tcg8jaqArX_cXKrnIftQKLjRmU",
    authDomain: "newtrain-b21f7.firebaseapp.com",
    databaseURL: "https://newtrain-b21f7.firebaseio.com",
    projectId: "newtrain-b21f7",
    storageBucket: "newtrain-b21f7.appspot.com",
    messagingSenderId: "102289593189"
  };
  firebase.initializeApp(config);

//variable for firebase database
var database = firebase.database();

//==================User Click ==========================

$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

//grab user input
var trainName = $("#trainName").val().trim();
var trainDestination = $("#destination").val().trim();
var firstTrainTime = $("#firstTrainTime").val().trim();
var trainFrequency = $("#frequency").val();


//temporary object for holding data
var newTrain = {
	name: trainName,
	destination: trainDestination,
	firstTrain: firstTrainTime,
	frequency: trainFrequency
};

//uploads to the database
database.ref().push(newTrain);

//logs everything to console
console.log(newTrain.name);
console.log(newTrain.firstTrain);
console.log(newTrain.destination);
console.log(newTrain.frequency);

//Alert
alert("Train Time successfully added");

//Clears all of the text boxes
$("#trainName").val("");
$("#destination").val("");
$("#firstTrainTime").val("");
$("#frequency").val("");

});

//============DATABASE REF AND APPEND ================================
//snapshot is a exact picture of everything in the node at the time of the call
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;


  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(trainFrequency);

   //  var trainStartPretty = moment.unix(firstTrainTime).format("HH:mm");

  //==============Calculate next arrival=================================

  //First Time 
  var trainFirstConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log("Train Start Time Minutes Value: " + trainFirstConverted);


  //Current Time
  var currentTime = moment();
  	console.log("Current Time is: " + moment(currentTime).format("hh:mm"));


  //Difference between the times
  var diffTime = moment().diff(moment(trainFirstConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  //Time Apart
  var tRemainder = diffTime % trainFrequency;
  console.log("Remainder : " + tRemainder)

  //Minutes until Train
  var tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("Minutes Till Train: " + tMinutesTillTrain);

  //next train 
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time: " + moment(nextTrain).format("hh:mm a"));



  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFirstConverted.format("hh:mm") + "</td><td>" + trainFrequency + "</td><td>" + tMinutesTillTrain + "</td><td>"+ nextTrain.format("hh:mm a") +"</td></tr>");
});
