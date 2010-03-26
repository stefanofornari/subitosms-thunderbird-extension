/**
 * Thunderbird 3.0 changed the way properties of a card are accessed; we create
 * a card object with just the information we need.
 */
function fixCard(card) {
    if (!isTB2()) {
        var c = new Object();
        c.homePhone = card.getProperty("HomePhone", "");
        c.workPhone = card.getProperty("WorkPhone", "");
        c.cellularNumber = card.getProperty("CellularNumber", "");
        return c;
    }

    return card;
}

function showMenuItems2() {
    var card = fixCard(GetSelectedCard());

    document.getElementById("sendsms2").label=getString("subitosms.menu.send");

    document.getElementById("sendsms2")
            .setAttribute("disabled", !hasPhoneNumbers(card));
}

function showMenuItems3() {
    document.getElementById("sendsms3").label=getString("subitosms.menu.send");
}

function showSMSWindow(withCard) {
    var card = new Object();

    if (withCard) {
        card = fixCard(GetSelectedCard());
    }

    dialog = openDialog(
        "chrome://subitosms/content/sendsms.xul",
        "sendsms",
        "chrome, width=400,height=200,modal,resizable=no,centerscreen",
        card
    );
}

