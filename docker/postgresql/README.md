## 1. Run docker compose up -d with .env

```bash
docker compose --env-file ../../.env.local up -d
```

## 2. Run prisma migrate

```bash
npx prisma migrate dev
```

## reference

### bash

```bash
docker exec -it blogmark_postgresql bash
```

### postgresql

```bash
# show databases
\l

# show grants
\du
```
