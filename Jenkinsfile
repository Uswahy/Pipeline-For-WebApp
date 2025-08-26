pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "your-dockerhub-username"
        IMAGE_NAME = "devops-demo"
    }

    stages {
        stage('Clone Code') {
            steps {
                bat 'git --version'  // sanity check
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKERHUB_USER%/%IMAGE_NAME% ."
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                }
            }
        }

        stage('Push Image to DockerHub') {
            steps {
                bat "docker push %DOCKERHUB_USER%/%IMAGE_NAME%"
            }
        }

        stage('Deploy to EC2') {
            steps {
                // For Windows Jenkins, we use pscp + plink or AWS CLI.
                // Example below assumes AWS CLI is configured:
                bat 'aws ec2 describe-instances'  // sanity check
                // Normally you'd ssh into EC2 and run docker commands.
            }
        }

        stage('Backup Logs to S3') {
            steps {
                bat 'aws s3 cp C:\\ProgramData\\Jenkins\\.jenkins\\logs s3://your-s3-bucket-name/ --recursive'
            }
        }
    }
}
