var APP = "http://127.0.0.1:5000";
var API = "http://127.0.0.1:5001";

var USER_ONLINE = "Alan Matzumiya";

window.onload = function() {
  document.getElementById("greeting").innerHTML = "Welcome";
  document.getElementById("user-online").innerHTML = USER_ONLINE;
};

function Object_App ( name, Id ) {
    var data_src = 'src="APP/ID"'.replace("APP", APP).replace("ID", Id);
    var App_Prototypes = { 
            iframe: [
                 data_src,
                'height="550"',
                'width="100%"',
                'class="image fit"',
                'frameborder="0"',
                'height="550"',
                'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=true'
            ]
    };
    var Proto = App_Prototypes[name];
    var Attrs = " ";
    for (var i = 0; i < Proto.length; i++) {
        Attrs += Proto[i] + " ";
    };
    var object_string = "<iframe" + Attrs + "></iframe>";
    return object_string;
};

function ManagerRequest ( Obj ) {
    var getData = $.get( APP + "/get/test", Obj );
    getData.done( function ( data ) {
        console.log(data, "200 ok");
    });
};


function user_register () {
    var obj = {};
    obj.username = document.getElementById("mce-USERNAME").value;
    obj.email = document.getElementById("mce-EMAIL").value;
    ManagerRequest(obj);
};