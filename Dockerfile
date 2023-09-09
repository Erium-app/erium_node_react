FROM node:latest

RUN npm cache clean -f

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm install prisma -g
RUN prisma generate

RUN npm run build

RUN cp -r dist ./server

EXPOSE 8080
WORKDIR ./server

CMD ["node", "server.js"]
