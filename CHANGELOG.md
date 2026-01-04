# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

---

## [1.0.0] - 2026-01-04

### 🎉 Version initiale

#### Ajouté
- ✅ **Architecture Clean** suivant les principes SOLID
- ✅ **OAuth 2.0** authentication avec LinkedIn
- ✅ **Serveur MCP** compatible avec Claude Desktop
- ✅ **Gestion du profil** LinkedIn
  - Récupération des informations utilisateur
  - Support OpenID Connect
- ✅ **Gestion des posts personnels**
  - Création de posts
  - Lecture des posts récents
  - Suppression de posts
  - Support des visibilités (PUBLIC, CONNECTIONS, LOGGED_IN)
- ✅ **Gestion de la page entreprise** (GD Dev Solutions)
  - Récupération des informations de la page
  - Publication de posts au nom de la page
  - Lecture des posts de la page
- ✅ **Stockage des tokens**
  - Sauvegarde locale sécurisée
  - Auto-refresh des tokens expirés
  - Validation de l'expiration
- ✅ **Configuration**
  - Variables d'environnement (.env)
  - Validation avec Zod
  - TypeScript strict mode
- ✅ **Documentation complète**
  - README.md - Vue d'ensemble
  - QUICKSTART.md - Démarrage rapide
  - INSTALLATION.md - Guide d'installation
  - PERMISSIONS.md - Configuration des permissions
  - TESTING.md - Guide de tests
  - ARCHITECTURE.md - Documentation technique
  - REFERENCE.md - Référence rapide
  - TODO.md - Roadmap

#### Scripts utilitaires
- `npm run setup` - Installation automatique complète
- `npm run get-company-id` - Récupération du Company ID
- `npm run build` - Compilation TypeScript
- `npm start` - Démarrage du serveur
- `npm run dev` - Mode développement avec watch

#### Outils MCP exposés
- `linkedin_get_profile` - Récupération du profil
- `linkedin_create_post` - Création de post personnel
- `linkedin_get_my_posts` - Lecture des posts personnels
- `linkedin_delete_post` - Suppression de post
- `linkedin_get_company_page` - Informations page entreprise
- `linkedin_create_company_post` - Publication sur la page
- `linkedin_get_company_posts` - Lecture des posts de la page

#### Infrastructure
- TypeScript 5.7.2
- Node.js 18+
- @modelcontextprotocol/sdk 1.0.4
- Axios 1.7.9
- Express 4.21.2
- Zod 3.24.1
- Dotenv 16.4.7

#### Sécurité
- ✅ Credentials dans `.env` (jamais commités)
- ✅ `.gitignore` configuré correctement
- ✅ Tokens OAuth stockés localement
- ✅ Validation stricte des entrées (Zod)
- ✅ TypeScript strict mode activé

---

## [Unreleased]

### Planifié pour v1.1.0
- [ ] Tests unitaires (Jest/Vitest)
- [ ] Tests d'intégration
- [ ] Support des images dans les posts
- [ ] Support des vidéos dans les posts
- [ ] Amélioration de la gestion d'erreurs
- [ ] Logging avancé

### Planifié pour v1.2.0
- [ ] Analytics des posts (si API approuvée)
- [ ] Scheduling de posts
- [ ] Support des articles LinkedIn
- [ ] Amélioration du rate limiting

### Planifié pour v2.0.0
- [ ] Support des messages LinkedIn (si API approuvée)
- [ ] Support des jobs LinkedIn (si API approuvée)
- [ ] Dashboard web pour gérer les posts
- [ ] Support multi-comptes
- [ ] API REST optionnelle
- [ ] Webhooks LinkedIn

---

## Limitations connues

### API LinkedIn
- ⚠️ **Jobs API** - Nécessite un partenariat LinkedIn spécial (non accessible)
- ⚠️ **Messages API** - Nécessite des permissions spéciales non disponibles
- ⚠️ **Analytics avancés** - Nécessite Marketing Developer Platform
- ⚠️ **Recherche de personnes** - API publique dépréciée par LinkedIn

### Fonctionnalités en attente d'approbation
- Analytics détaillés (nécessite Advertising API approval)
- Gestion des événements (nécessite Events Management API)
- Gestion des leads (nécessite Lead Sync API)

---

## Notes de migration

### De aucune version vers 1.0.0
Première installation :
1. Configurer `.env` avec vos credentials LinkedIn
2. Exécuter `npm run setup`
3. Configurer Claude Desktop
4. Redémarrer Claude Desktop

---

## Contribuer

Pour contribuer à ce projet :
1. Fork le repository
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## Support

Pour obtenir de l'aide :
- Consultez la documentation dans `/docs`
- Vérifiez les issues GitHub
- Consultez la documentation LinkedIn API
- Vérifiez les logs de Claude Desktop

---

## License

MIT License - Voir le fichier LICENSE pour plus de détails

---

## Auteur

**Grégory Dernaucourt**  
GD Dev Solutions  
Expert en développement Frontend Angular et solutions AI-Augmented

---

## Remerciements

- LinkedIn pour leur API
- Anthropic pour Claude et le protocole MCP
- La communauté TypeScript
- Les contributeurs de Clean Architecture

---

**[1.0.0]**: https://github.com/votre-repo/linkedin-mcp-server/releases/tag/v1.0.0
