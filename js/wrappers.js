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

/**
 * Save a text as file using HTML <a> temporary element and Blob
 * @author Loreto Parisi
 */

var saveAsFile = function(fileName, fileContents) {
    if (typeof(Blob) != 'undefined') { // Alternative 1: using Blob
        var textFileAsBlob = new Blob([fileContents], {type: 'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        if (window.webkitURL != null) {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        } else {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = document.body.removeChild(event.target);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    } else { // Alternative 2: using Data
        var pp = document.createElement('a');
        pp.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(fileContents));
        pp.setAttribute('download', fileName);
        pp.onclick = document.body.removeChild(event.target);
        pp.click();
    }
} // saveAsFile

/* Example */
var jsonObject = {"name": "John", "age": 30, "car": null};
saveAsFile('out.json', JSON.stringify(jsonObject, null, 2));


function App (nombre) {
  this.nombre = nombre;
}
App.prototype.Data = function () {
  console.log(this.nombre + ' starting');
}

class Builder extends App {
  Data() {
    super.Data();
    console.log(this.nombre + ' finish');
  }
}
var p = new Builder('alo');


var A = {
  print: function(value) {
    document.write(value);
  }
}
A.print(8)