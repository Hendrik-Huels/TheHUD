import myLoop from '../lifeCycle/loop';

export default function mergeConfig() {
	const mergeConfig: Config = {
		justRevived: false,
		loopRuns: false,
		chatObserver: new MutationObserver(() => {}),
		chatIsObserving: false,
		chatFilter: [],
		loop: function () {},
		loopIntervalID: null,
		mobs: [],
		food: {
			enabled: false,
			history: [], // Never use it more then twice in 5 seconds, log here dates when used
			hp: 100,
			mp: 100
		},
		fight: {
			life: 70,
			mana: 70,
			aura: true,
			mode: 'basic',
			turn: 1,
			lastComboStep: 0,
			triedAttack: [],
			huntAfterFight: true,
			huntAfterRevive: true,
			reviveAfterDead: true
		},
		sleep: 400,
		version: __APP_VERSION__
	};

	window.config = {
		...mergeConfig,
		...window.config
	};

	window.config.loop = myLoop;
	window.config.version = __APP_VERSION__;
}
