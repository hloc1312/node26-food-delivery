# Build image dựa trên image của node
FROM node:18-alpine

# Tạo 1 directory bên trong image để chứa code của ứng dụng bên trong image
WORKDIR /app

# Copy toàn bộ code của ứng dụng vào bên trong
COPY . .

# Thực thi 1 câu lệnh bên trong working directory

RUN npm install 

# Cho phép quyền thực thi file
RUN chmod +x wait-for

# Sử dụng image này ở port 4000
EXPOSE 4000

# Thực thi ứng dụng
CMD [ "node","src/index.js" ]