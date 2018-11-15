### data
set available language in `src/localeContent/availableLanguage.json`
text content goes to `src/localeContent/<LANG>/content.json`
language independent image goes to `src/images/`
language dependent image goes to `src/localeContent/<LANG>/`


### run
```
yarn install
yarn start
```
navigate to localhost:3000

### deploy
```
yarn build
```
upload to s3 bucket
make permission everyone:READ
update url in cms if needed

### sample json
```
{
    "locale": "en_US",
    "eatLikeALocal": [
        {
            "title": "Best Chicken Rice",
            "placeType": "Hawker Food",
            "transportType": "walk",
            "transportTime": "18 min from hotel",
            "image": "article1/drawable-hdpi/straight.jpg"
        },
        {
            "title": "5 Local Drinks",
            "placeType": "Bars",
            "transportType": "drive",
            "transportTime": "18 min from hotel",
            "image": "article2/drawable-hdpi/straight.jpg"
        },
        {
            "title": "Local Cafe",
            "placeType": "Coffee Shop",
            "transportType": "walk",
            "transportTime": "18 min from hotel",
            "image": "article3/drawable-hdpi/straight.jpg"
        }
    ],
    "ADBlock": [
        {
            "name": "Gardens by the Bay",
            "image": "ad1/drawable-hdpi/resting.png"
        },
        {
            "name": "A Local Shopping Mall",
            "image": "ad2/drawable-hdpi/resting.png"
        }
    ]
}
```