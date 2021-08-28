var website = {
    url: "https://circuitalminds.github.io"
};
["static", "templates"].map( x => website[x] = website.url + "/" + x );



function set_iframe ( data_src ) {
    iframe_str = '';
    obj = [
        '<iframe ', 'src="' + data_src + '" ', 
        'height="400px" width="100%" class="image fit" frameborder="0" ',
        'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=true',
        '></iframe>'
    ].map( s => iframe_str += s);
    return iframe_str;
};

function set_image ( data_src ) {
    image_str = '';
    obj = [
        '<img ', 'src="' + data_src + '" ',
        'class="container reveal-in" style="width : 100%; border: 1px solid #1abc9c;" >'
    ].map( s => image_str += s);
    return image_str;
};

function add_listener ( ) {
    var doc = document;
    for ( n in doc ) {
      if ( typeof( doc[n] ) == 'object' ) {
        doc[n].addEventListener("mousedown", console.log);    
    };
  };
};


function select_object( tag, attr='', value='' ) { 
    if ( attr == '' ) {
        return document.querySelectorAll(tag);
    } else if ( value == '' ) {
        return document.querySelectorAll(
            tag + "[" + attr + "]"
        );
    } else {
        return document.querySelector(
            tag + "[" + attr + "='" + value + "']"
        );
    }
}
function object_size ( obj ) {
    return [
      obj.clientWidth, obj.clientHeight
    ];
};

function object_resize ( obj, w, h ) {
    obj.style.width = w + 'px';
    obj.style.height = h + 'px';
}

function object_boundary ( obj ) {
    var rect = obj.getBoundingClientRect();
    return {
      top: rect.top,  bottom: rect.bottom,
      left: rect.left, right: rect.right
    };
};

function get_location ( obj ) {
    var options = {
      	enableHighAccuracy: true,
      	timeout: 5000,
        maximumAge: 0
    };
    function success( position ) {
        var data = position.coords;
        obj.latitude = data.latitude;
        obj.longitude = data.longitude;
        obj.accuracy = data.accuracy;
    };
    function error( err ) {
      	console.warn(
            'ERROR(' + err.code + '): ' + err.message
        );
    };
    navigator.geolocation.getCurrentPosition(
        success, error, options
    );
};


function get_server_data (url_request, response_data={}) {  
  $.ajax({
        type: 'GET',
        url: url_request,
        success: function( request_data ) {
          for ( key in request_data ) {
            response_data[key] = request_data[key];
          };
      }
  });
  return response_data;
};

function demoDragMoveEvent(el, pos){
    $('#-pos-x').text(pos.x);
    $('#-pos-y').text(pos.y);
}
