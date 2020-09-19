let video_url, deliveryTitle;

function getLink() {
	if (window.location.href.includes("panopto.com/Panopto/Pages/Viewer.aspx")) {
		window.addEventListener("load", (e) => {

			if (document.readyState === 'complete') {

				let t = setInterval(() => {
					video_url = document.querySelector(`meta[property="og:video:secure_url"]`).content;
					deliveryTitle = document.querySelector('#viewerHeader #deliveryTitle').innerText.trim();

					if (video_url && deliveryTitle) {
						clearInterval(t);
					}
				}, 100)
			};
		})
	}
}
getLink();

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
	if (req.clicked) {
		if (video_url && deliveryTitle)
			sendResponse({
				saveAs: deliveryTitle,
				url: video_url
			})
	}
});