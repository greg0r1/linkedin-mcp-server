# LinkedIn MCP Server

Serveur MCP (Model Context Protocol) pour LinkedIn permettant à Claude Desktop d'interagir avec votre profil LinkedIn et votre page entreprise GD Dev Solutions.

## 🎯 Fonctionnalités

### Profil Personnel
- ✅ Récupérer les informations de profil
- ✅ Créer et publier des posts
- ✅ Lire vos posts

### Page Entreprise (GD Dev Solutions)
- ✅ Publier des posts au nom de la page
- ✅ Récupérer les analytics de la page
- ✅ Gérer le contenu de la page
- ✅ Lire les statistiques des posts

### Recherche & Jobs
- ✅ Rechercher des offres d'emploi
- ✅ Filtrer par localisation, entreprise, etc.

### Messages (si scope activé)
- ✅ Lire les conversations
- ✅ Envoyer des messages

## 🚀 Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configuration

Copiez `.env.example` vers `.env` et remplissez vos credentials LinkedIn :

```bash
cp .env.example .env
```

Éditez `.env` avec vos informations :
```env
LINKEDIN_CLIENT_ID=78porn6kgy7zmm
LINKEDIN_CLIENT_SECRET=votre_secret_ici
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback
LINKEDIN_COMPANY_ID=votre_company_id
```

### 3. Build le projet

```bash
npm run build
```

## 🔧 Configuration Claude Desktop

Ajoutez cette configuration dans votre fichier de config Claude Desktop :

**macOS** : `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": [
        "/Users/gregorydernaucourt/Documents/dev/linkedin-mcp-server/dist/index.js"
      ]
    }
  }
}
```

## 🎯 Utilisation

### Première utilisation - Authentification OAuth

1. Démarrez le serveur :
```bash
npm start
```

2. Le serveur va ouvrir une page web pour l'authentification LinkedIn
3. Connectez-vous et autorisez l'application
4. Les tokens seront sauvegardés automatiquement dans `tokens.json`

### Avec Claude Desktop

Une fois configuré, vous pouvez demander à Claude :

- "Publie un post sur mon profil LinkedIn à propos de..."
- "Récupère mes derniers posts LinkedIn"
- "Publie sur la page GD Dev Solutions un post sur..."
- "Cherche des offres d'emploi Angular Developer à Nice"
- "Quelles sont les stats de ma page entreprise ?"

## 📁 Architecture

```
src/
├── domain/              # Entités métier
│   ├── entities/       # Entités LinkedIn
│   └── interfaces/     # Interfaces & Contracts
├── application/        # Cas d'utilisation
│   └── use-cases/     # Use cases métier
├── infrastructure/     # Services externes
│   ├── linkedin/      # Client LinkedIn API
│   └── storage/       # Stockage tokens
├── presentation/       # Couche MCP
│   └── tools/         # Outils MCP exposés
└── index.ts           # Point d'entrée
```

## 🔐 Sécurité

- ⚠️ **Ne commitez JAMAIS** votre fichier `.env`
- ⚠️ Les tokens OAuth sont stockés localement dans `tokens.json`
- ⚠️ Ajoutez `.env` et `tokens.json` au `.gitignore`

## 🛠️ Développement

```bash
# Mode développement avec watch
npm run dev

# Build
npm run build

# Démarrer
npm start
```

## 📚 Ressources

- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)

## 📝 License

MIT

## 👨‍💻 Auteur

Grégory Dernaucourt - GD Dev Solutions
