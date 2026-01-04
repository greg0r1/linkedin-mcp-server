# 🔐 LinkedIn API Permissions Guide

This guide explains the LinkedIn API permissions (called "Products") required for the MCP server to function.

---

## 📋 Overview

LinkedIn uses "Products" to control API access. You request access to specific Products, and each Product grants you certain API scopes (permissions).

---

## ✅ Required Products (Essential)

These two products are **required** for the MCP server to work. Request them during app setup.

### 1. Sign In with LinkedIn using OpenID Connect

**Purpose**: Retrieve your profile information (name, email, photo)

**How to Request**:
1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
2. Click on your app
3. Navigate to the **"Products"** tab
4. Find **"Sign In with LinkedIn using OpenID Connect"**
5. Click **"Request access"**
6. ✅ **Instantly approved** (Standard Tier)

**Scopes Granted**:
- `openid` - Authentication
- `profile` - Name and profile photo
- `email` - Email address

**What You Can Do**:
- Get your LinkedIn profile information
- Authenticate users
- Access basic profile data

---

### 2. Share on LinkedIn

**Purpose**: Create and manage posts on your personal profile

**How to Request**:
1. On the same **"Products"** tab
2. Find **"Share on LinkedIn"**
3. Click **"Request access"**
4. ✅ **Instantly approved** (Default Tier)

**Scopes Granted**:
- `w_member_social` - Create, edit, delete posts

**What You Can Do**:
- Post updates to your LinkedIn feed
- Delete your posts
- Manage your content

---

## 📊 Optional Products (Advanced Features)

These products are optional and provide additional functionality. The MCP server works without them.

### 3. Advertising API

**Purpose**: Retrieve detailed analytics and statistics for your posts

**How to Request**:
1. Navigate to the **"Products"** tab
2. Find **"Advertising API"**
3. Click **"Request access"**
4. Fill out the request form with:
   - Use case description
   - Expected API volume
   - Application purpose
5. ⏳ **Requires LinkedIn approval** (typically 2-7 days)

**What You Get**:
- Post analytics and metrics
- Engagement statistics
- Performance data
- Impressions and reach

**Note**: Not required to get started. Basic functionality works without it.

---

### 4. Marketing Developer Platform

**Purpose**: Advanced company page analytics and management

**How to Request**:
- Requires special approval from LinkedIn
- Contact LinkedIn Developer Support
- Demonstrate legitimate business use case

**What You Get**:
- Advanced company page analytics
- Follower demographics
- Content performance metrics
- Page management features

**Note**: The MCP server will work without this. It's only needed for advanced company page features.

---

## 🏢 Company Page Permissions

To post on behalf of a company page, you need additional organization-level scopes.

### Required Scopes

- `w_organization_social` - Post on behalf of organization
- `r_organization_social` - Read organization posts
- `rw_organization_admin` - Administer organization

### How to Get These Scopes

**Method 1: Via Products** (Recommended)
1. Request access to **"Share on LinkedIn"** (you should have done this already ✅)
2. Some organization scopes are included with this Product
3. LinkedIn will prompt you to select which organizations to grant access to during OAuth

**Method 2: Manual Configuration**
1. Go to the **"Auth"** tab in your app
2. Look at the **"OAuth 2.0 scopes"** section
3. Available scopes depend on which Products are approved

### Important Requirements

**You must be an administrator of the company page** to:
- Post on its behalf
- Retrieve company page analytics
- Manage company page content

### Granting Access During OAuth

When you authenticate (run `npm start`):
1. LinkedIn will ask which organizations you want to grant access to
2. Select your company page from the list
3. Only pages where you're an admin will appear
4. The Company ID will be associated with your tokens

---

## 🔍 Verify Your Current Permissions

After authenticating, you can check which scopes you have in `tokens.json`:

```bash
cat tokens.json | grep scope
```

You should see something like:
```json
"scope": [
  "openid",
  "profile",
  "email",
  "w_member_social"
]
```

### Scope Meanings

| Scope | What it allows |
|-------|----------------|
| `openid` | OpenID Connect authentication |
| `profile` | Read profile information (name, photo) |
| `email` | Read email address |
| `w_member_social` | Create and manage personal posts |
| `r_organization_social` | Read company page posts |
| `w_organization_social` | Create posts on company pages |
| `rw_organization_admin` | Manage company page |

---

## 📝 Setup Checklist

Use this checklist to track your permission setup:

