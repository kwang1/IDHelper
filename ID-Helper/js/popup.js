var handleResponse = function(response) {
	if(response.result) {
		document.getElementById("result").innerHTML = response.result;
	}
};

var sendRequest = function (displayNameId, idId, type) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {displayNameId: displayNameId, idId: idId, type: type}, handleResponse);
	});
   
}

window.onload = function(){
	document.getElementById("convertToDisplayName").addEventListener("click", function(event) {
		var displayNameId = document.getElementById("displayNameId").value;
		var idId = document.getElementById("idId").value;
		
		sendRequest(displayNameId, idId, "ID_TO_DISPLAY");
	});


	document.getElementById("convertToId").addEventListener("click", function(event) {
		var displayNameId = document.getElementById("displayNameId").value;
		var idId = document.getElementById("idId").value;
		
		sendRequest(displayNameId, idId, "DISPLAY_TO_ID");
	});

}