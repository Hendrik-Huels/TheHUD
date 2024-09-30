Inject code with:
```js
fetch('https://raw.githubusercontent.com/Hendrik-Huels/TheHUD/main/index.js')
    .then(r => r.text())
    .then(sC => {
        eval(sC);
    })
```