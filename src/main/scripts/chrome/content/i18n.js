if (!funambol) var funambol={};
if (!funambol.subitosms) funambol.subitosms={};
if (!funambol.subitosms.i18n) funambol.subitosms.i18n = function() {
    var pub = {};

    var bundle = Components.classes["@mozilla.org/intl/stringbundle;1"]
                 .getService(Components.interfaces.nsIStringBundleService)
                 .createBundle("chrome://subitosms/locale/subitosms.properties");

    pub.getString = function(key) {
        return bundle.GetStringFromName(key);
    }

    return pub;
}();
 