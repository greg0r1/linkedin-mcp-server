# 🏗️ Architecture du LinkedIn MCP Server

## 📐 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Desktop                          │
│                  (Interface utilisateur)                    │
└─────────────────────┬───────────────────────────────────────┘
                      │ stdio (MCP Protocol)
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                   MCP Server (index.ts)                     │
│                  Model Context Protocol                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (Tools)                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ linkedin.tools.ts                                    │  │
│  │  - linkedin_get_profile                              │  │
│  │  - linkedin_create_post                              │  │
│  │  - linkedin_get_my_posts                             │  │
│  │  - linkedin_delete_post                              │  │
│  │  - linkedin_get_company_page                         │  │
│  │  - linkedin_create_company_post                      │  │
│  │  - linkedin_get_company_posts                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              APPLICATION LAYER (Use Cases)                  │
│                    Business Logic                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ linkedin.use-cases.ts                                │  │
│  │  - GetProfileUseCase                                 │  │
│  │  - CreatePostUseCase                                 │  │
│  │  - GetMyPostsUseCase                                 │  │
│  │  - DeletePostUseCase                                 │  │
│  │  - GetCompanyPageUseCase                             │  │
│  │  - CreateCompanyPostUseCase                          │  │
│  │  - GetCompanyPostsUseCase                            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  DOMAIN LAYER                               │
│              Entities & Interfaces                          │
│                                                             │
│  ┌────────────────────┐  ┌────────────────────────────┐   │
│  │ Entities           │  │ Interfaces                 │   │
│  │  - LinkedInProfile │  │  - ILinkedInRepository     │   │
│  │  - LinkedInPost    │  │  - IOAuthService           │   │
│  │  - CompanyPage     │  │  - TokenStorage            │   │
│  │  - CompanyPost     │  │                            │   │
│  │  - OAuthToken      │  │                            │   │
│  └────────────────────┘  └────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            INFRASTRUCTURE LAYER                             │
│          External Services & Storage                        │
│                                                             │
│  ┌──────────────────────┐  ┌──────────────────────────┐   │
│  │ LinkedIn             │  │ Storage                  │   │
│  │  - api-client.ts     │  │  - file-token-storage.ts │   │
│  │  - oauth.service.ts  │  │                          │   │
│  │                      │  │  tokens.json             │   │
│  └──────────────────────┘  └──────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  LinkedIn REST API                          │
│                 https://api.linkedin.com                    │
│                                                             │
│  - /v2/userinfo          (Profile)                          │
│  - /v2/ugcPosts          (Posts)                            │
│  - /v2/organizations     (Company Pages)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Principes SOLID appliqués

### S - Single Responsibility Principle
Chaque classe a une seule responsabilité :
- `LinkedInApiClient` : Communication avec l'API LinkedIn
- `LinkedInOAuthService` : Gestion OAuth uniquement
- `FileTokenStorage` : Stockage des tokens uniquement
- `GetProfileUseCase` : Logique métier pour récupérer le profil

### O - Open/Closed Principle
Ouvert à l'extension, fermé à la modification :
- Ajout de nouveaux outils MCP sans modifier les existants
- Ajout de nouveaux use cases sans toucher aux anciens
- Nouvelles implémentations de repositories possibles

### L - Liskov Substitution Principle
Les interfaces peuvent être substituées :
- `ILinkedInRepository` peut être implémenté différemment
- `TokenStorage` peut utiliser une DB au lieu de fichiers
- `IOAuthService` peut utiliser un autre provider

### I - Interface Segregation Principle
Interfaces spécialisées :
- `ILinkedInProfileRepository` : Seulement le profil
- `ILinkedInPostRepository` : Seulement les posts
- `ILinkedInCompanyRepository` : Seulement la page entreprise

### D - Dependency Inversion Principle
Dépendances vers les abstractions :
- Use Cases dépendent de `ILinkedInRepository` (interface)
- Pas de dépendance directe sur `LinkedInApiClient` (implémentation)
- Injection de dépendances via constructeur

