function response_data( data={} ) {
    return data;
};
function request_data( data={} ) {
    return data;
};


function get_tag ( name, attr_name='', attr_value='' ) {
    if ( attr_name == '' & attr_value == '' ) {
        return $(name);
    } else if ( attr_value == '' ) {
        return $(name + '[' + attr_name + ']');
    } else {
        obj_data = $(name + '[' + attr_name + '="' + attr_value + '"]');
        if ( obj_data.length == 1 ) {
            return obj_data[0];
        } else {
            return obj_data;
        };
    };
};

function set_metadata ( attr_name, attr_value, content_value ) {
    obj = get_tag('meta', attr_name, attr_value)
    obj.setAttribute('content', content_value);
};

function filter_object ( data, target='all' ) {
    if ( target == 'all' ) {
        return Object.values(data);
    } else if ( data.length != undefined ) {
  		return data.filter( e=> e == target );
    } else {
        return Object.keys(data).map( e=> data[e][target] );
    }
}

function create_object ( dict_data={} ) {
    obj = {};
    if ( dict_data == {} ) {
        return obj;
    } else {
        Object.keys(dict_data).map( k => obj[k] = dict_data[k] );
        return obj;
    };
};

function create_array ( size, start=0, step=1 ) {
    new_array = [];
    counter = start;
    while ( counter < start + size ) {
        new_array.push(counter);
        counter += step;
    };
    return new_array;
};

function partitions ( array_data, n ) {
    sn = Math.ceil(array_data.length / n);
    arrays = create_array(sn).map(
        s => create_array(n, s * n, 1)
    );
    return arrays.map( arr => arr.map( x => array_data[x] ) );
};

function iter_array ( data, start, end ) {
  iter_data = [];
  for ( var i = start; i < end; i++ ) {
       if ( i == data.length ) {
           break;
       } else {
           iter_data.push(data[i]);
       };
  };
  return iter_data;
};

function get_filename ( url ) {
    name = url.split('/').reverse()[0];
    return {
        filename: name,
        datatype: name.split('.')[1]
    };
};

function get_request ( url, type='GET' ) {
   	response = response_data();
   	datatype = get_filename(url).datatype;
   	$.ajax({
       	type: type,
       	url: url,
       	dataType: datatype,
       	success: function( data ) {
           	if ( datatype == 'json' ) {
            	Object.keys(data).map( k => response[k] = data[k] );
           	} else {
               	response['data'] = data;
          	}
       	}
    });
    return response;
}

function create_template ( data, selector='' ) {
    doc = document.createElement('template');
    doc.innerHTML = data;
    content = doc.content;
    if ( selector == '' ) {
        return content;
    } else {
        return content.querySelectorAll(selector);
    }
};

function set_iframe ( data_src ) {
    attrs = {
        "src": data_src, "height": '100%', "width": '100%', "class": 'image fit',
        "frameborder": '0',
        "allow": 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
        "allowfullscreen": 'true'
    };
    return "<iframe "
        + Object.keys(attrs).map( k=> k + '="' + attrs[k] + '"').join(' ')
        + "></iframe>";
};

function set_image ( data_src ) {
    attrs = {
        "src": data_src,
        "class": 'container reveal-in',
        "style": 'width : 100%; border: 1px solid #1abc9c;'
    };
    return '<img ' + Object.keys(attrs).map( k=> k + '="' + attrs[k] + '"').join(' ') + '>';
};

function add_listener ( ) {
    var obj = document;
    for ( n in obj ) {
        if ( typeof( obj[n] ) == 'object' ) {
            obj[n].addEventListener("mousedown", function (event) {
                console.log(obj[n]);
            });
        }
    };
};

function Git ( data='', repo='' ) {
    g = {
        url: "https://api.github.com",
        user: "circuitalminds"
    };
    response = response_data();
    function get_data (q) {
        $.get(q, function ( data ) { response['data'] = data } );
    };
    if ( data == '' & repo == '' ) {
        get_data([g.url, "users", g.user, "repos"].join('/'));
    } else if ( data == 'repos' & repo != '' ) {
        get_data([g.url, data, g.user, repo].join('/'));
    };
    return response;
};

var location_data = {};
function get_location () {
    var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
    };
    function success( position ) {
        var data = position.coords;
        ['latitude', 'longitude', 'accuracy'].map( k=> location_data[k] = data[k] );
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

function init_app () {
    url = 'https://circuitalminds.github.io';
    function app_scheme ( data ) {
        this.url = url;
        this.data = get_request(this.url + '/search.json');
        app_scheme.prototype.get = function ( query ) {
            result = filter_object(this.data, query);
            if ( result.length != 0 ) {
                return result;
            } else {
                return 'data not found';
            };
        };
    };
    class create_app extends app_scheme {
        get (q) {
            return super.get(q);
        };
    };
    app = new create_app();
    return app;
};

