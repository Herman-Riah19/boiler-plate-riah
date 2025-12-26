export class FileServices {
  static async uploadFile(file: File, token: string) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${process.env.API_URL}/api/attachments`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return res.json();
  }

  static async getFileById(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAllFiles(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async deleteFile(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async updateFile(id: string, data: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}