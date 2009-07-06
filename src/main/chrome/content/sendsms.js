function init() {
    //
    // I want to display the numbers if this order:
    //
    // - mobile
    // - home
    // - work
    //
    card = window.arguments[1];

    phonelist = document.getElementById("PHONE_LIST");
    if (!isEmpty(card.cellularNumber)) {
        phonelist.appendItem(card.cellularNumber, card.cellularNumber, "(M)");
    }
    
    if (!isEmpty(card.homePhone)) {
        phonelist.appendItem(card.homePhone, card.homePhone, "(H)");
    }
    
    if (!isEmpty(card.workPhone)) {
        phonelist.appendItem(card.workPhone, card.workPhone, "(W)");
    }

    phonelist.selectedIndex=0;
}

function doAccept() {
    var card = window.arguments[1];

    if (isDefined(card)) {
        return sendSMS();
    }

    return true;
}

function makeSubitoURL(msg, number) {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    var username = escapeText(
            prefs.getComplexValue("subitosms.username", Components.interfaces.nsISupportsString).data
        );
    var password = escapeText(
            prefs.getComplexValue("subitosms.password", Components.interfaces.nsISupportsString).data
        );
    var mitt = escapeText(
            prefs.getComplexValue("subitosms.from", Components.interfaces.nsISupportsString).data
        );
    var dest = escapePhoneNumber(number);
    var testo = escapeText(msg);

    var url = "https://www.subitosms.it/gateway.php"
            + "?username=" + username
            + "&password=" + password
            + "&mitt="     + mitt
            + "&dest="     + dest
            + "&testo="    + testo
            ;

    return url;
}

function analizeResponse(res) {
    if (res.indexOf("non autorizzato") >= 0) {
        alert("Wrong username or password. Please set up your SubitoSMS account and try again.");
        return false;
    } else {
        alert("Message sent!");
        return true;
    }
}

function getMessage() {
    return document.getElementById("MESSAGE_TEXT").value;
}

function getNumber() {
    return document.getElementById("PHONE_LIST").value;
}

function isValidMessage(msg) {
    return !isEmpty(msg);
}

function isValidPhoneNumber(number) {
    if (isEmpty(number)) {
        return false;
    }

    number = escapePhoneNumber(number);
    number = trim(number);

    //
    // If there was not any digit, number will be empty or contain only %2B
    //
    if (isEmpty(number) || (number == "%2B")) {
        return false;
    }

    return true;
}


function sendSMS() {
    var msg = getMessage();
    var number = getNumber();

    if (!isValidMessage(msg)) {
        alert("Please insert the text of the message.");
        return false;
    }

    if (!isValidPhoneNumber(number)) {
        alert("Please insert a valid phone number.")
        return false;
    }

    var url = makeSubitoURL(msg, number);

    var res = httpGET(url);

    if (res == false) {
        //
        // ERROR!!!
        //
        return false;
    }

    return analizeResponse(res);
}

function showConfigureWindow() {
    openDialog(
        "chrome://subitosms/content/configure.xul",
        "configure",
        "width=400,height=200,modal,resizable=no,centerscreen",
        "Configure SubitoSMS account"
    );
}
