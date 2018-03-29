 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCL2hELsRrtpYWseWemUZloo20eaiVOumw",
    authDomain: "train-scheduler-d329c.firebaseapp.com",
    databaseURL: "https://train-scheduler-d329c.firebaseio.com",
    projectId: "train-scheduler-d329c",
    storageBucket: "train-scheduler-d329c.appspot.com",
    messagingSenderId: "625328629992"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

$("#submit").on("click", function (event){
	event.preventDefault()
  var name = $("#trainName").val().trim()
  var destination = $("#destination").val().trim()
  var frequency = $("#frequency").val().trim()
  var time = $("#trainTime").val().trim()

       var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
       var currentTime = moment(); 
       console.log(moment())
       var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
       var tRemainder = diffTime % frequency;
       var tMinutesTillTrain = frequency - tRemainder;
       var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $("#trainName").val("")
  $("#destination").val("")
  $("#frequency").val("")
  $("#trainTime").val("")

	database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      time: time,
      nextTrain: moment(nextTrain).format("hh:mm"),
      minutes: tMinutesTillTrain,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

 database.ref().on("child_added", function(childSnapshot) {
 	$(".table").append("<tr> <td>" + childSnapshot.val().name + "</td> <td>" + childSnapshot.val().destination + "</td> <td>" + childSnapshot.val().frequency + "</td> <td id='next'>" + childSnapshot.val().nextTrain + "</td> <td id='min'>" + childSnapshot.val().minutes + "</td> </tr>" )

 }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
