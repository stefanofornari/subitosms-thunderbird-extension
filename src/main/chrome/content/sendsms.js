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
        sendSMS();
    }

    return true;
}

function formatNumber(number) {
    var prefixed = number.charAt(0) == "+";

    var ret = number.replace(/[^%2B0-9]/g, "");

    if (prefixed) {
        ret = "%2B" + ret;
    }

    return ret;
}

function makeSubitoURL(msg, number) {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    var username =
        prefs.getComplexValue("subitosms.username", Components.interfaces.nsISupportsString).data;
    var password =
        prefs.getComplexValue("subitosms.password", Components.interfaces.nsISupportsString).data;
    var sender=
        prefs.getComplexValue("subitosms.from", Components.interfaces.nsISupportsString).data;
    var to=formatNumber(number);
    var text = msg;

    var url = "https://www.subitosms.it/gateway.php"
            + "?username=" + username
            + "&password=" + password
            + "&mitt="     + sender
            + "&dest="     + to
            + "&testo="    + text
            ;

    return url;
}

function analizeResponse(res) {
    return true;
}

function getMessage() {
    return document.getElementById("MESSAGE_TEXT").value;
}

function getNumber() {
    return document.getElementById("PHONE_LIST").value;
}

function sendSMS() {
    var msg = getMessage();
    var number = getNumber();

    var url = makeSubitoURL(msg, number);

    var res = httpGET(url);

    if (res == false) {
        //
        // ERROR!!!
        //
        return;
    }

    if (analizeResponse(res)) {
        alert("Message sent!");
    }
}

function showConfigureWindow() {
    openDialog(
        "chrome://subitosms/content/configure.xul",
        "configure",
        "width=300,height=200,modal,resizable=no,centerscreen",
        "Configure SubitoSMS account"
    );
}
