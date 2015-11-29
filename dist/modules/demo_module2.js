(function(){
    var moloco = new Moloco();
    
    var demoStyles = "demo/css/demo_module2.css",
        demoScripts = [
            ["demo/js/dist/jquery-1.10.2.min.js", !window.jQuery ], /* will be skipped. jQuery is already loaded */
            ["demo/js/dist/underscore-1.6.0.min.js", !window._ ],
            "demo/js/demo_module2.js"
        ];
        
    moloco.loadStyles(demoStyles, function() {
        
        moloco.loadScripts(demoScripts, function() {
            console.info('Demo module 2 loaded! (jQuery + Underscore.js)');
            
            initDemo2();
        });
    });
})();


