# hits-counter

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
