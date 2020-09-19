let download = false;

function runDownloadScript() {
	chrome.browserAction.onClicked.addListener((tab) => {
		// send message to the current tab's content script (link.js)
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			// message is clicked here
			chrome.tabs.sendMessage(tabs[0].id, { clicked: true }, (res) => {
				chrome.downloads.download({
					url: res.url,
					filename: res.saveAs,
					saveAs: false
				});
			})
		});
	});
}

runDownloadScript();