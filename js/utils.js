function New ( ObjName, Data ) {
    return {
        array: function () {
            let Obj = new Array(Data.length);
            Data.forEach(
                function ( element, index ) {
                        Obj[index] = element;
                }
            );
            return Obj;
        },
        object: function ( Data ) {
            let Obj = new Object();
            Data.map( x => Obj[x] = {} );
            return Obj;
        }
    }[ObjName]();
};

var Colors = {
    "byName": {
        "amazon": "#232f3e",
        "amber": "#f0a30a",
        "black": "#000000",
        "blue": "#00AFF0",
        "bootstrap": "#563d7c",
        "brandColor1": "#2ac4f4",
        "brandColor2": "#004d6f",
        "brown": "#825a2c",
        "cobalt": "#0050ef",
        "crimson": "#a20025",
        "cyan": "#1ba1e2",
        "dark": "#1d1d1d",
        "darkAmber": "#a77107",
        "darkBlue": "#0077a3",
        "darkBrown": "#493219",
        "darkCobalt": "#0036a3",
        "darkCrimson": "#560014",
        "darkCyan": "#13709e",
        "darkEmerald": "#003d00",
        "darkGray": "#989898",
        "darkGrayBlue": "#41545e",
        "darkGreen": "#3a660e",
        "darkIndigo": "#4a00b3",
        "darkLime": "#647800",
        "darklight": "#2C2F36",
        "darkMagenta": "#8c004a",
        "darkMauve": "#4f415d",
        "darkOlive": "#4a5b43",
        "darkOrange": "#ae4800",
        "darkPink": "#ba2588",
        "darkRed": "#8f251f",
        "darkSteel": "#43505b",
        "darkTaupe": "#574e32",
        "darkTeal": "#005e5d",
        "darkViolet": "#7700b3",
        "darkYellow": "#b3a800",
        "emerald": "#008a00",
        "facebook": "#4267b2",
        "github": "#24292e",
        "gitlab": "#e65328",
        "gray": "#bebebe",
        "grayBlue": "#607d8b",
        "grayMouse": "#455a64",
        "grayWhite": "#f5f5f5",
        "green": "#60a917",
        "indigo": "#6a00ff",
        "light": "#f8f8f8",
        "lightAmber": "#f8bf4f",
        "lightBlue": "#3ecbff",
        "lightBrown": "#bb823f",
        "lightCobalt": "#3d7eff",
        "lightCrimson": "#ef0036",
        "lightCyan": "#5ebdec",
        "lightEmerald": "#00d600",
        "lightGray": "#e4e4e4",
        "lightGrayBlue": "#8aa2ae",
        "lightGreen": "#86e22a",
        "lightIndigo": "#974dff",
        "lightLime": "#d8ff12",
        "lightMagenta": "#ff2599",
        "lightMauve": "#9c89ad",
        "lightOlive": "#95ab8d",
        "lightOrange": "#ff9447",
        "lightPink": "#e98fcb",
        "lightRed": "#df6e68",
        "lightSteel": "#8d9cab",
        "lightTaupe": "#aea073",
        "lightTeal": "#00f7f5",
        "lightViolet": "#c44dff",
        "lightYellow": "#fff44d",
        "lime": "#a4c400",
        "magenta": "#d80073",
        "mauve": "#76608a",
        "olive": "#6d8764",
        "orange": "#fa6800",
        "pink": "#dc4fad",
        "red": "#CE352C",
        "steel": "#647687",
        "taupe": "#87794e",
        "teal": "#1abc9c",
        "twitter": "#1DA1F2",
        "violet": "#aa00ff",
        "white": "#ffffff",
        "yellow": "#fff000"
    },
    "special": {"complement": "#820e23", "low": "#f3dc9a","medium": "#9e0843","strong": "#005e5d"},
    "pallete": [
        "#040404","#d71839","#9e0843","#3469a2",
        "#69c1a4","#f3dc9a","#61122f","#0b2e4d",
        "#1d4b60","#2d050c","#820e23"
    ],
    "setBackground": ( data ) => `background-color: ${data}`,
    "setGradient": function ( data ) {
        grad = "background-image: linear-gradient(60deg";
        l = Math["round"](100 / data.length);
        data.forEach( function( element, index ) { grad += `, ${element} ${(l + 1) * index}%` } );
        grad += "); background-size: cover;"
        return grad;
    }
};
