import { TransactionFormData } from "@/validators/transaction-validator";

export class BlockchainServices {
  static async getAllTransactions(token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.json();
  }

  static async getTransactionById(id: string, token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.json();
  }

  static async createTransaction(data: TransactionFormData, token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      }
    );
    if (!res.ok) {
      const errorBody = await res.text();
      console.error("❌ Backend répond :", errorBody);
      throw new Error(`Erreur backend: ${res.status}`);
    }

    return res.json();
  }
  
  static async refreshTransaction(id: string, token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.json();
  }

  static async getTransactionStatus(id: string, token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.json();
  }

  static async getBlockByNumber(blockNumber: number, token: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/blocks/${blockNumber}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.json();
  }
}
