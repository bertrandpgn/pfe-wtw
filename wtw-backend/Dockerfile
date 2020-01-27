FROM node:13.6.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production
COPY . .

CMD [ "node", "server.js" ]