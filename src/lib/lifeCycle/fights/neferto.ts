import {
	changeModeToAttack,
	activateAura,
	attackCombo,
	handlePotions,
	usePotion,
	bow,
	spell
} from './utils';

export default function fightNeferto() {
	handlePotions();

	if (!('elixir_power' in window.stat.fight.myEffects)) {
		usePotion(window.stat.items.Power.slot[0]);
	}

	// return if can't attack
	if (!window.stat.fight.myTurn || window.stat.fight.opponentNick === '') {
		return;
	}

	if (!('elixir_power' in window.stat.fight.myEffects)) {
		usePotion(window.stat.items.Power.slot[0]);
	}

	switch (window.config.fight.turn) {
		case 1:
			if (!('bow_crit' in window.stat.fight.enemyEffects) && window.stat.fight.bowEnergie >= 72) {
				bow('k');
			}

			if (
				window.stat.fight.mode === 'spells' &&
				!window.main_frame.main?.document?.game?.main?.view?.centerView.cSpells.slots[9].cooldown
					.activated
			) {
				spell('f');
			}

			if (
				window.stat.fight.mode === 'spells' &&
				window.main_frame.main?.document?.game?.main?.view?.centerView.cSpells.slots[9].cooldown
					.activated
			) {
				changeModeToAttack();
			}

			if (window.stat.fight.mode === 'attack') {
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
		default:
			if (!window.stat.fight.aura && window.stat.fight.mode === 'attack') {
				activateAura(1);
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
