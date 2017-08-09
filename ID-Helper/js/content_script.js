console.log("Content Script is working...")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	console.log("On Message Listener is triggered.");
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	var type = request.type;
	var idField = document.getElementById(request.idId);
	var displayNameField = document.getElementById(request.displayNameId);
	
	if(!idField) {
		sendResponse({result: "ID Field cannot be found."});
		return;
	}
	
	if(!displayNameField) {
		sendResponse({result: "Display Name Field cannot be found."});
		return;
	}
	
    if (type == "ID_TO_DISPLAY") {
		displayNameField.value = idField.value.toTitleCase();
	} else {
		idField.value = displayNameField.value.toCamelCase();
	}
    sendResponse({result: "Updated"});
  });
  
  
String.prototype.toCamelCase = function () {
    return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

String.prototype.toTitleCase = function () {
    return this.toCamelCase().replace(/(?:^)\w/g, function(match) {
        return match.toUpperCase();
    }).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}