FROM node:9-slim

WORKDIR /usr/src/app

COPY backend/package*.json ./

RUN npm install

COPY ./backend .

EXPOSE 8081
EXPOSE 8080

CMD [ "npm", "start" ]
