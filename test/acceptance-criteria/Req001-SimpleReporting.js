describe("Req001: Simple reporting", function () {
    var reporter, runner, loader;
    
    beforeEach(function () {
        loader = new lilac.SimpleScriptLoader([
                'acceptance-criteria/samples/old-trim.js',
                'acceptance-criteria/samples/new-trim.js'
            ], 'trim');
        
        reporter = new lilac.JSONReporter();
        runner = new lilac.PerformanceTestRunner(loader, reporter);
    });
    
    it("Loads two script files, runs them both, and outputs the results as an object", function () {
        runs(function () {
            
            runner.addTest('String with text on both sides', function (trim) {
            
                this.test = function () {
                    trim('    test   ');
                };
            });
            
            runner.run();
        });
        
        waitsFor(function () {
            return runner.isCompleted;
        }, "runner to complete", 1000);
        
        runs(function () {
            expect(reporter.tests.length).toBe(1);
            
            var test = reporter.tests[0];
            expect(test.name).toBe('String with text on both sides');
            
            var results = test.results;
            expect(results.length).toBe(2);
            expect(results[0].name).toBe('acceptance-criteria/samples/old-trim.js');
            expect(results[0].operationsPerSecond).toBeGreaterThan(0);
            expect(results[1].name).toBe('acceptance-criteria/samples/new-trim.js');
            expect(results[1].operationsPerSecond).toBeGreaterThan(0);
            
            expect(results[0].operationsPerSecond).toBeGreaterThan(results[1].operationsPerSecond);
        });
    });
});