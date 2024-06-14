FROM node:alpine
# COPY ./frontend ./home/app/frontend
RUN cd /home/app/frontend && npm install
CMD ["npm", "build"]

FROM amazoncorretto:21
COPY ./ /home/app
RUN cd /home/app && ./gradlew build -x test
EXPOSE 8080
ENTRYPOINT ["java","-jar","-Dfile.encoding=UTF-8","/home/app/build/libs/BTC6_Nmap2-0.0.1-SNAPSHOT.jar"]

