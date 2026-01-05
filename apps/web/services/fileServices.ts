import { headersAuthFetch } from "@/utils/header-fetch";

export class FileServices {
  static async uploadFile(file: File, token: string) {
    const header = headersAuthFetch(token);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${process.env.API_URL}/api/attachments`, {
      method: "POST",
      body: formData,
      headers: header.headers,
    });

    return res.json();
  }

  static async getFileById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/attachments/${id}`,
      header,
    );
    return res.json();
  }

  static async getAllFiles(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/attachments`, header);
    return res.json();
  }

  static async deleteFile(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }

  static async updateFile(id: string, data: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(data),
    });
    return res.json();
  }
}
