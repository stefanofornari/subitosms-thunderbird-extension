function loadConfiguration() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    document.getElementById("configure.username.text").value =
        prefs.getComplexValue("subitosms.username", Components.interfaces.nsISupportsString).data;
    document.getElementById("configure.password.text").value =
        prefs.getComplexValue("subitosms.password", Components.interfaces.nsISupportsString).data;
    document.getElementById("configure.from.text").value =
        prefs.getComplexValue("subitosms.from", Components.interfaces.nsISupportsString).data;
}

function saveConfiguration() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    var v = Components.classes["@mozilla.org/supports-string;1"]
      .createInstance(Components.interfaces.nsISupportsString);


    v.data = document.getElementById("configure.username.text").value;
    prefs.setComplexValue(
        "subitosms.username",
        Components.interfaces.nsISupportsString,
        v
    );

    v.data = document.getElementById("configure.password.text").value;
    prefs.setComplexValue(
        "subitosms.password",
        Components.interfaces.nsISupportsString,
        v
    );

    v.data = document.getElementById("configure.from.text").value;
    prefs.setComplexValue(
        "subitosms.from",
        Components.interfaces.nsISupportsString,
        v
    );
}

function init() {
    loadConfiguration();
    localizeLabels();
}

function doAccept() {
    saveConfiguration();
}

function localizeLabels() {
    document.documentElement.getButton("accept").label = getString("configure.window.accept.label");
    document.documentElement.getButton("cancel").label = getString("configure.window.cancel.label");
    document.getElementById("configure.username.label").value = getString("configure.username.label.value");
    document.getElementById("configure.password.label").value = getString("configure.password.label.value");
    document.getElementById("configure.from.label").value = getString("configure.from.label.value");
}