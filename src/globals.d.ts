import type { Component, ComponentType, SvelteComponentTyped } from 'svelte';

export {};

declare global {
	type PotionSlot = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
	type AttackSlot = 1 | 2 | 3;
	type AuraSlot = 1 | 2 | 3 | 4;
	type BlockSlot = 1;
	type SpellSlot = 'q' | 'd' | 'f';
	type BowSlot = 'k';
	type FastBagSlot = 1 | 2 | 3 | 4;
	type SelectSlot = 'me' | 'enemy';

	type Config = {
		justRevived: boolean;
		loopRuns: boolean;
		version: string;
		chatObserver: MutationObserver;
		chatIsObserving: boolean;
		chatFilter: Array<string>;
		loop: () => void;
		loopIntervalID: number | null;
		mobs: Array<string>;
		food: {
			enabled: boolean;
			history: Array<number>; // Never use it more then twice in 5 seconds, log here dates when used
			hp: number;
			mp: number;
		};
		fight: {
			life: number;
			mana: number;
			aura: boolean;
			mode: string;
			turn: number;
			lastComboStep: number;
			triedAttack: Array<number>;
			huntAfterFight: boolean;
			huntAfterRevive: boolean;
			reviveAfterDead: boolean;
		};
		sleep: number;
	};

	type Items = {
		Giant: { slot: Array<PotionSlot>; cd: boolean };
		Spirit: { slot: Array<PotionSlot>; cd: boolean };
		Life: { slot: Array<PotionSlot>; cd: boolean };
		Mana: { slot: Array<PotionSlot>; cd: boolean };
		Power: { slot: Array<PotionSlot>; cd: boolean };
		Vampirism: { slot: Array<PotionSlot>; cd: boolean };
		Blood: { slot: Array<PotionSlot>; cd: boolean };
		Wisdom: { slot: Array<PotionSlot>; cd: boolean };
		Atsha: { slot: Array<PotionSlot>; cd: boolean };
		Rage: { slot: Array<PotionSlot>; cd: boolean };
		ScrollOfChange: { slot: Array<PotionSlot>; cd: boolean; date: Date };
	};

	type Stat = {
		items: Items;
		hpCur: number;
		hpMax: number;
		mpCur: number;
		mpMax: number;
		isInjured: boolean;
		mobs: {
			fight_id: number;
			id: number;
			name: string;
		}[];
		screen: string;
		fight: {
			totalDamage: number;
			block: boolean;
			combo: {
				step: number;
				combo: string;
			};
			result: number;
			running: boolean;
			myTurn: boolean;
			mode: string;
			aura: boolean;
			bowEnergie: number;
			enemyEffects: {
				[key: string]: number;
			};
			myEffects: {
				[key: string]: number;
			};
			opponentNick: string;
		};
	};

	interface Window {
		unmount: (component: Record<string, any>) => void;
		iframe_locked: boolean | undefined | null;
		myNick: string;
		showMsg: (x: string, y: string) => void;
		troublemaker: {
			$on?(type: string, callback: (e: any) => void): () => void;
			$set?(props: Partial<Record<string, any>>): void;
		} & Record<string, any>;
		config: Config;
		resurrect: (x: number) => void;
		main_frame: Window & {
			document: Document & {
				items: {
					model: {
						items: { image: string; slot: number; cdGroupId: number }[];
						groupCooldowns: { group: number }[];
					};
				};
				lvl: {
					model: {
						hpCur: number;
						hpMax: number;
						mpCur: number;
						mpMax: number;
					};
				};
			};
			processMenu: (x: string) => void;
			main: Window & {
				huntAttack: (x: number, y: boolean) => void;
				document: Document & {
					hunt_map: {
						model: {
							objects_updater: {
								Objects: {
									[key: string]: {
										fight_id: number;
										id: number;
										name: string;
										type: string;
									};
								};
							};
						};
					};
					game: {
						main: {
							view: {
								centerView: {
									visible: boolean;
									_mode: string;
									cAttack: {
										blockOn: {
											visible: boolean;
										};
									};
									cSpells: {
										slots: {
											cooldown: {
												activated: boolean;
											};
										}[];
									};
								};
								oppNick: { nick: string };
								effectsP1: {
									items: {
										[key: string]: {
											data: {
												pic: string;
												eetimeMax: number;
											};
										};
									};
								};
								effectsP2: {
									items: {
										[key: string]: {
											data: {
												pic: string;
												eetimeMax: number;
											};
										};
									};
								};
							};
							children: {
								comboView: {
									comboStep: number;
									activeCombo: {
										seq: string;
									};
								};
							}[];
						};

						model: {
							totalDamage: number;
							fightResult: number;
							fightRunning: boolean;
							currentAura: string;
							bowEnergyValue: number;
							persHp: number;
							persHpMax: number;
							persMp: number;
							persMpMax: number;
							serverTimestamp: number;
							clientTimestamp: number;
						};
					};
				};
			};
		};
		stat: Stat;
		chat: Window & {
			chat_text: Window;
			chat_user: Window;
		};
		error: Window;
	}
	declare const __APP_VERSION__: string;
}
