function initDemo2(){
    $.get('demo/tpl/box1.tpl', function(responseText){
        var tplData = {
            date: new Date().toDateString(),
            ua : navigator.userAgent
        };
        
        var tpl = _.template(responseText, tplData);
        
        $('#example_box').after(tpl);
    });
}