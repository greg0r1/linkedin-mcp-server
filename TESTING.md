# 🧪 Tests Manuels - LinkedIn MCP Server

Ce document vous guide pour tester manuellement chaque fonctionnalité du serveur.

---

## ✅ Prérequis

Avant de tester :
1. ✅ Serveur compilé (`npm run build`)
2. ✅ Authentifié avec LinkedIn (fichier `tokens.json` existe)
3. ✅ Client Secret configuré dans `.env`

---

## 🔬 Tests via Claude Desktop

### Test 1 : Récupérer le profil

**Demandez à Claude :**
```
Récupère mon profil LinkedIn
```

**Résultat attendu :**
```json
{
  "id": "...",
  "firstName": "Grégory",
  "lastName": "...",
  "email": "votre@email.com"
}
```

---

### Test 2 : Créer un post personnel

**Demandez à Claude :**
```
Publie un post sur mon LinkedIn : 
"Test de mon nouveau connecteur MCP LinkedIn ! 🚀 
Développé avec TypeScript, Clean Architecture et les principes SOLID."
```

**Résultat attendu :**
- Post publié sur LinkedIn
- Retour avec l'ID du post
- Visible sur votre profil LinkedIn

**Vérification :**
Allez sur votre profil LinkedIn et vérifiez que le post est bien publié.

---

### Test 3 : Lire vos derniers posts

**Demandez à Claude :**
```
Montre-moi mes 5 derniers posts LinkedIn
```

**Résultat attendu :**
Liste de vos posts avec :
- Texte du post
- Date de création
- Statistiques (likes, commentaires, partages)

---

### Test 4 : Publier sur la page entreprise

**Note :** Nécessite le Company ID dans `.env`

**Demandez à Claude :**
```
Publie sur la page GD Dev Solutions :
"🎉 Nouvelle offre : Développement de solutions web sur mesure !
Angular • TypeScript • Clean Code
Contactez-nous pour vos projets."
```

**Résultat attendu :**
- Post publié sur la page GD Dev Solutions
- Visible sur https://www.linkedin.com/company/gd-dev-solutions

---

### Test 5 : Récupérer les posts de la page

**Demandez à Claude :**
```
Montre-moi les derniers posts de GD Dev Solutions
```

**Résultat attendu :**
Liste des posts de votre page entreprise

---

## 🔧 Tests en ligne de commande

Si vous voulez tester sans Claude Desktop :

### Démarrer le serveur en mode standalone

```bash
npm start
```

Le serveur va démarrer et attendre des commandes via stdin (entrée standard).

---

## 🐛 Debugging

### Voir les logs détaillés

Modifiez temporairement le code pour plus de logs :

```typescript
// Dans src/infrastructure/linkedin/api-client.ts
console.log('Request URL:', config.url);
console.log('Request headers:', config.headers);
```

### Tester l'authentification

```bash
# Vérifier le token
cat tokens.json | jq

# Vérifier la validité
node -e "
const fs = require('fs');
const token = JSON.parse(fs.readFileSync('tokens.json'));
console.log('Expires at:', new Date(token.expiresAt));
console.log('Valid:', Date.now() < token.expiresAt);
"
```

### Tester manuellement l'API LinkedIn

```bash
# Récupérer le token
TOKEN=$(cat tokens.json | jq -r '.accessToken')

# Tester le profil
curl -H "Authorization: Bearer $TOKEN" \
     https://api.linkedin.com/v2/userinfo

# Tester les posts (nécessite l'ID utilisateur)
curl -H "Authorization: Bearer $TOKEN" \
     -H "X-Restli-Protocol-Version: 2.0.0" \
     https://api.linkedin.com/v2/ugcPosts?q=authors&authors=List(urn:li:person:VOTRE_ID)
```

---

## 📊 Checklist de tests complets

### Tests de base
- [ ] Authentification OAuth réussie
- [ ] Récupération du profil
- [ ] Token sauvegardé dans `tokens.json`
- [ ] Token valide et non expiré

### Tests des posts personnels
- [ ] Création d'un post public
- [ ] Création d'un post CONNECTIONS only
- [ ] Lecture des posts
- [ ] Suppression d'un post

### Tests de la page entreprise
- [ ] Company ID récupéré
- [ ] Création d'un post sur la page
- [ ] Lecture des posts de la page
- [ ] Vérification sur LinkedIn.com

### Tests d'intégration Claude Desktop
- [ ] Serveur démarre automatiquement
- [ ] Commandes via Claude fonctionnent
- [ ] Erreurs bien gérées
- [ ] Logs lisibles

### Tests de robustesse
- [ ] Gestion du token expiré (refresh automatique)
- [ ] Gestion des erreurs API
- [ ] Validation des inputs
- [ ] Messages d'erreur clairs

---

## 🎯 Scénarios de test réalistes

### Scénario 1 : Publication de contenu professionnel

```
Claude, publie sur mon LinkedIn :
"🚀 Nouvelle compétence débloquée : Intégration d'IA dans les workflows de développement !

J'ai développé un connecteur MCP qui permet à Claude AI d'interagir directement avec LinkedIn.

Stack technique :
• TypeScript
• Clean Architecture
• LinkedIn OAuth 2.0
• Model Context Protocol

#Dev #IA #Automation #TypeScript"
```

### Scénario 2 : Gestion de page entreprise

```
Claude, publie sur GD Dev Solutions :
"💼 Besoin d'un développement sur mesure ?

GD Dev Solutions vous accompagne dans vos projets :
✅ Applications web modernes (Angular, React)
✅ Intégration d'IA dans vos outils
✅ Architecture Clean Code
✅ Solutions AI-Augmented

📧 Contact : [votre email]
🌐 www.votre-site.com

#WebDev #AI #Angular #Solutions"
```

### Scénario 3 : Analyse de contenu

```
Claude, récupère mes 10 derniers posts LinkedIn et analyse :
1. Quel post a eu le plus d'engagement ?
2. Quels sujets fonctionnent le mieux ?
3. Suggestions pour améliorer mon contenu
```

---

## 🔍 Vérification finale

Avant de considérer le projet comme terminé :

1. ✅ Tous les tests de base passent
2. ✅ Aucune erreur dans les logs
3. ✅ Les posts apparaissent bien sur LinkedIn.com
4. ✅ Claude Desktop peut utiliser le serveur
5. ✅ Documentation à jour

---

## 📝 Rapport de test

Template pour documenter vos tests :

```markdown
## Test du [DATE]

### Configuration
- Node version: 
- OS: macOS
- Claude Desktop version:

### Tests réussis ✅
- [ ] Profil récupéré
- [ ] Post personnel créé
- [ ] Post page entreprise créé
- [ ] 

### Tests échoués ❌
- [ ] 

### Problèmes rencontrés
1. 
2. 

### Solutions appliquées
1. 
2. 

### Notes
- 
```

---

## 🆘 En cas de problème

1. **Vérifiez les logs** : `tail -f ~/Library/Logs/Claude/mcp*.log`
2. **Vérifiez le token** : `cat tokens.json`
3. **Testez manuellement l'API** avec curl
4. **Recompiler** : `npm run build`
5. **Réauthentifier** : Supprimez `tokens.json` et relancez `npm start`

---

Bon testing ! 🧪✨
