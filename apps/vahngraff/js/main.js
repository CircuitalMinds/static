var Pallete = {};
Pallete.data = {{ site.data.colors.pallete | jsonify }};
Pallete.set_style = ( sty ) => ( `<div class="cell-md-12 h-100" style="${colorGrad(sty)}"></div>` );
$(function() {
    Pallete.top = Pallete.set_style(Pallete.data);
    Pallete.bottom = Pallete.set_style(Pallete.data.reverse());
    ["top", "bottom"].map( x => $(`#pallete-${x}`)[0].innerHTML = Pallete[x] );
    setJekyllSearch("videos");
});