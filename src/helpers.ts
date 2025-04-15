// Function to fetch block details from Subscan
export async function fetchBlockDetails(blockNumber: number) {
    console.log("Fetching block details from Subscan");
    try {
        const response = await fetch(process.env.SUBSCAN_API_URL! + "/api/scan/block", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY!,
            },
            body: JSON.stringify({ block_num: blockNumber }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching block details:", error);
        return null;
    }
}

// Function to fetch transaction/extrinsic details by hash
export async function fetchExtrinsicByHash(extrinsicHash: string) {
    console.log(`Fetching extrinsic details for hash: ${extrinsicHash}`);
    try {
        const response = await fetch(process.env.SUBSCAN_API_URL! + "/api/scan/extrinsic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY!,
            },
            body: JSON.stringify({ hash: extrinsicHash }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching extrinsic details:", error);
        return null;
    }
}

// Function to fetch account information
export async function fetchAccountInfo(address: string) {
    console.log(`Fetching account info for address: ${address}`);
    try {
        const response = await fetch(process.env.SUBSCAN_API_URL! + "/api/scan/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY!,
            },
            body: JSON.stringify({ address }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching account info:", error);
        return null;
    }
}

// Function to fetch account balance
export async function fetchAccountBalance(address: string) {
    console.log(`Fetching balance for address: ${address}`);
    try {
        const response = await fetch(process.env.SUBSCAN_API_URL! + "/api/scan/account/tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY!,
            },
            body: JSON.stringify({ address }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching account balance:", error);
        return null;
    }
}

// Function to fetch account transaction history
export async function fetchAccountTransactions(address: string, page: number = 0, row: number = 10) {
    console.log(`Fetching transaction history for address: ${address}`);
    try {
        const response = await fetch(process.env.SUBSCAN_API_URL! + "/api/scan/extrinsics", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.API_KEY!,
            },
            body: JSON.stringify({ 
                address,
                page,
                row,
                order: "desc"
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching account transactions:", error);
        return null;
    }
}