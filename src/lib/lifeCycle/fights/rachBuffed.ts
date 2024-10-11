import {
	activateAura,
	attackCombo,
	bow,
	changeModeToAttack,
	handlePotions,
	spell,
	toggleBlock,
	usePotion
} from './utils';

export default function fightRach() {
	handlePotions();

	// return if can't attack
	// if (!(window.stat.fight.myTurn && window.stat.fight.opponentNick !== '')) {
	// 	return;
	// }

	if (
		!window.stat.fight.aura &&
		window.stat.mpCur > 162 &&
		!(window.config.fight.turn === 3) &&
		window.stat.fight.mode === 'attack'
	) {
		activateAura(1);
	}
	switch (window.config.fight.turn) {
		case 1:
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}

			if (!('bow_crit' in window.stat.fight.enemyEffects) && window.stat.fight.bowEnergie >= 72) {
				bow('k');
			}

			if (
				window.stat.fight.mode === 'spells'
				// !('absoluteUnverwundbarkeit' in window.stat.fight.myEffects)
			) {
				spell('f');
			}

			if (
				window.stat.fight.mode === 'spells'
				// 'absoluteUnverwundbarkeit' in window.stat.fight.myEffects
			) {
				changeModeToAttack();
				activateAura(1);
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
		case 2:
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}
			if (
				window.stat.fight.aura &&
				'elixir_power' in window.stat.fight.myEffects &&
				window.stat.hpCur > 800 &&
				window.stat.mpCur > 69
			) {
				attackCombo();
			}
			break;
		case 3:
			// if (!window.stat.fight.block) {
			// 	toggleBlock();
			// }
			// if (window.stat.fight.block && window.stat.hpCur > 800) {
			// 	attackCombo();
			// }
			if (window.stat.hpCur > 800) {
				attackCombo();
			}
			break;
		case 4:
			if (window.stat.fight.block) {
				toggleBlock();
			}
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}
			if (
				window.stat.fight.aura &&
				!window.stat.fight.block &&
				'elixir_power' in window.stat.fight.myEffects &&
				window.stat.hpCur > 800 &&
				window.stat.mpCur > 69
			) {
				attackCombo();
			}
			break;
		case 5:
			if (!('elixir_power' in window.stat.fight.myEffects)) {
				usePotion(window.stat.items.Power.slot[0]);
			}
			if (window.stat.fight.aura && 'elixir_power' in window.stat.fight.myEffects) {
				attackCombo();
			}
			break;
		default:
			if (window.stat.fight.mode === 'spells') {
				changeModeToAttack();
			}
			if ('racheDesRachdarischenZenturios' in window.stat.fight.myEffects) {
				if (!window.stat.fight.block) {
					toggleBlock();
				} else if (window.stat.hpCur > 600) {
					attackCombo();
				}
			} else {
				if (window.stat.fight.block) {
					toggleBlock();
				} else {
					if (window.stat.hpCur > 800 && window.stat.mpCur > 69 && window.stat.fight.aura) {
						attackCombo();
					}
				}
			}
			break;
	}
}
