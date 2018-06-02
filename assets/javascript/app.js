/* ******** GLOBAL VARIABLES ******** */
//Initial array with animal list
var animals = ["Turtle", "Seal", "Dog", "Cat"];

    
/* ******** FUNCTIONS ******** */

    // Function to create animal tag for each button that the user has clicked
    function displayAnimal() {
        //To clear the content if user has clicked another button
        $(".images").empty();
        // Assign name of the button clicked to a variable
        var animal = $(this).attr("data-name");
        var queryURL ="https://api.giphy.com/v1/stickers/search?api_key=LTquGShEHub3lUf37pLEapFEct8cTpcl&q="+animal+"&limit=10&offset=0&rating=G&lang=en";
        //console.log(queryURL);
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            //console.log (response);

            //Validation if there are no images for the selected button
            if (response.data[0]==null)
            {
                alert("Oops!, it seems that there are no gifs for this animal, please try a new one");
            }
            else if (response.data[0]!=null){
            //create image gif for each URL
                for (var i=0; i<10; i++){
                //var newP = $("<p>");
                var rating = response.data[i].rating;
                console.log(rating);
                //console.log(response.data[i].images.original.url);
                var imageUrl = response.data[i].images.original.url;
                // Creating and storing an image tag
                var animalImage = $("<img>");
                animalImage.attr("src", imageUrl);
                animalImage.attr("alt", "'"+animal+" image "+i+"'");
                animalImage.attr("height", 100);
                animalImage.attr("width", 100);
                animalImage.attr("data-still", response.data[i].images.original_still.url); //picture
                animalImage.attr("data-animate", response.data[i].images.original.url); //actual gif
                animalImage.attr("data-state", "still")
                animalImage.addClass("gif");
                $(".images").prepend("<p> Rating: "+rating+"</p>");
                $(".images").prepend(animalImage);
                
               
                
                //console.log( $(".images").prepend(animalImage));
                }
            }

            //To pause unpause gif once user clicks on the gif
            $(".gif").on("click", function() {
                //console.log("I was clicked"); 
                var state = $(this).attr("data-state");
                if (state=="still") {
                    var source = $(this).attr("data-animate");
                    $(this).attr("src", source);
                    state = $(this).attr("data-state", "animate");
                }
                else {
                    var source = $(this).attr("data-still");
                    console.log(source);
                    $(this).attr("src", source);
                    state = $(this).attr("data-state", "still");
                }
            });
        });
    }

  //Function to create buttons
  function createButtons() {
    // Deleting the buttons prior to adding new one
    $(".new_buttons").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {
        var buttonTag= $("<button>");
        buttonTag.addClass("animal");
        buttonTag.attr("data-name", animals[i]);
        buttonTag.text(animals[i]);
        var button = $(".new_buttons").append(buttonTag);
    }
  }


    // Function to create button once user has entered the new animal in the input field
    $("#submit").on("click", function(event) {
        event.preventDefault();

        // Variable to assign text entered
        var inputAnimal = $("#animal").val().trim();

        //Validation if animal is already added, popup message displays
        if (animals.indexOf(inputAnimal)!=-1) {
            alert ("Please add a new animal");
            $("#animal").val(""); //To clear the content of the input field.

        }
        else {
            animals.push(inputAnimal);
            $("#animal").val(""); //To clear the content of the input field.
            console.log(animals);
        }
        //create the new button
        createButtons();
    });

    
    

/* ******** CALLS ******** */
    $(document).on("click", ".animal", displayAnimal);
    createButtons();






