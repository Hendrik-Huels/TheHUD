<script lang="ts">
	import log from 'loglevel';
	import type { LogLevelDesc } from 'loglevel';
	import { chatObserverConnect, chatObserverDisconnect } from '../utils/chatObserve';

	let foodToggle = $state(window.config.food.enabled);
	let textInputValue = $state(convertArrayToString(window.config.chatFilter));
	let chatObserverValue = $state(window.config.chatIsObserving);
	let foodHpPercentage = $state(window.config.food.hp);
	let foodMpPercentage = $state(window.config.food.mp);

	$effect(() => {
		window.config.food.enabled = foodToggle;
	});
	$effect(() => {
		window.config.food.hp = foodHpPercentage;
	});
	$effect(() => {
		window.config.food.mp = foodMpPercentage;
	});

	function changeLogLevel(e: Event) {
		const target = e.target as HTMLSelectElement;
		const selectedValue = target.value as LogLevelDesc;
		log.setLevel(selectedValue);
	}

	function toggleObserver(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!target.checked) {
			chatObserverDisconnect();
			return;
		}
		if (!chatObserverConnect()) {
			target.checked = false;
			return;
		}
	}

	function reloadChat() {
		const target = document.getElementById('chat') as HTMLIFrameElement | null;
		const tmp = chatObserverValue;
		if (tmp) {
			chatObserverValue = false;
			chatObserverDisconnect();
		}

		if (target && target.contentWindow) {
			target.contentWindow.location.reload();
		} else {
			console.error('Iframe not found or inaccessible');
		}
		if (tmp) {
			if (chatObserverConnect()) {
				chatObserverValue = true;
				return;
			}
			console.log('Observer reload failed, try manually');
		}
	}

	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		window.config.chatFilter = target.value.split(',').map((str) => str.trim());
	}

	// Convert array back to a semicolon-separated string
	function convertArrayToString(stringArray: Array<string>) {
		return stringArray.join(', ');
	}
</script>

<div>
	<label onchange={changeLogLevel}
		>Log Level: <select>
			<option value="error">Error</option>
			<option value="warn">Warn</option>
			<option value="info">Info</option>
			<option value="debug">Debug</option>
			<option value="trace">Trace</option>
		</select></label
	>
</div>
<div>
	<label>Use Food: <input bind:checked={foodToggle} type="checkbox" /></label>
	<label>HP %: <input bind:value={foodHpPercentage} type="number" max="100" min="0" /></label>
	<label>MP %: <input bind:value={foodMpPercentage} type="number" max="100" min="0" /></label>
</div>
<div>
	<label
		>Chat Observer: <input
			bind:checked={chatObserverValue}
			onchange={toggleObserver}
			type="checkbox"
		/></label
	><button onclick={reloadChat}>Reload Chat?</button>
</div>
<div>
	<label
		>Chat Filter: <input
			bind:value={textInputValue}
			onchange={handleInputChange}
			type="text"
		/></label
	>
</div>
