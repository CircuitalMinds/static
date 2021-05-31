var stdIn;
var stdOut;

function runScript () {
    input_code = document.getElementById("input_code").value;
    stdIn = document.getElementById("std-in");
    stdOut = document.getElementById("std-out");
    var getOutput = $.get("/console_app", {"input_code": input_code});
    getOutput.done( function( data )  {
    	var rowIn = document.createElement('p');
    	var rowOut = document.createElement('p');
    	rowIn.innerHTML = data['std_in'];
    	rowOut.innerHTML = data['std_out'];
    	stdIn.appendChild(rowIn);
    	stdOut.appendChild(rowOut);
    });
};

function addToScript () {
    var textCode = document.getElementById('text-code');
    var codeLine = document.getElementById('input-code');
    codeLines = textCode.getElementsByTagName('p');
    codeLines[codeLines.length - 1].innerHTML = codeLine.value;
    var newLine = document.createElement('p');
    newLine.setAttribute('class', 'border bd-gray');
    textCode.appendChild(newLine);
};

function openConsoleApp () {
    var getTemplate = $.get( "/console_app", {"q": "template"} );
    getTemplate.done( function ( data ) {
        Apps.console_app.template = data['template'];
        var w = Desktop.createWindow({
            resizeable: true,
            draggable: true,
            customButtons: Apps.console_app.buttons,
            width: "100%",
            icon: "<span class='mif-" + Apps.console_app.icon + "'></span>",
            title: Apps.console_app.title,
            content: "<div class='p-2'>" + Apps.console_app.template + "</div>",
            clsContent: "bg-dark fg-teal"
        });
    });
};
