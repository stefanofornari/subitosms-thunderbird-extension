
function showMenuItems2() {
    var card = GetSelectedCard();

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
        card = GetSelectedCard();
    }

    dialog = openDialog(
        "chrome://subitosms/content/sendsms.xul",
        "sendsms",
        "chrome, width=400,height=200,modal,resizable=no,centerscreen",
        card
    );
}

