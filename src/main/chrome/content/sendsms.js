function doAccept() {
    var card = window.arguments[1];

    if (isDefined(card)) {
        alert(card.workPhone);
        sendSMS();
    }

    return true;
}

function sendSMS() {
    alert("Mo' lo mando!");
}
