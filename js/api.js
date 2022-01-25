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