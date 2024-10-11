import { fastBag } from '../fights/utils';

export default function food() {
	if (
		window.stat.hpCur >= (window.config.food.hp / 100) * window.stat.hpMax &&
		window.stat.mpCur >= (window.config.food.mp / 100) * window.stat.mpMax
	) {
		return;
	}
	if (window.config.food.enabled) {
		let executionTimes = window.config.food.history.filter(
			(timestamp) => Date.now() - timestamp < 5000
		);
		if (executionTimes.length < 2) {
			fastBag(1);
			window.config.food.history.push(Date.now());
			if (history.length === 3) {
				window.config.food.history.shift();
			}
		}
	}
}
