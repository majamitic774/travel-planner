FROM node:18
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .

# Use existing node user (1000:1000) for security
RUN chown -R node:node /usr/src/app
USER node

CMD ["npm", "start"]
