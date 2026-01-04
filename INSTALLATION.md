# 🚀 Guide d'Installation - LinkedIn MCP Server

## ✅ Prérequis vérifiés

- ✅ Node.js 18+ installé
- ✅ TypeScript installé
- ✅ Application LinkedIn créée
- ✅ Client ID: `78porn6kgy7zmm`
- ✅ Redirect URI configurée: `http://localhost:3000/auth/callback`

---

## 📋 Étapes d'installation

### 1️⃣ Installer les dépendances

Ouvrez un terminal et exécutez :

```bash
cd ~/Documents/dev/linkedin-mcp-server
npm install
```

### 2️⃣ Configurer les credentials LinkedIn

Le fichier `.env` a été créé. Vous devez maintenant :

1. **Récupérer votre Client Secret** depuis le Developer Portal LinkedIn :
   - Allez sur https://www.linkedin.com/developers/apps
   - Cliquez sur votre app "Claude MCP Social Connector"
   - Onglet "Auth"
   - Cliquez sur l'icône 👁️ ou 📋 pour copier le Client Secret

2. **Ouvrir le fichier `.env`** :
   ```bash
   open .env
   ```

3. **Remplacer** `VOTRE_SECRET_ICI` par votre vrai Client Secret

4. **(Optionnel) Récupérer votre Company ID** pour GD Dev Solutions :
   - Méthode 1 : Depuis l'URL de votre page
     - Allez sur https://www.linkedin.com/company/gd-dev-solutions
     - L'ID est visible dans l'URL ou via les outils développeur
   
   - Méthode 2 : Via l'API (après première authentification)
     - Le serveur pourra vous aider à le trouver

### 3️⃣ Compiler le projet TypeScript

```bash
npm run build
```

Cette commande compile le TypeScript en JavaScript dans le dossier `dist/`.

### 4️⃣ Première authentification OAuth

```bash
npm start
```

Le serveur va :
1. Détecter que vous n'êtes pas encore authentifié
2. Démarrer un serveur web local sur le port 3000
3. Afficher une URL dans le terminal
4. Ouvrir votre navigateur vers LinkedIn
5. Vous demander d'autoriser l'application
6. Sauvegarder les tokens dans `tokens.json`

**Important** : Suivez les instructions dans le terminal !

---

## 🔧 Configuration de Claude Desktop

### 1️⃣ Localiser le fichier de configuration

Sur macOS :
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

### 2️⃣ Ouvrir et éditer le fichier

```bash
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Si le fichier n'existe pas, créez-le avec cette commande :
```bash
mkdir -p ~/Library/Application\ Support/Claude
echo '{"mcpServers":{}}' > ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

### 3️⃣ Ajouter la configuration du serveur LinkedIn

Ajoutez cette configuration dans le fichier JSON :

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

**Note** : Si vous avez déjà d'autres serveurs MCP, ajoutez simplement la section `"linkedin"` dans `mcpServers`.

### 4️⃣ Redémarrer Claude Desktop

1. Quittez complètement Claude Desktop (Cmd+Q)
2. Relancez Claude Desktop
3. Le serveur LinkedIn devrait se lancer automatiquement

---

## ✅ Vérification

Une fois Claude Desktop redémarré, vous pouvez tester en posant ces questions à Claude :

- "Récupère mon profil LinkedIn"
- "Publie un post sur LinkedIn : Bonjour, test depuis Claude !"
- "Montre-moi mes derniers posts LinkedIn"

Si tout fonctionne, vous verrez les réponses de l'API LinkedIn ! 🎉

---

## 🔍 Récupérer le Company ID de GD Dev Solutions

### Méthode 1 : Via l'URL publique

1. Allez sur https://www.linkedin.com/company/gd-dev-solutions
2. Cliquez avec le bouton droit > Inspecter
3. Cherchez dans le HTML l'attribut `data-entity-urn`
4. Le format sera : `urn:li:organization:XXXXXX`
5. Copiez les chiffres `XXXXXX` - c'est votre Company ID

### Méthode 2 : Via l'API LinkedIn (après authentification)

Demandez à Claude (une fois connecté) :
```
"Cherche mon entreprise GD Dev Solutions sur LinkedIn"
```

Claude pourra utiliser l'API pour récupérer l'ID.

### Méthode 3 : LinkedIn URL Inspector

1. Allez sur https://www.linkedin.com/company/gd-dev-solutions
2. L'URL contient parfois directement l'ID numérique

Une fois trouvé, ajoutez-le dans `.env` :
```env
LINKEDIN_COMPANY_ID=12345678
```

---

## 🐛 Dépannage

### Erreur : "Invalid environment variables"

Vérifiez que votre `.env` contient bien :
- `LINKEDIN_CLIENT_ID`
- `LINKEDIN_CLIENT_SECRET` (sans `VOTRE_SECRET_ICI`)
- `LINKEDIN_REDIRECT_URI`

### Erreur : "Authentication failed"

1. Vérifiez que le Redirect URI dans LinkedIn Developer Portal correspond exactement
2. Assurez-vous d'avoir demandé les bons scopes (Products > Request access)
3. Essayez de supprimer `tokens.json` et réauthentifiez

### Le serveur ne démarre pas dans Claude Desktop

1. Vérifiez le chemin dans `claude_desktop_config.json`
2. Assurez-vous que `npm run build` a fonctionné
3. Vérifiez les logs de Claude Desktop :
   ```bash
   tail -f ~/Library/Logs/Claude/mcp*.log
   ```

---

## 📚 Prochaines étapes

Une fois installé, explorez les fonctionnalités :

1. **Posts personnels** : Créer, lire, supprimer
2. **Page entreprise** : Publier au nom de GD Dev Solutions
3. **Analytics** : Récupérer les stats de vos posts
4. **Jobs** : Rechercher des opportunités
5. **Messages** : Gérer vos conversations (si scope activé)

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur
2. Consultez la documentation LinkedIn API
3. Vérifiez que tous les scopes sont approuvés

Bon développement ! 🚀
