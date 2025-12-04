export class TemplateServices {
  static async getAllTemplates(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getTemplateById(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createTemplate(templateData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }

  static async updateTemplate(id: string, templateData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }

  static async deleteTemplate(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getTemplateVersions(templateId: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createTemplateVersion(templateId: string, versionData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(versionData),
    });
    return res.json();
  }

  static async deployTemplate(templateId: string, versionId: string, deployData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions/${versionId}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(deployData),
    });
    return res.json();
  }

  static async validateTemplate(templateData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }
}