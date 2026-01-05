import { headersAuthFetch } from "@/utils/header-fetch";

export class TemplateServices {
  static async getAllTemplates(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates`,
      header,
    );
    return res.json();
  }

  static async getTemplateById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`,
      header,
    );
    return res.json();
  }

  static async createTemplate(templateData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(templateData),
      },
    );
    return res.json();
  }

  static async updateTemplate(id: string, templateData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`,
      {
        method: "PUT",
        headers: header.headers,
        body: JSON.stringify(templateData),
      },
    );
    return res.json();
  }

  static async deleteTemplate(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${id}`,
      {
        method: "DELETE",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async getTemplateVersions(templateId: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${templateId}/versions`,
      header,
    );
    return res.json();
  }

  static async createTemplateVersion(
    templateId: string,
    versionData: any,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${templateId}/versions`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(versionData),
      },
    );
    return res.json();
  }

  static async deployTemplate(
    templateId: string,
    versionId: string,
    deployData: any,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/${templateId}/versions/${versionId}/deploy`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(deployData),
      },
    );
    return res.json();
  }

  static async validateTemplate(templateData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/templates/validate`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(templateData),
      },
    );
    return res.json();
  }
}
