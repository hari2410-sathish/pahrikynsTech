FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
