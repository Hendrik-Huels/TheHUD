import {
	changeModeToAttack,
	activateAura,
	attackCombo,
	handlePotions,
	usePotion,
	bow,
	spell
} from './utils';

export default function fightSandAlka() {
	handlePotions();

	if (!window.stat.fight.aura && window.stat.fight.mode === 'attack' && window.stat.mpCur > 162) {
		activateAura(1);
	}

	switch (window.config.fight.turn) {
		case 1:
		case 2:
			if (
				window.stat.fight.mode === 'spells' &&
				!('absoluteUnverwundbarkeit' in window.stat.fight.myEffects)
			) {
				spell('d');
			}

			if (
				window.stat.fight.mode === 'spells' &&
				'absoluteUnverwundbarkeit' in window.stat.fight.myEffects
			) {
				changeModeToAttack();
			}
			if (
				window.stat.fight.aura &&
				window.stat.hpCur > 800 &&
				window.stat.mpCur > 69 &&
				window.stat.fight.mode === 'attack'
			) {
				attackCombo();
			}
			break;
		case 3:
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}

			if (!('bow_crit' in window.stat.fight.enemyEffects) && window.stat.fight.bowEnergie >= 72) {
				bow('k');
			}

			if (
				window.stat.fight.aura &&
				'bow_crit' in window.stat.fight.enemyEffects &&
				'elixir_power' in window.stat.fight.myEffects &&
				window.stat.hpCur > 800 &&
				window.stat.mpCur > 69 &&
				window.stat.fight.mode === 'attack'
			) {
				attackCombo();
			}
			break;
		default:
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}
			if (
				window.stat.fight.aura &&
				('elixir_power' in window.stat.fight.myEffects ||
					window.stat.items.Power.slot.length === 0) &&
				window.stat.hpCur > 800 &&
				window.stat.mpCur > 69 &&
				window.stat.fight.mode === 'attack'
			) {
				attackCombo();
			}
	}
}
