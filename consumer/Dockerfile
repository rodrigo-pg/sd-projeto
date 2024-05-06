FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD ["node", "dist/index.js"]