export class FileServices {
  static async uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${process.env.API_URL}/api/attachments`, {
      method: 'POST',
      body: formData,
    });

    return res.json();
  }

  static async getFileById(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`);
    return res.json();
  }

  static async getAllFiles() {
    const res = await fetch(`${process.env.API_URL}/api/attachments`);
    return res.json();
  }

  static async deleteFile(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }

  static async updateFile(id: string, data: any) {
    const res = await fetch(`${process.env.API_URL}/api/attachments/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}