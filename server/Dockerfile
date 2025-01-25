FROM node:20-alpine

COPY ./server /app
WORKDIR /app

# Copy package.json and package-lock.json from the root
RUN npm install

EXPOSE 3000