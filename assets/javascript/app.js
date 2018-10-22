var config = {
    apiKey: "AIzaSyBKgY5U3f2SFM8fBqROr3B2zS6BoMgfTs4",
    authDomain: "train-schedule-3e7bf.firebaseapp.com",
    databaseURL: "https://train-schedule-3e7bf.firebaseio.com",
    projectId: "train-schedule-3e7bf",
    storageBucket: "train-schedule-3e7bf.appspot.com",
    messagingSenderId: "482850456712"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#newTrain").on("click", function() {
    event.preventDefault();

    var train = $("#idTrainName").val().trim();
    var destination = $("#idDestination").val().trim();
    var firstTrain = $("#idFirstTrain").val().trim();
    var frequency = $("#idFrequency").val().trim();

    var trainInfo = {
      fireTrain: train,
      fireDestination: destination,
      fireFrequency: frequency,
      fireFirstTrain: firstTrain,
      trainTimeInput : database.ServerValue.TIMESTAMP
    };

    database.ref().push(trainInfo);

    console.log(trainInfo.fireTrain);
    console.log(trainInfo.fireDestination);
    console.log(trainInfo.fireFrequency);
    console.log(trainInfo.fireFirstTrain);
    console.log(trainInfo.trainTimeInput);

    $("#idTrainName").val("");
    $("#idDestination").val("");
    $("#idFirstTrain").val("");
    $("#idFrequency").val("");
  })

  database.ref().on("child_added", function (snapshot) {
    var train = snapshot.val().fireTrain;
    var destination = snapshot.val().fireDestination;
    var frequency = snapshot.val().fireFrequency;
    var firstTrain = snapshot.val().fireFirstTrain;

    var timeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment (currentTime).format("hh:MM a"))


    $("#train-table > tbody").append(train + destination + frequency + firstTrain);
  });