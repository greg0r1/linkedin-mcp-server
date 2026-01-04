# 🚀 Complete Installation Guide - LinkedIn MCP Server

This guide provides detailed step-by-step instructions for installing and configuring the LinkedIn MCP Server.

---

## ✅ Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** installed ([Download here](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Claude Desktop** installed ([Download here](https://claude.ai/download))
- ✅ **A LinkedIn account** (personal or business)
- ✅ **Git** (for cloning the repository)

Verify your Node.js version:
```bash
node -v
# Should show v18.0.0 or higher
```

---

## 📋 Part 1: Create LinkedIn Application

### Step 1: Access LinkedIn Developer Portal

1. Go to [LinkedIn Developer Portal](https://www.linkedin.com/developers/)
2. Sign in with your LinkedIn account
3. Click **"Create app"** or visit [Create App directly](https://www.linkedin.com/developers/apps/new)

### Step 2: Fill in Application Details

Complete the application form:

| Field | Value | Notes |
|-------|-------|-------|
| **App name** | Choose any name | Example: "My LinkedIn MCP Server" or "LinkedIn Claude Integration" |
| **LinkedIn Page** | Select or create a page | Required by LinkedIn. You can create a page for yourself if you don't have one |
| **Privacy policy URL** | Optional | Can be left empty for personal use |
| **App logo** | Optional | Upload a logo if desired (can be added later) |
| **Legal agreement** | Check the box | You must agree to LinkedIn's API Terms of Use |

Click **"Create app"**.

### Step 3: Configure Authentication Settings

Once your app is created:

1. Click on your newly created app
2. Go to the **"Auth"** tab
3. You'll see your credentials:
   - **Client ID**: Copy this value (you'll need it later)
   - **Client Secret**: Click the eye icon 👁️ to reveal it, then copy it

4. Scroll down to **"OAuth 2.0 settings"**
5. Under **"Redirect URLs"**, click **"Add redirect URL"**
6. Add this exact URL: `http://localhost:3000/auth/callback`
7. Click **"Update"**

**Important**: The redirect URL must match exactly, including `http://` (not `https://`) and the port number.

### Step 4: Request Access to Products

LinkedIn uses "Products" to control API access. You need to request access to specific products:

1. Go to the **"Products"** tab
2. Find **"Sign In with LinkedIn using OpenID Connect"**
   - Click **"Request access"**
   - ✅ This is usually **approved instantly**
3. Find **"Share on LinkedIn"**
   - Click **"Request access"**
   - ✅ This is also usually **approved instantly**

These two products give you access to:
- User profile information
- Creating and managing posts
- Basic LinkedIn functionality

#### Optional: Request Advanced Products

For advanced features (optional):

- **"Advertising API"**: For detailed analytics (requires approval, 2-7 days)
- **"Marketing Developer Platform"**: For advanced company page features (requires special approval)

You don't need these to get started.

### Step 5: Verify Your App Settings

Before proceeding, double-check:
- ✅ You have copied your Client ID
- ✅ You have copied your Client Secret
- ✅ Redirect URL is set to `http://localhost:3000/auth/callback`
- ✅ "Sign In with LinkedIn" product is approved
- ✅ "Share on LinkedIn" product is approved

---

## 📋 Part 2: Install the MCP Server

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>

# Or if you downloaded a ZIP, extract it and navigate to the folder
cd linkedin-mcp-server
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install all required dependencies including:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `axios` - HTTP client for LinkedIn API
- `express` - OAuth callback server
- TypeScript and build tools

### Step 3: Create Environment Configuration

```bash
# Copy the example environment file
cp .env.example .env
```

Now edit the `.env` file:

```bash
# On macOS/Linux
nano .env
# or
vim .env
# or use your preferred text editor

# On Windows
notepad .env
```

Replace the placeholder values:

```env
# Replace these with your actual values from LinkedIn Developer Portal
LINKEDIN_CLIENT_ID=your_actual_client_id_here
LINKEDIN_CLIENT_SECRET=your_actual_client_secret_here

# This should stay the same (must match LinkedIn app settings)
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback

# Leave empty for now (we'll add this later if needed)
LINKEDIN_COMPANY_ID=

# Server settings (can keep defaults)
PORT=3000
NODE_ENV=development
TOKEN_STORAGE_PATH=./tokens.json
```

**Important**:
- ✅ Replace `your_actual_client_id_here` with your real Client ID
- ✅ Replace `your_actual_client_secret_here` with your real Client Secret
- ⚠️ Never commit the `.env` file to git (it's already in `.gitignore`)

### Step 4: Build the TypeScript Project

```bash
# Compile TypeScript to JavaScript
npm run build
```

This creates the `dist/` folder with compiled JavaScript files.

Verify the build succeeded:
```bash
# Check that dist/index.js was created
ls -la dist/index.js
```

---

## 📋 Part 3: Authenticate with LinkedIn

### Step 1: Start the OAuth Server

```bash
npm start
```

The server will:
1. Check if you have valid tokens
2. If not, start a local web server on port 3000
3. Display an authorization URL in the terminal
4. Automatically open your browser

### Step 2: Authorize the Application

In your browser:
1. You'll be redirected to LinkedIn
2. Review the permissions requested
3. Click **"Allow"** to authorize the app
4. You'll be redirected back to `localhost:3000/auth/callback`
5. You should see a success message

### Step 3: Verify Token Storage

After successful authorization:

```bash
# Check that tokens were saved
cat tokens.json
```

You should see a JSON file with:
- `access_token`
- `refresh_token`
- `expires_in`
- `scope`

**Security Note**: `tokens.json` contains sensitive credentials. It's in `.gitignore` and should never be committed.

---

## 📋 Part 4: Configure Claude Desktop

### Step 1: Locate the Config File

The configuration file location depends on your operating system:

**macOS**:
```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows**:
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux**:
```bash
~/.config/Claude/claude_desktop_config.json
```

### Step 2: Get Your Absolute Path

You need the **absolute path** to your project directory.

```bash
# On macOS/Linux - run this in your project directory
pwd

# On Windows (PowerShell)
Get-Location

# On Windows (Command Prompt)
cd
```

Copy the output. Example: `/Users/yourusername/projects/linkedin-mcp-server`

### Step 3: Edit Claude Desktop Config

Open the config file:

```bash
# macOS
open ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or use a text editor
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

If the file doesn't exist, create it:

```bash
# macOS/Linux
mkdir -p ~/Library/Application\ Support/Claude
echo '{"mcpServers":{}}' > ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add or update the configuration:

```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": [
        "/ABSOLUTE/PATH/TO/linkedin-mcp-server/dist/index.js"
      ]
    }
  }
}
```

**Replace** `/ABSOLUTE/PATH/TO/linkedin-mcp-server` with your actual path from Step 2.

Example (macOS):
```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": [
        "/Users/john/projects/linkedin-mcp-server/dist/index.js"
      ]
    }
  }
}
```

Example (Windows):
```json
{
  "mcpServers": {
    "linkedin": {
      "command": "node",
      "args": [
        "C:\\Users\\John\\projects\\linkedin-mcp-server\\dist\\index.js"
      ]
    }
  }
}
```

**Note**: If you already have other MCP servers configured, just add the `"linkedin"` entry inside `mcpServers`.

### Step 4: Restart Claude Desktop

1. **Completely quit** Claude Desktop (don't just close the window)
   - macOS: Cmd+Q
   - Windows: Right-click system tray icon → Quit
   - Linux: Quit from menu
2. **Relaunch** Claude Desktop
3. Wait for it to fully start

---

## ✅ Part 5: Verify Installation

### Test 1: Basic Profile Fetch

In Claude Desktop, send this message:
```
Get my LinkedIn profile information
```

**Expected result**: Claude should respond with your LinkedIn profile details (name, headline, etc.)

### Test 2: Post Creation

```
Post on LinkedIn: Testing my new LinkedIn MCP server! #automation
```

**Expected result**: Claude should confirm the post was created. Check your LinkedIn feed to verify.

### Test 3: Fetch Recent Posts

```
Show me my last 3 LinkedIn posts
```

**Expected result**: Claude should display your recent posts, including the one you just created.

---

## 🏢 Part 6: Company Page Setup (Optional)

If you want to manage a company page, you need to get the Company ID.

### Method 1: Using the Provided Script

```bash
npm run get-company-id
```

This script will:
1. Authenticate with LinkedIn (using your existing tokens)
2. Fetch all company pages you administrate
3. Display the Company ID for each page
4. Show you the exact line to add to `.env`

### Method 2: Manual Method

1. Go to your company page on LinkedIn
2. Right-click → Inspect Element
3. Search in the HTML for `data-entity-urn` or similar
4. Find the numeric ID

### Add Company ID to .env

Edit `.env` and add:
```env
LINKEDIN_COMPANY_ID=123456789
```

Replace `123456789` with your actual Company ID.

**Important**: You must be an **administrator** of the company page to post on its behalf.

---

## 🐛 Troubleshooting

### Error: "Invalid environment variables"

**Cause**: Missing or incorrect values in `.env`

**Solution**:
```bash
# Verify .env file exists
cat .env

