FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN touch /var/log/nginx/{access,error}.log
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]