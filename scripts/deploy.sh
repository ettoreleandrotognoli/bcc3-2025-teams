#!/bin/bash

# Script de deploy automatizado

set -e

echo "🚀 Iniciando deploy..."

# Verificar se Docker está rodando
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker não está rodando!"
    exit 1
fi

# Fazer pull das imagens mais recentes
echo "📥 Baixando imagens mais recentes..."
docker-compose -f docker-compose.prod.yml pull

# Parar containers antigos
echo "🛑 Parando containers antigos..."
docker-compose -f docker-compose.prod.yml down

# Subir novos containers
echo "🔄 Subindo novos containers..."
docker-compose -f docker-compose.prod.yml up -d

# Aguardar containers ficarem prontos
echo "⏳ Aguardando containers ficarem prontos..."
sleep 30

# Verificar se containers estão rodando
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Deploy realizado com sucesso!"
    echo "🌐 Frontend: http://localhost"
    echo "🔧 Backend: http://localhost:3001"
else
    echo "❌ Erro no deploy!"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
fi

# Limpar imagens antigas
echo "🧹 Limpando imagens antigas..."
docker system prune -f

echo "🎉 Deploy concluído!"
