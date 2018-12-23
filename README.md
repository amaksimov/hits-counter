# hits-counter

NodeJS application, which shows the number of pageviews for the past 1 minute.

[![CircleCI](https://circleci.com/gh/amaksimov/hits-counter.svg?style=svg)](https://circleci.com/gh/amaksimov/hits-counter)

## Demo

![Demo](docs/demo.gif)

## Live

[Try this magic app yourself](http://35.244.129.156)

## Requirements

- node v11.4.0+
- postgres 9.6+

## Getting started

```bash
npm install
DATABASE_URL=${DATABASE_URL} db-migrate up
nodemon index.js
```

## Docker

```bash
docker-compose build
docker-compose run app ./node_modules/.bin/db-migrate up
docker-compose up -d app
```

## Deploy to GKE

### Setup kubektl context

### Deploy volume
```sh
kubectl create -f kube/volumes/postgres_volumes.yaml
```

### Create secrets
```sh
kubectl create secret generic db-user --from-literal=username=postgres
kubectl create secret generic db-user-pass --from-literal=password=postgres
kubectl create secret generic app-db-url --from-literal=databaseurl=postgres://postgres:postgres@postgres:5432/hits-counter
```

### Create deployments
```sh
kubectl create -f kube/deployments/postgres_deploy.yaml
kubectl create -f kube/deployments/app_deploy.yaml
```

### Create services
```sh
kubectl create -f kube/services/postgres_svc.yaml
kubectl create -f kube/services/app_svc.yaml
```

### Create DB migration job
```sh
kubectl create -f kube/jobs/migrate_db.yaml
```

### Create ingress
```sh
kubectl create -f kube/ingresses/ingress.yaml
```
