$(function() {
    var appObj = {
        items : [ 
            "paper",
            "no",
            "meme",
            "terraria"    
        ],
        apikey : "Mxu234hiPj6ctTRTYeJI0UsrmfeGuXnS",
        more: false,
        limit: 10,
        currentGif : ""
    }
    function makeButtons(){
        $("#gif-btns").text("");
        $.each( appObj.items, function( key, value ) {
            $("#gif-btns").append("<button class='btn gBtn btn-primary' data-gif='"+ value + "'>" + value + "</button>");
        });
    }
    makeButtons();
    
    $("#addBtn").on("click", function(event){
        event.preventDefault();

        var gif = $(".addBar").val().trim();

        appObj.items.push(gif);

        makeButtons();
    })


    $("#gif-btns").on("click", ".gBtn", function() {
      var gif = $(this).attr("data-gif");
      if(appObj.currentGif === gif){
        appObj.limit += 10;
      }
      else{
        appObj.currentGif = gif;
        appObj.limit = 10;
      }
      console.log(appObj.limit);
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=" + appObj.apikey + "&limit=" + appObj.limit;

      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
          $("#gifs-view").html("");
          for (var i = 0; i < results.length; i++) {
            var figure = $("<figure class='item'>");

            var rating = results[i].rating;
            
            var caption = $("<figcaption>").text("Rating: " + rating);
            caption.addClass("figure-caption");

            var gifImage = $("<img>");
            gifImage.addClass("figure-image");
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-run", results[i].images.fixed_height.url);
            gifImage.attr("data-running", "no");
            gifImage.attr("src", results[i].images.fixed_height_still.url);

            figure.prepend(gifImage);
            figure.prepend(caption);
 
            $("#gifs-view").prepend(figure);
          }
        });
    });
    $("#gifs-view").on("click", ".figure-image", function(){
        var runningURL = $(this).attr("data-run");
        var stillURL = $(this).attr("data-still");
        var isRunning = $(this).attr("data-running");
        if(isRunning === "no"){
            $(this).attr("src", runningURL);
            $(this).attr("data-running", "yes");
        }
        else{
            $(this).attr("src", stillURL);
            $(this).attr("data-running", "no");
        }
    })



});