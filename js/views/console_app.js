var stdIn;
var stdOut;

var console_app = {
    template: {
        title: 'Console App',
        buttons: [],
        icon: 'windows',
        content: ''
    }
};

function getConsoleApp () {
    console_app.template.buttons = getStorageButtons();
    git_location = 'https://raw.githubusercontent.com/CircuitalMinds/templates/main/applications/console_app.html';
    var getTemplate = $.get( git_location );
    getTemplate.done( function( data ) {
        console_app.template.content = data;
    });
};

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

getConsoleApp();

console_app.open_window = function () {
   openApp(console_app);
}
