function Dict ( data ) {
    let Obj = new Object();
    if ( data != undefined ) {
        Obj.data = data;
    } else {
        Obj.data = {};
    };
    Obj.keys = function () {
        return Object.keys(this.data);
    };
    Obj.values = function () {
        return Object.values(this.data);
    };
    Obj.get = function ( key ) {
        return this.data[key];
    };
    Obj.setattr = function ( key, value ) {
        this.data[key] = value;
    };
    Obj.len = function () {
        return Object.keys(this.data).length;
    };
    Obj.items = function () {
        return Object.entries(this.data);
    };
    Obj.pop = function ( key ) {
        delete this.data[key];
    };
    return Obj;
};

let urlObj = new Object();
urlObj.Host = "https://circuitalminds.github.io";
urlObj.get = function ( Paths ) {
    Url = [this.Host];
    Paths.map( x => Url.push(x) );
    return Url.join("/");
};

let requestObj = new Object();
requestObj.get = function ( urlData, handlerData ) {
    $.getJSON(
        urlData, function ( data ) {
            setTimeout( function () {handlerData( data )}, 200 );
        }
    );
};
requestObj.post = function ( urlData, Data, handlerData ) {
    $.post(
        urlData, Data, function ( data ) {
            setTimeout( function () {handlerData( data )}, 200 );
        }
    );
};


function fullScroll() {
		window.scrollTo(0, this.scrollMaxY);
};

function get_data ( obj ) {
		url = obj.href.split("&")[0];
		video_id = url.split("/watch?v=")[1];
		title = obj.textContent.replaceAll("\n", "").split(" ").filter(
				s => [""].indexOf(s) == -1
		).join(" ");
		return {
				"url": url,
				"video_id": video_id,
				"title": title
		};
};

fullScroll()
Object.values(
	document.querySelectorAll('a[id="video-title"]')
).map( ai => get_data(ai) )

var Git = {
    "url": "https://github.com",
    "open_location": function ( url, root=this.url ) {
      	window.location = root + url;
    },
  	"create_repo": function ( name ) {
      	[r_name, r_desc, r_public, r_readme] = [
    				"name", "description", "visibility_public", "auto_init"
    		].map(
            e => document.querySelector(`#repository_${e}`)
        );
        [r_name.value, r_desc.value, r_public.checked, r_readme.checked] = [
          name, name, "checked", "checked"
        ];
        btn = document.querySelector('button.btn-primary');
        if ( btn.textContent.match("Create repository") != null ) {
          	btn.disabled = false;
            btn.click()
        };
    }
};

var names = [
    'music_a', 'music_b', 'music_c', 'music_d',
    'music_e', 'music_f', 'music_g', 'music_h',
    'music_i', 'music_j', 'music_k', 'music_l',
    'music_m', 'music_n', 'music_o', 'music_p',
    'music_q', 'music_r', 'music_s', 'music_t',
    'music_u', 'music_v', 'music_w', 'music_x',
    'music_y', 'music_z'
];
var step = 2;
var c = 13;
var repo_name = names[c] + 2;
if ( step == 1 ) {
		Git.open_location("/new");
} else if ( step == 2 ) {
  	Git.create_repo(repo_name);
};
