FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

ENV NODE_ENV=production
EXPOSE 3000

RUN mkdir -p /usr/src/app/logs

CMD ["npm", "start"]
