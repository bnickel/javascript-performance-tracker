var lilac = lilac || {};

lilac.SimpleScriptLoader = (function () {
    
    function SimpleScriptLoader(sources, variableName) {
        this.sources = sources;
        this.variableName = variableName;
        this.loadedObjects = [];
    }
    
    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.onload = function () { callback(src); };
        script.src = src;
        document.body.appendChild(script);
    }
    
    SimpleScriptLoader.prototype = {
        isLoaded: false,
        sources: null,
        loadedObjects: null,
        variableName: null,
        
        onload: null,
        
        load: function () {
            var self = this,
                i = 0;
            
            function loadNextScript() {
                if (i < self.sources.length) {
                    loadScript(self.sources[i], onComplete);
                    i += 1;
                } else {
                    self.isLoaded = true;
                    if (self.onload) {
                        self.onload();
                    }
                }
            }
            
            function onComplete(src) {
                self.loadedObjects.push({
                    src: src,
                    object: window[self.variableName]
                });
                delete window[self.variableName];
                loadNextScript();
            }
            
            loadNextScript();
        }
    };
    
    return SimpleScriptLoader;
}());