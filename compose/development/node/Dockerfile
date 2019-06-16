# Use node base image
FROM node:10-stretch-slim

# Create a working app directory
WORKDIR /usr/src/app

# Copy the package.json file into app directory to install the npm packages
COPY ./package.json /usr/src/app

# Install all the npm packages
RUN yarn install && yarn cache clean

# Copy all the files of the project into the app directory
COPY . /usr/src/app

EXPOSE ${NODE_PORT} 1337

# Run the yarn build script
CMD ["yarn", "run", "start"]