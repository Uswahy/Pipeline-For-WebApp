pipeline {
  agent any

  environment {
    DOCKERHUB_REPO = "your-dockerhub-username/devops-demo"
    EC2_HOST = "your-ec2-public-ip"
    EC2_USER = "ubuntu"
    S3_BUCKET = "your-s3-bucket-name"
    CONTAINER_NAME = "devops-demo"
    APP_PORT = "3000"
    IMAGE_TAG = "${DOCKERHUB_REPO}:${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker image') {
      steps {
        sh '''
          docker build -t ${DOCKERHUB_REPO}:latest -t ${IMAGE_TAG} .
        '''
      }
    }

    stage('Push Docker image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub_credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push ${DOCKERHUB_REPO}:latest
            docker push ${IMAGE_TAG}
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent(['ec2_ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
              docker pull ${IMAGE_TAG} &&
              docker rm -f ${CONTAINER_NAME} || true &&
              sudo mkdir -p /var/log/myapp &&
              docker run -d --name ${CONTAINER_NAME} \\
                -p 80:${APP_PORT} \\
                -v /var/log/myapp:/usr/src/app/logs \\
                --restart unless-stopped \\
                ${IMAGE_TAG}
            "
          '''
        }
      }
    }

    stage('Backup logs to S3') {
      steps {
        sshagent(['ec2_ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} "
              aws s3 sync /var/log/myapp s3://${S3_BUCKET}/logs/$(date +%F)/ --only-show-errors
            "
          '''
        }
      }
    }
  }

  post {
    always {
      cleanWs()
    }
  }
}
