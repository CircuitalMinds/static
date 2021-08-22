function parseHTML( string_data, tag='' ) {
    var parsed_data = document.createElement('template');
    parsed_data.innerHTML = string_data;
    if ( tag != '' ) {
        return parsed_data.content.querySelectorAll(tag);
    } else {
        return parsed_data.content;
    }
};

var website = {
    url: "https://circuitalminds.github.io"
};
["static", "templates"].map( x => website[x] = website.url + "/" + x );


function CreateArray ( size, start, step ) {
    new_array = [];
    counter = start;
    while ( counter < start + size ) {
        new_array.push(counter);
        counter += step;
    };
    return new_array;
};

function SubLists ( array_data, n ) {
    sn = Math.ceil(array_data.length / n);
    arrays = CreateArray(sn, 0, 1).map(
        s => CreateArray(n, s * n, 1)
    );
    return arrays.map( arr => arr.map( x => array_data[x] ) );
};


function set_iframe ( data_src ) {
    iframe_str = '';
    obj = [
        '<iframe ', 'src="' + data_src + '" ',
        'height="100%" width="100%" class="image fit" frameborder="0" ',
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

function demoDragMoveEvent(el, pos){
    $('#-pos-x').text(pos.x);
    $('#-pos-y').text(pos.y);
}

function get_server_data (url_request, response_data={}) {  
  $.ajax({
        type: 'GET',
        url: url_request,
        dataType: 'json',
        success: function( request_data ) {
          for ( key in request_data ) {
            response_data[key] = request_data[key];
          };
      }
  });
  return response_data;
};

var Colors = {
    "0": "bg-white",
    "1": "bg-white",
    "2": "bg-white",
    "3": "bg-black fg-white",
    "4": "bg-white fg-dark",
    "5": "bg-dark fg-white",
    "6": "bg-light fg-dark",
    "7": "bg-grayWhite fg-dark",
    "8": "bg-grayMouse fg-white",
    "9": "bg-white",
    "10": "bg-lightLime fg-white",
    "11": "bg-lime fg-white",
    "12": "bg-darkLime fg-white",
    "13": "bg-lightGreen fg-white",
    "14": "bg-green fg-white",
    "15": "bg-darkGreen fg-white",
    "16": "bg-lightEmerald fg-white",
    "17": "bg-emerald fg-white",
    "18": "bg-darkEmerald fg-white",
    "19": "bg-lightBlue fg-white",
    "20": "bg-blue fg-white",
    "21": "bg-darkBlue fg-white",
    "22": "bg-lightTeal fg-white",
    "23": "bg-teal fg-white",
    "24": "bg-darkTeal fg-white",
    "25": "bg-lightCyan fg-white",
    "26": "bg-cyan fg-white",
    "27": "bg-darkCyan fg-white",
    "28": "bg-lightCobalt fg-white",
    "29": "bg-cobalt fg-white",
    "30": "bg-darkCobalt fg-white",
    "31": "bg-lightIndigo fg-white",
    "32": "bg-indigo fg-white",
    "33": "bg-darkIndigo fg-white",
    "34": "bg-lightViolet fg-white",
    "35": "bg-violet fg-white",
    "36": "bg-darkViolet fg-white",
    "37": "bg-lightPink fg-white",
    "38": "bg-pink fg-white",
    "39": "bg-darkPink fg-white",
    "40": "bg-lightMagenta fg-white",
    "41": "bg-magenta fg-white",
    "42": "bg-darkMagenta fg-white",
    "43": "bg-lightCrimson fg-white",
    "44": "bg-crimson fg-white",
    "45": "bg-darkCrimson fg-white",
    "46": "bg-lightRed fg-white",
    "47": "bg-red fg-white",
    "48": "bg-darkRed fg-white",
    "49": "bg-lightOrange fg-white",
    "50": "bg-orange fg-white",
    "51": "bg-darkOrange fg-white",
    "52": "bg-lightAmber fg-white",
    "53": "bg-amber fg-white",
    "54": "bg-darkAmber fg-white",
    "55": "bg-lightYellow fg-white",
    "56": "bg-yellow fg-white",
    "57": "bg-darkYellow fg-white",
    "58": "bg-lightBrown fg-white",
    "59": "bg-brown fg-white",
    "60": "bg-darkBrown fg-white",
    "61": "bg-lightOlive fg-white",
    "62": "bg-olive fg-white",
    "63": "bg-darkOlive fg-white",
    "64": "bg-lightSteel fg-white",
    "65": "bg-steel fg-white",
    "66": "bg-darkSteel fg-white",
    "67": "bg-lightMauve fg-white",
    "68": "bg-mauve fg-white",
    "69": "bg-darkMauve fg-white",
    "70": "bg-lightTaupe fg-white",
    "71": "bg-taupe fg-white",
    "72": "bg-darkTaupe fg-white",
    "73": "bg-lightLime fg-white",
    "74": "bg-lime fg-white",
    "75": "bg-darkLime fg-white",
    "76": "bg-lightGray fg-white",
    "77": "bg-gray fg-white",
    "78": "bg-darkGray fg-white",
    "79": "bg-lightGrayBlue fg-white",
    "80": "bg-grayBlue fg-white",
    "81": "bg-darkGrayBlue fg-white"
};

function GetColor ( w ) {
    if ( typeof(w) == 'string' ) {
        return Object.values(Colors).filter(
            c => c.toLowerCase().match(w.toLowerCase()) != null
        )
    } else if ( typeof(w) == 'number' ) {
        return Colors[w]
    }
};

function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
};

function SetImageView ( static_path ) {
    function OnMouse( cover ) {
        return function () { showImage(cover) }
    };
    function OnClick( cover ) {
        return function () { showImage(cover) }
    };
	Img = $("div.img");
    Object.keys(Img).map(
    	k => Img[k].onclick = function () {
            name = this.style['background-image'].split('(\"')[1].split('\")')[0].split('/').reverse()[0];
            showImage(static_path + '/images/blog/posts/' + name)
        }
    );
   	Divs = $('div[data-role="tile"]');
   	Links = $('a[data-role="tile"]');
  	for ( x of [Divs, Links] ) {
  	    y = Object.values(x).filter( c => c.dataset != undefined ).filter( ci => ci.dataset.cover != undefined );
		for ( w of y ) {
		    if ( w.href != '' ) {
		        w.onmouseover = OnMouse(w.dataset.cover);
		    } else {
		        w.onclick = OnClick(w.dataset.cover);
		    };
		};
    };
};

function IterArray ( data, start, end ) {
  iter_data = [];
  for ( var i = start; i < end; i++ ) {
    iter_data.push(data[i]);
  };
  return iter_data;
};

function randomPointOnCircle(radius) {
  angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
};


function Timer() {
  init_timer = setInterval( function () {  
      obj = $('#timer')[0];
      datetime = new Date();
      obj.innerHTML = datetime.toLocaleTimeString();  
  }, 1000);
};

window.onload = function () {
    if ( $('#timer')[0] != undefined ) {
        Timer();
    };
};
