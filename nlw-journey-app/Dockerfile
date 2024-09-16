FROM node:20.17.0-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install -g npm@latest

RUN npm i

COPY . .

RUN npm run build

FROM node:20.17.0-alpine

WORKDIR /app

COPY --from=builder /app /app


CMD ["npm", "start"]