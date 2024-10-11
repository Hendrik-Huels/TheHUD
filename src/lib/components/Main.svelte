<script lang="ts">
	import { onMount } from 'svelte';
	import Settings from './Settings.svelte';
	import Hunt from './Hunt.svelte';
	import Fight from './Fight.svelte';
	import { startLoop, stopLoop } from '../utils/handleLoop';
	import DevTools from './DevTools.svelte';

	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;
	let position = $state({ top: 100, left: 100 }); // Initial position
	let minimize = $state(false);

	let selectedWindow: 'settings' | 'hunt' | 'fight' | 'devTools' = $state('settings');

	function onPointerDownUI(event: MouseEvent) {
		event.stopPropagation();
		const target = event.target as HTMLDivElement;
		if (target.tagName !== 'DIV') return;
		isDragging = true;
		offsetX = event.clientX - position.left;
		offsetY = event.clientY - position.top;
	}

	function onMouseMoveUI(event: MouseEvent) {
		if (isDragging) {
			position.left = event.clientX - offsetX;
			position.top = event.clientY - offsetY;
		}
	}

	function onMouseUpUI() {
		isDragging = false;
	}

	onMount(() => {
		// Attach mousemove and mouseup events
		window.addEventListener('mousemove', onMouseMoveUI);
		window.addEventListener('mouseup', onMouseUpUI);

		// Cleanup event listeners when the component is destroyed
		return () => {
			window.removeEventListener('mousemove', onMouseMoveUI);
			window.removeEventListener('mouseup', onMouseUpUI);
		};
	});

	function onClickMinimize() {
		minimize = !minimize;
	}

	function checkboxLoop(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.checked) {
			startLoop();
		} else {
			stopLoop();
		}
	}
</script>

<div
	style="position: absolute; top: {position.top}px; left: {position.left}px; width: {minimize
		? '110'
		: '310'}px; height: {minimize
		? '32'
		: '200'}px; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); background-color: white; overflow: hidden; white-space: nowrap;"
>
	<div
		style="background-color: #3b82f6; color: white;	padding: 0.5rem; cursor: move; user-select: none;"
		onpointerdown={onPointerDownUI}
	>
		<button style="width: 73px; margin-right: 8px;" onclick={onClickMinimize}
			>{minimize ? 'Maximize' : 'Minimize'}</button
		>
		<label><input onchange={checkboxLoop} type="checkbox" />Loop</label>
		<button style="margin-left: 8px;" onclick={() => (selectedWindow = 'settings')}>Settings</button
		>
		<button onclick={() => (selectedWindow = 'hunt')}>Hunt</button>
		<button onclick={() => (selectedWindow = 'fight')}>Fight</button>
		<!-- <button on:click={() => (selectedWindow = 'devTools')}>DevTools</button> -->
	</div>
	<div style="padding: 1rem;">
		{#if selectedWindow === 'settings'}
			<Settings />
		{:else if selectedWindow === 'hunt'}
			<Hunt />
		{:else if selectedWindow === 'fight'}
			<Fight />
		{:else if selectedWindow === 'devTools'}
			<DevTools />
		{/if}
	</div>
</div>
