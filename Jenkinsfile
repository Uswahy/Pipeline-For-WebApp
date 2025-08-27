pipeline {
    agent any
    environment {
        DOCKER_IMAGE = "pipeline-for-webapp"        // Your Docker Hub repo
        EC2_HOST = "ubuntu@54.196.86.213"          // Your EC2 public IP
        S3_BUCKET = "final-webapp-logs"            // Your S3 bucket name
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Uswahy/Pipeline-For-WebApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Use your Jenkins Docker Hub credentials
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials') {
                        def img = docker.image("${DOCKER_IMAGE}:${env.BUILD_NUMBER}")
                        img.push()
                        img.push('latest')
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                // Use your Jenkins EC2 SSH key
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} \\
                        "docker pull ${DOCKER_IMAGE}:${env.BUILD_NUMBER} && \
                        docker stop webapp || true && \
                        docker rm webapp || true && \
                        docker run -d --name webapp -p 80:80 ${DOCKER_IMAGE}:${env.BUILD_NUMBER}"
                    """
                }
            }
        }

        stage('Backup Logs to S3') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${EC2_HOST} \\
                        "aws s3 sync /var/log/webapp s3://${S3_BUCKET}/\$(date +%Y-%m-%d_%H-%M-%S)"
                    """
                }
            }
        }
    }
}



