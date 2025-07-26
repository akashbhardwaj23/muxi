FROM node:alpine

WORKDIR /frontend

COPY ./package*.json .
COPY ./next.config.ts .

RUN npm install

COPY . .

ARG NEXT_PUBLIC_APIKEY
ENV NEXT_PUBLIC_APIKEY=$NEXT_PUBLIC_APIKEY

ARG NEXT_PUBLIC_DATABASE_URL
ENV NEXT_PUBLIC_DATABASE_URL=$NEXT_PUBLIC_DATABASE_URL


RUN npm run build

CMD ['npm', 'run', 'start']
