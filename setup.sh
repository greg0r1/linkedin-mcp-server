#!/bin/bash

# LinkedIn MCP Server - Script de configuration rapide
# Ce script facilite l'installation et la configuration du serveur

set -e  # Arrêter en cas d'erreur

echo "🚀 LinkedIn MCP Server - Configuration"
echo "======================================"
echo ""

# Couleurs pour les messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Vérifier Node.js
echo "📦 Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez Node.js depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js détecté: $NODE_VERSION${NC}"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances npm..."
npm install
echo -e "${GREEN}✅ Dépendances installées${NC}"
echo ""

# Vérifier .env
echo "🔐 Vérification de la configuration..."
if [ ! -f .env ]; then
    echo -e "${RED}❌ Fichier .env manquant${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Fichier .env créé depuis .env.example${NC}"
    echo "Veuillez éditer .env et ajouter vos credentials LinkedIn"
    exit 1
fi

# Vérifier si le Client Secret est configuré
if grep -q "VOTRE_SECRET_ICI" .env; then
    echo -e "${YELLOW}⚠️  Le Client Secret n'est pas configuré dans .env${NC}"
    echo ""
    echo "Actions requises :"
    echo "1. Allez sur https://www.linkedin.com/developers/apps"
    echo "2. Cliquez sur votre app 'Claude MCP Social Connector'"
    echo "3. Onglet 'Auth' > Copiez le Client Secret"
    echo "4. Éditez le fichier .env et remplacez VOTRE_SECRET_ICI"
    echo ""
    echo "Voulez-vous ouvrir le fichier .env maintenant ? (o/n)"
    read -r response
    if [[ "$response" =~ ^[Oo]$ ]]; then
        open .env
    fi
    exit 1
fi

echo -e "${GREEN}✅ Fichier .env configuré${NC}"
echo ""

# Compiler TypeScript
echo "🔨 Compilation du code TypeScript..."
npm run build
echo -e "${GREEN}✅ Compilation réussie${NC}"
echo ""

# Tester l'authentification
echo "🔐 Test de l'authentification..."
echo ""
echo "Le serveur va démarrer et vous demander de vous authentifier via LinkedIn."
echo "Une page web s'ouvrira automatiquement dans votre navigateur."
echo ""
echo "Appuyez sur Entrée pour continuer ou Ctrl+C pour annuler..."
read

# Démarrer le serveur pour l'authentification initiale
npm start

echo ""
echo -e "${GREEN}🎉 Configuration terminée !${NC}"
echo ""
echo "Prochaines étapes :"
echo "1. Configurez Claude Desktop (voir INSTALLATION.md)"
echo "2. Redémarrez Claude Desktop"
echo "3. Testez avec : 'Récupère mon profil LinkedIn'"
echo ""
