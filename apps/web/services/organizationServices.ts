import { headersAuthFetch } from "@/utils/header-fetch";

export class OrganizationServices {
  static async getAllOrganizations(token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations`,
      header,
    );
    return res.json();
  }

  static async getOrganizationById(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`,
      header,
    );
    return res.json();
  }

  static async createOrganization(organizationData: any, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(organizationData),
      },
    );
    return res.json();
  }

  static async updateOrganization(
    id: string,
    organizationData: any,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`,
      {
        method: "PUT",
        headers: header.headers,
        body: JSON.stringify(organizationData),
      },
    );
    return res.json();
  }

  static async deleteOrganization(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`,
      {
        method: "DELETE",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async getOrganizationMembers(id: string, token: string) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}/members`,
      header,
    );
    return res.json();
  }

  static async addMember(
    organizationId: string,
    memberData: any,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members`,
      {
        method: "POST",
        headers: header.headers,
        body: JSON.stringify(memberData),
      },
    );
    return res.json();
  }

  static async removeMember(
    organizationId: string,
    memberId: string,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members/${memberId}`,
      {
        method: "DELETE",
        headers: header.headers,
      },
    );
    return res.json();
  }

  static async updateMemberRole(
    organizationId: string,
    memberId: string,
    roleData: any,
    token: string,
  ) {
    const header = headersAuthFetch(token);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members/${memberId}/role`,
      {
        method: "PUT",
        headers: header.headers,
        body: JSON.stringify(roleData),
      },
    );
    return res.json();
  }
}
