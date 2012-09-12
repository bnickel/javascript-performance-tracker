describe("SimpleScriptLoader", function () {
    var loader;
    
    beforeEach(function () {
        loader = new lilac.SimpleScriptLoader([
                'acceptance-criteria/samples/set-a.js',
                'acceptance-criteria/samples/set-b.js'
            ], 'set');
    });
    
    describe("on complete", function () {
        it("sets a loaded flag", function () {
            runs(function () {
                loader.load();
            });
            
            waitsFor(function () {
                return loader.isLoaded;
            }, 'loaded flag to be set', 1000);
        });
        
        it("calls onload", function () {
            var loaded = false;
            
            runs(function () {
                loader.onload = function () { loaded = true; };
                loader.load();
            });
            
            waitsFor(function () {
                return loaded;
            }, 'onload to be called', 1000);
        });
    });
    
    describe("after scripts load", function () {
    
        beforeEach(function () {
            runs(function () {
                loader.load();
            });
            
            waitsFor(function () {
                return loader.isLoaded;
            }, 'loaded flag to be set', 1000);
        });
        
        it("saves the results", function () {
            expect(loader.data.length).toBe(2);
        });
        
        it("saves the results in order", function () {
            expect(loader.data[0].src).toBe('acceptance-criteria/samples/set-a.js');
            expect(loader.data[1].src).toBe('acceptance-criteria/samples/set-b.js');
        });
        
        it("saves the correct variable", function () {
            expect(loader.data[0].variable()).toBe('a');
            expect(loader.data[1].variable()).toBe('b');
        });
    });
});