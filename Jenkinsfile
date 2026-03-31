pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                dir('app') {
                    git branch: 'main', url: 'https://github.com/MuhammadAliRaza-DevSecOps/shopcart-pro.git'
                }
            }
        }

        stage('Docker Deploy') {
            steps {
                dir('app') {
                    sh 'docker-compose down || true'
                    sh 'docker-compose up --build -d'
                }
            }
        }

        stage('Trivy Scan Backend') {
            steps {
                sh 'docker run --rm aquasec/trivy:0.61.0 image app-backend:latest'
            }
        }

        stage('Trivy Scan Frontend') {
            steps {
                sh 'docker run --rm aquasec/trivy:0.61.0 image app-frontend:latest'
            }
        }
    }
}