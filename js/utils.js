function print ( data ) {
    console.log(
        JSON.stringify( data )
    );
};
let Http = {};
Http.get = function ( Url, Handler=Print ) {
    $.getJSON(
        Url, (data) => setTimeout( () => Handler(data), 200 )
    );
};
Http.post = function ( Url, Data, Handler=Print ) {
    $.post(
        Url, Data, (data) => setTimeout( () => Handler(data), 200 )
    );
};

function getVideoSearch ( videolist ) {
    SimpleJekyllSearch({
        searchInput: $( "#query" )[0],
        resultsContainer: $( "#jkl-results" )[0],
        json: videolist,
        searchResultTemplate: `<li id='{index}' class='button card-content bg-darkTeal bg-dark-hover fg-light'>
            <img id='{index}-image' class='avatar' src='{image}'>
            <span id='{index}-title' class='label'>{title}</span>
            <span id='{index}-duration' class='second-label'>{duration}</span>
        </li>`,
        noResultsText: "<li class='button card-content bg-darkTeal bg-dark-hover fg-light'>Video Not Found</li>"
    });
};

function alphabet ( from_letter, to_letter ) {

  var letters = "abcdefghijklmnopqrstuvwxyz";

  if ( from_letter == undefined && to_letter == undefined ) {

  	return letters.split("");

  } else if ( from_letter != undefined && to_letter == undefined ) {

    return letters[from_letter];

  } else {

    return letters.split("").slice( from_letter, to_letter );

	};

};
