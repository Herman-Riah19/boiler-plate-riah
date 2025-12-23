import { WalletFormData } from "@/validators/wallet-validator";

export class WalletServices {
  static async getAllWallets() {
    const res = await fetch(`${process.env.API_URL}/api/wallets`, {
      headers: {},
    });
    return res.json();
  }

  static async getWalletById(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      headers: {},
    });
    return res.json();
  }

  static async createWallet(walletData: WalletFormData) {
    const res = await fetch(`${process.env.API_URL}/api/wallets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async updateWallet(id: string, walletData: WalletFormData) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async deleteWallet(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: "DELETE",
      headers: {},
    });
    return res.json();
  }

  static async getWalletBalance(id: string) {
    const res = await fetch(
      `${process.env.API_URL}/api/wallets/${id}/balance`,
    );
    return res.json();
  }

  static async getWalletTransactions(id: string) {
    const res = await fetch(
      `${process.env.API_URL}/api/wallets/${id}/transactions`,
      {
        headers: {},
      }
    );
    return res.json();
  }
}
