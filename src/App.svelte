<script lang="ts">
	import { onMount } from 'svelte';
	import Main from './lib/components/Main.svelte';
	import { stopLoop } from './lib/utils/handleLoop';
	import resetStat from './lib/utils/resetStat';
	import mergeConfig from './lib/utils/mergeConfig';
	import { chatObserverDisconnect } from './lib/utils/chatObserve';

	chatObserverDisconnect();
	resetStat();
	mergeConfig();
	stopLoop();

	onMount(() => {
		return () => {
			stopLoop();
		};
	});
</script>

<Main />
