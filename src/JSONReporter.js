var lilac = lilac || {};

lilac.JSONReporter = (function () {

    function JSONTestReport(name) {
        this.name = name;
        this.results = [];
    }
    
    JSONTestReport.prototype = {
        name: null,
        results: null,
        
        addResult: function (name, operationsPerSecond) {
            this.results.push({
                name: name,
                operationsPerSecond: operationsPerSecond
            });
        }
    };

    function JSONTestSetReport(name) {
        this.name = name;
        this.tests = [];
    }
    
    JSONTestSetReport.prototype = {
        name: null,
        tests: null,
        
        addTest: function (name) {
            if (this.tests[name]) {
                return this.tests[name];
            }
            
            var test = new JSONTestReport(name);
            
            this.tests.push(test);
            this.tests[name] = test;
            
            return test;
        }
    };
    
    function JSONReporter() {
        this.testSets = [];
    }
    
    JSONReporter.prototype = {
        testSets: null,
        
        addTestSet: function (name) {
            if (this.testSets[name]) {
                return this.testSets[name];
            }
            
            var testSet = new JSONTestSetReport(name);
            
            this.testSets.push(testSet);
            this.testSets[name] = testSet;
            
            return testSet;
        }
    };
    
    return JSONReporter;
}());