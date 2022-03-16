function Print ( data ) {
    console.log(
        JSON.stringify( data )
    );
};
function isType ( x, name ) {
    var Type = typeof(x);
    return {
        "function": Type == "function",
        "object": Type == "object" && x.length == undefined,
        "array": x.length != undefined,
        "number": Type == "number",
        "string": Type == "string"
    }[name];
};
function Keys ( x ) {
    return Object.keys( x );
};
function Values ( x ) {
    return Object.values( x );
};
function Items ( x ) {
    return Object.entries( x );
};
function MapKeys ( x, f ) {
    return Keys( x ).map( f );
};
function MapValues ( x, f ) {
    return Values( x ).map( f );
};
function MapItems ( x, f ) {
    return Items( x ).map( f );
};
function MapList ( x, f ) {
    return x.map( f );
};
function FilterList ( x, f ) {
    return x.filter( f );
};
function Merge ( x, y ) {
    if ( isType( x, "object" ) && isType( y, "object" ) ) {
        var xy = { ...x, ...y };
        return xy;
    } else if ( isType( x, "array" ) && isType( y, "array" ) ) {
        var xy = [ ...x, ...y ];
        return xy.sort();
    };
};
function getDate () {
    var y = new Date();
    return {
        sec: y.getSeconds(),
        min: y.getMinutes(),
        hr: y.getHours()
    };
};

