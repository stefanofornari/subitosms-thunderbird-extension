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

function sendSMS() {
    alert("Mo' lo mando!");
}
