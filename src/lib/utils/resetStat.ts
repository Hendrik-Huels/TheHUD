export default function resetStat() {
	window.stat = {
		items: {
			Giant: { slot: [], cd: false },
			Spirit: { slot: [], cd: false },
			Life: { slot: [], cd: false },
			Mana: { slot: [], cd: false },
			Power: { slot: [], cd: false },
			Vampirism: { slot: [], cd: false },
			Blood: { slot: [], cd: false },
			Wisdom: { slot: [], cd: false },
			Atsha: { slot: [], cd: false },
			Rage: { slot: [], cd: false },
			ScrollOfChange: { slot: [], cd: false, date: new Date(0) }
		},
		hpCur: 0,
		hpMax: 0,
		mpCur: 0,
		mpMax: 0,
		isInjured: false,
		mobs: [],
		screen: '',
		fight: {
			totalDamage: 0,
			block: false,
			combo: {
				step: 0,
				combo: ''
			},
			result: 0,
			running: false,
			myTurn: false,
			mode: '',
			aura: false,
			bowEnergie: 0,
			enemyEffects: {},
			myEffects: {},
			opponentNick: ''
		}
	};
}
