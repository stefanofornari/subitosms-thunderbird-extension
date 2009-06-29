function loadConfiguration() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    document.getElementById("USERNAME_TEXT").value =
        prefs.getComplexValue("subitosms.username", Components.interfaces.nsISupportsString).data;
    document.getElementById("PASSWORD_TEXT").value =
        prefs.getComplexValue("subitosms.password", Components.interfaces.nsISupportsString).data;
    document.getElementById("FROM_TEXT").value =
        prefs.getComplexValue("subitosms.from", Components.interfaces.nsISupportsString).data;
}

function saveConfiguration() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    var v = Components.classes["@mozilla.org/supports-string;1"]
      .createInstance(Components.interfaces.nsISupportsString);


    v.data = document.getElementById("USERNAME_TEXT").value;
    prefs.setComplexValue(
        "subitosms.username",
        Components.interfaces.nsISupportsString,
        v
    );

    v.data = document.getElementById("PASSWORD_TEXT").value;
    prefs.setComplexValue(
        "subitosms.password",
        Components.interfaces.nsISupportsString,
        v
    );

    v.data = document.getElementById("FROM_TEXT").value;
    prefs.setComplexValue(
        "subitosms.from",
        Components.interfaces.nsISupportsString,
        v
    );
}

function init() {
    loadConfiguration();
}

function doAccept() {
    saveConfiguration();
}