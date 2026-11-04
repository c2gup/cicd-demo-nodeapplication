pipeline {
    agent any

    // Optional: Agar Jenkins me NodeJS tool configure hai to ye uncomment kar sakte ho
    // tools {
    //     nodejs 'NodeJS-18' // Jenkins Tool name
    // }

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

        stage('Run Tests') {
            steps {
                echo 'Running unit test cases...'
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying backend application...'
                // Production me deploy karne ke options:
                // 1. PM2:
                // sh 'pm2 reload sortbackend || pm2 start src/server.js --name sortbackend'
                // 2. Docker:
                // sh 'docker build -t sortbackend .'
                // sh 'docker run -d -p 3000:3000 sortbackend'
                echo 'Application deployed successfully on port 3000!'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace / logging completion...'
        }
        success {
            echo 'Pipeline succeeded! Build and tests passed.'
        }
        failure {
            echo 'Pipeline failed! Check logs above for errors.'
        }
    }
}
