### data
set available language in `src/localeContent/hotelList.json`
text content goes to `src/localeContent/<locale>/content.json`
language independent image goes to `src/images/`
language dependent image goes to `src/localeContent/<locale>/`


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
    "hotel_ID": "0",
    "mainPosterBanner": {
        "locale": "en_US",
        "iLink": "ticket:39",
        "image": "top-banner-set/drawable-hdpi/top_banner.png",
        "item": "USS",
        "item_id": "8",
        "item_type": "deals",
        "item_position": "1"
    },
    "eatLikeALocal": [
        {
            "title": "en_US 0 Best Chicken Rice",
            "iLink": "article:10941",
            "placeType": "Hawker Food",
            "transportType": "walk",
            "transportTime": "18 min from hotel",
            "image": "article1/drawable-hdpi/straight.jpg",
            "content_id": "8",
            "content_type": "article",
            "content_locale": "en_US",
            "content_position": "1"
        },
        {
            "title": "5 Local Drinks",
            "iLink": "article:10036",
            "placeType": "Bars",
            "transportType": "drive",
            "transportTime": "18 min from hotel",
            "image": "article2/drawable-hdpi/straight.jpg",
            "content_id": "8",
            "content_type": "article",
            "content_locale": "en_US",
            "content_position": "2"
        },
        {
            "title": "Local Cafe",
            "iLink": "article:10852",
            "placeType": "Coffee Shop",
            "transportType": "walk",
            "transportTime": "18 min from hotel",
            "image": "article3/drawable-hdpi/straight.jpg",
            "content_id": "8",
            "content_type": "article",
            "content_locale": "en_US",
            "content_position": "3"
        }
    ],
    "ADBlock": [
        {
            "ad_id": 1,
            "iLink": "xdeallanding:1",
            "name": "Gardens by the Bay",
            "image": "ad1/drawable-hdpi/resting.png",
            "ADTicket": [
                {
                    "ad_id": "1",
                    "ticket_ID": "1",
                    "iLink": "xdeallanding:1",
                    "dealName": "Gardens by the Bay 1 Day Ticket",
                    "sellingPrice": "SGD 23",
                    "originalPrice": "28",
                    "salesRecord": "63K Sold"
                },
                {
                    "ad_id": "1",
                    "ticket_ID": "2",
                    "iLink": "xdeallanding:2",
                    "dealName": "Singapore 3in1 Night Tour : Gardens By the Bay",
                    "sellingPrice": "SGD 59",
                    "originalPrice": "62",
                    "salesRecord": "1K+ Sold"
                },
                {
                    "ad_id": "1",
                    "ticket_ID": "3",
                    "iLink": "xdeallanding:3",
                    "dealName": "Gardens By The Bay Ticket including Hotel Pickup",
                    "sellingPrice": "SGD 28",
                    "originalPrice": "30",
                    "salesRecord": "795 Sold"
                }
            ]
        }
    ]
}
```

### TODO
- live ad
- update iLinks
- config webpack to load resource with abs path
- error handling in webview (network and corrupt file)
- error logging
- set web default lang as device lang, else fallback to ENG
- find a way to cache web lang status
    > now: current lang > ilink > back > default lang
    > new: current lang > ilink > back > current lang