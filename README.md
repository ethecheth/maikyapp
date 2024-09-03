With Docker
```
$docker compose build api
$docker compose up -d api
$docker compose ps
$docker compose logs --follow
```

$docker compose build web
$docker compose up -d web
$docker compose ps
$docker compose logs --follow
```

for test
docker compose -f docker-compose.dev.yml up
docker compose -f docker-compose.test.yml up testing --abort-on-container-exit --build