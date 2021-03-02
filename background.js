function fileName(string) {
	const invalid = ["/", "?", "<", ">", "\\", ":", "*", "|", "\""];
	let valid = "";
	for (let i = 0; i < string.length; i++) {
		if (invalid.includes(string[i]))
			valid += "_";
		else
			valid += string[i];
	}
	return valid;
}

function runDownloadScript() {
	chrome.browserAction.onClicked.addListener((tab) => {
		// send message to the current tab's content script (link.js)
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			// message is clicked here
			chrome.tabs.sendMessage(tabs[0].id, { clicked: true }, (res) => {
				chrome.downloads.download({
					url: res.url,
					filename: fileName(res.saveAs),
					saveAs: true
				});
			})
		});
	});
}

runDownloadScript();