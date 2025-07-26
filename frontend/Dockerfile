FROM node:alpine

WORKDIR /frontend

COPY ./package*.json .
COPY ./next.config.ts .

RUN npm install

COPY . .

RUN npm run build

CMD ['npm', 'run', 'start']
