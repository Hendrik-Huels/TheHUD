export function stopLoop() {
	if (window?.config?.loopIntervalID !== null) {
		clearInterval(window.config.loopIntervalID);
		window.config.loopIntervalID = null;
		window.config.loopRuns = false;
	}
}
export function startLoop() {
	if (window?.config?.loopIntervalID === null) {
		window.config.loopIntervalID = setInterval(() => {
			window.config.loop();
		}, window.config.sleep);
	}
}
