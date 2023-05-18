FROM node:16

WORKDIR /server
COPY package*.json ./
RUN npm install --production
COPY dist .

CMD ["npm", "run", "startProd"] 