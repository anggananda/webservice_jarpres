# Base image Nginx
FROM nginx:stable-alpine

# Copy hasil build React ke direktori default Nginx
COPY ./ /usr/share/nginx/html

# Ekspos port 80
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
