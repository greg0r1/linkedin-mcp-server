# 🔐 Guide de Configuration des Permissions LinkedIn

## 📋 Permissions requises

Pour que le serveur MCP fonctionne complètement, vous devez demander l'accès à certains "Products" (APIs) LinkedIn.

---

## ✅ Permissions ESSENTIELLES (Demandez-les maintenant)

### 1. Sign In with LinkedIn using OpenID Connect

**Pourquoi ?** Pour récupérer votre profil (nom, email, photo)

**Comment ?**
1. Allez sur https://www.linkedin.com/developers/apps
2. Cliquez sur "Claude MCP Social Connector"
3. Onglet **"Products"**
4. Trouvez **"Sign In with LinkedIn using OpenID Connect"**
5. Cliquez sur **"Request access"**
6. ✅ **Approuvé instantanément** (Standard Tier)

**Scopes obtenus :**
- `openid` - Authentification
- `profile` - Nom et photo
- `email` - Adresse email

---

### 2. Share on LinkedIn

**Pourquoi ?** Pour créer et publier des posts sur votre profil

**Comment ?**
1. Sur la même page **"Products"**
2. Trouvez **"Share on LinkedIn"**
3. Cliquez sur **"Request access"**
4. ✅ **Approuvé instantanément** (Default Tier)

**Scopes obtenus :**
- `w_member_social` - Créer, modifier, supprimer des posts

---

## 📊 Permissions OPTIONNELLES (Pour fonctionnalités avancées)

### 3. Advertising API (Analytics)

**Pourquoi ?** Pour récupérer les statistiques de vos posts

**Comment ?**
1. Onglet **"Products"**
2. Trouvez **"Advertising API"**
3. Cliquez sur **"Request access"**
4. ⏳ **Nécessite validation LinkedIn** (quelques jours)

**Ce que vous obtenez :**
- Analytics des posts
- Statistiques d'engagement
- Métriques de performance

**Note :** Pas indispensable pour commencer

---

### 4. Marketing Developer Platform

**Pourquoi ?** Pour les analytics avancés de votre page entreprise

**Statut :** Nécessite une demande spéciale à LinkedIn

**Pour l'instant :** Pas nécessaire, le serveur fonctionnera sans

---

## 🏢 Permissions pour la Page Entreprise

Pour publier sur **GD Dev Solutions**, vous avez besoin de scopes supplémentaires :

### Scopes requis :
- `w_organization_social` - Publier au nom de l'organisation
- `r_organization_social` - Lire les posts de l'organisation
- `rw_organization_admin` - Administrer l'organisation

### Comment les obtenir ?

**Méthode 1 : Via Products** (Recommandé)
1. Demandez l'accès à **"Share on LinkedIn"** (déjà fait ✅)
2. Certains scopes organisation sont inclus

**Méthode 2 : Configuration manuelle**
1. Onglet **"Auth"**
2. Section **"OAuth 2.0 scopes"**
3. Les scopes disponibles dépendent des Products approuvés

**Important :** Vous devez être **administrateur** de la page GD Dev Solutions

---

## 🔍 Vérifier vos permissions actuelles

Une fois authentifié, vous pouvez vérifier les scopes dans `tokens.json` :

```bash
cat tokens.json | grep scope
```

Vous devriez voir :
```json
"scope": [
  "openid",
  "profile",
  "email",
  "w_member_social"
]
```

---

## 📝 Checklist de configuration

### Étape 1 : Permissions de base ✅
- [ ] Sign In with LinkedIn using OpenID Connect - **Demandé**
- [ ] Share on LinkedIn - **Demandé**

### Étape 2 : Authentification ✅
- [ ] Fichier `.env` configuré avec Client ID et Secret
- [ ] OAuth flow complété
- [ ] Fichier `tokens.json` créé

### Étape 3 : Test basique ✅
- [ ] Récupération du profil fonctionne
- [ ] Création de post personnel fonctionne

### Étape 4 : Page entreprise 🏢
- [ ] Company ID récupéré (via `npm run get-company-id`)
- [ ] Company ID ajouté dans `.env`
- [ ] Test de publication sur la page

### Étape 5 : Claude Desktop ✅
- [ ] Configuration MCP ajoutée
- [ ] Claude Desktop redémarré
- [ ] Test depuis Claude réussi

---

## ⚠️ Limitations importantes

### LinkedIn API v2

**Ce qui fonctionne :**
- ✅ Récupération du profil
- ✅ Création de posts personnels
- ✅ Création de posts entreprise (avec permissions)
- ✅ Lecture des posts

**Ce qui est limité/restreint :**
- ⚠️ **Jobs API** - Nécessite un partenariat LinkedIn spécial
- ⚠️ **Messages API** - Nécessite des permissions spéciales
- ⚠️ **Analytics avancés** - Nécessite Marketing Developer Platform
- ⚠️ **Recherche de personnes** - API publique dépréciée

### Quotas API

LinkedIn impose des limites :
- **Posts** : Pas de limite stricte, mais raisonnable
- **Profil** : Taux raisonnable
- **Analytics** : Dépend du tier

**Bonne pratique :** Ne pas spammer l'API

---

## 🔄 Workflow de demande d'accès

### Pour les APIs standards (Sign In, Share)

1. **Demande** → Instantanée ✅
2. **Utilisation** → Immédiate
3. **Pas de questions** posées

### Pour les APIs avancées (Advertising, Marketing)

1. **Demande** → Formulaire à remplir
2. **Questions** :
   - Cas d'usage
   - Volume estimé
   - Description de l'app
3. **Validation** → 2-7 jours
4. **Approbation** → Email de confirmation

---

## 📧 Que faire si une demande est refusée ?

1. **Vérifiez** que votre cas d'usage est légitime
2. **Réexpliquez** clairement dans une nouvelle demande
3. **Contactez** le support LinkedIn Developer si besoin

**Note :** Pour un usage personnel/professionnel comme le vôtre, les APIs de base sont largement suffisantes.

---

## ✅ Configuration minimale recommandée

Pour commencer, vous avez seulement besoin de :

1. ✅ **Sign In with LinkedIn using OpenID Connect**
2. ✅ **Share on LinkedIn**

Ces deux suffisent pour :
- Récupérer votre profil
- Créer des posts personnels
- Lire vos posts
- Gérer votre contenu

Le reste peut venir plus tard si nécessaire ! 🚀

---

## 🆘 Support

En cas de problème avec les permissions :
- 📖 Documentation : https://docs.microsoft.com/en-us/linkedin/
- 💬 Support LinkedIn : https://www.linkedin.com/help/linkedin
- 🐛 Issues GitHub : (si vous publiez le projet)

Bon développement ! 🎉
