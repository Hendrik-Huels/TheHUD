import { base64Audio } from './audio';

export function chatObserverDisconnect() {
	if (!window?.config?.chatIsObserving) {
		console.log('Chat observer disconnecting fails, not even connected');
		return true;
	}
	if (window?.config?.chatObserver) {
		window.config.chatObserver.disconnect();
		window.config.chatIsObserving = false;
		console.log('Chat observer disconnect');
		return true;
	}
	return false;
}

export function chatObserverConnect() {
	if (window.config.chatIsObserving) {
		console.log('Chat observer could not be connected. Already Observing');
		return false;
	}

	window.config.chatObserver = new MutationObserver(observerCallback);

	const targetNode: HTMLDivElement | null =
		window.chat.chat_text.document.querySelector('#content > div');

	if (!targetNode) {
		console.log('Chat observer could not be connected. Target not found');
		return false;
	}

	window.config.chatObserver.observe(targetNode, { childList: true });
	window.config.chatIsObserving = true;
	console.log('Chat observer connected');
	return true;
}

export function observerCallback(mutations: MutationRecord[]) {
	mutations.forEach((mutation) => {
		mutation.addedNodes.forEach((node) => {
			const target = node as HTMLDivElement;
			window.config.chatFilter.forEach((text) => {
				if (target.innerText.toLowerCase().includes(text.toLowerCase())) {
					console.log('Warn: Du wurdest angeschrieben');
					console.log(target.innerText);
					const audio = new Audio(base64Audio);
					audio.play();
				}
			});
		});
	});
}
