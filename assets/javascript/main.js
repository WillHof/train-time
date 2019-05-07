var config = {
    apiKey: "AIzaSyAg5nhcxPOHvDPfC368Gt6v7Zi3gIwygzg",
    authDomain: "train-time-42069.firebaseapp.com",
    databaseURL: "https://train-time-42069.firebaseio.com",
    projectId: "train-time-42069",
    storageBucket: "train-time-42069.appspot.com",
    messagingSenderId: "201700585917"
};
firebase.initializeApp(config);

$(document).ready(function () {
    var database = firebase.database()
    $("#save").on("click", function (e) {
        e.preventDefault()

        var trainName = $("#trainName").val().trim()
        var destination = $("#destination").val().trim()
        var firstTrainTime = $("#firstTrainTime").val().trim()
        var frequency = $("#frequency").val().trim()

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        });
    });
    database.ref().on("child_added", function (snapshot) {
        var data = snapshot.val()
        var currentTime = moment()
        var firstTimeConverted = (moment((data.firstTrainTime), "HH:mm").subtract(1, "years"))
        var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
        var remainder = diffTime % (data.frequency)
        var minutesAway = (data.frequency) - remainder
        var nextTrain = currentTime.add(minutesAway, "minutes");

        // var remainder = (((today.getHours() * 60) + today.minutes()) - data.firstTrainTime) % data.frequency
        // console.log(remainder)
        var html = `
            <tr>
                <td>${data.trainName}</td>
                <td>${data.destination}</td>
                <td>${data.frequency}</td>
                <td>${nextTrain}</td>
                <td>${minutesAway}</td>
            </tr>
`
        $("#trainInfo").append(html);

    })
})
