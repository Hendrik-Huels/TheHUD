import { base64Audio } from '../../utils/audio';
import { elixirSets, effectSets } from './lists';

function refreshItems() {
	// Take items and cooldown array from the game
	const belt = {
		items: window.main_frame.document.items.model.items,
		cd: window.main_frame.document.items.model.groupCooldowns
	};

	// Reset items list in my struct
	window.stat.items = {
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
		ScrollOfChange: { slot: [], cd: false, date: window.stat.items.ScrollOfChange.date }
	};

	belt.items.forEach((item) => {
		Object.entries(elixirSets).forEach(([key, value]) => {
			// Check if key exists in stat.items and if the item image is in the elixir set and is not undefined
			if (!item?.image) return;
			if (!(key in window.stat.items && value.includes(item.image))) return;

			const typedKey = key as keyof Items;
			window.stat.items[typedKey].slot.push(item.slot as PotionSlot);

			if (belt.cd) {
				belt.cd.forEach(({ group }) => {
					if (item.cdGroupId === group) {
						window.stat.items[typedKey].cd = true;
					}
				});
			}
		});
	});
}

export function refreshMobs() {
	window.stat.mobs = [];
	if (window.main_frame.main.document.hunt_map?.model?.objects_updater?.Objects) {
		Object.entries(window.main_frame.main.document.hunt_map.model.objects_updater.Objects).forEach(
			([_, value]) => {
				if (value.type === 'bot') {
					window.stat.mobs.push({
						id: value.id,
						name: value.name,
						fight_id: value.fight_id
					});
				}
			}
		);
	}
}

function refreshEffects() {
	type Effects = {
		[key: string]: number;
	};

	type EffectsObject = {
		[key: string]: {
			data: {
				pic: string;
				eetimeMax: number;
			};
		};
	};

	let effectsP1: Effects = {};
	let effectsP2: Effects = {};

	// Function to process effects for either P1 or P2
	const processEffects = (effectsObject: EffectsObject, effectsTarget: Effects) => {
		if (effectsObject) {
			Object.entries(effectsObject).forEach(([_, items_value]) => {
				Object.entries(effectSets).forEach(([effect_key, effect_value]) => {
					if (effect_value.includes(items_value?.data?.pic)) {
						effectsTarget[effect_key] = Math.floor(
							items_value.data.eetimeMax -
								Date.now() / 1e3 -
								(window.main_frame.main.document.game.model.serverTimestamp -
									window.main_frame.main.document.game.model.clientTimestamp)
						);
					}
				});
			});
		}
	};

	// Retrieve and process effectsP1
	const itemsP1 = window.main_frame.main.document.game?.main?.view?.effectsP1?.items;
	processEffects(itemsP1, effectsP1);

	// Retrieve and process effectsP2
	const itemsP2 = window.main_frame.main.document.game?.main?.view?.effectsP2?.items;
	processEffects(itemsP2, effectsP2);

	// Return both effectsP1 and effectsP2
	window.stat.fight.myEffects = effectsP1;
	window.stat.fight.enemyEffects = effectsP2;
}

function refreshFight() {
	window.stat.fight = {
		totalDamage: window.main_frame.main?.document?.game?.model?.totalDamage,
		block:
			window.main_frame.main?.document?.game?.main?.view?.centerView?.cAttack?.blockOn?.visible,
		combo: {
			step: window.main_frame.main?.document?.game?.main?.children[0]?.comboView?.comboStep,
			combo: window.main_frame.main?.document?.game?.main?.children[0]?.comboView?.activeCombo?.seq
		},
		result: window.main_frame.main?.document?.game?.model?.fightResult,
		running: window.main_frame.main?.document?.game?.model?.fightRunning,
		myTurn: window.main_frame.main?.document?.game?.main?.view?.centerView?.visible,
		mode: window.main_frame.main?.document?.game?.main?.view?.centerView?._mode,
		aura: window.main_frame.main?.document?.game?.model?.currentAura ? true : false,
		bowEnergie: window.main_frame.main?.document?.game?.model?.bowEnergyValue,
		enemyEffects: {},
		myEffects: {},
		opponentNick: window.main_frame.main?.document?.game?.main?.view?.oppNick.nick
	};
}

function refreshPlayer() {
	// Hp
	if (window.main_frame.main.document?.game?.model?.persHp) {
		window.stat.hpCur = window.main_frame.main.document?.game?.model?.persHp;
	} else {
		window.stat.hpCur = window.main_frame.document.lvl.model.hpCur;
	}
	// Hp Max
	if (window.main_frame.main.document?.game?.model?.persHpMax) {
		window.stat.hpMax = window.main_frame.main.document?.game?.model?.persHpMax;
	} else {
		window.stat.hpMax = frames.main_frame.document.lvl.model.hpMax;
	}
	// Mp
	if (window.main_frame.main.document?.game?.model?.persMp) {
		window.stat.mpCur = window.main_frame.main.document?.game?.model?.persMp;
	} else {
		window.stat.mpCur = frames.main_frame.document.lvl.model.mpCur;
	}
	if (window.main_frame.main.document?.game?.model?.persMpMax) {
		window.stat.mpMax = window.main_frame.main.document?.game?.model?.persMpMax;
	} else {
		window.stat.mpMax = window.main_frame.document.lvl.model.mpMax;
	}
}

function refreshScreen() {
	let backpack = frames.main_frame.document.getElementById('backpack')?.getAttribute('class');
	if (backpack && !backpack.includes('hide-trick')) {
		window.stat.screen = 'backpack';
	}
	let pname = window.main_frame.main.document.location.pathname;
	switch (pname) {
		case '/instance.php':
			window.stat.screen = '/instance.php';
			break;
		case '/area.php':
			window.stat.screen = 'location';
			break;
		case '/hunt.php':
			window.stat.screen = 'hunt';
			break;
		case '/fight.php':
			window.stat.screen = 'fight';
			break;
		case '/blank.html':
			window.stat.screen = 'loading';
			break;
		default:
			window.stat.screen = 'unknown';
	}
}

function refreshInjury() {
	const chatUsersList = window.chat.chat_user.document.getElementById(
		'chat_users_list'
	) as HTMLElement;
	if (!chatUsersList) {
		window.stat.isInjured = false;
		console.log('Wähle liste der spieler am standort aus, sonst wird das nix');
		return;
	}
	for (const userElements of chatUsersList.childNodes as NodeListOf<HTMLElement>) {
		const user = userElements.getAttribute('data-nick');
		if (user && user.toLowerCase() === window.myNick.toLowerCase()) {
			const imgElements = userElements.getElementsByTagName('img');
			for (const i of Array.from(imgElements)) {
				if (i.src === `${window.location.origin}/images/injury.gif`) {
					if (window.stat.isInjured) {
						return;
					}
					window.stat.isInjured = true;
					const audio = new Audio(base64Audio);
					audio.play();
					return;
				}
			}
		}
	}
	window.stat.isInjured = false;
}

export default function refreshStatus() {
	refreshPlayer();
	refreshScreen();
	refreshMobs();
	refreshFight();
	refreshEffects();
	refreshItems();
	refreshInjury();
}
