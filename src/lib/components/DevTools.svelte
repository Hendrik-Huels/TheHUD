<!-- <script lang="ts">
	import { onMount } from 'svelte';

	// let locked: boolean | undefined | null;
	let pathname = window.main_frame.main.document.location.pathname;
	let locked = window.iframe_locked

	onMount(() => {
		let intervalID = setInterval(() => {
			locked = window.iframe_locked
		}, 10);
		return () => {
			clearInterval(intervalID);
		};
	});
</script>

<p>Locked: {locked}</p>
<p>Selected: {selected}</p> -->
