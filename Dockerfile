FROM node:18

WORKDIR /chup-bot

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]