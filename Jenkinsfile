def app

pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // your Jenkins credential ID
        IMAGE_NAME = "usway/pipeline-for-webapp" // Docker Hub repo
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image using the already checked out repo
                    app = docker.build("${IMAGE_NAME}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', DOCKERHUB_CREDENTIALS) {
                        app.push("latest")
                    }
                }
            }
        }
    }
}

