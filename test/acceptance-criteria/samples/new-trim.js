var gitPerfTest = (function () {
    
    
    
    
    
}());


var VersionedScriptLoader = (function() {
    function VersionedScriptLoader(format) {
        
    }
    
    VersionedScriptLoader.prototype = {
        onComplete: null,
        scriptLoaded:
    };
    
} ());

loadScripts({
    pattern: 'https://raw.github.com/madrobby/zepto/{version}/src/zepto.js',
    versions: [
            'd86df6e4b0ea123d326238cc881a6c73eeab0076'
        ],
    afterEach: function (version, remaining) {
            
        },
    complete: function () {
            console.log('finished');
        }
});