---

## 🔄 Flux de données

### Exemple : Création d'un post

```
1. Claude Desktop
   ↓ "Publie sur LinkedIn : Bonjour"
   
2. MCP Server (index.ts)
   ↓ Reçoit la requête via stdio
   ↓ Parse le JSON MCP
   
3. LinkedInTools (Presentation)
   ↓ Valide les inputs avec Zod
   ↓ Appelle le use case approprié
   
4. CreatePostUseCase (Application)
   ↓ Valide la logique métier
   ↓ Appelle le repository
   
5. LinkedInApiClient (Infrastructure)
   ↓ Récupère un token OAuth valide
   ↓ Construit la requête API
   ↓ POST /v2/ugcPosts
   
6. LinkedIn API
   ↓ Valide et crée le post
   ↓ Retourne l'ID du post
   
7. Retour inverse jusqu'à Claude
   ↓ LinkedInPost entity
   ↓ JSON MCP response
   ↓ Affiché dans Claude Desktop
```

---

## 📂 Structure des fichiers

```
linkedin-mcp-server/
│
├── src/
│   │
│   ├── index.ts                    # Point d'entrée MCP
│   │                                # Dependency Injection Container
│   │
│   ├── config/
│   │   └── environment.ts          # Configuration & validation Zod
│   │
│   ├── domain/                     # ⚡ Couche Domain (Core)
│   │   ├── entities/
│   │   │   ├── linkedin.entity.ts  # Modèles de données
│   │   │   └── oauth-token.entity.ts
│   │   │
│   │   └── interfaces/
│   │       ├── linkedin.repository.ts  # Contrats
│   │       └── oauth.service.ts
│   │
│   ├── application/                # 🎯 Couche Application
│   │   └── use-cases/
│   │       └── linkedin.use-cases.ts   # Logique métier
│   │
│   ├── infrastructure/             # 🔧 Couche Infrastructure
│   │   ├── linkedin/
│   │   │   ├── api-client.ts       # Implémentation API
│   │   │   └── oauth.service.ts    # Implémentation OAuth
│   │   │
│   │   └── storage/
│   │       └── file-token-storage.ts   # Stockage fichier
│   │
│   └── presentation/               # 🎨 Couche Presentation
│       └── tools/
│           └── linkedin.tools.ts   # Outils MCP exposés
│
├── tokens.json                     # Stockage des tokens (auto-généré)
├── .env                            # Configuration sensible
├── .env.example                    # Template de configuration
│
├── package.json                    # Dépendances npm
├── tsconfig.json                   # Configuration TypeScript
│
├── README.md                       # Documentation principale
├── QUICKSTART.md                   # Démarrage rapide ⭐
├── INSTALLATION.md                 # Guide d'installation détaillé
├── PERMISSIONS.md                  # Guide des permissions LinkedIn
├── TESTING.md                      # Guide de tests
├── TODO.md                         # Prochaines étapes
└── ARCHITECTURE.md                 # Ce fichier
```

---

## 🔐 Gestion de l'authentification

```
┌─────────────────────────────────────────────┐
│  1. Première utilisation                    │
│     npm start                                │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  2. LinkedInOAuthService                    │
│     - Détecte absence de token              │
│     - Génère URL d'autorisation             │
│     - Démarre serveur Express local :3000   │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  3. Navigateur web                          │
│     - Ouverture automatique                 │
│     - Connexion LinkedIn                    │
│     - Autorisation de l'app                 │
│     - Redirect → localhost:3000/callback    │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  4. Callback handler (Express)              │
│     - Reçoit le code d'autorisation         │
│     - Échange code contre access_token      │
│     - Sauvegarde dans tokens.json           │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  5. FileTokenStorage                        │
│     - Écrit tokens.json                     │
│     - Format:                                │
│       {                                      │
│         "accessToken": "...",                │
│         "refreshToken": "...",               │
│         "expiresAt": 1234567890,             │
│         "scope": ["openid", "profile", ...]  │
│       }                                      │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│  6. Utilisations suivantes                  │
│     - Lecture de tokens.json                │
│     - Vérification expiration               │
│     - Auto-refresh si expiré                │
│     - Réutilisation du token valide         │
└─────────────────────────────────────────────┘
```

