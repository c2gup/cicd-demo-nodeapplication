pipeline {
    agent any

    tools {
        nodejs 'nodejS-26' // Jenkins Tool name (Manage Jenkins -> Tools -> NodeJS)
    }

    options {
        skipDefaultCheckout(true) // Manual checkout stage use kar rahe hain
        timestamps()              // Console output me timestamps show karega
        disableConcurrentBuilds() // Ek waqt me ek hi build run hogi
    }

    environment {
        NODE_ENV = 'production'
        PORT = '3000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out code from repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Code Linting') {
            steps {
                echo 'Checking code quality with ESLint...'
                sh 'npm run lint'
            }
        }

        stage('Run Unit Tests') {
            steps {
                echo 'Running unit test cases...'
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Validating application build...'
                sh 'npm run build'
            }
        }

        stage('Package Application') {
            steps {
                echo 'Packaging application into tar.gz artifact...'
                sh 'tar -czf sortbackend-${BUILD_NUMBER}.tar.gz src package.json package-lock.json'
                // Jenkins me artifact ko store / archive karein:
                archiveArtifacts artifacts: 'sortbackend-*.tar.gz', fingerprint: true
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying backend application...'
                sh 'chmod +x scripts/deploy.sh && ./scripts/deploy.sh'
            }
        }

        stage('Smoke Test') {
            steps {
                echo 'Running smoke tests on deployed application...'
                sh 'npm run test:smoke'
            }
        }
    }

    post {
        always {
            echo 'Recording test results in Jenkins...'
            junit testResults: 'test-results/*.xml', allowEmptyResults: true
        }
        success {
            echo 'Pipeline succeeded! App built, packaged, deployed & smoke-tested.'

        }
        failure {
            echo 'Pipeline failed! Check logs above for errors.'
        }
    }
}
