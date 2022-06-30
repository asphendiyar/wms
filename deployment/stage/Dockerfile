FROM nginx:1.18.0-alpine-perl

RUN apk add --no-cache nginx-mod-http-perl

COPY $PWD/nginx/nginx.conf /etc/nginx/nginx.conf

ADD $PWD/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

ADD $PWD/nginx/www/html /usr/share/nginx/html