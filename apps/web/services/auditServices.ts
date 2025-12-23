export class AuditServices {
  static async getAllAuditLogs() {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs`);
    return res.json();
  }

  static async getAuditLogById(id: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/${id}`);
    return res.json();
  }

  static async getAuditLogsByEntity(entityType: string, entityId: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/entity/${entityType}/${entityId}`);
    return res.json();
  }

  static async getAuditLogsByUser(userId: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/user/${userId}`);
    return res.json();
  }

  static async getAuditLogsByDateRange(startDate: string, endDate: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/date-range?startDate=${startDate}&endDate=${endDate}`);
    return res.json();
  }

  static async getAuditLogsByAction(action: string) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/action/${action}`);
    return res.json();
  }

  static async createAuditLog(auditData: any) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auditData),
    });
    return res.json();
  }

  static async exportAuditLogs(filters: any) {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/export`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    return res.json();
  }

  static async getAuditStatistics() {
    const res = await fetch(`${process.env.API_URL}/api/audit-logs/statistics`);
    return res.json();
  }
}