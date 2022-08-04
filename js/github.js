let GitHub = {};
GitHub.Url = "https://github.com";

GitHub.getPage = function ( Path ) {
    window.location = [this.Url, Path].join("/");
};

GitHub.createRepo = function ( Name ) {
    if ( document.URL == [this.Url, "new"].join("/") ) {
        createBtn = document.querySelector('button.btn-primary');
        createBtn.disabled = false;
        ["name", "description"].map( e => document.getElementById("repository_" + e).value = Name );
        ["visibility_public", "auto_init"].map( e => document.getElementById("repository_" + e).checked = "checked" );
    } else {
        this.getPage("new");
    };
};
