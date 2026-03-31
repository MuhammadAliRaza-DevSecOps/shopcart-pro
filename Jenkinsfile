pipeline {
    agent any

    stages {
        stage('Docker Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up --build -d'
            }
        }
    }
}