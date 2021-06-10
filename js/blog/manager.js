var API = "https://circuitalminds-storage-app.herokuapp.com";
var USER_ONLINE = "Alan Matzumiya";
window.onload = function() {
  document.getElementById("greeting").innerHTML = "Welcome";
  document.getElementById("user-online").innerHTML = USER_ONLINE;
};

function ManagerRequest ( Obj ) {
    var getData = $.get( API + "/get/test", Obj );
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
