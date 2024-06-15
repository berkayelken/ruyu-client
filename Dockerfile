FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./ruyui_com_site.crt /etc/ssl/ruyui_com_site.crt
COPY ./ruyui_com_site.key /etc/ssl/ruyui_com_site.key
COPY ./backend.cer /etc/nginx/certs/backend.cer
COPY ./backend.key /etc/nginx/certs/backend.key
COPY ./dist/ruyu-client/browser /usr/share/nginx/html