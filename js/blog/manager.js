var API = "https://circuitalminds-storage-app.herokuapp.com";

var users = [
	{username: "alanmatzumiya", password: "perrito"},
	{username: "seleneguzman", password: "gatito"}
];

function get_user_data () {
	return {
		username: $('#username')[0], 
		password: $('#password')[0]
	};
};

function Login () {
	data = get_user_data();
	user = data.username.value;
	pwd = data.password.value;
	id = users.map( q => q.username == user ).indexOf(true)
	if ( id != -1 ) {
		user_data = users[id];
		if ( user_data.password == pwd ) {
			$('#greeting')[0].innerHTML = "Welcome";					
			$('#user-online')[0].innerHTML = user_data.username;	
			$('#login-message')[0].innerHTML = "";			
			data.username.value = '';
			data.password.value = '';
		} else {			
			$('#greeting')[0].innerHTML = "";
			$('#user-online')[0].innerHTML = "";
			$('#login-message')[0].innerHTML = "Login data incorrect";									
			data.username.value = '';
			data.password.value = '';
		};
	} else {
		$('#greeting')[0].innerHTML = "";
		$('#user-online')[0].innerHTML = "";
		$('#login-message')[0].innerHTML = "Login data incorrect";								
		data.username.value = '';
		data.password.value = '';
	}
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
