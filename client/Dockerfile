FROM node:16-alpine as build

# build the app and serve it
WORKDIR /usr/src/client
COPY ./ ./
RUN yarn install && yarn build

FROM nginx:1.16.0-alpine

# to be served by nginx
COPY --from=build /usr/src/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
