<script lang="ts">
	import { refreshMobs } from '../lifeCycle/data';

	let mobs: Array<string> = [];
	let mobsSelected = window.config.mobs ?? [];
	let huntAfterRevive = window.config.fight.huntAfterRevive;
	let huntAfterFight = window.config.fight.huntAfterFight;
	let reviveAfterDead = window.config.fight.reviveAfterDead;

	$: window.config.mobs = mobsSelected;
	$: window.config.fight.huntAfterRevive = huntAfterRevive;
	$: window.config.fight.huntAfterFight = huntAfterFight;
	$: window.config.fight.reviveAfterDead = reviveAfterDead;

	function onUpdate(removeSelected = true) {
		mobs = [];
		refreshMobs();
		if (removeSelected) mobsSelected = [];
		window.stat.mobs.forEach(({ name }) => {
			if (!mobs.includes(name) && !mobsSelected.includes(name)) {
				mobs = [...mobs, name];
			}
		});
		mobs = [...mobs, ...mobsSelected];
	}
	onUpdate(false);
</script>

<div>
	<button on:click={() => onUpdate()}>Update</button>
	<select bind:value={mobsSelected} multiple>
		{#each mobs as mob}
			<option value={mob}>{mob}</option>
		{/each}
	</select>
</div>
<div>
	<label>Hunt after Revive: <input type="checkbox" bind:checked={huntAfterRevive} /></label>
</div>
<div>
	<label>Hunt after Fight: <input type="checkbox" bind:checked={huntAfterFight} /></label>
</div>
<div>
	<label>Revive after Dead: <input type="checkbox" bind:checked={reviveAfterDead} /></label>
</div>
