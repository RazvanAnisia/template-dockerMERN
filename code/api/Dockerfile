FROM node:12-stretch

RUN npm install nodemon -g
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9000
CMD [ "npm", "run", "dev" ]
