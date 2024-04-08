FROM node:20.11-bookworm-slim as base

# Set the working directory
WORKDIR /usr/src/app
# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./
# Install the dependencies
RUN yarn
# Copy the source code to the container
COPY . .

# for build
FROM base as builder

# Set the working directory
WORKDIR /usr/src/app
# Build the application
RUN yarn build
# for production
FROM nginx:mainline-alpine-slim as main
# Copy the built files from the builder stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
# Expose the port
EXPOSE 80
# Run the application in production mode
CMD ["nginx","-g","daemon off;"]
