# Base image NGINX untuk melayani aplikasi React
FROM nginx:latest

# Salin hasil build aplikasi React ke direktori NGINX
COPY dist/ /usr/share/nginx/html

# Salin konfigurasi NGINX
COPY nginx.conf /etc/nginx/nginx.conf

# Buka port 80 untuk layanan web
EXPOSE 80

# Jalankan NGINX
CMD ["nginx", "-g", "daemon off;"]
