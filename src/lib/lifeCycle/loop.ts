import refreshStatus from './data';
import { huntMob } from './hunt';
import fight from './fights';

export default function myLoop() {
	if (window.config.loopRuns) {
		console.log('Run Skipped');
		return;
	}
	window.config.loopRuns = true;
	// const startTime = performance.now();
	// console.log('Run start');
	refreshStatus();
	switch (window.stat.screen) {
		case 'backpack':
			//     navigateBackpack();
			break;
		case 'location':
			if (window.stat.isInjured) break;

			if (window.stat.hpCur === 0 && window.config.fight.reviveAfterDead) {
				console.log('location');
				console.log('revive');
				window.resurrect(1);
				window.config.justRevived = true;
			}

			if (window.stat.hpCur !== 0 && window.config.justRevived) {
				window.main_frame.processMenu('b07');
			}
			break;
		case 'hunt':
			window.config.justRevived = false;
			const huntStartTime = performance.now();
			!window.iframe_locked && huntMob();
			console.log('hunt: ', performance.now() - huntStartTime);
			break;
		case 'fight':
			// const fightStartTime = performance.now();
			fight();
			// console.log("fight: ", performance.now() - fightStartTime);
			break;
	}

	// Remove possible errors on screen
	const systemConfirm_div = document.getElementById('systemConfirm_div');
	if (systemConfirm_div && getComputedStyle(systemConfirm_div).display == 'block') {
		document.getElementById('btnCancel')?.click();
	}

	const err_input = window.error.document.getElementsByTagName('input');
	if (err_input.length > 0) {
		err_input[0].click();
	}

	// console.log('Run end');
	// console.log('Run took: ', performance.now() - startTime);
	window.config.loopRuns = false;
}
