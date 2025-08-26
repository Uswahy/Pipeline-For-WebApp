def app

pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // 👈 use the ID you created
        IMAGE_NAME = "usway/pipeline-for-webapp" // 👈 your Docker Hub repo name
    }
    stages {
        stage('Clone repo') {
            steps {
                git 'https://github.com/Uswahy/Pipeline-For-WebApp.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
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

