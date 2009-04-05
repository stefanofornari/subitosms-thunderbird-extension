var gAddressBookBundle = document.getElementById("bundle_addressBook");
var MCstrBundleService = Components.classes["@mozilla.org/intl/stringbundle;1"]
                .getService(Components.interfaces.nsIStringBundleService);
var MCbundle = MCstrBundleService.createBundle("chrome://morecols/locale/morecols.properties");
var MCbundle2 = MCstrBundleService.createBundle("chrome://messenger/locale/importMsgs.properties");


var AbExportOrig20081223 = AbExport;
var AbExport = function() {
	if (confirm(MCbundle.GetStringFromName("csvExport")))
		exportABCVS();
	else	
		AbExportOrig20081223.apply(this,arguments);
};

function exportABCVS() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefBranch);
	var getSelDir = GetSelectedDirectory();
	var addrBook = GetDirectoryFromURI(getSelDir);
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("csvDialogTitle"),"Save","*csv", addrBook.dirName+".csv");
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance(Components.interfaces.nsIFileOutputStream);
	foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
	var cards = addrBook.childCards;
	cards.first();
	if (prefs.getIntPref("morecols.export.csv_separator") == 0)
		var sep = ",";
	else
		var sep = ";";
	var firstline = "";
	for (var j=2100;j<2136;j++) {
		var field = MCbundle2.GetStringFromID(j);
		firstline = firstline + field + sep;
	}
	firstline = firstline + MCbundle.GetStringFromName("AnniversaryYear") + sep + MCbundle.GetStringFromName("AnniversaryMonth") + sep + MCbundle.GetStringFromName("AnniversaryDay") + sep + MCbundle.GetStringFromName("Category") + sep + MCbundle.GetStringFromName("SpouseName") + "\r\n";
	foStream.write(firstline, firstline.length);
	for(;;) {	
		var next = cards.currentItem();
		next.QueryInterface(Components.interfaces.nsIAbCard);
		if (! next.isMailList) {
			var data = escapeFieldForCSV(next.firstName,sep)+sep+escapeFieldForCSV(next.lastName,sep)+sep+escapeFieldForCSV(next.displayName,sep)+sep+escapeFieldForCSV(next.nickName,sep)+sep+escapeFieldForCSV(next.primaryEmail,sep)+sep+escapeFieldForCSV(next.secondEmail,sep)+sep+escapeFieldForCSV(next.workPhone,sep)+sep+escapeFieldForCSV(next.homePhone,sep)+sep+escapeFieldForCSV(next.faxNumber,sep)+sep+escapeFieldForCSV(next.pagerNumber,sep)+sep+escapeFieldForCSV(next.cellularNumber,sep)+sep+escapeFieldForCSV(next.homeAddress,sep)+sep+escapeFieldForCSV(next.homeAddress2,sep)+sep+escapeFieldForCSV(next.homeCity,sep)+sep+escapeFieldForCSV(next.homeState,sep)+sep+escapeFieldForCSV(next.homeZipCode,sep)+sep+escapeFieldForCSV(next.homeCountry,sep)+sep+escapeFieldForCSV(next.workAddress,sep)+sep+escapeFieldForCSV(next.workAddress2,sep)+sep+escapeFieldForCSV(next.workCity,sep)+sep+escapeFieldForCSV(next.workState,sep)+sep+escapeFieldForCSV(next.workZipCode,sep)+sep+escapeFieldForCSV(next.workCountry,sep)+sep+escapeFieldForCSV(next.jobTitle,sep)+sep+escapeFieldForCSV(next.department,sep)+sep+escapeFieldForCSV(next.company,sep)+sep+escapeFieldForCSV(next.webPage1,sep)+sep+escapeFieldForCSV(next.webPage2,sep)+sep+escapeFieldForCSV(next.birthYear,sep)+sep+escapeFieldForCSV(next.birthMonth,sep)+sep+escapeFieldForCSV(next.birthDay,sep)+sep+escapeFieldForCSV(next.custom1,sep)+sep+escapeFieldForCSV(next.custom2,sep)+sep+escapeFieldForCSV(next.custom3,sep)+sep+escapeFieldForCSV(next.custom4,sep)+sep+escapeFieldForCSV(next.notes,sep)+sep+escapeFieldForCSV(next.anniversaryYear,sep)+sep+escapeFieldForCSV(next.anniversaryMonth,sep)+sep+escapeFieldForCSV(next.anniversaryDay,sep)+sep+escapeFieldForCSV(next.category,sep)+sep+escapeFieldForCSV(next.spouseName,sep)+"\r\n";
			foStream.write(data, data.length);
		}
		try { cards.next(); } catch(ex) { break; }
	}
	foStream.close();
}

