import { headersAuthFetch } from "@/utils/header-fetch";
import { WalletFormData } from "@/validators/wallet-validator";

export class WalletServices {
  static async getAllWallets(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/wallets`, header);
    return res.json();
  }

  static async getWalletById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, header);
    return res.json();
  }

  static async createWallet(walletData: WalletFormData, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/wallets`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async updateWallet(
    id: string,
    walletData: WalletFormData,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async deleteWallet(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }

  static async getWalletBalance(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/wallets/${id}/balance`,
      header,
    );
    return res.json();
  }

  static async getWalletTransactions(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/wallets/${id}/transactions`,
      header,
    );
    return res.json();
  }
}
