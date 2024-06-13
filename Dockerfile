FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist/ruyu-client/browser /usr/share/nginx/html
COPY ./ruyui_com_site.crt /etc/ssl/ruyui_com_site.crt
COPY ./ruyui_com_site.key /etc/ssl/ruyui_com_site.key