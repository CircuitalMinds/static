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

let ElementObj = new Object();
ElementObj.byId = function ( Id ) {
    var Y = new Object();
    Y.Obj = $("#" + Id)[0];
    Y.setDisplay = function ( opt ) {
        ( opt == "block" ) ? this.Obj.style.display = "block" : this.Obj.style.display = "none";
    };
    Y.getDimensions = function () {
        return {
            width: this.Obj.clientWidth, height: this.Obj.clientHeight
        };
    };
    Y.setDimensions = function ( w, h ) {
        this.Obj.style.width = w + 'px';
        this.Obj.style.height = h + 'px';
    };
    Y.getPosition = function () {
        Rect = {};
        Coord = this.Obj.getBoundingClientRect();
        ["top", "bottom", "left", "right"].map( x => Rect[x] = Coord[x] );
        return Rect;
    };
    return Y;
};
ElementObj.getMeta = function ( attrName, Content ) {
    return $("meta[" + attrName + "=" + Content + "]")[0];
};
ElementObj.setMeta = function ( attrName, Content, newContent ) {
    metaObj = this.getMeta( attrName, Content );
    metaObj.content = newContent;
};

ElementObj.setModal = function ( Id, btnId, Content ) {
    modal = $("#" + Id)[0];
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
            <span class="close">&times;</span>
                ${Content.header}
            </div>
            <div class="modal-body">${Content.body}</div>
            <div class="modal-footer">${Content.footer}</div>
        </div>`;
    $("#" + btnId)[0].onclick = function() {
        modal.style.display = "block";
    };
    modal.querySelector('span').onclick = function() {
        modal.style.display = "none";
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        };
    };
};
ElementObj.setAccordion = function ( Id, Content ) {
    accordion = $("#" + Id)[0];
    accordion.innerHTML = `
        <div class="accordion accordion-flush" id="${Id}">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading-${Id}">
            <button class="accordion-button collapsed bg-darklight fg-teal ontouch"
                    type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${Id}"
                    aria-expanded="false" aria-controls="flush-collapse-${Id}">
                ${Content.header}
            </button>
            </h2>
            <div id="flush-collapse-${Id}" class="accordion-collapse collapse bg-darklight"
                 aria-labelledby="flush-heading-${Id}" data-bs-parent="#${Id}">
            <div class="accordion-body">
                ${Content.body}
            </div>
            </div>
        </div>
        </div>`;
};
ElementObj.setIframe = function ( Id, Url, W='100%', H='300px' ) {
    $("#" + Id)[0].innerHTML = `
        <iframe src="${Url}" class="image fit" width="${W}" height="${H}"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;
            picture-in-picture" allowfullscreen="true" frameborder="0">
        </iframe>`;
};
ElementObj.setClock = function ( Id="clock" ) {
    var clockObj = $("#" + Id)[0];
    if ( clockObj != undefined ) {
        setInterval( function () {
            time = new Date();
            clockObj.innerHTML = time.toLocaleTimeString();
        }, 1000);
    };
};
ElementObj.setDate = function ( Id="date" ) {
    var dateObj = $("#" + Id)[0];
    if ( dateObj != undefined ) {
        setInterval( function () {
            date = new Date();
            dateObj.innerHTML = date.toLocaleDateString();
        }, 1000);
    };
};

let Colors = new Object();
Colors.getGradient = function ( Reverse=false ) {
    Data = ( Reverse ) ? this.Palette.reverse() : this.Palette;
    gradient = "background-image: linear-gradient(60deg";
    dx = Math.round(100 / Data.length);
    Data.forEach(
        function( e, i ) { gradient += ", " + e + " " + i * dx + "%" }
    );
    gradient += ", #1abc9c 100%); background-size: cover;";
    return gradient;
};
Colors.byName = {};
Colors.Special = {};
Colors.Palette = [];
