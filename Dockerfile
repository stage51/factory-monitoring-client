FROM node:18-alpine AS builder

ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS tester
WORKDIR /app
COPY --from=builder /app /app
CMD ["npm", "test"]

FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/certificate.crt /etc/nginx/certs/certificate.crt
COPY certs/certificate.key /etc/nginx/certs/certificate.key
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
