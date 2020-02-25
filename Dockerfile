FROM node:alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app
RUN chmod -R 777 /home/node/app
RUN npm install --production

EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi
