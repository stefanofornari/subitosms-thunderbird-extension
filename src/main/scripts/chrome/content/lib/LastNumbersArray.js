function LastNumbersArray() {
    this.numbers = new Array();
    if (LastNumbersArray.arguments.length > 0) {
        this.maxSize = LastNumbersArray.arguments[0];
    } else {
        this.maxSize = 20;
    }
}

LastNumbersArray.prototype.isEmpty = function() {
    return this.numbers.length == 0;
}

LastNumbersArray.prototype.getMaxSize = function() {
    return this.maxSize;
}

LastNumbersArray.prototype.getSize = function() {
    return this.numbers.length;
}

/**
 * Adds a new element at the beginning of the array.
 */
LastNumbersArray.prototype.add = function(entry) {
    newSize = this.numbers.unshift(entry);

    if (newSize > this.maxSize) {
        //
        // Discard the last element of the array
        //
        this.numbers.pop();
    }
}

/**
 * Returns the index-sh element of the array.
 */
LastNumbersArray.prototype.get = function(index) {
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
