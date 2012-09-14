describe("PerformanceTestRunner", function () {
    
    var loader, reporter, runner;
    
    beforeEach(function () {
        loader = {
                isLoaded: true,
                loadedObjects: [
                    {
                        src: 'a.js',
                        object: 'a'
                    },
                    {
                        src: 'b.js',
                        object: 'b'
                    }
                ]
            };
        reporter = new lilac.JSONReporter();
        runner = new lilac.PerformanceTestRunner(loader, reporter);
    });
    
    it("completes instantly when there are no tests", function () {
        runner.run();
        expect(runner.isCompleted).toBe(true);
    });
    
    describe("with a test added", function () {
        var runCount;
        beforeEach(function () {
        
            runCount = {a: 0, b: 0};
            
            runner.addTest('test', function (obj) {
                this.test = function () {
                    runCount[obj] += 1;
                };
            });
        });
        
        it("stores tests after they are added", function () {
            expect(runner.tests.length).toBe(1);
            expect(runner.tests[0].name).toBe('test');
        });
        
        it("runs each test 50 times", function () {
            runner.run();
            expect(runCount.a).toBe(lilac.PerformanceTestRunner.DEFAULT_ITERATIONS);
            expect(runCount.b).toBe(lilac.PerformanceTestRunner.DEFAULT_ITERATIONS);
        });
        
        it("logs results", function () {
            runner.run();
            expect(reporter.tests.length).toBe(1);
            
            var test = reporter.tests[0];
            expect(test.name).toBe('test');
            
            var results = test.results;
            expect(results.length).toBe(2);
            expect(results[0].name).toBe('a.js');
            expect(results[1].name).toBe('b.js');
            expect(results[0].operationsPerSecond).toBeGreaterThan(0);
            expect(results[1].operationsPerSecond).toBeGreaterThan(0);
        });
        
        it("attempts to load scripts if loader is not complete", function () {
            loader.isLoaded = false;
            loader.load = jasmine.createSpy('loader.load');
            runner.run();
            expect(runner.isStarted).toBe(false);
            expect(loader.load).toHaveBeenCalled();
            expect(loader.onload).toBeDefined();
        });
        
        it("resumes running when the loader completes", function () {
            loader.isLoaded = false;
            loader.load = function () {};
            runner.run();
            loader.isLoaded = true;
            loader.onload();
            expect(runCount.a).toBe(lilac.PerformanceTestRunner.DEFAULT_ITERATIONS);
            expect(runCount.b).toBe(lilac.PerformanceTestRunner.DEFAULT_ITERATIONS);
        });
    });
});