function escapeFieldForCSV(data, sep) {
	data = data.replace(/\r/g,"");
	data = data.replace(/\n/g," ");
	if (data.indexOf(sep) > -1 || data.indexOf(",") > -1)
		data = '"'+data+'"';
	return data;
}

function exportListOrAB() {
	var ABtree = document.getElementById("abResultsTree");
	var numsel = ABtree.view.selection.count;
	var addrBook = GetDirectoryFromURI(GetSelectedDirectory());
	if (addrBook.isMailList)
		exportList(addrBook);
	else
		exportABasMab();
}

function exportElement() {
	if (GetSelectedCard() && GetSelectedCard().isMailList)
		exportList(null);
	else
		exportCard();
}

function exportList(addr) {
	var data="";
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("expcard"),"GetFolder","all");
	if (! file)
		return;
	// We take the list as object
	if (! addr)
		var list = GetDirectoryFromURI(GetSelectedCard().mailListURI);
	else 
		var list = addr;
	if ( list.dirName == "")
		var filename = "unknown";
	else
		var filename =  normalizeFileName(list.dirName);
	var newfilename = findGoodName(filename,file,".thm");
        file.append(newfilename);
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance(Components.interfaces.nsIFileOutputStream);
	foStream.init(file, 0x02 | 0x08 | 0x20, 0664, 0);
	var charset = "UTF-8"; // Can be any character encoding name that Mozilla supports
	var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
             .createInstance(Components.interfaces.nsIConverterOutputStream);
	os.init(foStream, charset, 0, 0x0000);
	// The first parameter are list.dirName (list name)
	// list.listNickName (list nickname)
	// list.description (list description)
	// We write this data in the file, the first field is the "id" in the list window
	data = "ListName\t"+list.dirName+"\r\n"+"ListNickName\t"+list.listNickName+"\r\n"+"ListDescription\t"+ list.description+"\r\n";
	os.writeString(data);
	// list.addressLists return all the addresses as nsiSupportArray object
	var addresses = list.addressLists;
	var totalAddresses = list.addressLists.Count();
	// we write the addresses one by one in the file
	for ( var i = 0;  i < totalAddresses; i++ ) {
	        var card = list.addressLists.GetElementAt(i);
        	card = card.QueryInterface(Components.interfaces.nsIAbCard);
		if (card.displayName == "" && (card.firstName != "" && card.lastName != "")) {
			if (card.lastName != "")
				var cardname = card.firstName + " " + card.lastName;
			else
				var cardname = card.firstName;
		}
		else
			var cardname = card.displayName;
        	var address = gHeaderParser.makeFullAddressWString(cardname, card.primaryEmail);
		data = address + "\r\n";
		os.writeString(data);
	}
	os.close();
	foStream.close();
}

function preImportList1() {
	preImportList2('dirTree');
}

function preImportList2(abListItem) {
	importList(GetSelectedDirectory());
}

function importList(selectedAB) {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var delay = prefs.getIntPref("morecols.delay.open_window");
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("implist"), "Open","*thm");
	if (! file)
		return;
	// Open the new card dialog, we pass the nsifile to the new window
	var listDialog = window.openDialog("chrome://messenger/content/addressbook/abMailListDialog.xul", "",                    "chrome,resizable=no,titlebar,centerscreen", {selectedAB:selectedAB}, file);
	// After a short delay, we fill the dialog with the data read from the .thm file
	setTimeout(function(){listDialog.fillListDialog();}, delay);
}

