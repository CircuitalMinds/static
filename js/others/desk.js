
function getStorageData ( id ) {
    var storageRequest = $.get( "/desktop/storage", {"q": id} );
    storageRequest.done( function( data ) {
        var response = data['response'];
        openWindow(response, id, "folder");
    });
};

function openStart () {
    var getStart = $.get("/index");
        getStart.done( function( data ) {
        openWindow(data, "Start", "windows");
    });
};

function openWindow ( content, title, icon_name ) {
    var data = ['class="p-2"', 'data-role="window"', 'data-draggable="true"',
                'data-title="Window"', 'data-btn-close="true"', 'data-btn-min="true"',
                'data-btn-max="true"', 'data-custom-buttons="customButtons"',
                'data-width=300', 'data-height=160'];
    var contentDiv = "<div ";
    for (var i=0; i < data.length; i++) {
        contentDiv += data[i] + " ";
    };
    contentDiv += ">" + content + "</div>";
    Desktop.createWindow({
        resizeable: true,
        draggable: true,
        width: "100%",
        height: "100%",
        icon: "<span class='mif-" + icon_name + " fg-teal'></span>",
        title: title,
        content: contentDiv,
        clsContent: "bg-dark fg-teal"
    });
};