# DOCUMENTATION
## Simulator database seeding (notes)
In order to populate the database with the simulators' metadata (urls and info)
check and write in file ./backend/src/scripts/simulators.ts
[seed_data](backend/src/scripts/simulators.ts)
Then place the corresponding simulators in the static folder
(./backend/static/) in development, or in /persistence/static/ in production

## Database and Types
Types for TypeScript are generated executing ```npx prisma generate``` from the folder ./backend !

## Commands:
### Development:
#### Run whole project in development mode:

Prerequisites:
- having simulators in the `./backend/static/` folder.

```bash
docker compose up
```
### Production:
#### Run whole project in production mode: (depends on the image stored in Docker Hub -> `jucaza/web-sim:latest`)

Prerequisites:
- create folder in `/persistence/` at the root of the system for docker to mount the volumes.
- create folder in `/persistence/static/` and copy the simulators there.

```bash
docker compose -f docker-compose.prod.yml up
```

## SWAGGER UI
### Accessing Swagger UI
To access the Swagger UI for the backend API, navigate to:

```
http://localhost:3000/api/v1/docs
```
or
```
http://your-domain.com/api/v1/docs
```

## Database Schema
See file `./backend/prisma/schema.prisma` for the database schema.
[Schema](backend/prisma/schema.prisma)
