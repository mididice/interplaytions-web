#!/usr/bin/env sh

envsubst '${API_HOST} ${API_PORT} ${CODE_HOST} ${CODE_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g "daemon off;"