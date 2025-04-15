import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { 
    fetchBlockDetails, 
    fetchExtrinsicByHash, 
    fetchAccountInfo, 
    fetchAccountBalance,
    fetchAccountTransactions
} from "./helpers";
import {
    SubscanInternalModelChainExtrinsicJson,
    ExtrinsicDetailResponse,
    AccountInfoResponse,
    AccountTransactionsResponse
} from "../types/types";

type ExtrinsicDetailResponseType = typeof ExtrinsicDetailResponse._type;
type AccountInfoResponseType = typeof AccountInfoResponse._type;
type AccountTransactionsResponseType = typeof AccountTransactionsResponse._type;
type ExtrinsicJsonType = typeof SubscanInternalModelChainExtrinsicJson._type;

// Create MCP server instance
const server = new McpServer({
    name: "vara-mcp",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});

// Register an MCP tool to get block details
server.tool(
    "get-block",
    "Fetches block details from Vara network",
    {
        blockNumber: z.number().min(0).describe("The block number to fetch details for"),
    },
    async ({ blockNumber }) => {
        const blockData = await fetchBlockDetails(blockNumber);

        if (!blockData) {
            return {
                content: [{ type: "text", text: "Failed to retrieve block details" }],
            };
        }

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(blockData.data),
                    // text: `Block #${blockData.data.block_num} Details:\nHash: ${blockData.data.hash}\nTime: ${blockData.data.block_timestamp}`,
                },
            ],
        };
    }
);

// New tool to get transaction/extrinsic details by hash
server.tool(
    "get-transaction",
    "Fetches transaction/extrinsic details by hash from Vara network",
    {
        extrinsicHash: z.string().describe("The transaction/extrinsic hash to fetch details for"),
    },
    async ({ extrinsicHash }) => {
        const extrinsicData = await fetchExtrinsicByHash(extrinsicHash) as ExtrinsicDetailResponseType;

        if (!extrinsicData || !extrinsicData.data) {
            return {
                content: [{ 
                    type: "text", 
                    text: `Failed to retrieve transaction details for hash: ${extrinsicHash}` 
                }],
            };
        }

        const tx: ExtrinsicJsonType = extrinsicData.data;
        
        // Format a more readable response
        const formattedResponse = {
            hash: tx.extrinsic_hash,
            block_num: tx.block_num,
            timestamp: tx.block_timestamp,
            module: tx.call_module,
            function: tx.call_module_function,
            status: tx.success ? "Success" : "Failed",
            fee: tx.fee,
            sender: tx.account_id,
            params: tx.params ? JSON.parse(tx.params) : null
        };

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(formattedResponse, null, 2),
                },
            ],
        };
    }
);

// New tool to get account information
server.tool(
    "get-account-info",
    "Fetches account information from Vara network",
    {
        address: z.string().describe("The account address to fetch information for"),
    },
    async ({ address }) => {
        const accountData = await fetchAccountInfo(address) as AccountInfoResponseType;

        if (!accountData || !accountData.data) {
            return {
                content: [{ 
                    type: "text", 
                    text: `Failed to retrieve account information for address: ${address}` 
                }],
            };
        }

        // Format a readable response
        const formattedResponse = {
            address: accountData.data.address,
            display: accountData.data.display || "Not Set",
            balance: accountData.data.balance || "0",
            extrinsics_count: accountData.data.count_extrinsics || 0,
            transactions_count: accountData.data.count_txs || 0,
            nonce: accountData.data.nonce || 0,
            has_identity: accountData.data.identity || false
        };

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(formattedResponse, null, 2),
                },
            ],
        };
    }
);

// New tool to get account balance
server.tool(
    "get-account-balance",
    "Fetches account balance from Vara network",
    {
        address: z.string().describe("The account address to fetch balance for"),
    },
    async ({ address }) => {
        const balanceData = await fetchAccountBalance(address);

        if (!balanceData || !balanceData.data) {
            return {
                content: [{ 
                    type: "text", 
                    text: `Failed to retrieve account balance for address: ${address}` 
                }],
            };
        }

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(balanceData.data, null, 2),
                },
            ],
        };
    }
);

// New tool to get account transaction history
server.tool(
    "get-account-transactions",
    "Fetches account transaction history from Vara network",
    {
        address: z.string().describe("The account address to fetch transactions for"),
        page: z.number().min(0).default(0).describe("Page number for pagination"),
        perPage: z.number().min(1).max(100).default(10).describe("Number of transactions per page"),
    },
    async ({ address, page, perPage }) => {
        const txData = await fetchAccountTransactions(address, page, perPage) as AccountTransactionsResponseType;

        if (!txData || !txData.data) {
            return {
                content: [{ 
                    type: "text", 
                    text: `Failed to retrieve transaction history for address: ${address}` 
                }],
            };
        }

        // Format a more concise response
        const formattedTransactions = txData.data.extrinsics.map((tx: ExtrinsicJsonType) => ({
            hash: tx.extrinsic_hash,
            block_num: tx.block_num,
            timestamp: tx.block_timestamp,
            module: tx.call_module,
            function: tx.call_module_function,
            success: tx.success
        }));

        const response = {
            total_count: txData.data.count,
            page: page,
            transactions: formattedTransactions
        };

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(response, null, 2),
                },
            ],
        };
    }
);

// Start the server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Vara MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});