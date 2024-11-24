# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code into the container
COPY . .

# Expose port 3000 to the outside
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "start"]
