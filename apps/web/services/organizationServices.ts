export class OrganizationServices {
  static async getAllOrganizations(token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getOrganizationById(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async createOrganization(organizationData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(organizationData),
    });
    return res.json();
  }

  static async updateOrganization(id: string, organizationData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(organizationData),
    });
    return res.json();
  }

  static async deleteOrganization(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async getOrganizationMembers(id: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${id}/members`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async addMember(organizationId: string, memberData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${organizationId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(memberData),
    });
    return res.json();
  }

  static async removeMember(organizationId: string, memberId: string, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${organizationId}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return res.json();
  }

  static async updateMemberRole(organizationId: string, memberId: string, roleData: any, token: string) {
    const res = await fetch(`${process.env.API_URL}/api/organizations/${organizationId}/members/${memberId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(roleData),
    });
    return res.json();
  }
}