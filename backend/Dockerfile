# stage build node
FROM node:20-alpine AS build
# set working directory
WORKDIR /app
# install dependencies
COPY package.json package-lock.json ./
RUN npm install
# copy source code
COPY ./src ./src
COPY ./prisma ./prisma
COPY ./tsconfig.json ./
# build the app
RUN npx prisma generate

RUN npm run build

# stage production node
FROM node:20-alpine AS production
# set working directory
WORKDIR /app
COPY --from=build /app/package-lock.json ./package-lock.json
COPY --from=build /app/package.json ./package.json
RUN npm install --production
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY ./public/swagger-response-interceptor.js ./public/
COPY ./docs ./docs
COPY ./backend/static/ ./static

EXPOSE 3000
# start the app
CMD ["node", "/app/build/src/server.js"]





