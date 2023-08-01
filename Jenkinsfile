// Jenkinsfile (Declarative pipeline)
pipeline {
    agent any
    stages {
        stage('Giblab') {
            steps {
                git branch: 'backend', url: 'https://lab.ssafy.com/s09-webmobile2-sub2/S09P12E203.git'
            }
        }
        stage('GradleBuild') {
            steps {
                dir('/Ssarout/BackEnd') {
                    sh "./gradlew clean build"
                }
            }
        }
        stage('Build'){
            steps {
                dir('/Ssarout/BackEnd') {
                    sh "docker ps -f name=backend -q | xargs --no-run-if-empty docker container stop"
                    sh "docker build -t backend ."
                }
            }
        }
        stage('Deploy') {
            steps {
                dir('/Ssarout/BackEnd') {
                    sh "docker run -it -d --rm -p 8080:8080 --name=backend backend -h bserver -e TZ=Asia/Seoul"
                    sh "sh 'docker images -qf dangling=true | xargs -I{} docker rmi {}'"
                }
            }
        }
    }
}
