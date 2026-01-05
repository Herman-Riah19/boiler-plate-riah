import { headersAuthFetch } from "@/utils/header-fetch";

export class AuditServices {
  static async getAllAuditLogs(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs`,
      header,
    );
    return res.json();
  }

  static async getAuditLogById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/${id}`,
      header,
    );
    return res.json();
  }

  static async getAuditLogsByEntity(
    entityType: string,
    entityId: string,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/entity/${entityType}/${entityId}`,
      header,
    );
    return res.json();
  }

  static async getAuditLogsByUser(userId: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/user/${userId}`,
      header,
    );
    return res.json();
  }

  static async getAuditLogsByDateRange(
    startDate: string,
    endDate: string,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/date-range?startDate=${startDate}&endDate=${endDate}`,
      header,
    );
    return res.json();
  }

  static async getAuditLogsByAction(action: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/action/${action}`,
      header,
    );
    return res.json();
  }

  static async createAuditLog(auditData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(auditData),
      },
    );
    return res.json();
  }

  static async exportAuditLogs(filters: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/export`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(filters),
      },
    );
    return res.json();
  }

  static async getAuditStatistics(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/audit-logs/statistics`,
      header,
    );
    return res.json();
  }
}
