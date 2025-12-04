import { TransactionFormData } from "@/validators/transaction-validator";

export class BlockchainServices {
  static async getAllTransactions() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`);
    return res.json();
  }

  static async getTransactionById(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`);
    return res.json();
  }

static async createTransaction(data: TransactionFormData) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorBody = await res.text();
    console.error("❌ Backend répond :", errorBody);
    throw new Error(`Erreur backend: ${res.status}`);
  }

  return res.json();
}


  static async getTransactionStatus(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`);
    return res.json();
  }

  static async getBlockByNumber(blockNumber: number, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/blocks/${blockNumber}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getLatestBlocks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/blocks/latest`);
    return res.json();
  }

  static async getNetworkInfo() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/network`);
    return res.json();
  }

  static async getGasPrice() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/gas-price`);
    return res.json();
  }

  static async estimateGas(transactionData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/estimate-gas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
    return res.json();
  }
}