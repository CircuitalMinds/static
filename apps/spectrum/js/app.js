function create_chart ( element_id, name, settings ) {
    var obj = new ApexCharts($("#" + element_id)[0], settings);
    obj.render();
};