function fillListDialog() {
	var addresses = new Array;
	var index = 0;
	// Open the nsifile
	var file = window.arguments[1];
	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                        .createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(file, 0x01, 0444, 0);
	istream.QueryInterface(Components.interfaces.nsILineInputStream);
	var lineData = {}, lines = [], hasmore;
	do {
		hasmore = istream.readLine(lineData);
		try {
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]
                       		 .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			var line = converter.ConvertToUnicode(lineData.value);
		}
		// If the UTF8 converter fails, we make no conversion
		catch(e) {
			var line = lineData.value;
		}
		index++;
		// For the first 3 lines, we must split the line in two parts, in the first one 
		// there's the id of the element, in the second one the value of the element
		if (index < 4) {
			var field = line.split("\t");
			document.getElementById(field[0]).value = field[1];
			continue;
		}
	// From the 4th line, we will have just addresses
	var myline = line;
	if (myline != "") 
		addresses[index-4] = myline; // Reuse of index var
	}  while(hasmore);
	istream.close();
	// Clone the original widget
	var listbox = document.getElementById('addressingWidget');
	var newListBoxNode = listbox.cloneNode(false);
	var templateNode = listbox.getElementsByTagName("listitem")[0];
	// Pass the nodes to the function
	createNewListBox(newListBoxNode, templateNode,addresses);
	// Replace the empty original node, with the new one filled
	var parent = listbox.parentNode;
	parent.replaceChild(newListBoxNode, listbox);
	setTimeout(AppendLastRow, 0);
}

function createNewListBox(newListBoxNode, templateNode, addresses) {
	// Fill the cloned node with the addresses and the ids
	for (i=0;i<addresses.length;i++) {
		var newNode = templateNode.cloneNode(true);
		newNode.getElementsByTagName("textbox")[0].value = addresses[i];
		newNode.getElementsByTagName("textbox")[0].setAttribute("id", "addressCol1#" + (i+1));
		newListBoxNode.appendChild(newNode);
	}
}

function copyABaddress(string) {
	var card = GetSelectedCard();
	var data = card[string];
	copyABdata(data);
}

function copyABdata(data) {
	// Generic function to copy the data
	var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"];
	clipboard = clipboard.getService(Components.interfaces.nsIClipboardHelper);
	clipboard.copyString(data);
}

function copyABall() {
	var card = GetSelectedCard();
	// Copy all the important field of the card
	var allfields = "";
	allfields += MCbundle.GetStringFromName("name") + " : "+ gAddrbookSession.generateNameFromCard(card, gPrefs.getIntPref("mail.addr_book.lastnamefirst")) + "\r\n";
	allfields += MCbundle.GetStringFromName("email") + " : "+ card.primaryEmail + "\r\n";
	allfields += MCbundle.GetStringFromName("email2") + " : "+ card.secondEmail + "\r\n";
	allfields += MCbundle.GetStringFromName("aim") + " : "+ card.aimScreenName + "\r\n";
	allfields += MCbundle.GetStringFromName("hometel") + " : "+ card.homePhone + "\r\n";
	allfields += MCbundle.GetStringFromName("worktel") + " : "+ card.workPhone + "\r\n";
	allfields += MCbundle.GetStringFromName("faxnumber") + " : "+ card.faxNumber + "\r\n";
	allfields += MCbundle.GetStringFromName("celltel") + " : "+ card.cellularNumber + "\r\n";
	allfields += MCbundle.GetStringFromName("pager") + " : "+ card.pagerNumber + "\r\n";
	allfields += MCbundle.GetStringFromName("homeweb") + " : "+ card.webPage2 + "\r\n";
	allfields += MCbundle.GetStringFromName("workweb") + " : "+ card.webPage1 + "\r\n";
	allfields += MCbundle.GetStringFromName("homeaddress") + " " + homeAddress(false) + "\r\n";
	allfields += MCbundle.GetStringFromName("workaddress") +  " " + workAddress(false) + "\r\n";
	allfields += MCbundle.GetStringFromName("workcompany") + " "+ card.jobTitle+" "+ card.department+" "+card.company + "\r\n";
	allfields += MCbundle.GetStringFromName("BirthDate") + " : "+   formatDayMonthYear(card.birthDay, card.birthMonth, card.birthYear) + "\r\n";
	allfields += MCbundle.GetStringFromName("Category") + " : "+ card.category + "\r\n";
	allfields += MCbundle.GetStringFromName("Notes") + " : "+ card.notes;
	var clipboard = Components.classes["@mozilla.org/widget/clipboardhelper;1"];
	clipboard = clipboard.getService(Components.interfaces.nsIClipboardHelper);
	clipboard.copyString(allfields);
}

