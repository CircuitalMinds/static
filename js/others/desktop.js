Desktop.setup();
var Apps = {
music_app: {
    title: 'Music App', icon: 'windows', template: {},
    current_song: {
        "video_title": "",
        "video_url": ""
        },
    buttons: [
        {
            html: '<span id="volume-minus" class="mif-volume-minus"></span>', onclick: 'Player.volume.down()'
            },
        {
            html: '<span id="volume-plus" class="mif-volume-plus"></span>', onclick: 'Player.volume.up()'
            },
        {
            html: '<span id="previous" class="mif-previous"></span>', onclick: 'Player.back_song()'
            },
        {
            html: '<span id="play" class="mif-play"></span>', onclick: 'Player.play()'
            },
        {
            html: '<span id="next" class="mif-next"></span>', onclick: 'Player.next_song()'
            }
        ]
    },
start: {title: 'Start', icon: 'windows', template: {}, buttons: getButtons()},
storage: {title: 'Storage', icon: 'windows', template: {}, buttons: getButtons()},
inbox: {title: 'Inbox', icon: 'windows', template: {}, buttons: getButtons()},
python_console: {title: '', icon: 'windows', template: {}, buttons: getButtons()},
chat: {title: 'Chat', icon: 'windows', template: {}, buttons: getButtons()}
};

function getButtons () {
    var customButtons = [
        {
            html: "<span class='mif-rocket'></span>",
            cls: "sys-button",
            onclick: "alert('You press rocket button')"
        },
        {
            html: "<span class='mif-user'></span>",
            cls: "alert",
            onclick: "alert('You press user button')"
        },
        {
            html: "<span class='mif-cog'></span>",
            cls: "warning",
            onclick: "alert('You press cog button')"
        }
    ];
    return customButtons;
};

function managerWindows ( App_Name ) {
    var getTemplate = $.get( "/desktop/" + App_Name, {"q": "template"} );
    getTemplate.done( function( data ) {
            Apps[App_Name].template = data;
            var w = Desktop.createWindow({
                resizeable: true,
                draggable: true,
                customButtons: Apps[App_Name].buttons,
                width: 360,
                icon: "<span class='mif-" + Apps[App_Name].icon + "'></span>",
                title: Apps[App_Name].title,
                content: "<div class='p-2'>" + Apps[App_Name].template + "</div>",
                clsContent: "bg-dark fg-teal"
            });
      });
};