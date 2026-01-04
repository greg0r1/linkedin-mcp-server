# 🚀 START HERE - LinkedIn MCP Server

Bienvenue dans votre serveur MCP LinkedIn ! Ce fichier est votre point de départ.

---

## 🎯 Vous êtes ici

Vous avez un serveur MCP LinkedIn **entièrement fonctionnel** et **prêt à l'emploi**.

**Ce qui est déjà fait ✅ :**
- Architecture Clean complète (SOLID)
- Authentification OAuth 2.0 LinkedIn
- Outils MCP pour Claude Desktop
- Gestion profil + posts + page entreprise
- Documentation exhaustive

**Ce qu'il reste à faire 📋 :**
1. Configurer votre Client Secret LinkedIn
2. Lancer l'installation
3. Connecter à Claude Desktop
4. C'est tout ! 🎉

---

## ⚡ Installation rapide (5 minutes)

### Étape 1 : Récupérer votre Client Secret

1. Ouvrez https://www.linkedin.com/developers/apps
2. Cliquez sur **"Claude MCP Social Connector"**
3. Onglet **"Auth"**
4. Cliquez sur l'icône 👁️ à côté de "Primary Client Secret"
5. **Copiez le secret**

### Étape 2 : Configurer et installer

```bash
# Ouvrir le fichier de configuration
open .env

# Remplacez VOTRE_SECRET_ICI par votre vrai Client Secret
# Sauvegardez et fermez

# Lancer l'installation automatique
npm run setup
```

Suivez les instructions qui s'affichent ! Le navigateur s'ouvrira pour vous authentifier.

### Étape 3 : Configurer Claude Desktop

```bash
# Ouvrir la configuration Claude
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

### Étape 4 : Redémarrer et tester

1. Quittez Claude Desktop (Cmd+Q)
2. Relancez Claude Desktop
3. Demandez : **"Récupère mon profil LinkedIn"**
4. ✅ Ça marche !

---

## 📚 Documentation disponible

Tous les guides sont dans le dossier du projet :

### 🌟 Pour commencer (lisez dans cet ordre)
1. **START_HERE.md** ← Vous êtes ici
2. **QUICKSTART.md** ← Démarrage rapide
3. **INSTALLATION.md** ← Guide détaillé

### 📖 Pour aller plus loin
- **PERMISSIONS.md** - Configuration des permissions LinkedIn
- **TESTING.md** - Comment tester toutes les fonctionnalités
- **REFERENCE.md** - Guide de référence rapide

### 🔧 Pour les développeurs
- **ARCHITECTURE.md** - Architecture technique (Clean Architecture)
- **TODO.md** - Roadmap et prochaines étapes
- **CHANGELOG.md** - Historique des versions

### 📄 Autres fichiers
- **README.md** - Vue d'ensemble du projet
- **LICENSE** - Licence MIT

---

## 🎯 Que pouvez-vous faire ?

### Profil LinkedIn
```
Récupère mon profil LinkedIn
Montre-moi mes informations LinkedIn
```

### Posts personnels
```
Publie sur LinkedIn : [votre message]
Montre mes 5 derniers posts LinkedIn
Supprime mon dernier post
```

### Page entreprise GD Dev Solutions
```
Publie sur la page GD Dev Solutions : [votre message]
Montre les posts de GD Dev Solutions
Récupère les stats de ma page
```

---

## 🆘 Besoin d'aide ?

### Problème courant #1 : "Invalid environment variables"
**Solution :**
```bash
open .env
# Vérifiez que VOTRE_SECRET_ICI est remplacé par votre vrai secret
```

### Problème courant #2 : "Authentication failed"
**Solution :**
```bash
rm tokens.json
npm start
# Réessayez l'authentification
```

### Problème courant #3 : Le serveur ne démarre pas dans Claude
**Solution :**
```bash
# Vérifiez les logs
tail -f ~/Library/Logs/Claude/mcp*.log

# Vérifiez que le code est compilé
npm run build
```

### Autres problèmes
Consultez **TESTING.md** section "Dépannage"

---

## 📋 Checklist avant de commencer

- [ ] Node.js 18+ installé (`node -v`)
- [ ] Application LinkedIn créée
- [ ] Client ID récupéré : `78porn6kgy7zmm`
- [ ] Client Secret copié
- [ ] Fichier `.env` modifié avec le Client Secret
- [ ] Claude Desktop installé

**Tout est OK ?** Lancez `npm run setup` !

---

## 🎓 Comment ça fonctionne ?

```
Vous demandez à Claude
        ↓
Claude Desktop appelle le serveur MCP
        ↓
Le serveur s'authentifie avec LinkedIn
        ↓
Appel API LinkedIn
        ↓
Retour des données à Claude
        ↓
Claude vous répond
```

**Simple et efficace !**

---

## 🚀 Prochaines étapes après l'installation

### 1. Testez les fonctionnalités de base
```bash
# Voir TESTING.md pour la liste complète
```

### 2. Récupérez votre Company ID (optionnel)
```bash
npm run get-company-id
# Ajoutez le résultat dans .env
```

### 3. Demandez les permissions supplémentaires
```bash
# Voir PERMISSIONS.md
# - Advertising API (pour analytics)
# - Marketing Developer Platform
```

### 4. Utilisez-le régulièrement !
```
Publiez du contenu depuis Claude
Automatisez votre présence LinkedIn
Gagnez du temps !
```

---

## 💡 Conseil

**Ne sautez pas l'étape de lecture de QUICKSTART.md !**

Il contient toutes les informations essentielles en 5 minutes de lecture.

---

## 🎉 Vous êtes prêt !

Tout est là pour que vous puissiez utiliser LinkedIn directement depuis Claude.

**La seule chose qui vous sépare de l'utilisation : 5 minutes de configuration !**

**Allez, on y va ! 🚀**

```bash
npm run setup
```

---

**Créé avec ❤️ par Grégory Dernaucourt**  
**GD Dev Solutions - Expert en développement AI-Augmented**

---

## 📞 Liens utiles

- LinkedIn Developer Portal : https://www.linkedin.com/developers/
- LinkedIn API Docs : https://docs.microsoft.com/en-us/linkedin/
- MCP Protocol : https://modelcontextprotocol.io/
- Claude Desktop : https://claude.ai/download

---

**Version 1.0.0** - Janvier 2026