function addressFormat() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var addrformat = prefs.getIntPref("morecols.address.format");
	if (addrformat > 1)
		addrformat = 0;
	return addrformat;
}	

// In these two functions the flag parameter is used to select the format of the data.
// It's "true" if we want a pretty format, "false" if we want a raw format

function homeAddress(flag) {
	var card = GetSelectedCard();
	// Create the home address, with 5 fields
	var sep = flag ? "\r\n" : " ";
	var string = "";
	var HomeAddress = "";
	// Choose format for address (european or american)
	var addrformat = addressFormat();
	if (addrformat == 0) 
		HomeAddress = card.homeAddress + " " + card.homeAddress2 +  sep + card.homeZipCode + " " + card.homeCity + " " + card.homeState + " " + card.homeCountry;
	else
		HomeAddress = card.homeAddress + " " + card.homeAddress2 +  sep + card.homeCity + ", " + card.homeState + " " + card.homeZipCode + " " + card.homeCountry;
	if (HomeAddress.length > 7)
		return HomeAddress;
	else
		return "";
}	

function workAddress(flag) {
	var card = GetSelectedCard();
	// Create the home address, with 5 fields
	var sep = flag ? "\r\n" : " ";
	var string = "";
	var WorkAddress = "";
	// Choose format for address (european or american)
	var addrformat = addressFormat();
	if (addrformat == 0) 
		WorkAddress = card.workAddress + " " + card.workAddress2 +  sep + card.workZipCode + " " + card.workCity + " " + card.workState + " " + card.workCountry;
	else
		WorkAddress = card.workAddress + " " + card.workAddress2 +  sep + card.workCity + ", " + card.workState + " " + card.workZipCode + " " + card.workCountry;
	if (WorkAddress.length > 7)
		return WorkAddress;
	else
		return "";
}

function copyHomeAddress(flag) {
	var card = GetSelectedCard();
	var HomeAddress = homeAddress(flag);
	var data = card.firstName+" "+card.lastName+"\r\n" + HomeAddress;
	copyABdata(data);
}

function copyWorkAddress(flag) {
	var card = GetSelectedCard();
	var WorkAddress = workAddress(flag);
	var data = card.firstName+" "+card.lastName+"\r\n";
	if (card.jobTitle != "")
		data = data+card.jobTitle+"\r\n";
	if (card.department != "")	
		data = data+card.department+"\r\n";
	if (card.company != "")
		data = data+card.company+"\r\n";
	data = data + WorkAddress;
	copyABdata(data);
}

function exportCard() {
	var data;
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("expcard"),"GetFolder","all");
	if (! file)
		return;
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance(Components.interfaces.nsIFileOutputStream);
	var charset = "UTF-8"; // Can be any character encoding name that Mozilla supports
	var os = Components.classes["@mozilla.org/intl/converter-output-stream;1"]
		.createInstance(Components.interfaces.nsIConverterOutputStream);
	var cards = GetSelectedContacts();
	for (var j=0;j<cards.length;j++) {
		data = "";
		var clone = file.clone();
		var card = cards[j];
		// The name of the .tha file is taken from the display name, replacing the spaces with underscores
		if ( card.displayName == "") 
			filename = card.primaryEmail;
		else
			filename = card.displayName;
		if (filename != "")
			filename = normalizeFileName(filename);
		else
			filename = "unknown";
		var newfilename = findGoodName(filename, clone,".tha");
		clone.append(newfilename);
		// Open the streamto write the data of the card into the file .tha
		// We write all the properties of the card object, except the functions
		// Not all of them are useful, but it's a quick code!
		for (var i in card) {
			if (typeof card[i] != "function") 
				data = data +i+"\t"+card[i]+"\r\n";
			foStream.init(clone, 0x02 | 0x08 | 0x20, 0664, 0);
			os.init(foStream, charset, 0, 0x0000);
			os.writeString(data);
			os.close();
			foStream.close();
		}
	}
}

