# ⚡ Quick Start Guide - LinkedIn MCP Server

Get up and running in 10 minutes.

---

## 🎯 Prerequisites

- ✅ Node.js 18+ installed
- ✅ Claude Desktop installed
- ✅ A LinkedIn account

---

## 📝 Step-by-Step Installation

### 1️⃣ Create a LinkedIn Application

1. Visit [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps/new)
2. Click **"Create app"** and fill in:
   - **App name**: Any name (e.g., "My LinkedIn MCP")
   - **LinkedIn Page**: Select or create a company page
   - **App logo**: Optional
3. Click **"Create app"**
4. In the **Auth** tab:
   - Copy your **Client ID**
   - Click the eye icon 👁️ next to **Client Secret** and copy it
   - Add redirect URL: `http://localhost:3000/auth/callback`
5. In the **Products** tab, request access to:
   - **"Sign In with LinkedIn using OpenID Connect"** ✅
   - **"Share on LinkedIn"** ✅

---

### 2️⃣ Install & Configure

```bash
# Clone the repository
git clone <your-repo-url>
cd linkedin-mcp-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with your credentials:
```env
LINKEDIN_CLIENT_ID=your_actual_client_id
LINKEDIN_CLIENT_SECRET=your_actual_client_secret
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback
```

---

### 3️⃣ Build & Authenticate

```bash
# Build TypeScript
npm run build

# Authenticate with LinkedIn
npm start
```

Your browser will open automatically. Authorize the app, and tokens will be saved to `tokens.json`.

---

### 4️⃣ Configure Claude Desktop

Get your absolute path:
```bash
# macOS/Linux
pwd

# Windows PowerShell
Get-Location
```

Open Claude Desktop config file:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

Add this configuration:
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

**Important**: Replace `/your/absolute/path/to/linkedin-mcp-server` with the actual path from step above.

---

### 5️⃣ Restart & Test

1. **Quit** Claude Desktop completely (don't just close the window)
2. **Relaunch** Claude Desktop
3. Ask Claude: **"Get my LinkedIn profile information"**

✅ **Success!** You should see your profile information.

---

## 🏢 Optional: Company Page Setup

To post on behalf of a company page:

```bash
# Get your Company ID
npm run get-company-id
```

Add the Company ID to `.env`:
```env
LINKEDIN_COMPANY_ID=123456789
```

**Note**: You must be an administrator of the company page.

---

## 🎯 Available Commands

### Personal Profile
```
"Get my LinkedIn profile"
"Show me my LinkedIn information"
```

### Personal Posts
```
"Post on LinkedIn: Just connected my LinkedIn to Claude!"
"Show my last 5 LinkedIn posts"
"Delete my last LinkedIn post"
```

### Company Page
```
"Post on my company page: We're hiring!"
"Show posts from my company page"
"Get analytics for my company page"
```

### Job Search
```
"Search for JavaScript Developer jobs in Austin"
"Find remote DevOps positions"
```

---

## 🐛 Troubleshooting

### "Invalid environment variables"
➡️ Check that `.env` contains real values (not placeholders)

### "Authentication failed"
➡️ Verify:
1. Redirect URI is exactly: `http://localhost:3000/auth/callback`
2. You requested access to both Products
3. Try deleting `tokens.json` and run `npm start` again

### "MCP server not starting in Claude Desktop"
➡️ Check the logs:
```bash
# macOS
tail -f ~/Library/Logs/Claude/mcp*.log

# Verify build succeeded
npm run build
```

### "Company not found"
➡️ Make sure you're an administrator of the company page

---

## 📚 Next Steps

- Read [START_HERE.md](START_HERE.md) for detailed setup
- Check [INSTALLATION.md](INSTALLATION.md) for advanced configuration
- See [PERMISSIONS.md](PERMISSIONS.md) to understand LinkedIn API permissions
- Visit [TESTING.md](TESTING.md) for complete testing guide

---

## 🚀 You're All Set!

Start managing your LinkedIn presence directly from Claude Desktop!

**Happy automating!** 🎉
