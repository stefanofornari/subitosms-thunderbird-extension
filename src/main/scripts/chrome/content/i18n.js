var bundleService = Components.classes["@mozilla.org/intl/stringbundle;1"]
                    .getService(Components.interfaces.nsIStringBundleService);
var bundle = bundleService.createBundle("chrome://subitosms/locale/subitosms.properties");

function getWidgetId(s) {
  return s.split(".")[0];
}

function getWidgetElement(s) {
  return s.split(".")[1];
}

function getString(key) {
  return bundle.GetStringFromName(key);
}