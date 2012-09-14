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

    function JSONReporter() {
        this.tests = [];
    }
    
    JSONReporter.prototype = {
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
    
    return JSONReporter;
}());