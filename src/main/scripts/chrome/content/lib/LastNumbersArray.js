if (!funambol) var funambol={};
if (!funambol.subitosms) funambol.subitosms={};
if (!funambol.subitosms.util) funambol.subitosms.util={};

funambol.subitosms.util.LastNumbersArray = function () {
    this.numbers = new Array();
    if (funambol.subitosms.util.LastNumbersArray.arguments.length > 0) {
        this.maxSize = funambol.subitosms.util.LastNumbersArray.arguments[0];
    } else {
        this.maxSize = 20;
    }
}

funambol.subitosms.util.LastNumbersArray.prototype.isEmpty = function() {
    return this.numbers.length == 0;
}

funambol.subitosms.util.LastNumbersArray.prototype.getMaxSize = function() {
    return this.maxSize;
}

funambol.subitosms.util.LastNumbersArray.prototype.getSize = function() {
    return this.numbers.length;
}

/**
 * Adds a new element at the beginning of the array. If the same entry was
 * already in the array, the existing entry is removed.
 */
funambol.subitosms.util.LastNumbersArray.prototype.add = function(entry) {
    //
    // Check first if the element is already in the history
    //
    for (i=0; i<this.numbers.length; ++i) {
        if (this.numbers[i] == entry) {
            this.numbers.splice(i, 1);
        }
    }

    newSize = this.numbers.unshift(entry);

    //
    // If teh new size of the array is bigger than the max size, discard the
    // last element.
    //
    if (newSize > this.maxSize) {

        this.numbers.pop();
    }
}

/**
 * Returns the index-sh element of the array.
 */
funambol.subitosms.util.LastNumbersArray.prototype.get = function(index) {
    if (index < 0) {
        throw new Error("Index out of bound (" + index + ")");
    }

    if (index > this.numbers.length-1) {
        throw new Error("Index out of bound ("
                       + index
                       + " > "
                       + (this.numbers.length-1)
                       + ")"
        );
    }
    return this.numbers[index];
}

/**
 * Returns a comma separated values representation of the numbers contained in
 * the array.
 */
funambol.subitosms.util.LastNumbersArray.prototype.toString = function() {
    return this.numbers.join();
}

/**
 * Replaces the content of the array with the comma separated values provided.
 * If the values are more than what allowed by maxSize, only maxSize elements
 * will be stored in the array.
 */
funambol.subitosms.util.LastNumbersArray.prototype.fromString = function(s) {
    if (s.length == 0) {
        this.numbers = new Array();
    } else {
        this.numbers = s.split(",", this.maxSize);
    }
}
