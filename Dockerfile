FROM node:11.4
RUN mkdir /hits-counter
WORKDIR /hits-counter
ADD package*.json ./
RUN npm i
ADD . /hits-counter
EXPOSE 8080
CMD [ "node", "index.js" ]
