# Use Node 18 base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose port your app listens to
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]