# Check that CLIENT_ID and CLIENT_SECRET are filled in
# They should NOT be "your_client_id_here" or "your_client_secret_here"
```

### Error: "Authentication failed"

**Cause**: Redirect URI mismatch or missing permissions

**Solution**:
1. Verify redirect URI in LinkedIn app matches exactly: `http://localhost:3000/auth/callback`
2. Check that both Products are approved in LinkedIn Developer Portal
3. Try deleting `tokens.json` and run `npm start` again

### Error: "Cannot find module"

**Cause**: Dependencies not installed or build failed

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### MCP Server Not Starting in Claude Desktop

**Cause**: Incorrect path or permissions issue

**Solution**:
```bash
# Verify the path is correct and absolute
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Check Claude Desktop logs
tail -f ~/Library/Logs/Claude/mcp*.log

# Verify dist/index.js exists
ls -la dist/index.js

# Test the server manually
node dist/index.js
```

### Error: "Port 3000 already in use"

**Cause**: Another application is using port 3000

**Solution**:
```bash
# Option 1: Kill the process using port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Option 2: Change the port
# Edit .env and change PORT=3000 to PORT=3001
# Also update LINKEDIN_REDIRECT_URI and LinkedIn app settings
```

### Error: "Company not found"

**Cause**: Not an administrator or incorrect Company ID

