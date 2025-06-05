# Projeto Full-Stack com Docker

Este projeto contém uma aplicação full-stack com backend em Nest.js e frontend em React, totalmente containerizada com Docker.

## 🚀 Início Rápido

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 18+ (para desenvolvimento local)

### Executar localmente

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
\`\`\`

2. Configure as variáveis de ambiente:
\`\`\`bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
\`\`\`

3. Execute com Docker Compose:
\`\`\`bash
docker-compose up -d
\`\`\`

4. Acesse a aplicação:
- Frontend: http://localhost
- Backend: http://localhost:3001
- Database: localhost:5432

## 📦 Deploy em Produção

### Configuração do CI/CD

1. Configure os secrets no GitHub:
   - `DOCKER_HUB_USERNAME`: Seu usuário do Docker Hub
   - `DOCKER_HUB_TOKEN`: Token de acesso do Docker Hub
   - `HOST`: IP do servidor de produção
   - `USERNAME`: Usuário SSH do servidor
   - `SSH_KEY`: Chave privada SSH

2. O deploy automático acontece a cada push na branch main

### Deploy Manual

\`\`\`bash
# Fazer build das imagens
docker-compose build

# Fazer push para Docker Hub
docker-compose push

# Deploy em produção
./scripts/deploy.sh
\`\`\`

## 🛠️ Desenvolvimento

### Estrutura do Projeto
\`\`\`
projeto/
├── backend/          # API Nest.js
├── frontend/         # App React
├── docker-compose.yml
├── docker-compose.prod.yml
└── scripts/
    └── deploy.sh
\`\`\`

### Comandos Úteis

\`\`\`bash
# Ver logs dos containers
docker-compose logs -f

# Executar comandos no backend
docker-compose exec backend npm run migration:run

# Executar comandos no frontend
docker-compose exec frontend npm run test

# Backup do banco de dados
docker-compose exec database pg_dump -U user mydb > backup.sql
\`\`\`

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- `DATABASE_URL`: URL de conexão com o banco
- `JWT_SECRET`: Chave secreta para JWT
- `POSTGRES_*`: Configurações do PostgreSQL

### Nginx

O frontend usa Nginx com configurações otimizadas para:
- Servir arquivos estáticos
- Proxy reverso para API
- Suporte a SPA (Single Page Application)
- Cache de assets

## 📊 Monitoramento

### Health Checks

Os containers incluem health checks automáticos:

\`\`\`bash
# Verificar status dos containers
docker-compose ps

# Ver logs de saúde
docker-compose logs --tail=50
\`\`\`

## 🔒 Segurança

- Containers rodam com usuários não-root
- Secrets gerenciados via environment variables
- Nginx configurado com headers de segurança
- Database isolado em rede interna

## 📈 Performance

- Multi-stage builds para imagens otimizadas
- Cache de dependências no CI/CD
- Compressão gzip no Nginx
- Recursos limitados por container
