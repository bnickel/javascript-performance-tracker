describe("JSONReporter", function () {
    
    var reporter;
    
    beforeEach(function () {
        reporter = new lilac.JSONReporter();
    });
    
    it("accepts tests", function () {
        var test = reporter.addTest('test');
        expect(reporter.tests.length).toBe(1);
        expect(reporter.tests[0]).toBe(test);
        expect(test.name).toBe('test');
        expect(test.results.length).toBe(0);
    });
    
    it("accepts test results", function () {
        var test = reporter.addTest('test');
        var results = test.results;
        
        test.addResult('r1', 100);
        test.addResult('r2', 200);
        test.addResult('r3', 300);
        
        expect(results.length).toBe(3);
        
        expect(results[0].name).toBe('r1');
        expect(results[1].name).toBe('r2');
        expect(results[2].name).toBe('r3');
        
        expect(results[0].operationsPerSecond).toBe(100);
        expect(results[1].operationsPerSecond).toBe(200);
        expect(results[2].operationsPerSecond).toBe(300);
    });
});