**Solution**:
1. Verify you're an administrator of the company page
2. Run `npm run get-company-id` to get the correct ID
3. Make sure the ID is numeric (not the company name)

---

## 🔄 Updating the Server

To update to the latest version:

```bash
# Pull latest changes
git pull

# Reinstall dependencies (if package.json changed)
npm install

# Rebuild
npm run build

# Restart Claude Desktop
```

---

## 🛠️ Development Setup

For development with auto-reload:

```bash
# Run in development mode
npm run dev
```

This uses `tsx` to run TypeScript directly with watch mode.

---

## 📚 Next Steps

- ✅ Installation complete!
- 📖 Read [PERMISSIONS.md](PERMISSIONS.md) to understand LinkedIn API permissions
- 🧪 See [TESTING.md](TESTING.md) for a complete testing guide
- 📚 Check [REFERENCE.md](REFERENCE.md) for quick command reference
- 🏗️ Explore [ARCHITECTURE.md](ARCHITECTURE.md) if you want to contribute

---

## 🆘 Still Need Help?

If you're still having issues:

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review the [TESTING.md](TESTING.md) debugging section
3. Check Claude Desktop logs for error messages
4. Verify all prerequisites are met

---

**Installation complete!** 🎉

You can now manage your LinkedIn presence through Claude Desktop.

**Created with ❤️ by the community**
