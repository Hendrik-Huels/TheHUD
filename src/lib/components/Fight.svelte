<script lang="ts">
	let fightmode = window.config.fight.mode;
	let life = window.config.fight.life;
	let mana = window.config.fight.mana;

	$: window.config.fight.mode = fightmode;
	$: window.config.fight.life = life;
	$: window.config.fight.mana = mana;
</script>

<div>
	<select bind:value={fightmode}>
		<option value="basic">basic</option>
		<option value="easy">easy</option>
		<option value="RachNormal">RachNormal</option>
		<option value="RachFullBuffed">RachFullBuffed</option>
		<option value="Schaiss">Schaiss</option>
		<option value="Neferto">Neferto</option>
	</select>
</div>
<div>
	<div><label>HP: <input bind:value={life} type="number" /></label></div>
	<div><label>MP: <input bind:value={mana} type="number" /></label></div>
</div>
