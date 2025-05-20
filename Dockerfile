# stage build node
FROM node:20-alpine AS backend-build
# set working directory
WORKDIR /app
# install dependencies
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install
# copy source code
COPY ./backend/src ./src
COPY ./backend/prisma ./prisma
COPY ./backend/tsconfig.json ./
COPY ./backend/docs/ ./docs
# build the app
RUN npx prisma generate

RUN npm run build

FROM node:20-alpine AS frontend-build

# declare build-time ARG
# ARG VITE_DOMAIN_HOST
# set ENV so that Vite can see it (redundant but common)
# ENV VITE_DOMAIN_HOST=${VITE_DOMAIN_HOST}
ENV VITE_DOMAIN_HOST=/

# set working directory
WORKDIR /app
# install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
# copy source code
COPY ./frontend/src ./src
COPY ./frontend/public ./public
COPY ./frontend/tsconfig.node.json ./
COPY ./frontend/tsconfig.app.json ./
COPY ./frontend/tsconfig.json ./
COPY ./frontend/vite.config.ts ./
COPY ./frontend/index.html ./

# build the app
RUN npm run build

# stage production node
FROM node:20-alpine AS production
# set working directory
WORKDIR /app
COPY --from=backend-build /app/package-lock.json ./package-lock.json
COPY --from=backend-build /app/package.json ./package.json
COPY --from=backend-build /app/docs ./docs
RUN npm install --production
COPY --from=backend-build /app/build ./build
COPY --from=backend-build /app/prisma ./prisma
COPY --from=backend-build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=backend-build /app/node_modules/.prisma ./node_modules/.prisma

# copy frontend build
COPY --from=frontend-build /app/dist ./public
COPY ./backend/public/swagger-response-interceptor.js ./public/

EXPOSE 3000
# start the app
CMD ["node", "/app/build/src/server.js"]
