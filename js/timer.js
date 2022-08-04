function createSocket ( id ) {
  	var socket = {
      	id: id,
      	connected: true,
      	task: null,
      	connect: function () { this.connected = true },
      	disconnect: function () { this.connected = false }
    };

  	socket.do_task = function () {
        console.log( id );
    };

  	socket.init = function () {
    		socket.task = setInterval( function () {
          if ( socket.connected ) {
            socket.do();
          } else {
            clearInterval( socket.task );
            console.log( "socket " + id + " disconnected" );
          };
    		}, 1e3 );
    };

    return socket;
};