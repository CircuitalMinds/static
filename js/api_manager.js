var query_data = {
    books: {
        user_register: {arguments: ["username", "password"]},
        blog: {arguments: ["title", "date", "content", "picture"]},
        jupyter_app: {arguments: ["title", "topic", "module", "location", "resources"]},
        music_app: {arguments: ["video_url", "video_title", "video_image"]}
        },
    API: 'https://circuitalminds.herokuapp.com/get'
};

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

function get_requests ( book, option, data_requests ) {
    url = query_data.API + '/' book + '/' + option;
    var getQuery = $.get( url, data_requests );
    getQuery.done( function ( data ) {
        console.log(data);
    });
};



function check_requests ( book, option, data_requests ) {
    args = query_data.books[book].arguments;
    args_check = Object.keys(data_requests);
    for ( arg of args ) {
        if ( args_check.indexOf(arg) == -1 ) {
            return {Response: 'bad request'}
        };
    };
    return get_requests(book, option, data_requests);
};

