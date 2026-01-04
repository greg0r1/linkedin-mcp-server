# 📖 LinkedIn MCP Server - Guide de Référence Rapide

## 🚀 Démarrage ultra-rapide (5 minutes)

```bash
# 1. Aller dans le projet
cd ~/Documents/dev/linkedin-mcp-server

# 2. Configurer .env avec votre Client Secret
open .env
# Remplacez VOTRE_SECRET_ICI par votre secret LinkedIn

# 3. Tout installer et configurer
npm run setup

# 4. Configurer Claude Desktop
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
# Ajoutez la config MCP (voir ci-dessous)

# 5. Redémarrer Claude Desktop
# Cmd+Q puis relancer
```

---

## ⚙️ Configuration Claude Desktop

Ajoutez dans `claude_desktop_config.json` :

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

---

## 🎯 Commandes essentielles

```bash
# Installation complète automatique
npm run setup

# Récupérer le Company ID de GD Dev Solutions
npm run get-company-id

# Compiler le code TypeScript
npm run build

# Démarrer le serveur (pour tester hors Claude)
npm start

# Mode développement (auto-recompile)
npm run dev

# Tester rapidement
npm test
```

---

## 💬 Exemples de commandes Claude

### Profil
```
Récupère mon profil LinkedIn
Montre-moi mes informations LinkedIn
```

### Posts personnels
```
Publie sur LinkedIn : [votre message]
Montre mes 5 derniers posts LinkedIn
Supprime mon dernier post LinkedIn
```

### Page entreprise
```
Publie sur la page GD Dev Solutions : [votre message]
Montre les derniers posts de GD Dev Solutions
Récupère les stats de ma page entreprise
```

---

## 📁 Structure des fichiers importants

```
linkedin-mcp-server/
├── .env                    # ⚙️ CREDENTIALS (à configurer)
├── tokens.json             # 🔐 Tokens OAuth (auto-généré)
├── dist/                   # 📦 Code compilé
│   └── index.js            # Point d'entrée pour Claude
├── src/                    # 💻 Code source TypeScript
│   ├── index.ts
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── presentation/
└── Documentation/
    ├── README.md           # Vue d'ensemble
    ├── QUICKSTART.md       # ⭐ Démarrage rapide
    ├── INSTALLATION.md     # Guide détaillé
    ├── PERMISSIONS.md      # Permissions LinkedIn
    ├── TESTING.md          # Tests
    ├── TODO.md             # Prochaines étapes
    └── ARCHITECTURE.md     # Architecture technique
```

---

## 🔑 Credentials nécessaires

### Dans `.env` :
```env
LINKEDIN_CLIENT_ID=78porn6kgy7zmm
LINKEDIN_CLIENT_SECRET=VOTRE_SECRET_ICI  # ⚠️ À remplir
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback
LINKEDIN_COMPANY_ID=                     # Optionnel (via npm run get-company-id)
```

### Où trouver le Client Secret ?
1. https://www.linkedin.com/developers/apps
2. Cliquer sur votre app
3. Onglet "Auth"
4. Icône 👁️ à côté de "Primary Client Secret"

---

## 🔐 Permissions LinkedIn requises

### Minimum vital (demandez maintenant) :
- ✅ **Sign In with LinkedIn using OpenID Connect**
- ✅ **Share on LinkedIn**

### Optionnel (pour plus tard) :
- **Advertising API** - Pour les analytics
- **Marketing Developer Platform** - Pour analytics avancés

**Voir `PERMISSIONS.md` pour les détails**

---

## 🐛 Dépannage rapide

### Erreur : "Invalid environment variables"
```bash
# Vérifiez .env
cat .env | grep CLIENT_SECRET
# Ne doit PAS contenir "VOTRE_SECRET_ICI"
```

### Erreur : "Authentication failed"
```bash
# Supprimez le token et réauthentifiez
rm tokens.json
npm start
```

### Le serveur ne démarre pas dans Claude
```bash
# Vérifiez les logs
tail -f ~/Library/Logs/Claude/mcp*.log

# Vérifiez la compilation
npm run build

# Vérifiez le chemin dans claude_desktop_config.json
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### Token expiré
```bash
# Le refresh est automatique, mais si problème :
rm tokens.json
npm start
```

---

## 📊 Checklist de vérification

### Installation
- [ ] Node.js 18+ installé
- [ ] Projet cloné/créé
- [ ] `npm install` réussi
- [ ] `.env` configuré avec Client Secret
- [ ] `npm run build` sans erreur

### Authentication
- [ ] OAuth flow complété
- [ ] `tokens.json` créé
- [ ] Token valide (pas expiré)

### LinkedIn App
- [ ] App créée sur LinkedIn Developer Portal
- [ ] Client ID et Secret récupérés
- [ ] Redirect URI = `http://localhost:3000/auth/callback`
- [ ] Products demandés (Sign In + Share)

### Claude Desktop
- [ ] Config MCP ajoutée
- [ ] Chemin correct vers `dist/index.js`
- [ ] Claude Desktop redémarré
- [ ] Serveur visible dans Claude

### Tests
- [ ] Profil récupéré ✅
- [ ] Post personnel créé ✅
- [ ] Post visible sur LinkedIn.com ✅

---

## 🎯 Outils MCP disponibles

| Tool | Description |
|------|-------------|
| `linkedin_get_profile` | Récupérer profil utilisateur |
| `linkedin_create_post` | Créer un post personnel |
| `linkedin_get_my_posts` | Lire vos posts récents |
| `linkedin_delete_post` | Supprimer un post |
| `linkedin_get_company_page` | Infos page entreprise |
| `linkedin_create_company_post` | Post sur la page |
| `linkedin_get_company_posts` | Posts de la page |

