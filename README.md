# DevOps Demo Project

This is a simple Node.js app with a full CI/CD pipeline:

- GitHub repo
- Jenkins pipeline
- Docker image build + push to Docker Hub
- Deployment to EC2
- Log backup to S3

## Run locally
```
docker build -t devops-demo .
docker run -p 3000:3000 devops-demo
```
Visit http://localhost:3000
