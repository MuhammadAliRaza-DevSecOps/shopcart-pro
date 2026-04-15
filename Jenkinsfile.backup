pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'http://host.docker.internal:9000'
        SONAR_TOKEN = 'sqp_8086e88280aa7c58f0fc3beae9301b4d3019b474'
    }

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

        stage('SonarQube Scan') {
            steps {
                dir('app') {
                    sh '''
                    docker run --rm \
                      -e SONAR_HOST_URL=$SONAR_HOST_URL \
                      -e SONAR_TOKEN=$SONAR_TOKEN \
                      -v $(pwd):/usr/src \
                      sonarsource/sonar-scanner-cli
                    '''
                }
            }
        }
    }
}