---

## 🛡️ Sécurité

### Bonnes pratiques implémentées

1. **Credentials** jamais dans le code
   - `.env` pour les secrets
   - `.gitignore` inclut `.env` et `tokens.json`

2. **Validation stricte**
   - Zod pour valider l'environnement
   - Validation des inputs dans les use cases
   - TypeScript strict mode

3. **Token management**
   - Stockage local sécurisé
   - Auto-refresh des tokens
   - Expiration gérée

4. **OAuth 2.0**
   - Flow standard respecté
   - HTTPS uniquement en production
   - State parameter pour CSRF

5. **Separation of concerns**
   - Secrets isolés dans Infrastructure
   - Domain layer sans dépendances externes
   - Use cases testables unitairement

---

## 🔄 Extensibilité

### Ajouter un nouveau tool MCP

```typescript
// 1. Créer le use case (application/use-cases/)
export class NewFeatureUseCase {
  constructor(private repository: ILinkedInRepository) {}
  async execute(params: ParamsDTO): Promise<ResultDTO> {
    // Logique métier
  }
}

// 2. Ajouter dans LinkedInTools (presentation/tools/)
{
  name: 'linkedin_new_feature',
  description: 'Description du nouveau tool',
  inputSchema: { /* Zod schema */ }
}

// 3. Implémenter dans l'API Client (infrastructure/)
async newFeature(params): Promise<Result> {
  // Appel API LinkedIn
}

// 4. Wire dans DependencyContainer (index.ts)
this.newFeatureUseCase = new NewFeatureUseCase(this.apiClient);
```

---

## 🧪 Testabilité

Grâce à l'architecture en couches :

```typescript
// Test d'un use case (isolation complète)
describe('CreatePostUseCase', () => {
  it('should create a post', async () => {
    const mockRepo = {
      createPost: jest.fn().mockResolvedValue(mockPost)
    };
    
    const useCase = new CreatePostUseCase(mockRepo);
    const result = await useCase.execute({ text: 'Test' });
    
    expect(result).toEqual(mockPost);
  });
});

// Test d'un tool MCP
describe('LinkedInTools', () => {
  it('should execute linkedin_create_post', async () => {
    const mockUseCase = {
      execute: jest.fn()
    };
    
    const tools = new LinkedInTools(mockUseCase, ...);
    await tools.executeTool('linkedin_create_post', { text: 'Test' });
    
    expect(mockUseCase.execute).toHaveBeenCalled();
  });
});
```

---

## 📊 Flux d'erreurs

```
Error in API call
     ↓
LinkedInApiClient
     ↓ throw new Error('Failed to ...')
     ↓
CreatePostUseCase
     ↓ Catches and may transform
     ↓
LinkedInTools
     ↓ Formats for MCP
     ↓
MCP Server
     ↓ Returns error response
     ↓
Claude Desktop
     ↓ Displays to user
```

---

## 🎓 Concepts clés

### Clean Architecture
- **Indépendance des frameworks** : Le core ne dépend pas de MCP
- **Testabilité** : Use cases testables sans infrastructure
- **Indépendance de l'UI** : Peut fonctionner en CLI, web, etc.
- **Indépendance de la DB** : Storage abstrait (file, DB, etc.)

### Dependency Injection
- Container central (index.ts)
- Injection via constructeur
- Interfaces comme contrats
- Facilite les tests et les mocks

### TypeScript strict
- Types pour tout
- Zod pour validation runtime
- Interfaces explicites
- Pas de `any` (sauf erreurs)

---

Cette architecture garantit :
✅ Maintenabilité
✅ Testabilité  
✅ Extensibilité
✅ Séparation des responsabilités
✅ Respect des principes SOLID

🚀 Prêt pour la production !