function preImportCard1(vcard) {
	preImportCard2('dirTree',vcard);
}

function preImportCard2(abListItem,vcard) {
	if (vcard == 0)
		openVcard(GetSelectedDirectory());
	else	if (vcard == 1)
		MFFABimportFromVcard(GetSelectedDirectory());
	else if (vcard == 2)
		importCard(GetSelectedDirectory());
}


function importCard(selectedAB) {
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("impcont"),"Open","*tha");
	if (! file)
		return;
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var delay = prefs.getIntPref("morecols.delay.open_window");
	// Open the new card dialog, we pass the nsifile to the new window
	var cardDialog = window.openDialog("chrome://messenger/content/addressbook/abNewCardDialog.xul", "", "chrome,resizable=no,titlebar,centerscreen",{selectedAB:selectedAB},file,true);
	// After a short delay, we fill the dialog with the data read from the .tha file
	setTimeout(function(){cardDialog.fill4import();}, delay);
}


function fill4import() {
	// Open the nsifile
	var file = window.arguments[1];
	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                        .createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(file, 0x01, 0444, 0);
	istream.QueryInterface(Components.interfaces.nsILineInputStream);
	var lineData = {}, lines = [], hasmore;
	do {
		// We set the elements' values of the dialog according the data read from the file, line by line
		// Note that the name of the elements are the same of the properties of the nsiabcard (except one)
		// but the first letter is capital
		hasmore = istream.readLine(lineData);
		try {
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"]
                       		 .createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			var line = converter.ConvertToUnicode(lineData.value);
		}
		// If the UTF8 converter fails, we make no conversion
		catch(e) {
			var line = lineData.value;
		}
		var cardvalue = line.split("\t");
		var ab = cardvalue[0];
		if (ab == "preferMailFormat" )
			// It's the property with a different name 
			document.getElementById('PreferMailFormatPopup').value = cardvalue[1];
		else if (ab == "allowRemoteContent") {
			if (cardvalue[1].indexOf("true") > -1)
				document.getElementById('allowRemoteContent').checked = true;
			else
				document.getElementById('allowRemoteContent').checked = false;
		}
		else if (ab != "lastModifiedDate") {
			var docId = ab.replace(ab.substring(0,1), ab.substring(0,1).toUpperCase());
			try { document.getElementById(docId).value = cardvalue[1]; }
			catch(e) {}
	   	}
	} while(hasmore);
	istream.close();
}

function editAsNewCard() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
	var delay = prefs.getIntPref("morecols.delay.open_editasnew");
	var card = GetSelectedCard();
	var selectedAB = GetSelectedDirectory();
	// Open the new card dialog, we pass the nsiabcard to the new window
	var cardDialog = window.openDialog("chrome://messenger/content/addressbook/abNewCardDialog.xul",
                    "", "chrome,resizable=no,titlebar,centerscreen",{selectedAB:selectedAB}, card,true);
	// After a short delay, we fill the dialog with the data of the opened card
	setTimeout(function(){cardDialog.fill4edit();}, delay);
}

function fill4edit() {
	// We copy the properties of nsiabcard in elements' values of the dialog
	var card = window.arguments[1];
	for (var i in card) {
		if (typeof card[i] != "function") {
			if (i == "preferMailFormat" )
				document.getElementById('PreferMailFormatPopup').value = card[i];
			else if (i == "allowRemoteContent") 
				document.getElementById('allowRemoteContent').checked = card[i];
			else if (i != "lastModifiedDate") {
				var docId = i.replace(i.substring(0,1), i.substring(0,1).toUpperCase());
				try {document.getElementById(docId).value = card[i]; }
				catch(e) {}
			}
		}
	}
	addPhoto(null,null);
}

