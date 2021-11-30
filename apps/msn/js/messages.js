var Msn = new Object();
Msn.logo = "https://avatars.githubusercontent.com/u/75770878?s=400&u=85be0810ccfb5f56a393f71cf971021f087c5a59&v=4";
Msn.Data = {
    received: [], sent: []
};
Msn.Append = function ( msg ) {
    Object.keys(msg).map( x => this.Data[x].push( msg[x] ) );
};
Msn.timer = function () {
    return 1000 + Math.round(Math.random() * 2000);
};
Msn.randomMessage = function () {
    var msgs = [
        "Aprendiendo a Escuchar",
        "Todo es Mas Sencillo"
    ];
    return msgs[Math.round( Math.random() * (msgs.length - 1) )];
};

function sendMessage ( data ) {
    msg = {"received": data.text, "sent": Msn.randomMessage()};
    var chat = $(this).data("chat");
    setTimeout(function(){
         var _m = {
             name: "CircuitalMinds",
             time: (new Date()),
             avatar: Msn.logo,
             text: msg.sent,
             position: "left"
         };
         chat.add(_m);
     }, Msn.timer());
};
