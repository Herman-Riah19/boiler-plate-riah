export class ContractServices {
  static async getAllContracts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`);
    return res.json();
  }

  static async getContractById(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`);
    return res.json();
  }

  static async createContract(contractData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    });
    return res.json();
  }

  static async updateContract(id: string, contractData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    });
    return res.json();
  }

  static async deleteContract(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`, {
      method: 'DELETE',
      headers: {
      },
    });
    return res.json();
  }

  static async deployContract(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }

  static async executeContract(id: string, executionData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(executionData),
    });
    return res.json();
  }
}