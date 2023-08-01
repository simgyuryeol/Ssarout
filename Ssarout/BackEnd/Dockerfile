FROM openjdk:8-jdk
ARG JAR_FILE=build/libs/*-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["nohup","java","-jar","/app.jar","&"]