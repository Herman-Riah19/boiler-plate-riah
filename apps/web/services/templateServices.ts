export class TemplateServices {
  static async getAllTemplates() {
    const res = await fetch(`${process.env.API_URL}/api/templates`);
    return res.json();
  }

  static async getTemplateById(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`);
    return res.json();
  }

  static async createTemplate(templateData: any) {
    const res = await fetch(`${process.env.API_URL}/api/templates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }

  static async updateTemplate(id: string, templateData: any) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }

  static async deleteTemplate(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }

  static async getTemplateVersions(templateId: string) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions`);
    return res.json();
  }

  static async createTemplateVersion(templateId: string, versionData: any) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(versionData),
    });
    return res.json();
  }

  static async deployTemplate(templateId: string, versionId: string, deployData: any) {
    const res = await fetch(`${process.env.API_URL}/api/templates/${templateId}/versions/${versionId}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deployData),
    });
    return res.json();
  }

  static async validateTemplate(templateData: any) {
    const res = await fetch(`${process.env.API_URL}/api/templates/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateData),
    });
    return res.json();
  }
}