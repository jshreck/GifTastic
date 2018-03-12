$( document ).ready(function() {
var topics = ['happy', 'sad', 'angry', 'pensive', 'jealous', 'ashamed', 'bored', 'exhausted', 'goofy', 'flirty'];
var mostRecent;
createBtns();

//Create Buttons
function createBtns () {
    $('#buttons').empty();
for (i = 0; i < topics.length; i++) {
    $('#buttons').append('<button type="button" class="topic-button" data-topic="' + topics[i] + '">'+ topics[i] + '</button>');
}
}
//Displaying Gifs
$('#buttons').on('click', 'button', function () {
    topic = $(this).data('topic');
    $('#gifs').empty();
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?api_key=Y8Bck1AOQk4Tr7J1lvtzPxRBeJ8CovoS&limit=10&q=' + topic + '"',
        method: 'GET'
    }).then(function (response) {
            for (i = 0; i < 10; i++) {

                var imgStill = response.data[i].images.fixed_height_still.url;
                var imgAnimate = response.data[i].images.fixed_height.url;
                var gif = '<img class="gif" data-state="still" src="' + imgStill + '" data-still="' + imgStill + '" data-animate="' + imgAnimate + '">';
                var rating = '<div class="rating">' + response.data[i].rating + '</div>';
                $('#gifs').append('<div class="display">' + gif + rating + '</div>');
            }
    })
})
//Play/pause gifs
$('#gifs').on('click', 'img', function () {
    console.log(this);
    var state = $(this).data("state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", "animate");
    }
    else {
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", "still");
    }
})
// Add new button
$('#add').on('click', function (event) {
    event.preventDefault();
    if (($('#new-btn').val().trim()) === '') {
        return;
    }
    mostRecent = $('#new-btn').val().trim();
    topics.push(mostRecent);
    createBtns();
    $('#new-btn').val("");
    $('[data-topic=' + mostRecent + ']').click().focus();
})

//=========================================================
// createBtns();

});