function exportABasMab() {
	// This is the uri of the AB
	var dirsel = GetSelectedDirectory();
	// Find the AB displayed name (works just on TB 1.5 or higher)
	if (dirTree.columns)
		var dirDisplayedName = dirTree.view.getCellText(dirTree.currentIndex, dirTree.columns.getFirstColumn());
	// Extract the .mab filename
	var dirname = dirsel.substring(dirsel.indexOf("//")+2);
	var dirfile = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
	// AB file as nsIFile
	dirfile.append(dirname);
	var file = getFileFromFilePicker(MCbundle.GetStringFromName("expmab"),"GetFolder","all");
	if (dirDisplayedName) {
		var exportedName = normalizeFileName(dirDisplayedName);
		exportedName = findGoodName(exportedName, file, ".mab");
		dirfile.copyTo(file, exportedName);
	}
	else {
		// On TB 1.0 the exported file has the original name (for ex. abook.mab)
		var exportedName = findGoodName(dirname, file, ".mab");
		dirfile.copyTo(file, exportedName);
	}
}

function openDialogForMabImport() {
	var dialog = window.openDialog("chrome://messenger/content/addressbook/abAddressBookNameDialog.xul", 
     "", "chrome,modal=yes,resizable=no,centerscreen", {title: MCbundle.GetStringFromName("impmabname"), okCallback:importMabFile});
}


function importMabFile(aName,aFile) {
	var deleteFile = false;
	if (! aFile) {
		var file = getFileFromFilePicker(MCbundle.GetStringFromName("impmab"), "Open","*mab");
		if (! file)
			return;
	}
	else {
		var file = aFile;
		deleteFile = true;
	}
	var properties = Components.classes["@mozilla.org/addressbook/properties;1"].createInstance(Components.interfaces.nsIAbDirectoryProperties);
	properties.description = aName;
	properties.dirType = kPABDirectory;
	var addressbook = Components.classes["@mozilla.org/addressbook;1"].createInstance(Components.interfaces.nsIAddressBook);
	// Create a new empty AB 
	addressbook.newAddressBook(properties);
	var addname = properties.fileName;
	var profdir = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
	// Find the new empty AB as nsIFile and...
	profdir.append(addname);
	// ... it's deleted and ...
	profdir.remove(false);
	var profdir2 = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
	// ... is replaced by the imported mab file
	file.copyTo(profdir2,addname);
	if (deleteFile)
		file.remove(false);
}

function recoverAddrBook() {
	var goon = confirm(MCbundle.GetStringFromName("recover"));
	if (! goon)
		return;
	// This is the uri of the AB
	var dirsel = GetSelectedDirectory();
	// Extract the .mab filename
	var dirname = dirsel.substring(dirsel.indexOf("//")+2);
	var dirfile = Components.classes["@mozilla.org/file/directory_service;1"]
                     .getService(Components.interfaces.nsIProperties)
                     .get("ProfD", Components.interfaces.nsIFile);
	var dirfile2 = dirfile.clone();
	// AB file as nsIFile
	dirfile.append(dirname);
	var randnum = 10000+Math.round(Math.random()*99999);
	dirfile2.append(randnum.toString());
	dirfile2.createUnique(0,0644);
	var istream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                        .createInstance(Components.interfaces.nsIFileInputStream);
	istream.init(dirfile, 0x01, 0444, 0);
	istream.QueryInterface(Components.interfaces.nsILineInputStream);

	var mylines = "";
	var chunk = "";
	var flag = false;
	// read lines into array
	var line = {}, lines = [], hasmore;
	do {
		var bad = false;
		hasmore = istream.readLine(line);
		var linecontent = line.value;
		if (linecontent.indexOf("@$${") == 0) {
			flag = true;
			chunk = chunk + line.value+"\r\n";
		}
		else if (linecontent.indexOf("@$$}") == 0) {
			var emailregex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;
			var test = chunk.toUpperCase().match(emailregex);
			if (test)
				mylines = mylines+chunk+linecontent+"\r\n";
			else
				bad = true;
			chunk = "";
			flag = false;
		}
		else if (flag)
			chunk = chunk + line.value + "\r\n";
		else if (! flag && ! bad)
			mylines = mylines+line.value+"\r\n";
	} while(hasmore);
	istream.close();
	
	// file is nsIFile, data is a string
	var foStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);

	// use 0x02 | 0x10 to open file for appending.
	foStream.init(dirfile2, 0x02 | 0x08 | 0x20, 0664, 0); // write, create, truncate
	foStream.write(mylines, mylines.length);
	foStream.close();
	var filename = dirfile2.leafName.replace(".mab","");
	importMabFile(filename,dirfile2)
}

