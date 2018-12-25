# hits-counter

NodeJS application, which shows the number of pageviews for the past 1 minute.

[![CircleCI](https://circleci.com/gh/amaksimov/hits-counter.svg?style=svg)](https://circleci.com/gh/amaksimov/hits-counter)

## Demo

![Demo](docs/demo.gif)

## Live

[Try this magic app yourself](http://35.244.129.156/hits)

## Requirements

- node v11.4.0+
- postgres 9.6+

## Getting started

```bash
npm i
nodemon app/server.js
```

## Docker

```bash
docker build -t amaksimov/hits-counter .
docker run --name hits-counter -p 3000:3000 -d amaksimov/hits-counter
```
