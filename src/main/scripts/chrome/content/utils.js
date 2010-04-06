if (!funambol) var funambol={};
if (!funambol.subitosms) funambol.subitosms={};
if (!funambol.subitosms.util) funambol.subitosms.util = {};

funambol.subitosms.util.isDefined = function isDefined(v) {
    return (typeof(v) == "undefined")?  false: true;
}

funambol.subitosms.util.isEmpty = function isEmpty(v) {
    return !funambol.subitosms.util.isDefined(v) ||
        v == ""       ||
        v == null      ;
}

funambol.subitosms.util.hasPhoneNumbers = function hasPhoneNumbers(card) {
    return !funambol.subitosms.util.isEmpty(card.workPhone)
        || !funambol.subitosms.util.isEmpty(card.homePhone)
        || !funambol.subitosms.util.isEmpty(card.cellularNumber)
    ;
}

funambol.subitosms.util.escapePhoneNumber = function escapePhoneNumber(number) {
    var prefixed = number.charAt(0) == "+";

    var ret = number.replace(/[^0-9]/g, "");

    if (prefixed) {
        ret = "%2B" + ret;
    }

    return ret;
}

funambol.subitosms.util.escapeText = function escapeText(text) {
    text = escape(text);

    var ret = "";
    for (i=0; i<text.length; ++i) {
        if (text.charAt(i) == "+") {
            ret += "%2B";
        } else {
            ret += text.charAt(i);
        }
    }

    return ret;
}

funambol.subitosms.util.isInteger = function isInteger(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) {
            return false;
        }
    }

    return true;
}

funambol.subitosms.util.trim = function trim(s) {
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

funambol.subitosms.util.error = function error(msg) {
    alert("ERROR: " + msg);
}

funambol.subitosms.util.isTB2 = function isTB2() {
    var info = Components.classes["@mozilla.org/xre/app-info;1"]
               .getService(Components.interfaces.nsIXULAppInfo);
   return (info.version.indexOf("2.") == 0);
}