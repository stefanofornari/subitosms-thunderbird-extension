if (!funambol) var funambol={};
if (!funambol.subitosms) funambol.subitosms={};
if (!funambol.subitosms.util) funambol.subitosms.util = {};

funambol.subitosms.util.httpGET = function httpGET(url) {
  try {
      var httpRequest = new XMLHttpRequest();
  } catch (e) {
          funambol.subitosms.util.error('Error creating the connection!');

      return false;
  }

  try {
      httpRequest.open("GET", url, false);
      httpRequest.send(null);
  } catch (e){
      funambol.subitosms.util.error('Connection error sending the messaga: '+e);
      return false;
  }

  switch(httpRequest.readyState) {
    case 1,2,3:
        funambol.subitosms.util.error('Response error from the server: ' + httpRequest.status);
        return false;

    case 4:
        if(httpRequest.status !=200) {
          funambol.subitosms.util.error('Response error from the server: ' + httpRequest.status);
          return false;
        } else {
          var response = httpRequest.responseText;
        }
    break;
  }

  return response;
}
