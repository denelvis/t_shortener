## Installation

```bash
$ docker-compose up -d
```

## Endpoints
POST localhost:3000/shorten
body { "url": "www.ya.ru" } -> response { "shortUrl": "KB_3Y4lol" }

GET localhost:3000/KB_3Y4lol -> response { "primaryUrl": "www.ya.ru" }

