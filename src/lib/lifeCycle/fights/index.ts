import food from '../hunt/utils';
import fightBasic from './basic';
import fightEasy from './easy';
import fightNeferto from './neferto';
import fightRach from './rachBuffed';
import fightSandAlka from './sandAlka';
import fightSchaissar from './schaissar';

export default function fight() {
	// If fight not running, return
	if (!window.stat.fight.running) return;

	// delete all except last attacked mob
	window.config.fight.triedAttack.length = 1;

	// Handle fight result lose, go location and return (window.stat.fight.result === 2)
	if (window.stat.hpCur === 0 && !window.iframe_locked) {
		window.main_frame.processMenu('b06');
		return;
	}

	// Handle fight result won, eat and go hunt and return (window.stat.fight.result === 1)
	if (window.stat.hpCur !== 0 && !window.iframe_locked) {
		if (window.config.food.enabled) {
			food();
		}
		if (window.config.fight.huntAfterFight) {
			window.main_frame.processMenu('b07');
		} else {
			window.main_frame.processMenu('b06');
		}

		return;
	}

	// Everything else than fight is going on, return
	if (window.stat.fight.result !== 0) {
		return;
	}

	// Set turn number, through combo attacks
	if (window.config.fight.lastComboStep !== window.stat.fight.combo.step) {
		window.config.fight.turn = window.config.fight.turn + 1;
		window.config.fight.lastComboStep = window.stat.fight.combo.step;
	}

	switch (window.config.fight.mode) {
		case 'basic':
			fightBasic();
			break;
		case 'easy':
			fightEasy();
			break;
		case 'RachNormal':
			window.config.fight.turn = 10;
			fightRach();
			break;
		case 'RachFullBuffed':
			fightRach();
			break;
		case 'Schaiss':
			fightSchaissar();
			break;
		case 'Neferto':
			fightNeferto();
			break;
		case 'SandAlka':
			fightSandAlka();
			break;
	}
}
