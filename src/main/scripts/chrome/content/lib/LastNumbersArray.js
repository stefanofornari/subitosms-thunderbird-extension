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
 * Adds a new element at the beginning of the array. If the same entry was
 * already in the array, the existing entry is removed.
 */
LastNumbersArray.prototype.add = function(entry) {
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

/**
 * Returns a comma separated values representation of the numbers contained in
 * the array.
 */
LastNumbersArray.prototype.toString = function() {
    return this.numbers.join();
}

/**
 * Replaces the content of the array with the comma separated values provided.
 * If the values are more than what allowed by maxSize, only maxSize elements
 * will be stored in the array.
 */
LastNumbersArray.prototype.fromString = function(s) {
    if (s.length == 0) {
        this.numbers = new Array();
    } else {
        this.numbers = s.split(",", this.maxSize);
    }
}