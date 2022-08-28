# AWS EKS Setup

[toc]

## Install `eksctl` tool

https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html

## Create Cluster

```bash
eksctl create cluster --name myweb --region us-west-1
```

### Create an IAM OIDC provider for your cluster
https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html

```bash
> aws eks describe-cluster --name myweb --query "cluster.identity.oidc.issuer" --output text --region us-west-1
# output
https://oidc.eks.region-code.amazonaws.com/id/EXAMPLED539D4633E53DE1B71EXAMPLE

> aws iam list-open-id-connect-providers | grep EXAMPLED539D4633E53DE1B71EXAMPL
# if output is not empty, then does not need to create one

# otherwise
> eksctl utils associate-iam-oidc-provider --cluster myweb --approve --region us-west-1
```


## Add TCP Load Balancer

Follow this document: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html

```bash
# add aws load balancer controller
> helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=myweb \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=us-west-1 \
  --set vpcId=vpc-0ff2aa0b757e63bfc \
  --set image.repository=602401143452.dkr.ecr.us-west-1.amazonaws.com/amazon/aws-load-balancer-controller \
  --replace
```

### Example TCP ELB yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: blogweb-react-service
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: external
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: ip
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
spec:
  type: LoadBalancer
  selector:
    layer: frontend
    app: blogweb-react
  ports:
    - protocol: TCP
      targetPort: 3000
      port: 80

```

### Trouble Shooting
The aws load balancer controller failed with this error message `{"level":"error","ts":1660505796.024104,"logger":"controller-runtime.manager.controller.service","msg":"Reconciler error","name":"blogweb-react-service","namespace":"default","error":"unable to discover at least one subnet"}`. 
- Make sure we tag the subnets correctly: https://docs.aws.amazon.com/eks/latest/userguide/network-load-balancing.html



## Persistence Storage 

### Install EBS CSI plugin

official doc: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html

```
eksctl create iamserviceaccount \
  --name ebs-csi-controller-sa \
  --namespace kube-system \
  --cluster my-cluster \
  --attach-policy-arn arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy \
  --approve \
  --role-only \
  --role-name AmazonEKS_EBS_CSI_DriverRole

eksctl create addon --name aws-ebs-csi-driver --cluster myweb --service-account-role-arn arn:aws:iam::664926421824:role/AmazonEKS_EBS_CSI_DriverRole --force
```


# Blogweb Deployment

## Config.yaml
Both Frontend and Backend servies have configurations stored in the K8s `ConfigMap`. The existing configurations are in the `/kubernetes/config.yaml`. 
```
# cd to /kubernetes directory and run
kubectl apply -f config.yaml
```


## Secrets.yaml
The Database secrets need to be stored in K8s `Secret`. You need to create a new file `secrets.yaml` under the `/kubernetes/` directory. 

```yaml
# secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:
  redisPassword: your_redis_password
  mysql-root-password: your_mysql_root_password
  mysql-replication-password: your_mysql_replica_password
  mysql-password: your_mysql_admin_password     # mysql 'admin' user password
```

```
# cd to /kubernetes directory and run
kubectl apply -f secrets.yaml
```

## Persistence Volumes
Before start any deployments, we have to claim our persistence volumes that we are going to mount to our applications. 

```
# cd to /kubernetes directory and run
kubectl apply -f storage.yaml
```

## Databases

### Helm 
We use **Helm** to install our database clusters. Helm provides an abstraction over the raw kubernetes config. We do not need to manually write k8s yaml files for `StatefulSets, Headless Service...`, which is painful. With Helm charts, we only cares about high-level options and configs Helm provides. And then Helm will generate the k8s config and apply them to the cluster for us. 

How to install? public doc: https://helm.sh/docs/intro/install/

And add bitnami charts that we are going to use for MySQL and Redis clusters
```
helm repo add bitnami https://charts.bitnami.com/bitnami
```

### MySQL Cluster

Although we are currently using a standalone MySQL node. With Helm chart, we can easily extend to leader-replica MySQL Cluster. 

```
# cd to /kubernetes directory and run
helm install -f mysql_helm.yaml mysql bitnami/mysql
```

### Redis Cluster

Currently, we only have one Standalone Redis node. With Helm chart, we can easily extend to leader-replica Redis Cluster and with setinel support as well. 

```
# cd to /kubernetes directory and run
helm install -f redis_helm.yaml redis bitnami/redis
```

## Deployments

### Docker Image

Follow the instructions in `/frontend/README.md and /backend/README.md` to build your own docker images for both react and spring apps. And then push them to your docker image hub. 


### Start deployments

The example yaml is using my own docker image `ysjason/blogweb-frontend:1.0.0 and ysjason/blogweb-backend:1.0.0`. Please replace them with your own docker images. 

```
# cd to /kubernetes directory and run
kubectl apply -f deployment.yaml
```

## Services

Both our frontend and backend services are integrated with **AWS Network Load Balancer** on TCP layer, with **internet-facing** public endpoints. 

- React Frontend Service
  - Public port: 80
  - Container's port: 3000
- Spring Backend Service
  - Public port: 9000
  - Container's port: 9000

```
# cd to /kubernetes directory and run
kubectl apply -f service.yaml
```


## Access Your Stack

`kubectl get svc` will return the public endpoints for both your frontend and backend services. Example output: 
```
> kubectl get svc
NAME                      TYPE           CLUSTER-IP       EXTERNAL-IP                                                                    PORT(S)          AGE
blogweb-backend-service   LoadBalancer   10.100.191.70    k8s-default-blogwebb-53dfd852b8-685377d2a0a8d394.elb.us-west-1.amazonaws.com   9000:30860/TCP   4d18h
blogweb-react-service     LoadBalancer   10.100.215.225   k8s-default-blogwebr-4bca829002-3659f8d10a3e727b.elb.us-west-1.amazonaws.com   80:30654/TCP     13d
kubernetes                ClusterIP      10.100.0.1       <none>                                                                         443/TCP          13d
mysql                     ClusterIP      10.100.14.248    <none>                                                                         3306/TCP         12d
mysql-headless            ClusterIP      None             <none>                                                                         3306/TCP         12d
redis-headless            ClusterIP      None             <none>                                                                         6379/TCP         12d
redis-master              ClusterIP      10.100.140.14    <none>                                                                         6379/TCP         12d
```
On your browser, open `http://<blogweb-react-service endpoint>`. 