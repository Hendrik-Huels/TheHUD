import App from './App.svelte';
import log from 'loglevel';
import { mount, unmount } from 'svelte';

log.setLevel('info');

log.info(__APP_VERSION__);

// Check if context top (top, main_frame etc...)
if (!(window === window.top)) throw new Error('Wrong Context, go to top context!');

// remove Main App
if (window?.troublemaker) {
	window.unmount(window.troublemaker);
}

const gui = document.getElementById('troublemakerEntry');

if (!gui) {
	const newDiv = document.createElement('div');
	newDiv.id = 'troublemakerEntry';
	document.body.appendChild(newDiv);
	newDiv.attachShadow({ mode: 'open' });
}

const shadowRoot = (document.getElementById('troublemakerEntry') as HTMLDivElement).shadowRoot;
if (!shadowRoot) throw Error('Problem with shadow root');
shadowRoot.addEventListener('keypress', (event) => {
	// Prevent the event from propagating outside of the Shadow DOM
	event.stopPropagation();
});
shadowRoot.addEventListener('keydown', (event) => {
	// Prevent the event from propagating outside of the Shadow DOM
	event.stopPropagation();
});
shadowRoot.addEventListener('keyup', (event) => {
	// Prevent the event from propagating outside of the Shadow DOM
	event.stopPropagation();
});

window.troublemaker = mount(App, {
	target: shadowRoot
});

window.unmount = unmount;
