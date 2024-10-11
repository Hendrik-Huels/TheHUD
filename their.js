canvas.app.battle.Main.prototype.handlerKey = function (t) {
	if (!document.activeElement || 'HTMLInputElement' != document.activeElement.constructor.name) {
		var e,
			a = t.params.globalKeyCode,
			s = t.params.altKey,
			i = t.params.ctrlKey,
			n = t.params.shiftKey;
		if (this.model.isUseHotkeys || (a == canvas.Const.KEYS.L && n)) {
			switch (a) {
				case canvas.Const.KEYS.L:
					n && canvas.Log.show(canvas.Log.BATTLE);
					break;
				case canvas.Const.KEYS.Q:
					this.view.centerView.visible &&
						(this.isInAttackMode()
							? this.handlerAttack({
									params: canvas.app.battle.Const.TOP_ATTACK_ID
								})
							: this.model.hasSpells &&
								(e = this.view.centerView.cSpells.slots[1]) &&
								e.handlerClick());
					break;
				case canvas.Const.KEYS.W:
					this.view.centerView.visible &&
						(this.isInAttackMode()
							? this.handlerAttack({
									params: canvas.app.battle.Const.MIDDLE_ATTACK_ID
								})
							: this.model.hasSpells &&
								(e = this.view.centerView.cSpells.slots[2]) &&
								e.handlerClick());
					break;
				case canvas.Const.KEYS.E:
					this.view.centerView.visible &&
						(this.isInAttackMode()
							? this.handlerAttack({
									params: canvas.app.battle.Const.BOTTOM_ATTACK_ID
								})
							: this.model.hasSpells &&
								(e = this.view.centerView.cSpells.slots[3]) &&
								e.handlerClick());
					break;
				case canvas.Const.KEYS.R:
					this.view.centerView.visible &&
						(this.isInAttackMode()
							? this.handlerBlockSwitch()
							: this.model.hasSpells &&
								(e = this.view.centerView.cSpells.slots[4]) &&
								e.handlerClick());
					break;
				case canvas.Const.KEYS.A:
					this.view.centerView.visible &&
						!this.isInAttackMode() &&
						this.model.hasSpells &&
						(e = this.view.centerView.cSpells.slots[6]) &&
						e.handlerClick();
					break;
				case canvas.Const.KEYS.S:
					this.view.centerView.visible &&
						!this.isInAttackMode() &&
						this.model.hasSpells &&
						(e = this.view.centerView.cSpells.slots[7]) &&
						e.handlerClick();
					break;
				case canvas.Const.KEYS.D:
					this.view.centerView.visible &&
						!this.isInAttackMode() &&
						this.model.hasSpells &&
						(e = this.view.centerView.cSpells.slots[8]) &&
						e.handlerClick();
					break;
				case canvas.Const.KEYS.F:
					this.view.centerView.visible &&
						!this.isInAttackMode() &&
						this.model.hasSpells &&
						(e = this.view.centerView.cSpells.slots[9]) &&
						e.handlerClick();
					break;
				case canvas.Const.KEYS.G:
					this.view.centerView.visible &&
						!this.isInAttackMode() &&
						this.model.hasSpells &&
						(e = this.view.centerView.cSpells.slots[10]) &&
						e.handlerClick();
					break;
				case canvas.Const.KEYS.UP_ARROW:
					this.view.centerView.visible &&
						this.isInAttackMode() &&
						this.handlerAttack({
							params: canvas.app.battle.Const.TOP_ATTACK_ID
						});
					break;
				case canvas.Const.KEYS.RIGHT_ARROW:
					this.view.centerView.visible &&
						this.isInAttackMode() &&
						this.handlerAttack({
							params: canvas.app.battle.Const.MIDDLE_ATTACK_ID
						});
					break;
				case canvas.Const.KEYS.DOWN_ARROW:
					this.view.centerView.visible &&
						this.isInAttackMode() &&
						this.handlerAttack({
							params: canvas.app.battle.Const.BOTTOM_ATTACK_ID
						});
					break;
				case canvas.Const.KEYS.LEFT_ARROW:
					this.view.centerView.visible && this.isInAttackMode() && this.handlerBlockSwitch();
					break;
				case canvas.Const.KEYS.KEY_1:
				case canvas.Const.KEYS.NUM_1:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@1');
					break;
				case canvas.Const.KEYS.KEY_2:
				case canvas.Const.KEYS.NUM_2:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@2');
					break;
				case canvas.Const.KEYS.KEY_3:
				case canvas.Const.KEYS.NUM_3:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@3');
					break;
				case canvas.Const.KEYS.KEY_4:
				case canvas.Const.KEYS.NUM_4:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@4');
					break;
				case canvas.Const.KEYS.KEY_5:
				case canvas.Const.KEYS.NUM_5:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@5');
					break;
				case canvas.Const.KEYS.KEY_6:
				case canvas.Const.KEYS.NUM_6:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@6');
					break;
				case canvas.Const.KEYS.KEY_7:
				case canvas.Const.KEYS.NUM_7:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@7');
					break;
				case canvas.Const.KEYS.KEY_8:
				case canvas.Const.KEYS.NUM_8:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@8');
					break;
				case canvas.Const.KEYS.KEY_9:
				case canvas.Const.KEYS.NUM_9:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@9');
					break;
				case canvas.Const.KEYS.KEY_0:
				case canvas.Const.KEYS.NUM_0:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@10');
					break;
				case canvas.Const.KEYS.MINUS:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@11');
					break;
				case canvas.Const.KEYS.EQUAL:
					!n && this.mCmd.myEffectsGetted && this.sendData('items', 'HotKey@12');
					break;
				case canvas.Const.KEYS.RIGHT_SQUARE_BRACKET:
					this.sendData('items', 'NextPage@ ');
					break;
				case canvas.Const.KEYS.LEFT_SQUARE_BRACKET:
					this.sendData('items', 'PrevPage@ ');
					break;
				case canvas.Const.KEYS.B:
					this.sendData('items_right', 'OpenBag@ ');
					break;
				case canvas.Const.KEYS.M:
					this.sendData('items_right', 'OpenMount@ ');
					break;
				case canvas.Const.KEYS.T:
					this.view.centerView.visible && !this.isInAttackMode() && this.model.hasSpells
						? (e = this.view.centerView.cSpells.slots[5]) && e.handlerClick()
						: this.useAura(0);
					break;
				case canvas.Const.KEYS.Y:
					this.useAura(1);
					break;
				case canvas.Const.KEYS.U:
					this.useAura(2);
					break;
				case canvas.Const.KEYS.I:
					this.useAura(3);
					break;
				case canvas.Const.KEYS.SPACEBAR:
					this.handlerSkipTurn();
					break;
				case canvas.Const.KEYS.Z:
					this.sendData('mem', 'pers_focus@' + this.model.persId);
					break;
				case canvas.Const.KEYS.X:
					this.sendData('mem', 'pers_focus@' + this.model.oppId);
					break;
				case canvas.Const.KEYS.ESC:
					this.sendData('mem', 'pers_focus@0'), this.persFocus(0);
					break;
				case canvas.Const.KEYS.POINT:
					this.handlerFlagClick();
					break;
				case canvas.Const.KEYS.TAB:
					t.params.preventDefault(),
						this.view.centerView.cDot.btIsOn &&
							this.model.hasSpells &&
							this.view.centerView.cDot.handlerBtnClick();
			}
			if (!s && !i && !n)
				for (var o = 0; o < canvas.app.battle.Const.BOW_KEYS.length; o++)
					if (a == canvas.app.battle.Const.BOW_KEYS[o]) {
						this.model.spellsBowOrder[o] &&
							canvas.EventManager.dispatchEvent(
								canvas.app.battle.Event.USE_EFFECT,
								null,
								this.model.spellsBowOrder[o]
							);
						break;
					}
		}
	}
};
