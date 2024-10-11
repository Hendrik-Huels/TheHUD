interface KeyMapping {
	key: string;
	keyCode: number;
	code: string;
	shiftKey?: boolean;
}

interface KeyMappings {
	potion: Partial<Record<PotionSlot, KeyMapping>>; // Use Partial to make it optional
	attack: Partial<Record<AttackSlot, KeyMapping>>; // Use Partial to make it optional
	aura: Record<AuraSlot, KeyMapping>;
	block: Partial<Record<BlockSlot, KeyMapping>>; // Use Partial to make it optional
	spell: Record<SpellSlot, KeyMapping>;
	bow: Record<BowSlot, KeyMapping>;
	fastBag: Record<FastBagSlot, KeyMapping>;
	selectInFight: Record<SelectSlot, KeyMapping>;
}

const keyMappings: KeyMappings = {
	potion: {
		1: { key: '1', keyCode: 49, code: 'Digit1' },
		2: { key: '2', keyCode: 50, code: 'Digit2' },
		3: { key: '3', keyCode: 51, code: 'Digit3' },
		4: { key: '4', keyCode: 52, code: 'Digit4' },
		5: { key: '5', keyCode: 53, code: 'Digit5' },
		6: { key: '6', keyCode: 54, code: 'Digit6' },
		7: { key: '7', keyCode: 55, code: 'Digit7' },
		8: { key: '8', keyCode: 56, code: 'Digit8' },
		9: { key: '9', keyCode: 57, code: 'Digit9' },
		10: { key: '0', keyCode: 48, code: 'Digit0' },
		11: { key: '-', keyCode: 189, code: 'Slash' },
		12: { key: '=', keyCode: 48, shiftKey: true, code: 'Digit0' }
	},
	attack: {
		1: { key: 'ArrowUp', keyCode: 38, code: 'ArrowUp' },
		2: { key: 'ArrowRight', keyCode: 39, code: 'ArrowRight' },
		3: { key: 'ArrowDown', keyCode: 40, code: 'ArrowDown' }
	},
	aura: {
		1: { key: 't', keyCode: 84, code: 'KeyT' },
		2: { key: 'y', keyCode: 89, code: 'KeyY' },
		3: { key: 'u', keyCode: 85, code: 'KeyU' },
		4: { key: 'i', keyCode: 73, code: 'KeyI' }
	},
	block: {
		1: { key: 'ArrowLeft', keyCode: 37, code: 'ArrowLeft' }
	},
	spell: {
		q: { key: 'q', keyCode: 81, code: 'KeyQ' },
		d: { key: 'd', keyCode: 68, code: 'KeyD' },
		f: { key: 'f', keyCode: 70, code: 'KeyF' }
	},
	bow: {
		k: { key: 'k', keyCode: 75, code: 'KeyK' }
	},
	fastBag: {
		1: { key: '!', keyCode: 49, code: 'Digit1', shiftKey: true },
		2: { key: '"', keyCode: 50, code: 'Digit2', shiftKey: true },
		3: { key: '§', keyCode: 51, code: 'Digit3', shiftKey: true },
		4: { key: '$', keyCode: 52, code: 'Digit4', shiftKey: true }
	},
	selectInFight: {
		me: { key: 'y', keyCode: 89, code: 'KeyZ' },
		enemy: { key: 'x', keyCode: 88, code: 'KeyX' }
	}
};

function dispatchKeyEventDown({ key, keyCode, code, shiftKey = false }: KeyMapping): void {
	console.log(
		new KeyboardEvent('keydown', {
			key,
			keyCode,
			bubbles: true,
			code: code,
			shiftKey
		})
	);
	window.document.body.dispatchEvent(
		new KeyboardEvent('keydown', {
			key,
			keyCode,
			bubbles: true,
			code: code,
			shiftKey
		})
	);
}

function dispatchKeyEventUp({ key, keyCode, code, shiftKey = false }: KeyMapping): void {
	console.log(
		new KeyboardEvent('keyup', {
			key,
			keyCode,
			bubbles: true,
			code: code,
			shiftKey
		})
	);
	window.document.body.dispatchEvent(
		new KeyboardEvent('keyup', {
			key,
			keyCode,
			bubbles: true,
			code: code,
			shiftKey
		})
	);
}

export function usePotion(slot: PotionSlot): void {
	const key = keyMappings.potion[slot];
	if (key) dispatchKeyEventDown(key);
}

export function changeModeToAttack(): void {
	dispatchKeyEventDown({ key: 'Tab', keyCode: 9, code: 'Tab' });
}

export function activateAura(slot: AuraSlot): void {
	// const key = keyMappings.aura[slot];
	// if (key) dispatchKeyEvent(key);
	dispatchKeyEventDown({ key: 't', keyCode: 84, code: 'KeyT' });
}

export function attack(slot: AttackSlot): void {
	const key = keyMappings.attack[slot];
	if (key) dispatchKeyEventDown(key);
}

export function attackCombo(): void {
	const key =
		keyMappings.attack[
			Number(window.stat.fight.combo.combo[window.stat.fight.combo.step]) as AttackSlot
		];
	if (key) dispatchKeyEventDown(key);
}

export function toggleBlock() {
	const key = keyMappings.block[1];
	if (key) dispatchKeyEventDown(key);
}

export function spell(slot: SpellSlot): void {
	const key = keyMappings.spell[slot];
	if (key) dispatchKeyEventDown(key);
}

export function bow(slot: BowSlot): void {
	const key = keyMappings.bow[slot];
	if (key) dispatchKeyEventDown(key);
}

export function fastBag(slot: FastBagSlot): void {
	const key = keyMappings.fastBag[slot];
	if (key) dispatchKeyEventUp(key);
}

export function selectInFight(slot: SelectSlot): void {
	const key = keyMappings.selectInFight[slot];
	if (key) dispatchKeyEventDown(key);
}

export function handlePotions() {
	// If Giant available, use it
	if (window.stat.items.Giant.slot.length > 0) {
		usePotion(window.stat.items.Giant.slot[0]);
	}

	// If Spirit available, use it
	if (window.stat.mpMax != 0 && window.stat.items.Spirit.slot.length > 0) {
		usePotion(window.stat.items.Spirit.slot[0]);
	}
	if (
		window.stat.hpCur / window.stat.hpMax < window.config.fight.life / 100 &&
		window.stat.items.Life.cd == false &&
		window.stat.items.Life.slot.length > 0
	) {
		usePotion(window.stat.items.Life.slot[0]);
	}
	if (
		window.stat.mpMax != 0 &&
		window.stat.mpCur / window.stat.mpMax < window.config.fight.mana / 100 &&
		window.stat.items.Mana.cd == false &&
		window.stat.items.Mana.slot.length > 0
	) {
		usePotion(window.stat.items.Mana.slot[0]);
	}
}
