
var MCbundleService = Components.classes["@mozilla.org/intl/stringbundle;1"].getService
(Components.interfaces.nsIStringBundleService);
		var MCbundle = MCbundleService.createBundle("chrome://subitosms/locale/subitosms.properties");

function disableMenuItems2() {
    var card = GetSelectedCard();

    document.getElementById("sendsms2")
            .setAttribute("disabled", !hasPhoneNumbers(card));
}

function showSMSWindow() {
    var card = GetSelectedCard();
    window.openDialog(
        "chrome://subitosms/content/sendsms.xul",
        "sendsms",
        "width=400,height=200,modal,resizable=no,centerscreen",
        {title: MCbundle.GetStringFromName("sendsms.window.title")},
        card
    );
}



