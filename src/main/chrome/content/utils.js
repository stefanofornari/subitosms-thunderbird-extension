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

function error(msg) {
    alert("ERROR: " + msg);
}