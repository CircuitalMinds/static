var stdIn;
var stdOut;

function runScript () {
    var input_code = document.getElementById('input-code').value;
    stdIn = document.getElementById("std-in");
    stdOut = document.getElementById("std-out");
    var getOutput = $.get( storage_app.url + "/console_app", {"input_code": input_code});
    getOutput.done( function( data )  {
    	var rowIn = document.createElement('p');
    	var rowOut = document.createElement('p');
    	rowIn.innerHTML = data['std_in'];
    	rowOut.innerHTML = data['std_out'];
    	stdIn.appendChild(rowIn);
    	stdOut.appendChild(rowOut);
    });
};

