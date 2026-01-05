import { headersAuthFetch } from "@/utils/header-fetch";

export class ContractServices {
  static async getAllContracts(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts`,
      header,
    );
    return res.json();
  }

  static async getContractById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`,
      header,
    );
    return res.json();
  }

  static async createContract(contractData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(contractData),
      },
    );
    return res.json();
  }

  static async updateContract(id: string, contractData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`,
      {
        method: "PUT",
        headers: header.headers,
        body: JSON.stringify(contractData),
      },
    );
    return res.json();
  }

  static async deleteContract(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}`,
      {
        method: "DELETE",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async deployContract(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/deploy`,
      {
        method: "POST",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async executeContract(id: string, executionData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/contracts/${id}/execute`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(executionData),
      },
    );
    return res.json();
  }
}
