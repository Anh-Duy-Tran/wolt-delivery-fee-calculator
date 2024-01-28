# Stage 1: Build the React application
FROM node:21-alpine3.18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application via vercel serve package
FROM node:21-alpine3.18 as serve

# Set the working directory
WORKDIR /app

# Copy the build artifacts from the build stage
COPY --from=build /app/dist /app/dist

# Install only serve package
RUN npm install serve

# Expose the port 3000
EXPOSE 3000

# Command to serve the app
CMD ["npx", "serve", "dist"]
