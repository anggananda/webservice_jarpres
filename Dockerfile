# Stage 1: Build Vite App
FROM node:16 as build

WORKDIR /app

# Install dependencies dan build aplikasi
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Aplikasi dengan Nginx
FROM nginx:alpine

# Hapus konfigurasi default Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy hasil build ke Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx (opsional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
