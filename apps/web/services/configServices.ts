export class ConfigServices {
  static async getAllConfigs() {
    const res = await fetch(`${process.env.API_URL}/api/system-config`);
    return res.json();
  }

  static async getConfigByKey(key: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`);
    return res.json();
  }

  static async updateConfig(key: string, configData: any) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async createConfig(configData: any) {
    const res = await fetch(`${process.env.API_URL}/api/system-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async deleteConfig(key: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: 'DELETE',
      headers: {
      },
    });
    return res.json();
  }

  static async resetConfig(key: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}/reset`, {
      method: 'POST',
      headers: {
      },
    });
    return res.json();
  }

  static async exportConfigs() {
    const res = await fetch(`${process.env.API_URL}/api/system-config/export`, {
      headers: {
      },
    });
    return res.json();
  }

  static async importConfigs(configsData: any) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configsData),
    });
    return res.json();
  }

  static async validateConfig(configData: any) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }
}