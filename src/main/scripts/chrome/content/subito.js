if (!funambol) var funambol={};
if (!funambol.subitosms) {
    funambol.subitosms = function() {
      var pub = {};
      return pub;
    }();
}

/**
 * Thunderbird 3.0 changed the way properties of a card are accessed; we create
 * a card object with just the information we need.
 */
funambol.subitosms.fixCard = function fixCard(card) {
    if (!funambol.subitosms.util.isTB2()) {
        var c = new Object();
        c.homePhone = card.getProperty("HomePhone", "");
        c.workPhone = card.getProperty("WorkPhone", "");
        c.cellularNumber = card.getProperty("CellularNumber", "");
        return c;
    }

    return card;
}

funambol.subitosms.showMenuItems2 = function showMenuItems2() {
    var card = funambol.subitosms.fixCard(GetSelectedCard());

    document.getElementById("sendsms2").label=funambol.subitosms.i18n.getString("subitosms.menu.send");

    document.getElementById("sendsms2")
            .setAttribute("disabled", !funambol.subitosms.util.hasPhoneNumbers(card));
}

funambol.subitosms.showMenuItems3 = function showMenuItems3() {
    document.getElementById("sendsms3").label=funambol.subitosms.i18n.getString("subitosms.menu.send");
}

funambol.subitosms.showSMSWindow = function showSMSWindow(withCard) {
    var card = new Object();

    if (withCard) {
        card = funambol.subitosms.fixCard(GetSelectedCard());
    }

    dialog = openDialog(
        "chrome://subitosms/content/sendsms.xul",
        "sendsms",
        "chrome, width=400,height=200,modal,resizable=no,centerscreen",
        card
    );
}

