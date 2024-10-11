import { changeModeToAttack, activateAura, attackCombo, handlePotions, usePotion } from './utils';

export default function fightEasy() {
	//
	handlePotions();

	// return if can't attack
	if (!window.stat.fight.myTurn || window.stat.fight.opponentNick === '') {
		return;
	}

	// When spell mode is activated, go to attack mode
	if (window.stat.fight.mode === 'spells') {
		changeModeToAttack();
	}

	if (!('elixir_power' in window.stat.fight.myEffects)) {
		usePotion(window.stat.items.Power.slot[0]);
	}

	if (!window.stat.fight.aura && window.stat.mpCur >= 162) {
		activateAura(1);
	}
	if (
		(window.stat.fight.aura &&
			window.stat.mpCur >= 54 &&
			window.stat.hpCur >= window.stat.hpMax * 0.35) ||
		window.stat.items.Life.slot.length === 0
	) {
		attackCombo();
	}
}
