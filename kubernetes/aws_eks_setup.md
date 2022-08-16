# AWS EKS Setup

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