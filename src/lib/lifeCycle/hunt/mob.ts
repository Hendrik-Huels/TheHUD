import food from './utils';

export default function huntMob() {
	if (window.stat.hpCur === 0) {
		window.main_frame.processMenu('b06');
		return;
	}

	// If no mob is selected return
	if (window.config.mobs.length === 0) return;
	// If no mob is registered return
	if (window.stat.mobs.length === 0) return;

	// If HP and Mana full not full, eat
	food();

	// Filter all mobs from selected that are not currently on the map
	let cmob = window.config.mobs.filter((mob) => window.stat.mobs.some((m) => m.name === mob));
	// Get Random Mob from selected and filtered ones
	let selectedMob = cmob[Math.floor(Math.random() * cmob.length)];
	for (const mob of window.stat.mobs) {
		if (
			mob.name === selectedMob &&
			mob.fight_id !== 0 &&
			!window.config.fight.triedAttack.includes(mob.id)
		) {
			console.log('Attack');
			window.main_frame.main.huntAttack(mob.id, false);
			window.config.fight.turn = 1;
			window.config.fight.lastComboStep = 0;
			window.config.fight.triedAttack.push(mob.id);
			return true;
		}
	}
}
