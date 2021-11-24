var X = new Object();
X.Data = {};
X.getGeolocation = function() {
    X.Data["geolocation"] = {};
    if ( navigator.geolocation ) {
        navigator.geolocation.watchPosition(
            function ( position ) {
                ["latitude", "longitude"].map(
                    k => X.Data["geolocation"][k] = position.coords[k]
                );
            }
        );
    };
};
X.DivObj = function ( ID ) {
    var Y = new Object();
    Y.Div = $("#" + ID)[0];
    Y.setDisplay = function ( opt ) {
        ( opt == "block" ) ? Y.Div.style.display = "block" : Y.Div.style.display = "none";
    };
    Y.getDimensions = function () {
        var D = {width: Y.Div.clientWidth, height: Y.Div.clientHeight};
        Object.values(Y.Div.children).map(
            y => ["width", "height"].map( c => y.style[c] = D[c] + 'px' )
        );
        return D;
    };
    Y.setDimensions = function ( w, h ) {
        Y.Div.style.width = w + 'px';
        Y.Div.style.height = h + 'px';
        Y.getDimensions();
    };
    Y.getPosition = function () {
        var Rect = {};
        var Coord = Y.Div.getBoundingClientRect();
        ["top", "bottom", "left", "right"].map( x => Rect[x] = Coord[x] );
        return Rect;
    };
    Y.getDimensions();
    return Y;
};

X.setMeta = function ( selector, content ) {
    meta = $(`meta[${selector}]`)[0];
    if ( meta != undefined ) {
        meta.content = content;
    };
};

X.setDate = function ( ID ) {
    Obj = $("#" + ID)[0];
    if ( Obj != undefined ) {
        date = new Date();
        Obj.innerHTML = date.toLocaleDateString();
    };
};
X.setClock = function ( ID ) {
    Obj = $("#" + ID)[0];
    if ( Obj != undefined ) {
        setInterval( function () {
            date = new Date();
            Obj.innerHTML = date.toLocaleTimeString();
        }, 10 ** 3);
    };
};
X.getRequest = function ( Url ) {
    X.Data["response"] = {};
    $.get(Url).done(function (data) {
        console.log(data);
        X.Data["response"] = data;
    });
};

var jklSearch = {
    templates: {
        site: {
            jsonfile: '/search.json',
            search: {
                input: "js-search-input", container: "js-results-container"
            },
            results: '<li class="search-item"><a class="search-link" href="{url}">{title}</a></li>',
            no_results: '<li class="search-no-item">No results found</li>'
        },
        videos: {
            jsonfile: "/query/videos.json",
            search: {
                input: "query", container: "jkl-results"
            },
            results: `<li class="button card-content bg-darkTeal bg-dark-hover fg-light"
                          onclick="$('#video-player')[0].dataset.videoSelected = '{index}'; OnEvent('video-selected');" >
                          <img class="avatar" src="{image}">
                          <span class="label">{title}</span>
                          <span class="second-label">{duration}</span>
                      </li>`,
            no_results: '<li class="button card-content bg-darkTeal bg-dark-hover fg-light"> Video Not Found </li>',
        }
    }
};
jklSearch.render_template = function ( name ) {
    SimpleJekyllSearch({
        searchInput: $(this.templates[name].search.input)[0],
        resultsContainer: $(this.templates[name].search.container)[0],
        json: this.templates[name].jsonfile,
        searchResultTemplate: this.templates[name].results,
        noResultsText: this.templates[name].no_results
    });
};


function set_modal ( button_id, modal_id, content ) {
    modal = $(`#${modal_id}`)[0];
    modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
        <span class="close">&times;</span>
            ${content.header}
        </div>
        <div class="modal-body">${content.body}</div>
        <div class="modal-footer">${content.footer}</div>
    </div>`;
    close = modal.querySelector('span');
    modal_button =  $(`#${button_id}`)[0];;
    modal_button.onclick = function() {
        modal.style.display = "block";
    };
    close.onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};
function set_accordion ( id, content ) {
    accordion = $(`#${id}`)[0];
    accordion.innerHTML = `
    <div class="accordion accordion-flush" id="${id}">
    <div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading-${id}">
        <button class="accordion-button collapsed bg-darklight fg-teal ontouch"
                type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${id}"
                aria-expanded="false" aria-controls="flush-collapse-${id}">
            ${content.header}
        </button>
        </h2>
        <div id="flush-collapse-${id}" class="accordion-collapse collapse bg-darklight"
             aria-labelledby="flush-heading-${id}" data-bs-parent="#${id}">
        <div class="accordion-body">
            ${content.body}
        </div>
        </div>
    </div>
    </div>`;
};

function set_iframe ( id, url, w='100%', h='300px' ) {
    $(`#${id}`)[0].innerHTML = `<iframe src="${url}" class="image fit" width="${w}" height="${h}"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture" allowfullscreen="true" frameborder="0">
    </iframe>`;
};

X.Git = function ( data='', repo='' ) {
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