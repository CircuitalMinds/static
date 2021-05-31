var storage_url = 'http://127.0.0.1:5100'
function openFile ( to_path, filename, ext ) {
    if ( ext == 'py' ) {
        openConsoleApp();
        var getFile = $.get( storage_url + '/get_from/' + to_path, {"filename": filename} );
        getFile.done( function ( data ) {
            var fileData = data;
            var textCode = document.getElementById("text-code");
            codeData = fileData.split('\n');
            var line = '<p class="border bd-gray">[ COUNTER ] CODE_LINE</p>\n';
            for ( var s = 0; s < codeData.length; s++ ) {
                if ( codeData[s] != "" ) {
                    codeString += line.replace('COUNTER', s).replace('CODE_LINE', codeData[s]);
                };
            };
            textCode.innerHTML = codeString;
        });
    } else if ( ext == 'png' || ext == 'jpg' || ext == 'gif' ) {
           var url_file = storage_url + '/get_from/' + to_path + "?filename=" + filename;
           var w = Desktop.createWindow({
                resizeable: true,
                draggable: true,
                customButtons: Apps.storage_app.buttons,
                width: "100%",
                icon: "<span class='mif-" + Apps.storage_app.icon + "'></span>",
                title: filename,
                content: '<div class="p-2"><img src="' + url_file + '" ></div>',
                clsContent: "bg-dark fg-teal"
        });
    } else if ( ext == 'mp4' ) {
           videoMedia = document.getElementById('video-media');
           full_path = storage_url + '/get_from/' + to_path + '?filename=' + filename;
           if ( videoMedia == undefined ) {
               var videoObj = {
                   'data-loop-icon=': '"<span class=' + 'mif-loop2 fg-cyan' + '></span>"',
                   'data-mute-icon=': '"<span class=' + 'mif-volume-mute2 fg-cyan' + '></span>"',
                   'data-play-icon=': '"<img src=' + 'https://circuitalminds.github.io/static/images/metro/media_player/play.png' + '>"',
                   'data-role=': '"video-player"',
                   'data-src=': full_path,
                   'data-stop-icon=': '"<img src=' + 'https://circuitalminds.github.io/static/images/metro/media_player/stop.png' + '>"',
                   'data-volume=': '"0.9"',
                   'data-volume-high-icon=': '"<span class=' + 'mif-volume-high fg-cyan' + '></span>"',
                   'data-volume-low-icon=': '"<span class=' + 'mif-volume-low fg-cyan' + '></span>"',
                   'data-volume-medium-icon=': '"<span class=' + 'mif-volume-medium fg-cyan' + '></span>"'
                };
                var objKeys = Object.keys(videoObj);
                var videoTemplate = '<video id="video-media" class="light fg-cyan" data-aspect-ratio="hd" '
                for ( var k = 0; k < objKeys.length; k++ ) {
                      videoTemplate += objKeys[k] + videoObj[objKeys[k]] + " ";
                };
                videoTemplate += '></video>';
                var w = Desktop.createWindow({
                    resizeable: true,
                    draggable: true,
                    customButtons: Apps.storage_app.buttons,
                    width: "100%",
                    icon: "<span class='mif-" + Apps.storage_app.icon + "'></span>",
                    title: decodeURI(filename),
                    content: '<div class="p-2">' + videoTemplate + '</div>',
                    clsContent: "bg-dark fg-teal"
                    });
           } else {
               videoMedia.setAttribute('src', full_path);
             }
        };
};

function checkDir ( Dir ) {
    var Extensions = ['mp4', 'png', 'jpg', 'gif', 'py'];
    extFound = []
    for ( var i = 0; i < Extensions.length; i++ ) {
        if ( Dir.endsWith(Extensions[i]) ) {
            extFound.push(Extensions[i]);
        };
    };
    return extFound[0];
};

function openDirectory ( dir_name ) {
    var dir_data = dir_name.split('/');
    console.log(dir_data);
    if ( dir_data.length > 1 ) {
        var ext = dir_data[1].split('.')[1];
        openFile(dir_data[0], dir_data[1], ext);
    } else {
    var getTemplate = $.get( '/storage_app/' + dir_name, {"q": "template"} );
        getTemplate.done( function ( data ) {
            Apps.storage_app.template = data['template'];
            var current_window = document.getElementById('storage-dir');
            if ( current_window == null ) {
                var w = Desktop.createWindow({
                    resizeable: true,
                    draggable: true,
                    customButtons: Apps.storage_app.buttons,
                    width: "100%",
                    icon: "<span class='mif-" + Apps.storage_app.icon + "'></span>",
                    title: Apps.storage_app.title,
                    content: "<div class='p-2'>" + Apps.storage_app.template + "</div>",
                    clsContent: "bg-dark fg-teal"
                });
                } else {
                  current_window.innerHTML = Apps.storage_app.template;
                }
            });
        }
    };

