# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .


# Install dependencies
RUN npm install

# Expose port
EXPOSE 5000

# Start app
CMD ["npm", "run", "dev"]
