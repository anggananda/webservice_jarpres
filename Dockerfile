# Gunakan Node.js untuk build tahap awal
FROM node:18 AS builder

# Set work directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy semua file ke dalam container
COPY . .

# Build aplikasi React menggunakan Vite
RUN npm run build

# Tahap kedua: Nginx untuk hosting aplikasi frontend
FROM nginx:stable-alpine

# Copy hasil build ke dalam direktori default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy konfigurasi Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 untuk kontainer
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