---

## 🔄 Workflow typique

```mermaid
1. Ouvrir Claude Desktop
   ↓
2. Demander "Récupère mon profil LinkedIn"
   ↓
3. Claude appelle le MCP Server
   ↓
4. MCP Server authentifie via OAuth
   ↓
5. Appel API LinkedIn
   ↓
6. Retour des données à Claude
   ↓
7. Affichage dans Claude Desktop
```

---

## 🎨 Exemples de posts automatisés

### Post technique
```
Claude, publie sur LinkedIn :
"🚀 Aujourd'hui j'ai appris [sujet]
Voici 3 points clés :
• [Point 1]
• [Point 2]
• [Point 3]
#Dev #Apprentissage #TypeScript"
```

### Post de projet
```
Claude, publie sur GD Dev Solutions :
"💼 Nouveau projet livré !
✅ [Description]
✅ Technologies : [Stack]
✅ Résultat : [Impact]
Contactez-nous pour vos projets similaires !
#WebDev #Success"
```

### Post d'annonce
```
Claude, publie sur ma page :
"📢 Nouvelle offre de services !
[Description du service]
👉 Plus d'infos : [lien]
#Services #Angular #Development"
```

---

## 📞 Support & Ressources

### Documentation locale
- `README.md` - Vue d'ensemble
- `QUICKSTART.md` - **Commencez ici !**
- `INSTALLATION.md` - Installation pas à pas
- `TESTING.md` - Comment tester
- `TODO.md` - Prochaines étapes

### Ressources externes
- LinkedIn API : https://docs.microsoft.com/en-us/linkedin/
- MCP Protocol : https://modelcontextprotocol.io/
- Claude Desktop : https://claude.ai/download

### Logs utiles
```bash
# Logs Claude Desktop
tail -f ~/Library/Logs/Claude/mcp*.log

# Logs du serveur (en mode npm start)
# Directement dans le terminal
```

---

## 💡 Tips & Astuces

### 1. Tester sans Claude Desktop
```bash
# Démarrer en mode standalone
npm start
# Le serveur attend des commandes stdin
```

### 2. Vérifier le token
```bash
# Voir le contenu
cat tokens.json | jq

# Vérifier l'expiration
node -e "const t = require('./tokens.json'); console.log('Expire:', new Date(t.expiresAt))"
```

### 3. Debug verbose
```typescript
// Ajouter dans src/infrastructure/linkedin/api-client.ts
console.log('API Request:', config.url, config.data);
```

### 4. Recompilation automatique
```bash
# Mode watch (recompile à chaque changement)
npm run dev
```

---

## 🎓 Comprendre l'architecture

### Layers (couches)
1. **Presentation** : Outils MCP exposés à Claude
2. **Application** : Use cases (logique métier)
3. **Domain** : Entités et interfaces
4. **Infrastructure** : API LinkedIn, stockage

### Principes SOLID appliqués
- ✅ Single Responsibility
- ✅ Open/Closed
- ✅ Liskov Substitution
- ✅ Interface Segregation
- ✅ Dependency Inversion

**Voir `ARCHITECTURE.md` pour les détails**

---

## 🚦 Status du projet

État actuel : **✅ Production Ready**

### Fonctionnel
- ✅ OAuth 2.0 Authentication
- ✅ Profile retrieval
- ✅ Personal posts (create, read, delete)
- ✅ Company posts (create, read)
- ✅ MCP integration
- ✅ Claude Desktop ready

### Limitations connues
- ⚠️ Jobs API (nécessite partenariat)
- ⚠️ Messages API (permissions spéciales)
- ⚠️ Analytics avancés (Marketing Developer Platform)

### Prochaines améliorations
- [ ] Tests automatisés
- [ ] Support des images dans les posts
- [ ] Scheduling de posts
- [ ] Dashboard web

---

## 🎉 Vous êtes prêt !

Tout est configuré pour utiliser LinkedIn directement depuis Claude Desktop.

**Prochaines étapes :**
1. Testez avec quelques commandes simples
2. Publiez du contenu régulièrement
3. Explorez les fonctionnalités avancées
4. Automatisez votre présence LinkedIn !

**Bon LinkedIn ! 🚀✨**

---

## 📝 Quick Reference Card

```
┌─────────────────────────────────────────┐
│  COMMANDES ESSENTIELLES                 │
├─────────────────────────────────────────┤
│  npm run setup          → Tout installer│
│  npm run build          → Compiler      │
│  npm start              → Démarrer      │
│  npm run get-company-id → Company ID    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  FICHIERS IMPORTANTS                    │
├─────────────────────────────────────────┤
│  .env                   → Credentials   │
│  tokens.json            → OAuth tokens  │
│  dist/index.js          → Entry point   │
│  QUICKSTART.md          → Start here !  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  DÉPANNAGE RAPIDE                       │
├─────────────────────────────────────────┤
│  rm tokens.json && npm start            │
│  → Réinitialise l'auth                  │
│                                         │
│  npm run build                          │
│  → Recompile le code                    │
│                                         │
│  tail -f ~/Library/Logs/Claude/mcp*.log │
│  → Voir les logs Claude                 │
└─────────────────────────────────────────┘
```

---

**Version:** 1.0.0  
**Dernière mise à jour:** Janvier 2026  
**Auteur:** Grégory Dernaucourt - GD Dev Solutions
