function config_searcher ( app ) {
    app.searcher.query = APP.GetData('query');
    app.searcher.result = APP.GetData('result');
    app.searcher.query_submit = $('input')[0];
    app.searcher.register = '';

    app.searcher.Template = function ( index, title, image ) {
        var strObj = '<li class="button card-content bg-darkTeal bg-dark-hover fg-light" '
                     + 'onclick=APP.set_video_from_list(INDEX); >'.replace("INDEX", index)
                     + '<img class="avatar" src="' + image + '">'
                     + '<span id="title" class="label">'+ title +'</span>'
                     + '<span class="second-label"> 1 min </span>'
                     + '</li>';
        return strObj;
    };

    app.searcher.get_matches = function ( query, targets ) {
	matches = [];
    	for ( target of targets ) {
    	    x = target.toLowerCase();    	    
    	    if ( x.match(query) != null ) {matches.push(target)};
    	};
    	return matches;
    };

    app.searcher.get_query = function ( q ) {
        default_image = app.static.images + "/desktop/julia.gif";
        if ( q != '' & q != undefined & q != null ) {
            query_result = '';
            q = q.toLowerCase()
            if ( app.videos[q[0]] != undefined ) {
                query_data = Object.keys(app.videos[q[0]]);
                filter_data = this.get_matches(q, query_data);
                if ( filter_data.length == 0 ) {
                    query_result += this.Template('search not found', default_image)
                } else {
                    for ( var i = 0; i < filter_data.length; i++ ) {
                        query_result += this.Template(i, filter_data[i], app.videos[q[0]][filter_data[i]].image)
                    };
                };
            } else {
                query_result += this.Template('search not found', default_image)
            };
            this.register = query_result;
        } else if ( q == '' ) {
            this.register = '';
        };
        this.SearchDisplay(this.register);
    };

    app.searcher.SearchDisplay = function ( data ) {
        if ( data == '' ) {
            this.result.setAttribute("class", "bg-white");
            this.result.innerHTML = '';
            this.result.style['display'] = 'none';
        } else {
            this.result.setAttribute("class", "bg-darkTeal fg-white");
            txt = '<ul class="feed-list bg-darkTeal fg-light"><li class="title"> Search Result </li>' + data + '</ul>';
            this.result.innerHTML = txt;
            this.result.style['display'] = 'block';
        }
    };

    app.searcher.query_submit.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            app.searcher.get_query(app.searcher.query.value);
        }
    });
};
