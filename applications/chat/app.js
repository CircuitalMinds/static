var Messages = {
     random: function (msg=[
        "Aprendiendo a Escuchar",
        "Todo es Mas Sencillo"
     ]) {
          return msg[Math.round( Math.random() * (msg.length - 1) )];
    },
    data: {received: [], sent: []}
};

function SendMessage ( message ) {
     Messages.data.received.push(message.text);
     var chat = $(this).data("chat");
     setTimeout(function(){
         var _m = {
             name: "CircuitalMinds",
             time: (new Date()),
             avatar: '{{ site.logo }}',
             text: Messages.random(),
             position: "left"
         };
         Messages.data.sent.push(_m.text);
         chat.add(_m);
     }, 1000 + Math.round(Math.random() * 2000));
 }