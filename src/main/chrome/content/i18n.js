function getWidgetId(s) {
  return s.split(".")[0];
}

function getWidgetElement(s) {
  return s.split(".")[1];
}

/*
function localizeLabels() {
    
  var bundle = document.getElementById("I18N");

  var e = bundle.strings;
  while (e.hasMoreElements()) {
    next = e.getNext();
    alert("next: " + next);
    widgetId = getWidgetId(next.value);
    widgetElement = getWidgetElement(next.key);

    widget = document.getElementById(widgetId);

    if (widget != nil) {
      alert(widget + "." + widgetElement + "=next.value");
      eval(widget + "." + widgetElement + "=next.value");
    }
  }
}
*/

function getString(key) {
  var bundle = document.getElementById("I18N");

  return bundle.getString(key);
}