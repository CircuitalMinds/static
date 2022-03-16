let Browser = new Object();
Browser.Pages = {
    "youtube": "https://www.youtube.com",
    "github": "https://github.com",
    "facebook": "https://www.facebook.com"
}
Browser.get = function( url ) {
    window.location = url
};
Browser.loadPage = function () {
    window.scrollTo(0, this.scrollMaxY);
}