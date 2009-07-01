function isDefined(v) {
    return (typeof(v) == "undefined")?  false: true;
}

function isEmpty(v) {
    return !isDefined(v) ||
        v == ""       ||
        v == null      ;
}

function hasPhoneNumbers(card) {
    return !isEmpty(card.workPhone)
        || !isEmpty(card.homePhone)
        || !isEmpty(card.cellularNumber)
    ;
}

function formatNumber(number) {
    var prefixed = number.charAt(0) == "+";

    var ret = number.replace(/[^%2B0-9]/g, "");

    if (prefixed) {
        ret = "%2B" + ret;
    }

    return ret;
}

function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) {
            return false;
        }
    }

    return true;
}

function trim(s) {
    var i;
    var ret = "";

    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c != " ") {
            ret += c;
        }
    }

    return ret;
}

function error(msg) {
    alert("ERROR: " + msg);
}

function stripCharsInvalid(s, bag) {
    var i;
    var ret = "";
    
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (bag.indexOf(c) == -1) {
            ret += c;
        }
    }

    return ret;
}

