var Random = Math.random;
var Round = Math.round;

function RandomElement ( array_data ) {    
    return array_data[
        Round( Random() * (array_data.length - 1) )
    ];
};

var messages = [
    "Aprendiendo a Escuchar",
    "Todo es Mas Sencillo"
];

function SendMessage ( message ){
    var chat = $(this).data("chat");
    setTimeout(function(){
        var _m = {
            name: "CircuitalMinds",
            time: (new Date()),
            avatar: static_folder + '/images/circuitalminds.jpg',
            text: RandomElement(messages),
            position: "left"
        };
       chat.add(_m);
    }, 1000 + Round(Random() * 2000));
}
