# run build from parent directory / and not /docker/build
FROM node:14 AS build

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ ./
RUN PRODUCTION=true npm run build


FROM nginx:stable

COPY --from=build /app/dist/ /var/www
COPY ./docker/build/nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["nginx -g 'daemon off;'"]
