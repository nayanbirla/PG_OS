# Stage 1: Build
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
# Download dependencies first (cached layer)
RUN apk add --no-cache maven && \
    mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/pgos-backend-*.jar app.jar

# Render free tier has 512 MB RAM — optimize JVM accordingly
ENV JAVA_OPTS="-Xms128m -Xmx384m -XX:+UseG1GC -XX:+UseStringDeduplication"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
