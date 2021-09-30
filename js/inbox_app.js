var inbox_app = {
    template: {
        title: 'Inbox App',
        buttons: [],
        icon: 'windows',
        content: ''
    }
};

function getInboxApp () {
    inbox_app.template.buttons = getStorageButtons();
    git_location = 'https://raw.githubusercontent.com/CircuitalMinds/templates/main/applications/inbox_app.html';
    var getTemplate = $.get( git_location );
    getTemplate.done( function( data ) {
        inbox_app.template.content = data;
    });
};

getInboxApp();

inbox_app.open_window = function () {
   openApp(inbox_app);
}
