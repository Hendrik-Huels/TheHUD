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

export default function fightRachNormal() {
	handlePotions();

	// return if can't attack
	// if (!(window.stat.fight.myTurn && window.stat.fight.opponentNick !== '')) {
	// 	return;
	// }

	if (window.stat.fight.mode === 'spells') {
		changeModeToAttack();
	}

	if (!window.stat.fight.aura && window.stat.mpCur > 162 && window.stat.fight.mode === 'attack') {
		activateAura(1);
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
}
