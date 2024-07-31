# Use the base image of Alpine
FROM node:20-alpine

# Set environment variables to avoid prompts during installation
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk
ENV PATH=$JAVA_HOME/bin:$PATH

# Update the package index and install necessary dependencies
#nodejs-current \
RUN apk update && \
    apk add --no-cache \
    openjdk11-jdk \
    npm \
    docker \
    bash \
    && rm -rf /var/cache/apk/*

# Verify Node.js installation
RUN node -v
RUN npm -v

# Install allure-commandline globally
RUN npm install -g allure-commandline --save-dev

# Verify Java installation
RUN java -version
RUN javac -version

# Verify Docker installation
RUN docker --version

# Set the working directory
WORKDIR /app

# Copy application files to the container
COPY package.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

#Expose ports
EXPOSE 5001
EXPOSE 61901

#Run docker first and later the node app
CMD ["sh", "-c", "dockerd & sleep 5 && npm run server"]
