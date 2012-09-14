var lilac = lilac || {};

lilac.PerformanceTestRunner = (function () {

    function Test(testFn) {
        this.testFn = testFn;
    }
    
    Test.prototype = {
        testFn: null,
        
        run: function (object, runs) {
            this.testFn.call(this, object);
            
            var startTime,
                endTime,
                i;
            
            startTime = Date.now();
            for (i = 0; i < runs; i += 1) {
                this.test();
            }
            endTime = Date.now();
            
            console.log('%d %d %d = %d', startTime, endTime, runs, runs / (endTime - startTime));
            return runs * 1000 / (endTime - startTime);
        }
    };
    
    function PerformanceTestRunner(loader, reporter) {
        this.loader = loader;
        this.reporter = reporter;
        this.tests = [];
    }
    
    function runTest(test, objects, report) {
        objects.forEach(function(object) {
            report.addResult(object.src, test.run(object.object, PerformanceTestRunner.DEFAULT_ITERATIONS));
        });
    }
    
    PerformanceTestRunner.DEFAULT_ITERATIONS = 100000;
    
    PerformanceTestRunner.prototype = {
        isStarted: false,
        isCompleted: false,
        tests: null,
        loader: null,
        reporter: null,
        
        addTest: function (name, testFn) {
            this.tests.push({
                name: name,
                testFn: testFn
            });
        },
        
        run: function () {
            if (this.isStarted) {
                return;
            }
            
            if (!this.loader.isLoaded) {
                this.loader.onload = this.run.bind(this);
                this.loader.load();
                return;
            }
            
            this.isStarted = true;
            
            this.tests.forEach(function (test) {
                runTest(new Test(test.testFn), this.loader.loadedObjects, this.reporter.addTest(test.name));
            }, this);
            
            this.isCompleted = true;
        }
    };
    
    return PerformanceTestRunner;
}());
