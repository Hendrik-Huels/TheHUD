<script lang="ts">
	let fightmode = $state(window.config.fight.mode);
	let life = $state(window.config.fight.life);
	let mana = $state(window.config.fight.mana);

	$effect(() => {
		window.config.fight.mode = fightmode;
	});
	$effect(() => {
		window.config.fight.life = life;
	});
	$effect(() => {
		window.config.fight.mana = mana;
	});
</script>

<div>
	<select bind:value={fightmode}>
		<option value="basic">basic</option>
		<option value="easy">easy</option>
		<option value="RachNormal">RachNormal</option>
		<option value="RachFullBuffed">RachFullBuffed</option>
		<option value="Schaiss">Schaiss</option>
		<option value="Neferto">Neferto</option>
		<option value="SandAlka">SandAlka</option>
	</select>
</div>
<div>
	<div><label>HP: <input bind:value={life} type="number" /></label></div>
	<div><label>MP: <input bind:value={mana} type="number" /></label></div>
</div>
