pipeline {
 agent any

    stages {
        stage('1. Detect changes') {
            steps {
                git branch: 'master', url: 'https://github.com/ethecheth/maikyapp.git'
            }
        }
        stage('2. Build') {
            steps {
                echo 'Building...'
                sh 'docker compose -f docker-compose.dev.yml up -d --build'
            }
        }
        stage('3. Testing with cypress') {
            steps {
                echo 'Testing...'
                sh 'docker compose -f docker-compose.test.yml up testing --abort-on-container-exit --build'
            }
        }
        stage('4. Generate test report') {
            steps {
                echo 'Hello World'
                sh 'ls -l reports || echo "No reports directory found"'
            }
        }
    }
    post {
        always {
            // Archive test reports if they exist
            junit testResults: 'reports/*.xml', allowEmptyResults: true

            // Bring down the Docker containers after the build
            sh 'docker compose -f docker-compose.dev.yml down || true'
            sh 'docker compose -f docker-compose.test.yml down || true'
        }
    }
}