### Step 1: Basic Permissions ✅
- [ ] "Sign In with LinkedIn using OpenID Connect" - Requested & Approved
- [ ] "Share on LinkedIn" - Requested & Approved

### Step 2: Authentication ✅
- [ ] `.env` file configured with Client ID and Secret
- [ ] OAuth flow completed successfully
- [ ] `tokens.json` file created

### Step 3: Basic Testing ✅
- [ ] Profile retrieval works
- [ ] Personal post creation works
- [ ] Post reading works

### Step 4: Company Page (Optional) 🏢
- [ ] Company ID retrieved (via `npm run get-company-id`)
- [ ] Company ID added to `.env`
- [ ] Company page post creation tested

### Step 5: Claude Desktop ✅
- [ ] MCP configuration added
- [ ] Claude Desktop restarted
- [ ] Test from Claude successful

---

## ⚠️ API Limitations & Restrictions

### LinkedIn API v2 - What Works

**Fully Functional:**
- ✅ Profile retrieval
- ✅ Personal post creation and management
- ✅ Company page posts (with proper permissions)
- ✅ Reading posts and feeds
- ✅ Basic analytics (with Advertising API access)

**Limited or Restricted:**
- ⚠️ **Jobs API** - Requires special LinkedIn partnership
- ⚠️ **Messages API** - Requires special permissions and review
- ⚠️ **Advanced Analytics** - Requires Marketing Developer Platform
- ⚠️ **People Search** - Public API deprecated
- ⚠️ **Connection Management** - Limited by privacy controls

### API Rate Limits

LinkedIn enforces rate limits to prevent abuse:

| Operation | Typical Limit |
|-----------|---------------|
| **Posts** | No strict limit, but reasonable usage expected |
| **Profile reads** | Reasonable rate (specific limits not public) |
| **Analytics** | Depends on approved tier |

**Best Practice**: Don't spam the API. Use reasonable intervals between requests.

---

## 🔄 Product Access Request Workflow

### Standard APIs (Sign In, Share)

1. **Request** → Instant approval ✅
2. **Usage** → Immediate
3. **No questions** asked
4. **Auto-approved** for standard use cases

### Advanced APIs (Advertising, Marketing)

1. **Request** → Form to fill out
2. **Questions** asked:
   - Use case description
   - Expected API volume
   - Application purpose
   - Company/business details
3. **Review** → 2-7 business days
4. **Approval** → Email confirmation

---

## 📧 If Your Request is Denied

If an advanced Product request is denied:

1. **Review** your use case - is it legitimate and compliant?
2. **Clarify** your explanation - be specific about your needs
3. **Resubmit** with more detail
4. **Contact** LinkedIn Developer Support if needed

**For Personal/Professional Use**: The basic APIs (Sign In + Share) are usually sufficient.

---

## ✅ Recommended Minimum Configuration

To get started, you only need:

### Essential Products
1. ✅ **Sign In with LinkedIn using OpenID Connect**
2. ✅ **Share on LinkedIn**

These two provide:
- Profile information retrieval
- Personal post creation
- Post reading and management
- Content management

### Optional Products (Add Later)
- **Advertising API** - For detailed analytics
- **Marketing Developer Platform** - For advanced company features

**Start simple, add features as needed!** 🚀

---

## 🔐 Permission Best Practices

### Security
- ✅ Request only the permissions you actually need
- ✅ Store tokens securely (already handled by `tokens.json`)
- ✅ Never commit credentials to version control
- ✅ Refresh tokens before they expire (handled automatically)

### Compliance
- ✅ Follow LinkedIn's [API Terms of Use](https://www.linkedin.com/legal/l/api-terms-of-use)
- ✅ Respect user privacy
- ✅ Don't scrape or bulk download data
- ✅ Use data only for authorized purposes

---

## 🆘 Support & Resources

If you encounter permission issues:

- 📖 **LinkedIn API Documentation**: https://docs.microsoft.com/en-us/linkedin/
- 💬 **LinkedIn Developer Support**: https://www.linkedin.com/help/linkedin
- 🐛 **Report Issues**: Via your project's issue tracker
- 📚 **MCP Documentation**: https://modelcontextprotocol.io/

---

## 📚 Additional Resources

- [LinkedIn OAuth 2.0 Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [LinkedIn API Terms of Use](https://www.linkedin.com/legal/l/api-terms-of-use)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)

---

**Happy developing!** 🎉

If you have questions about permissions, check the [INSTALLATION.md](INSTALLATION.md) guide or [TESTING.md](TESTING.md) for troubleshooting.
