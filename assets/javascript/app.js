var toPackCount = 0;
var toPackArray = [];

if(localStorage.getItem("list") !== null) {
    todDoArray = JSON.parse(localStorage.getItem("list"));
    updateList(toPackArray);
    console.log(toPackArray);
  }

  $(document).ready(function() {
    M.updateTextFields();
  });

    $(document).on("click", "#add-to-list", function(event) {

      event.preventDefault();

      var toPackItem = $("#add-this-item").val().trim(); 

      toPackArray.push(toPackItem);
      console.log(toPackArray);

      localStorage.setItem("list", JSON.stringify(toPackArray));
      JSON.parse(localStorage.getItem("list"));
      
      updateList(toPackArray); 


      $("#add-this-item").val("");

      toPackCount++;

    });

    function updateList(arr) {
      $("#add-item").html("");

      for (var i = 0; i < arr.length; i++) {
        var newLi = $("<li>").attr("id", "item-" + i).text(arr[i]);
        var button = $("<button>").attr({ "data-to-do": i, "class": "checkbox" }).text('x');
        var newItem = newLi.prepend(button);
        $("#add-item").append(newItem);
      }
    }

    localStorage.setItem("add-item", [])

    $(document.body).on("click", ".checkbox", function() {

    var toPackNumber = $(this).attr("data-to-do");

    $("#item-" + toPackNumber).remove();

    toDoArray.splice(toDoNumber, 1);
    localStorage.setItem("list", JSON.stringify(toPackArray));
    console.log(toPackArray);

    });

$("#submit").click(function () {
    event.preventDefault();
    webcamSearch();
})

function webcamSearch() {
    let destination = $("#search").val().trim();
    let queryURL = "https://webcamstravel.p.rapidapi.com/webcams/list/country=" + destination + "?show=webcams:image,player"
    $.ajax({
        headers: {
            "X-RapidAPI-Host": "webcamstravel.p.rapidapi.com",
            "X-RapidAPI-Key": "27c7e87c7dmshda62b4854259734p18e751jsn4a9528e072f1",
            },
        data:"data",
        method: "GET",
        url: queryURL,
        success: function(response){

            for (var i=0; i<4; i++){
                var webcam = response.result.webcams[i].image.daylight.preview;
                $("#webcam").append("<img src='" + webcam +"'>");
           }
        }
    })
}

