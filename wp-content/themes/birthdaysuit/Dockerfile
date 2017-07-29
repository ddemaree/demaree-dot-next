FROM node:latest
ADD ./ /app
WORKDIR /app
RUN yarn install
EXPOSE 9000
CMD /app/node_modules/.bin/webpack-dev-server
