FROM node:11.4
RUN mkdir /hits-counter
WORKDIR /hits-counter
ADD package*.json ./
RUN npm i
ADD . /hits-counter
RUN npm run-script build

FROM node:11.4
RUN mkdir /hits-counter
WORKDIR /hits-counter
ADD package*.json ./
RUN npm install --only=production
COPY --from=0 /hits-counter/lib ./lib
RUN rm package*.json
ENV PORT 3000
EXPOSE 3000
CMD [ "node", "lib/server.js" ]
