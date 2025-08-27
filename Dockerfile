# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY app/package*.json ./
RUN npm install

# Copy app code
COPY app/ ./

# Expose port 80
EXPOSE 80

# Start app
CMD ["npm", "start"]
