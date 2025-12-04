export class WalletServices {
  static async getAllWallets(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getWalletById(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createWallet(walletData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async updateWallet(id: string, walletData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(walletData),
    });
    return res.json();
  }

  static async deleteWallet(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getWalletBalance(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}/balance`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async transferFunds(fromWalletId: string, transferData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${fromWalletId}/transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(transferData),
    });
    return res.json();
  }

  static async getWalletTransactions(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/wallets/${id}/transactions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }
}