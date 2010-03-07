function loadConfiguration() {
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                          .getService(Components.interfaces.nsIPrefBranch);

    var configuration = new Object();

    configuration.username =
        prefs.getComplexValue("subitosms.username", Components.interfaces.nsISupportsString).data;
    configuration.password =
        prefs.getComplexValue("subitosms.password", Components.interfaces.nsISupportsString).data;
    configuration.from =
        prefs.getComplexValue("subitosms.from", Components.interfaces.nsISupportsString).data;

    return configuration;
}

function initConfigurationFields() {
    //
    // loadConfiguration fails if configuration parameters have never been
    // saved before
    //
    try {
        var configuration = loadConfiguration();

        document.getElementById("configure.username.text").value =
            configuration.username;
        document.getElementById("configure.password.text").value =
            configuration.password;
        document.getElementById("configure.from.text").value =
            configuration.from;
    } catch (e) {
        //
        // no action required
        //
    }
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

    var ret = window.arguments[1];
    ret.saved = true;
}

function init() {
    initConfigurationFields();
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