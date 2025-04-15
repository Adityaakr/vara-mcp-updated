# Vara MCP Server

A Model Context Protocol (MCP) server that provides onchain tools for AI applications like Claude Desktop and Cursor, allowing them to interact with the Vara Network.

## Overview

This MCP server extends any MCP client's capabilities by providing tools to do anything on Vara:
- Retrieve block details
- Get transaction information
- Check account balances
- View account information
- Track transaction history

### Project Structure

The Vara MCP server follows this structure for tools:

```
src/
├── tools/
│   ├── index.ts (exports toolsets)
│   ├── [TOOL_NAME]/ <-------------------------- ADD DIR HERE
│   │   ├── index.ts (defines and exports tools)
│   │   ├── schemas.ts (defines input schema)
│   │   └── handlers.ts (implements tool functionality)
│   └── utils/ (shared tool utilities)
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Subscan API credentials

## Installation

### Install from Source

1. Clone this repository:

   ```bash
   git clone https://github.com/Adityaakr/vara-mcp.git
   cd vara-mcp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

## Configuration

Create a `.env` file with your credentials:

```
# Subscan API credentials
# You can obtain these from the Subscan Developer Portal: https://api.subscan.io/
SUBSCAN_API_URL=your_subscan_api_url
API_KEY=your_api_key
```

## Testing

Test the MCP server to verify it's working correctly:

```bash
npm test
```

This script will verify that your MCP server is working correctly by testing the connection and available tools.

## Integration with Claude Desktop

To add this MCP server to Claude Desktop:

1. Create or edit the Claude Desktop configuration file at:

   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

You can easily access this file via the Claude Desktop app by navigating to Claude > Settings > Developer > Edit Config.

2. Add the following configuration:

   ```json
   {
     "mcpServers": {
       "vara-mcp": {
         "command": "node",
         "args": ["<your_repo_build_path>/build/src/index.js"],
         "env": {
           "SUBSCAN_API_URL": "your_subscan_api_url",
           "API_KEY": "your_api_key"
         },
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

3. Restart Claude Desktop for the changes to take effect.

## Available Commands

### 1. Get Block Details
```
What's block number 21189359?
```
Returns:
- Block hash
- Timestamp
- Number of transactions
- Validator information
- Parent hash
- State root

### 2. Get Transaction Details
```
What's the transaction with hash 0x123...?
```
Returns:
- Block number
- Timestamp
- Module and function called
- Success status
- Fee
- Sender address
- Transaction parameters

### 3. Get Account Information
```
What's the account information for address 5H...?
```
Returns:
- Account address
- Display name (if set)
- Balance
- Number of transactions
- Nonce
- Identity status

### 4. Get Account Balance
```
What's the balance for address 5H...?
```
Returns:
- Current balance in VARA tokens

### 5. Get Account Transaction History
```
Show me the last 10 transactions for address 5H...?
```
Returns:
- List of recent transactions with:
  - Transaction hash
  - Block number
  - Timestamp
  - Module and function
  - Success status

For pagination:
```
Show me transactions 11-20 for address 5H...?
```

## Example Usage

1. Checking a block:
```
What's block number 21189359?
```

2. Viewing account balance:
```
What's the balance for address kGgwmYab55mPWS3q4wWNTqeis5h7kAK4tFHsm3CEUaYxE2pPK?
```

3. Getting transaction history:
```
Show me the last 5 transactions for address kGgwmYab55mPWS3q4wWNTqeis5h7kAK4tFHsm3CEUaYxE2pPK?
```

## Security Considerations

- The configuration file contains sensitive information (API keys and seed phrases). Ensure it's properly secured and not shared.
- Consider using environment variables or a secure credential manager instead of hardcoding sensitive information.

## Troubleshooting

If you encounter issues:

1. Check that your Subscan API credentials are correct
2. Check the Claude Desktop logs for any error messages
3. Verify the build process completed successfully
4. Ensure the executable permissions are set correctly on the built JavaScript file

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
Please make sure your code follows the existing style and includes appropriate tests.
