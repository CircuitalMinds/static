var storage_app = {
    url: '',
    directories: {},
    extensions: ['.mp4', '.png', '.jpg', '.jpeg', '.gif', '.py', '.json', '.js', '.html'],
    template: {}
};

function getObjTemplate () {
    return {
            title: '',
            content: '',
            buttons: [],
            icon: "windows"
        }
}

function getStorageButtons () {
    var settings = {
        "rocket": 'alert("You press rocket button")',
        "user": 'alert("You press user button")',
        "cog": 'alert("You press cog button")'
    };
    buttons = [];
    button_ids = Object.keys(settings).reverse();
    for (var i = 0; i < button_ids.length; i++) {
        var button = {};
        button.html = '<span id="' + button_ids[i] + '" class="mif-' + button_ids[i] + '"></span>';
        button.onclick = settings[button_ids[i]];
        buttons.push(button);
    };
    return buttons;
};

function getStorageData ( to_file ) {
    var getFile = $.get( storage_app.url + '/' + to_file );
};
function openPythonFile ( file_data ) {
    getStorageData(file_data);
};
function openTextFile ( file_data ) {
    getStorageData(file_data);
};
function openImageFile ( file_data ) {
    getStorageData(file_data);
};
function openVideoFile ( file_data ) {
    getStorageData(file_data);
};

function getFileData ( to_dir ) {
    url_split = to_dir.split('/');
    FileName = url_split[url_split.length - 1];
    Extensions = storage_app.extensions;
    var openByFileType = function ( extension ) {
        if ( extension == 'py' ) {
            return openPythonFile;
        } else if ( extension == 'png' || extension == 'jpeg' || extension == 'jpg' || extension == 'gif' ) {
            return openImageFile;
        } else if ( extension == 'json' || extension == 'js' || extension == 'html' ) {
            return openTextFile;
        } else if ( extension == 'mp4' ) {
            return openVideoFile;
        }
    };
    for (var i = 0; i < Extensions.length; i++) {
        check = FileName.indexOf(Extensions[i])
        if ( check != -1 ) {
            ext = Extensions[i].replace('.', '');
            return openByFileType(ext);
        };
    };
    return '';
};

storage_app.open_window = function ( to_dir ) {
    var app = {template: getObjTemplate()};
    app.template.buttons = getStorageButtons();
    dir_split = to_dir.split('/');
    dir_name = dir_split[dir_split.length - 1];
    if ( to_dir.indexOf('?filename=') == -1 ) {
        app.template.title = dir_name;
        app.template.content = storage_app.directories[dir_name];
    } else {
        app.template.title = dir_name.split('?filename=')[1];
        content = getStorageData(to_dir);
        console.log(content);
        app.template.content = '<div class="row">' + content + '</div>';
    };
    openApp(app);
};
