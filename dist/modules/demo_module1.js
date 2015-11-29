(function(){
    var moloco = new Moloco();

    var demoStyles = [
            "demo/css/demo_module1.css",
            "demo/js/dist/rainbow/themes/monokai.css"
        ],
        demoScripts = [
            ["demo/js/dist/rainbow/rainbow.min.js", !window.Rainbow ],
            "demo/js/dist/rainbow/language/generic.js",
            "demo/js/dist/rainbow/language/javascript.js"
        ];
        
    moloco.loadStyles(demoStyles, function() {
        
        moloco.loadScripts(demoScripts, function() {
            console.info('Demo module 1 loaded! (Rainbow code highligther)');
            Rainbow.color();
        });
    });
})();