function openPhotoByPopup(event) {
	var url = document.getElementById("photo").getAttribute("src");
	if (url != "")
		window.openDialog(url,"","resizable=no,height=500,width=500,chrome=yes,centerscreen");
}
	
function abContentPopupShowing() {
	if (! document.getSelection || document.getSelection() == "")
		document.getElementById("abContentPopupItem1").disabled = true;
	else
		document.getElementById("abContentPopupItem1").disabled = false;
	var photoURL = document.getElementById("photo").getAttribute("src");
	if (photoURL.length == 0)
		document.getElementById("abContentPopupItem2").setAttribute("disabled","true");
	else
		document.getElementById("abContentPopupItem2").removeAttribute("disabled");
}

function openEditMultipleCards() {
	var cards = GetSelectedContacts();
	var ABuri = GetSelectedDirectory();
	openDialog("chrome://morecols/content/editMultipleCards.xul","","chrome,modal,centerscreen", cards, ABuri );
}

function modifyCardsProperty() {
	var cards = window.arguments[0];
	var ABuri = window.arguments[1];
	for (i=0;i<cards.length;i++) {
		if (! cards[i].isMailList) {
			if (document.getElementById("catCheck").checked)
				cards[i].category = document.getElementById("cat").value;
			if (document.getElementById("compCheck").checked)
				cards[i].company = document.getElementById("comp").value;
			if (document.getElementById("cust1.label").checked)
				cards[i].custom1 = document.getElementById("cust1").value;
			if (document.getElementById("cust2.label").checked)
				cards[i].custom2 = document.getElementById("cust2").value;
			if (document.getElementById("cust3.label").checked)
				cards[i].custom3 = document.getElementById("cust3").value;
			if (document.getElementById("cust4.label").checked)
				cards[i].custom4 = document.getElementById("cust4").value;
			if (document.getElementById("preferMailFormatCheck").checked)
				cards[i].preferMailFormat = document.getElementById("preferMailFormatList").value;
			if (document.getElementById("allowRemoteContentCheck").checked) {
				if (document.getElementById("allowRemoteContentList").value == "0")
					cards[i].allowRemoteContent = false;
				else
					cards[i].allowRemoteContent = true;
			}
			if (document.getElementById("faxCheck").checked)
				cards[i].faxNumber = document.getElementById("fax").value;
			if (document.getElementById("titleCheck").checked)
				cards[i].jobTitle = document.getElementById("title").value;
			if (document.getElementById("departCheck").checked)
				cards[i].department = document.getElementById("depart").value;
			if (document.getElementById("waddressCheck").checked)
				cards[i].workAddress = document.getElementById("waddress").value;
			if (document.getElementById("wcityCheck").checked)
				cards[i].workCity = document.getElementById("wcity").value;
			if (document.getElementById("wstateCheck").checked)
				cards[i].workState = document.getElementById("wstate").value;
			if (document.getElementById("wcodeCheck").checked)
				cards[i].workZipCode = document.getElementById("wcode").value;
			if (document.getElementById("wcountryCheck").checked)
				cards[i].workCountry = document.getElementById("wcountry").value;
			if (document.getElementById("wwebCheck").checked)
				cards[i].webPage1 = document.getElementById("wweb").value;
			if (document.getElementById("wtelCheck").checked)
				cards[i].workPhone = document.getElementById("wtel").value;
			cards[i].editCardToDatabase(ABuri);
		}
	}
}
