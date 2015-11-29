/**
 * MoLoCo - Module Loader Component
 * 
 * @author Renato Rodrigues <renato.sp@gmail.com>
 * @version 0.001
 * @license Free for use (public domain)
 * 
 * @param {object} options
 * @param {boolean} [options.debug] - Enable or disable the console output
 * 
 * @returns {object}
 */
var Moloco = function(options) {
    options = options || {};

    var inst = this;
    this.options = options;
    
    return {
        debug : inst.options.debug,
        loadScript : function(scripts, callback) {
            
            var addScript = function(scripts, callback) {
                scripts = typeof scripts === 'object' ? scripts : [scripts];
                callback = callback || function() { return true; };
                
                if (scripts.length) {
                    var script = typeof scripts[0] === 'object' ? scripts[0] : [scripts[0], true],
                        scriptLoaded = false;
                        
                    if (script[1]) {
                        var scriptElement = document.createElement('script');
                        
                        scriptElement.onload = scriptElement.onreadystatechange = function() {
                            if (!scriptLoaded && (!this.readyState || this.readyState === "loaded")) {
                                if(inst.options.debug) { console.log('[addScript]', script[0]); }
                                scriptLoaded = true;
                                addScript(scripts.slice(1), callback);
                            }
                        };
                        
                        scriptElement.src = script[0];
                        document.getElementsByTagName('head')[0].appendChild(scriptElement);
                    } else {
                        addScript(scripts.slice(1), callback);
                    }
                } else {
                    if(inst.options.debug) { console.log('[callback loadScript]'); }
                    callback();
                }
            };
            
            addScript(scripts, callback);
        },
        
        loadStyle : function(styles, callback) {
            
            var addStyle = function(styles, callback) {
                var styleLoaded = false;
              
                styles = typeof styles === 'object' ? styles : [styles];
                callback = callback || function() { return true; };
              
                if (styles.length) {
                    if (!document.addEventListener && document.createStyleSheet) { //IE8
                        if(inst.options.debug) { console.log('[addStyle IE8]', styles[0]); }
                        document.createStyleSheet(styles[0]);
                        addStyle(styles.slice(1), callback);
                     
                    } else { //R(D)ecent Browsers
                        var styleElement = document.createElement('style');
                        
                        styleElement.onload = styleElement.onreadystatechange = function() {
                            if (!styleLoaded && (!this.readyState || this.readyState === "complete")) {
                                styleLoaded = true;
                                if(inst.options.debug) { console.log('[addStyle]', styles[0]); }
                                addStyle(styles.slice(1), callback);
                            }
                        };
                        
                        styleElement.textContent = '@import "' + styles[0] + '"';
                        document.getElementsByTagName('head')[0].appendChild(styleElement);
                    }
                } else {
                    if(inst.options.debug) { console.log('[callback loadStyle]'); }
                    callback();
                }
            };
            
            addStyle(styles, callback);
        }
    };
};

(function() {
    var basePath = 'dist/modules/%s.js',
        loadModules = document.querySelectorAll('input[name=load-modules]'),
        allScripts = [];
        
    for(var i=0, modules; modules=loadModules[i++];) {
        if (modules.value) {
            for(var j=0, module; module = modules.value.split(',')[j++]; ) {
                allScripts.push(basePath.replace(/%s/,module));
            }
        }
    }
    
    var moloco = new Moloco( {debug:true} );
    moloco.loadScript(allScripts, function(){
        if(moloco.debug) { console.info('MoLoCo: all modules loaded'); }
    });
})();