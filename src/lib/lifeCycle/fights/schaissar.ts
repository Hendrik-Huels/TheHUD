import {
	activateAura,
	attackCombo,
	changeModeToAttack,
	handlePotions,
	selectInFight,
	spell,
	usePotion
} from './utils';

export default function fightSchaissar() {
	// If 60.000 dmg delt, attack to get self-destruct
	// You get debuff when ShaissarFilthFog is not there so attack at last 6 seconds when it is there
	if (window.stat.fight.totalDamage > 60000) {
		if (
			('ShaissarFilthFog' in window.stat.fight.enemyEffects &&
				(window.stat.fight.enemyEffects.ShaissarFilthFog <= 2 ||
					window.stat.fight.enemyEffects.ShaissarFilthFog === 22)) ||
			!('ShaissarFilthFog' in window.stat.fight.enemyEffects) ||
			'ShaissarDebuff' in window.stat.fight.myEffects
		) {
			attackCombo();
		}
		return;
	}

	handlePotions();

	// return if can't attack
	if (!window.stat.fight.myTurn) return;
	if (window.stat.fight.opponentNick === '') {
		if (
			!window.main_frame.main?.document?.game?.main?.view?.centerView.cSpells.slots[1].cooldown
				.activated
		) {
			spell('q');
		}
		return;
	}

	// Remove debuff
	if (!('ScrollOfChange' in window.stat.fight.myEffects)) {
		if (new Date().getTime() - window.stat.items.ScrollOfChange.date.getTime() > 5000) {
			selectInFight('me');
			usePotion(window.stat.items.ScrollOfChange.slot[0]);
			window.stat.items.ScrollOfChange.date = new Date();
			selectInFight('enemy');
		}
	}

	if (window.stat.fight.mode === 'spells') {
		changeModeToAttack();
	}

	if (!window.stat.fight.aura && window.stat.mpCur > 162) {
		activateAura(1);
	}
	if (
		window.stat.fight.aura &&
		window.stat.mpCur > 70 &&
		window.stat.hpCur > 800 &&
		'ShaissarFilthFog' in window.stat.fight.enemyEffects &&
		window.stat.fight.enemyEffects.ShaissarFilthFog > 6
	) {
		attackCombo();
	}
}
