function LastNumbersArrayTestSuite() {
}

LastNumbersArrayTestSuite.prototype.testNewArrayIsEmpty = function testNewArrayIsEmpty() {
    var l = new LastNumbersArray();

    assertTrue(l.isEmpty());
}

LastNumbersArrayTestSuite.prototype.testDefaultMaxSize = function testDefaultMaxSize() {
    var l = new LastNumbersArray();

    assertEquals(20, l.getMaxSize());
}

LastNumbersArrayTestSuite.prototype.testGivenMaxSize = function testGivenMaxSize() {
    var l = new LastNumbersArray(10);

    assertEquals(10, l.getMaxSize());
}

LastNumbersArrayTestSuite.prototype.testGetBoundaries = function testGetBoundaries() {
    var l = new LastNumbersArray(5);

    var success = true;
    var failMessage = "";
    try {
        l.get(-1);
        success = false;
        failMessage = "Index < 0 should result in an error.";
    } catch (e) {
        println(e.description);
    }

    if (!success) {
        fail(failMessage);
    }

    try {
        l.get(0);
        success = false;
        failMessage = "Index > array size should result in an error.";
    } catch (e) {
        println(e.description);
    }

    if (!success) {
        fail(failMessage);
    }
}

LastNumbersArrayTestSuite.prototype.testAddWithinMaxSize = function testAddWithinMaxSize() {
    var l = new LastNumbersArray(5);
    
    l.add(t1 = "+11111111");
    l.add(t2 = "+22222222");
    l.add(t3 = "+33333333");

    assertEquals(3, l.getSize());
    assertEquals(t3, l.get(0));
    assertEquals(t2, l.get(1));
    assertEquals(t1, l.get(2));
}

LastNumbersArrayTestSuite.prototype.testAddOverMaxSize = function testAddOverMaxSize() {
    var l = new LastNumbersArray(3);

    l.add(t1 = "+11111111");
    l.add(t2 = "+22222222");
    l.add(t3 = "+33333333");
    l.add(t4 = "+44444444");

    assertEquals(3, l.getSize());
    assertEquals(t4, l.get(0));
    assertEquals(t3, l.get(1));
    assertEquals(t2, l.get(2));
}