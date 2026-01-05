import { headersAuthFetch } from "@/utils/header-fetch";
import { TransactionFormData } from "@/validators/transaction-validator";

export class BlockchainServices {
  static async getAllTransactions(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`,
      header,
    );
    return res.json();
  }

  static async getTransactionById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      header,
    );
    return res.json();
  }

  static async createTransaction(data: TransactionFormData, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      const errorBody = await res.text();
      console.error("❌ Backend répond :", errorBody);
      throw new Error(`Erreur backend: ${res.status}`);
    }

    return res.json();
  }

  static async refreshTransaction(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      header,
    );
    return res.json();
  }

  static async getTransactionStatus(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain-transactions/${id}`,
      header,
    );
    return res.json();
  }

  static async getBlockByNumber(blockNumber: number, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/blockchain/blocks/${blockNumber}`,
      header,
    );
    return res.json();
  }
}
