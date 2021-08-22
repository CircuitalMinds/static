var chat_app = {
    template: {
        title: 'Chat App',
        buttons: [],
        icon: 'windows',
        content: ''
    }
};

function getChatApp () {
    chat_app.template.buttons = getStorageButtons();
    git_location = 'https://raw.githubusercontent.com/CircuitalMinds/templates/main/applications/chat_app.html';
    var getTemplate = $.get( git_location );
    getTemplate.done( function( data ) {
        chat_app.template.content = data;
    });
};

getChatApp();

chat_app.open_window = function () {
   openApp(chat_app);
}
