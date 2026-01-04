# ⚡ Démarrage Rapide - LinkedIn MCP Server

## 🎯 Installation en 3 étapes

### 1️⃣ Récupérer votre Client Secret LinkedIn

1. Allez sur https://www.linkedin.com/developers/apps
2. Cliquez sur **"Claude MCP Social Connector"**
3. Onglet **"Auth"**
4. Cliquez sur l'icône 👁️ (œil) à côté de "Primary Client Secret"
5. **Copiez** le secret

### 2️⃣ Configurer et installer

Ouvrez un terminal et exécutez :

```bash
cd ~/Documents/dev/linkedin-mcp-server

# Ouvrir le fichier .env
open .env

# Dans .env, remplacez VOTRE_SECRET_ICI par votre vrai Client Secret
# Puis sauvegardez le fichier

# Installer et configurer automatiquement
npm run setup
```

Le script `setup` va :
- ✅ Installer les dépendances npm
- ✅ Vérifier la configuration
- ✅ Compiler le TypeScript
- ✅ Lancer l'authentification OAuth LinkedIn

**Suivez les instructions** qui apparaîtront dans le terminal !

### 3️⃣ Configurer Claude Desktop

```bash
# Ouvrir le fichier de configuration Claude Desktop
open ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Ajoutez cette configuration :

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

**Redémarrez Claude Desktop** (Cmd+Q puis relancer)

---

## ✅ Test rapide

Dans Claude Desktop, demandez :

```
Récupère mon profil LinkedIn
```

Si ça fonctionne, vous devriez voir vos informations de profil ! 🎉

---

## 🏢 Récupérer le Company ID (GD Dev Solutions)

Pour pouvoir publier sur votre page entreprise, vous devez récupérer le Company ID :

```bash
npm run get-company-id
```

Ce script va :
1. Se connecter à LinkedIn
2. Lister toutes vos pages entreprise
3. Afficher le Company ID de GD Dev Solutions
4. Vous donner la ligne exacte à ajouter dans `.env`

Ensuite, ajoutez le Company ID dans `.env` :

```bash
open .env
# Ajoutez : LINKEDIN_COMPANY_ID=12345678
```

---

## 🎯 Commandes utiles

```bash
# Installation complète automatique
npm run setup

# Récupérer le Company ID
npm run get-company-id

# Compiler le code
npm run build

# Démarrer le serveur (pour tester)
npm start

# Mode développement avec auto-reload
npm run dev
```

---

## 📚 Fonctionnalités disponibles

Une fois configuré, vous pouvez demander à Claude :

### Profil personnel
- "Récupère mon profil LinkedIn"
- "Montre-moi mes informations LinkedIn"

### Posts personnels
- "Publie sur LinkedIn : [votre message]"
- "Montre mes derniers posts LinkedIn"
- "Supprime mon dernier post LinkedIn"

### Page entreprise (GD Dev Solutions)
- "Publie sur la page GD Dev Solutions : [votre message]"
- "Montre les derniers posts de GD Dev Solutions"
- "Quelles sont les stats de ma page entreprise ?"

### Recherche
- "Cherche des offres d'emploi Angular Developer à Nice"
- "Trouve des jobs Remote Full Stack Developer"

---

## 🐛 Problèmes courants

### "Invalid environment variables"
➡️ Vérifiez que `.env` contient bien votre Client Secret (pas `VOTRE_SECRET_ICI`)

### "Authentication failed"
➡️ Vérifiez que :
1. Le Redirect URI dans LinkedIn = `http://localhost:3000/auth/callback`
2. Vous avez demandé l'accès aux Products (Share on LinkedIn, Sign In)

### Le serveur ne démarre pas dans Claude Desktop
➡️ Vérifiez les logs :
```bash
tail -f ~/Library/Logs/Claude/mcp*.log
```

### "Company ID not found"
➡️ Assurez-vous d'être **administrateur** de la page GD Dev Solutions sur LinkedIn

---

## 📖 Documentation complète

Pour plus de détails, consultez :
- `README.md` - Vue d'ensemble complète
- `INSTALLATION.md` - Guide d'installation détaillé
- Documentation LinkedIn API : https://docs.microsoft.com/en-us/linkedin/

---

## 🚀 Prêt à utiliser !

Vous êtes maintenant prêt à utiliser LinkedIn directement depuis Claude Desktop !

Amusez-vous bien et automatisez votre présence LinkedIn ! 🎉
