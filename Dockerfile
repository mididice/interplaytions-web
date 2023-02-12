FROM node:16 as build

WORKDIR /usr/src/app

COPY . /usr/src/app
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install
RUN npm run build

FROM nginx:1.23.1-alpine
RUN rm -rf /etc/nginx/conf.d

COPY nginx/conf.d /etc/nginx/conf.d
COPY nginx/run.sh /etc/nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["sh", "/etc/nginx/run.sh"]
