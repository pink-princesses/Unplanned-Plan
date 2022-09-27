FROM node:16.13.1-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install

COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000

CMD serve -s build