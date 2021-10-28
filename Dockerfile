FROM node:14.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

ENTRYPOINT [ "npm", "run", "dev"]