export class ContractServices {
  static async getAllContracts(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getContractById(id: string, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createContract(contractData: any, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(contractData),
    });
    return res.json();
  }

  static async updateContract(id: string, contractData: any, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(contractData),
    });
    return res.json();
  }

  static async deleteContract(id: string, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async deployContract(id: string, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async executeContract(id: string, executionData: any, token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(executionData),
    });
    return res.json();
  }
}