# 🚀 START HERE - LinkedIn MCP Server

Welcome to the LinkedIn MCP Server! This guide will help you get started.

---

## 🎯 What is this?

This is a **fully functional MCP server** that connects your LinkedIn account to Claude Desktop, allowing you to manage your LinkedIn presence through natural conversations with Claude AI.

**What's included:**
- ✅ Complete Clean Architecture implementation (SOLID principles)
- ✅ LinkedIn OAuth 2.0 authentication
- ✅ MCP tools for Claude Desktop
- ✅ Personal profile & posts management
- ✅ Company page management (optional)
- ✅ Comprehensive documentation

**What you need to do:**
1. Create a LinkedIn application (5 minutes)
2. Configure your credentials
3. Connect to Claude Desktop
4. Start using it!

---

## ⚡ Quick Installation (10 minutes)

### Step 1: Create a LinkedIn Application

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps/new)
2. Click **"Create app"**
3. Fill in the form:
   - **App name**: Choose any name (e.g., "My LinkedIn MCP Server")
   - **LinkedIn Page**: Select a company page or create one
   - **App logo**: Optional
   - **Legal agreement**: Check and accept
4. Click **"Create app"**

### Step 2: Configure Your App

1. In the **Auth** tab:
   - Find **"Client ID"** and **"Client Secret"** (click the eye icon 👁️)
   - **Copy both values** - you'll need them
   - Under **"Redirect URLs"**, click **"Add redirect URL"**
   - Add: `http://localhost:3000/auth/callback`
   - Click **"Update"**

2. In the **Products** tab:
   - Find **"Sign In with LinkedIn using OpenID Connect"**
   - Click **"Request access"** → Approved instantly ✅
   - Find **"Share on LinkedIn"**
   - Click **"Request access"** → Approved instantly ✅

### Step 3: Install and Configure

```bash
# Install dependencies
npm install

# Create your environment file
cp .env.example .env

# Open .env and add your credentials
# Replace 'your_client_id_here' with your actual Client ID
# Replace 'your_client_secret_here' with your actual Client Secret
```

Edit `.env`:
```env
LINKEDIN_CLIENT_ID=your_actual_client_id
LINKEDIN_CLIENT_SECRET=your_actual_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback
```

### Step 4: Build and Authenticate

```bash
# Build the TypeScript code
npm run build

# Authenticate with LinkedIn
npm start
```

The browser will open automatically. Follow the instructions to authorize the app.

### Step 5: Configure Claude Desktop

Get your absolute path:
```bash
# On macOS/Linux
pwd

# On Windows (PowerShell)
Get-Location
```

Open Claude Desktop config:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add this configuration (replace the path):
```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": [
        "/your/absolute/path/to/linkedin-mcp-server/dist/index.js"
      ]
    }
  }
}
```

### Step 6: Restart and Test

1. Quit Claude Desktop completely (Cmd+Q on macOS)
2. Relaunch Claude Desktop
3. Ask Claude: **"Get my LinkedIn profile information"**
4. ✅ It works!

---

## 📚 Available Documentation

### 🌟 Getting Started (read in order)
1. **START_HERE.md** ← You are here
2. **[QUICKSTART.md](QUICKSTART.md)** ← Quick reference guide
3. **[INSTALLATION.md](INSTALLATION.md)** ← Detailed installation guide

### 📖 Advanced Topics
- **[PERMISSIONS.md](PERMISSIONS.md)** - LinkedIn API permissions explained
- **[TESTING.md](TESTING.md)** - How to test all features
- **[REFERENCE.md](REFERENCE.md)** - Quick reference guide

### 🔧 For Developers
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture (Clean Architecture)
- **[TODO.md](TODO.md)** - Roadmap and future features
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

### 📄 Other Files
- **[README.md](README.md)** - Project overview
- **LICENSE** - MIT License

---

## 🎯 What Can You Do?

### Personal Profile
```
"Get my LinkedIn profile information"
"Show me my LinkedIn profile"
```

### Personal Posts
```
"Post on LinkedIn: Just set up my LinkedIn MCP server!"
"Show me my last 5 LinkedIn posts"
"Delete my last LinkedIn post"
```

### Company Page (if configured)
```
"Post on my company page: We're hiring!"
"Show posts from my company page"
"Get analytics for my company page"
```

### Job Search
```
"Search for Software Engineer jobs in Seattle"
"Find remote Python Developer positions"
```

---

## 🏢 Optional: Company Page Setup

If you want to post on behalf of a company page:

### Get Your Company ID

```bash
npm run get-company-id
```

This script will:
1. Authenticate with LinkedIn
2. List all company pages you administrate
3. Show the Company ID for each
4. Give you the exact line to add to `.env`

Add the Company ID to your `.env`:
```env
LINKEDIN_COMPANY_ID=123456789
```

**Important**: You must be an **administrator** of the company page.

---

## 🆘 Common Issues

### "Invalid environment variables"
**Solution:**
- Open `.env` and verify you replaced the placeholders with real values
- Make sure there are no extra spaces or quotes

### "Authentication failed"
**Solution:**
- Verify the Redirect URI is exactly: `http://localhost:3000/auth/callback`
- Check that you requested access to both Products in LinkedIn Developer Portal
- Try deleting `tokens.json` and run `npm start` again

### "MCP server not starting in Claude Desktop"
**Solution:**
```bash
# Check the logs
# macOS:
tail -f ~/Library/Logs/Claude/mcp*.log

# Verify build succeeded
npm run build

# Verify the path in claude_desktop_config.json is absolute and correct
```

### "Company not found"
**Solution:**
- Make sure you're an administrator of the company page on LinkedIn
- Run `npm run get-company-id` to see all pages you can access

---

## ✅ Pre-Installation Checklist

- [ ] Node.js 18+ installed (`node -v`)
- [ ] LinkedIn application created
- [ ] Client ID copied
- [ ] Client Secret copied
- [ ] Redirect URI configured: `http://localhost:3000/auth/callback`
- [ ] Products requested: "Sign In" and "Share on LinkedIn"
- [ ] Claude Desktop installed

**All set?** Run `npm install && npm run build && npm start`

---

## 💡 Pro Tips

1. **First time?** Read [QUICKSTART.md](QUICKSTART.md) for a condensed guide
2. **Troubleshooting?** Check [TESTING.md](TESTING.md) for detailed debugging
3. **Understanding permissions?** Read [PERMISSIONS.md](PERMISSIONS.md)
4. **Want to contribute?** Check [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🎉 You're Ready!

Everything is set up to connect your LinkedIn account to Claude AI. Just follow the steps above, and in 10 minutes you'll be managing your LinkedIn presence through conversations!

**Let's get started!** 🚀

```bash
npm install
npm run build
npm start
```

---

## 📞 Useful Links

- LinkedIn Developer Portal: https://www.linkedin.com/developers/
- LinkedIn API Docs: https://docs.microsoft.com/en-us/linkedin/
- MCP Protocol: https://modelcontextprotocol.io/
- Claude Desktop: https://claude.ai/download

---

**Created with ❤️ by Grégory Dernaucourt**

---

**Version 1.0.0** - January 2025
