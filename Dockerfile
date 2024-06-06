FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ruyu-client/browser /usr/share/nginx/html

EXPOSE 80