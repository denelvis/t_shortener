FROM node:18.14.0-alpine3.16

ARG WORK_DIR=/var/www/app

WORKDIR $WORK_DIR

COPY ./package.json ./pnpm-lock.yaml ./.env $WORK_DIR/

RUN npm install -g pnpm && pnpm install

COPY ./src/ $WORK_DIR/src/
COPY ./tsconfig.build.json ./tsconfig.json $WORK_DIR/

RUN pnpm run build

ENTRYPOINT pnpm run start:dev 

EXPOSE 3000