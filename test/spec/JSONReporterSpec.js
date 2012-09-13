describe("JSONReporter", function () {
    
    var reporter;
    
    beforeEach(function () {
        reporter = new lilac.JSONReporter();
    });
    
    it("accepts test sets", function () {
        var testSet = reporter.addTestSet('set');
        expect(reporter.testSets.length).toBe(1);
        expect(reporter.testSets[0]).toBe(testSet);
        expect(testSet.name).toBe('set');
        expect(testSet.tests.length).toBe(0);
    });
    
    it("accepts tests on a set", function () {
        var testSet = reporter.addTestSet('set');
        var test1 = testSet.addTest('test1');
        var test2 = testSet.addTest('test2');
        
        expect(testSet.tests.length).toBe(2);
        expect(testSet.tests[0]).toBe(test1);
        expect(testSet.tests[1]).toBe(test2);
        
        expect(test1.name).toBe('test1');
        expect(test1.results.length).toBe(0);
        expect(test2.results.length).toBe(0);
    });
    
    it("accepts test results on a test", function () {
        var testSet = reporter.addTestSet('set');
        var test = testSet.addTest('test');
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