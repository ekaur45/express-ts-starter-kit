# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=21.1.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine 


RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./
COPY . .
#USER node

RUN ./build.sh
EXPOSE 8800
# COPY --chown=node:node . .

WORKDIR /home/node/app/build
CMD [ "node", "index.js" ]
