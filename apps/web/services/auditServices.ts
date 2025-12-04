export class AuditServices {
  static async getAllAuditLogs(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAuditLogById(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAuditLogsByEntity(entityType: string, entityId: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/entity/${entityType}/${entityId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAuditLogsByUser(userId: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAuditLogsByDateRange(startDate: string, endDate: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/date-range?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getAuditLogsByAction(action: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/action/${action}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createAuditLog(auditData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(auditData),
    });
    return res.json();
  }

  static async exportAuditLogs(filters: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(filters),
    });
    return res.json();
  }

  static async getAuditStatistics(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/statistics`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }
}