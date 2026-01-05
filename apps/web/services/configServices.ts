import { headersAuthFetch } from "@/utils/header-fetch";

export class ConfigServices {
  static async getAllConfigs(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/system-config`, header);
    return res.json();
  }

  static async getConfigByKey(key: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/system-config/${key}`,
      header,
    );
    return res.json();
  }

  static async updateConfig(key: string, configData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: "PUT",
      headers: header.headers,
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async createConfig(configData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/system-config`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async deleteConfig(key: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: "DELETE",
      headers: header.headers,
    });
    return res.json();
  }

  static async resetConfig(key: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/system-config/${key}/reset`,
      {
        method: "POST",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async exportConfigs(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/system-config/export`,
      header,
    );
    return res.json();
  }

  static async importConfigs(configsData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(`${process.env.API_URL}/api/system-config/import`, {
      method: "POST",
      headers: header.headers,
      body: JSON.stringify(configsData),
    });
    return res.json();
  }

  static async validateConfig(configData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.API_URL}/api/system-config/validate`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(configData),
      },
    );
    return res.json();
  }
}
