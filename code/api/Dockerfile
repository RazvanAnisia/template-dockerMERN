FROM node:10-stretch

RUN npm install pm2 -g && npm install nodemon -g
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "run", "dev" ]
