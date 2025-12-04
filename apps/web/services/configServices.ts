export class ConfigServices {
  static async getAllConfigs(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getConfigByKey(key: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async updateConfig(key: string, configData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async createConfig(configData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }

  static async deleteConfig(key: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async resetConfig(key: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/${key}/reset`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async exportConfigs(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/export`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async importConfigs(configsData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/import`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(configsData),
    });
    return res.json();
  }

  static async validateConfig(configData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/system-config/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(configData),
    });
    return res.json();
  }
}