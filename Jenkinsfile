pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "shopcart-backend:latest"
        FRONTEND_IMAGE = "shopcart-frontend:latest"
        K8S_NAMESPACE = "shopcart"
        HELM_RELEASE = "shopcart-release"
        HELM_CHART_PATH = "./shopcart-chart"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Version Check') {
            steps {
                bat 'docker --version'
            }
        }

        stage('Kubectl Version Check') {
            steps {
                bat 'kubectl version --client'
            }
        }

        stage('Helm Version Check') {
            steps {
                bat 'helm version'
            }
        }

        stage('Build Backend Image') {
            steps {
                bat 'docker build -t %BACKEND_IMAGE% ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                bat 'docker build -t %FRONTEND_IMAGE% ./frontend'
            }
        }

        stage('Helm Upgrade Deploy') {
            steps {
                bat 'helm upgrade --install %HELM_RELEASE% %HELM_CHART_PATH% -n %K8S_NAMESPACE% --create-namespace'
            }
        }

        stage('Verify Kubernetes') {
            steps {
                bat 'kubectl get pods -n %K8S_NAMESPACE%'
                bat 'kubectl get svc -n %K8S_NAMESPACE%'
                bat 'kubectl get ingress -n %K8S_NAMESPACE%'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
