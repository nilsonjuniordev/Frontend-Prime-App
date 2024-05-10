# Etapa de construção
FROM node:latest AS frontend-builder

WORKDIR /app/frontend
COPY Frontend-Prime-App/package*.json ./
RUN npm install
COPY Frontend-Prime-App .
RUN npm run build

# Etapa final
FROM nginx:latest AS frontend-runtime

# Atualize os repositórios e instale as dependências necessárias
RUN apt-get update && apt-get install -y \
    certbot \
    python3-certbot-nginx \
    && rm -rf /var/lib/apt/lists/*
    
# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração customizado para o contêiner
COPY Frontend-Prime-App/nginx.conf /etc/nginx/conf.d/

# Copia os arquivos de build do aplicativo React para o diretório de HTML do Nginx
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Expose a porta 80 para o tráfego HTTP
EXPOSE 80
