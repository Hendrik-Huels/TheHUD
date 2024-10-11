which team

```js
window.main_frame.main.document.game.main.model.persTeam;
```

## Can execute items from the backpack without it being open

```js
window.showMsg(
	`action_form.php?${Math.random()}&in[param_success][url_close]=1&artifact_id=${
		window.config.food.id
	}&in[external]=1&in[noconfirm]=1`,
	'Verwenden'
);
```
