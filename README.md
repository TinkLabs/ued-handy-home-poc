
### run
```
yarn install
yarn start
```
- navigate to localhost:3000

### build
```
// package.json
    "homepage": ${url_of_s3_bucket},
```


### deploy
```
yarn build
```
1. upload to s3 bucket
2. make permission everyone:READ
3. update url in cms if needed

### mixpanel

```js
// mixpanel setting, init, global var in
src/utils/mixpanel.js
```

### data

```js
// set available language in
"src/localeContent/hotelList.json"
// text content goes to 
"src/localeContent/<hotel_ID_#>/content.json"
// language independent image goes to
"src/images/"
// language dependent image goes to
"src/images/<locale>/"
```

### sample hotelList.json

```js
[
    {
        "hotel": "default",
        "hotel_ID": "0",
        "availableLanguage": 
            [
                {
                    "full": "English",
                    "short": "en_US"
                },
                {
                    "full": "简体中文",
                    "short": "zh_CN"
                },
                {
                    "full": "繁體中文",
                    "short": "zh_TW"
                }
            ]
    },
]
```



### sample content.json

```

```

### TODO
- ~~update iLinks~~
- ~~config webpack to load resource with abs path~~ (add `NODE_PATH=src/` in `.env`)
- error handling in webview (network and corrupt file)
    > react16 provides `componentDidCatch()` on error handling
- ~~set web default lang as device lang, else fallback to ENG~~ (not ava. from SDK, use prev choice instead)
- ~~prev.lang cached in localStorage~~