# LinkedIn MCP Server

A Model Context Protocol (MCP) server that enables Claude Desktop to interact with your LinkedIn profile and company pages. Connect your LinkedIn account to Claude AI and manage your professional presence directly through conversations.

## 🎯 Features

### Personal Profile
- ✅ Fetch profile information
- ✅ Create and publish posts
- ✅ Read your posts
- ✅ Delete posts

### Company Pages
- ✅ Publish posts on behalf of your company page
- ✅ Retrieve page analytics
- ✅ Manage page content
- ✅ Read post statistics

### Job Search
- ✅ Search for job opportunities
- ✅ Filter by location, company, etc.

### Messages (if scope enabled)
- ✅ Read conversations
- ✅ Send messages

## 🚀 Quick Start

### Prerequisites

1. **Node.js 18+** installed on your system
2. **A LinkedIn application** - [Create one here](https://www.linkedin.com/developers/apps/new)
3. **Claude Desktop** - [Download here](https://claude.ai/download)

### Installation Steps

#### 1. Clone and install dependencies

```bash
git clone <your-repo-url>
cd linkedin-mcp-server
npm install
```

#### 2. Create a LinkedIn Application

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps/new)
2. Create a new app with these settings:
   - **App name**: Choose any name (e.g., "My LinkedIn MCP Server")
   - **LinkedIn Page**: Select your company page or create one
   - **App logo**: Optional
3. In the **Auth** tab:
   - Add redirect URL: `http://localhost:3000/auth/callback`
   - Copy your **Client ID** and **Client Secret**
4. In the **Products** tab, request access to:
   - "Sign In with LinkedIn using OpenID Connect"
   - "Share on LinkedIn"

#### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/auth/callback
LINKEDIN_COMPANY_ID=your_company_id_here  # Optional, for company page features
```

#### 4. Build the project

```bash
npm run build
```

#### 5. Authenticate with LinkedIn

```bash
npm start
```

The server will:
- Open your browser to LinkedIn authentication
- Save your access tokens to `tokens.json`
- You only need to do this once

## 🔧 Claude Desktop Configuration

Add this configuration to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**Linux**: `~/.config/Claude/claude_desktop_config.json`

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

**Important**: Replace `/ABSOLUTE/PATH/TO/linkedin-mcp-server` with the actual path to your project directory.

To get the absolute path:
```bash
# On macOS/Linux
pwd

# On Windows (PowerShell)
Get-Location
```

Then restart Claude Desktop completely (quit and reopen).

## 🎯 Usage

Once configured, you can ask Claude Desktop:

### Personal Profile
```
"Get my LinkedIn profile information"
"Show me my LinkedIn profile"
```

### Publishing Posts
```
"Post on LinkedIn: Just learned about MCP servers, amazing technology!"
"Show me my last 5 LinkedIn posts"
"Delete my last LinkedIn post"
```

### Company Page (if configured)
```
"Post on my company page: We're hiring a Senior Developer!"
"Show posts from my company page"
"What are the analytics for my company page?"
```

### Job Search
```
"Search for Software Engineer jobs in San Francisco"
"Find remote Full Stack Developer positions"
```

## 🏢 Getting Your Company ID (Optional)

To publish on your company page, you need to find your Company ID:

### Method 1: Use the provided script
```bash
npm run get-company-id
```

This will authenticate and show all company pages you administrate.

### Method 2: From LinkedIn URL
1. Go to your company page on LinkedIn
2. Look at the URL: `linkedin.com/company/your-company-name/`
3. Use browser developer tools to find the numeric ID in the page source

Add the Company ID to your `.env` file:
```env
LINKEDIN_COMPANY_ID=123456789
```

**Note**: You must be an administrator of the company page to post on its behalf.

## 📁 Project Architecture

Built with Clean Architecture principles:

```
src/
├── domain/              # Business entities
│   ├── entities/       # LinkedIn entities
│   └── interfaces/     # Contracts & interfaces
├── application/        # Use cases
│   └── use-cases/     # Business logic
├── infrastructure/     # External services
│   ├── linkedin/      # LinkedIn API client
│   └── storage/       # Token storage
├── presentation/       # MCP layer
│   └── tools/         # Exposed MCP tools
└── index.ts           # Entry point
```

## 🔐 Security

- ⚠️ **NEVER commit** your `.env` file
- ⚠️ OAuth tokens are stored locally in `tokens.json`
- ⚠️ Keep `.env` and `tokens.json` in `.gitignore`
- ⚠️ Tokens are automatically refreshed when needed

## 🛠️ Development

```bash
# Development mode with auto-reload
npm run dev

# Build TypeScript
npm run build

# Start the server
npm start

# Get your company ID
npm run get-company-id
```

## 📚 Resources

- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/download)
- [LinkedIn Developer Portal](https://www.linkedin.com/developers/)

## 🐛 Troubleshooting

### "Invalid environment variables"
Check that your `.env` file contains valid values (not placeholders like `your_client_id_here`)

### "Authentication failed"
1. Verify your Redirect URI matches exactly: `http://localhost:3000/auth/callback`
2. Check that you've requested access to required Products in LinkedIn Developer Portal
3. Delete `tokens.json` and try authenticating again

### MCP server not starting in Claude Desktop
1. Verify the path in `claude_desktop_config.json` is absolute and correct
2. Ensure `npm run build` completed successfully
3. Check Claude Desktop logs:
   - **macOS**: `~/Library/Logs/Claude/mcp*.log`
   - **Windows**: `%APPDATA%\Claude\logs\mcp*.log`

### "Company not found"
Make sure you're an administrator of the company page on LinkedIn

## 📝 License

MIT

## 👤 Author

Created with ❤️ by Grégory Dernaucourt

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you connect your LinkedIn to Claude AI!
