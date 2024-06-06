FROM nginx:alpine

COPY ./dist/ruyu-client/browser /usr/share/nginx/html

EXPOSE 80