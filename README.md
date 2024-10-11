Inject code with:

```js
fetch('https://raw.githubusercontent.com/Hendrik-Huels/TheHUD/refs/heads/main/dist/app.js')
	.then((r) => r.text())
	.then((sC) => {
		eval(sC);
	});
```
