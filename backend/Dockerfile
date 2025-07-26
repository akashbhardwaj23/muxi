FROM node:alpine

WORKDIR /backend

COPY ./package*.json .

RUN npm install

COPY . .

ENV DATABASE_URL = postgres://postgres:mysecretpassword@localhost:5432/postgres \
    JWT_SECRET = 'your secret' \
    PORT = 8080


CMD ['npm', 'run', 'start']
