export class OrganizationServices {
  static async getAllOrganizations() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`);
    return res.json();
  }

  static async getOrganizationById(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`);
    return res.json();
  }

  static async createOrganization(organizationData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizationData),
    });
    return res.json();
  }

  static async updateOrganization(id: string, organizationData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizationData),
    });
    return res.json();
  }

  static async deleteOrganization(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  }

  static async getOrganizationMembers(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${id}/members`,);
    return res.json();
  }

  static async addMember(organizationId: string, memberData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memberData),
    });
    return res.json();
  }

  static async removeMember(organizationId: string, memberId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members/${memberId}`, {
      method: 'DELETE',
    });
    return res.json();
  }

  static async updateMemberRole(organizationId: string, memberId: string, roleData: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}/members/${memberId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roleData),
    });
    return res.json();
  }
}