FROM node:16-alpine

WORKDIR /usr/src/api

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV PORT=80
EXPOSE $PORT

CMD [ "node", "dist" ]