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